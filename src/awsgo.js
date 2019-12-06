'use strict';

const shell = require('shelljs');

const yargs = require('./args');
const services = require('./services.json');
const miscellaneous = require('./miscellaneous.json');

// Browser Paths 
const firefoxPath = shell.which('firefox');
const chromePath = shell.which('google-chrome');
const chromiumPath = shell.which('chromium-browser');

// Browser options
const firefoxOptions = ["--new-tab"];
const chromeOptions = [];
const chromiumOptions = [];

// Determines browser's existence on the system
const canOpen = () => Boolean(
    firefoxPath
    || chromePath
    || chromiumPath
);

function main(argv) {
    if (!canOpen()) {
        console.log('failed to detect Firefox, Google Chrome and Chromium Browser.');
        console.log('make sure browser is avilable and accessible from CLI');
        return;
    }

    // Choose the browser & webpage to open
    const browser = firefoxPath ? firefoxPath + " " + firefoxOptions.join(" ")
        : chromePath ? chromePath + " " + chromeOptions.join(" ")
            : chromiumPath ? chromiumPath + " " + chromiumOptions.join(" ")
                : null;
    const service = argv.service;

    argv.service
        ? openServicePage(browser, argv)
        : openMiscPage(browser, argv);

    process.exit(0);
}

// Open service webpage
function openServicePage(browser, argv) {
    const serviceLinks = services[argv.service];
    const targetLinks = [];

    // Traverse through service links and build targetLinks based on provided options  
    for (const type of Object.keys(serviceLinks)) {
        if (argv[type] && serviceLinks[type].length) {
            const serviceLink = serviceLinks[type];
            targetLinks.push(...
                Array.isArray(serviceLink)
                    ? serviceLink
                    : [serviceLink]
            );
        }
    }

    // At least show console when user option is not avilable 
    // and console endpoint is avilable
    if (
        !targetLinks.length
        && serviceLinks['console']
        && serviceLinks['console'].length
    ) {
        targetLinks.push(...
            Array.isArray(serviceLinks['console'])
                ? serviceLinks['console']
                : [serviceLinks['console']]
        );
    }

    // Show error message when no service links found to open
    if (!targetLinks.length) {
        console.log(`${argv['service']} has no links`);
        console.log(`If you think this is incorrect, head to gitrepo and raise an issue`);
        return;
    }

    open(browser, targetLinks);
}

// Open miscellaneous webpage
function openMiscPage(browser, argv) {
    switch (argv.command) {
        case "calc":
            open(browser, miscellaneous['calc']);
            break;
        default:
            throw Error('Unknown command');
    }
}

// Open webpage(s). Silent
function open(browser, link) {
    const links = Array.isArray(link) ? link : [link];
    shell.exec(
        `${browser} ${links.join(" ")} &> /dev/null`,
        { silent: true },
        () => { }
    );
}

// Curry Fn, Supports args from scripts and command line
module.exports = (...args) => {
    const argv = args.length
        ? yargs.parse(args)
        : yargs.argv;
    return {
        canOpen,
        open: () => main(argv)
    }
}