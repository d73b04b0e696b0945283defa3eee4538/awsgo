'use strict';

const yargs = require('yargs');

const services = require('./services.json');

// Commands
// -> Services
//  -> Options 
yargs
    .command('* <service>', 'Open <service> API, CLI, console, developer, pricing or user guide page', (yargs) => {
        return yargs
            .choices('service', Object.keys(services))
            .options({
                a: {
                    alias: 'api',
                    type: 'boolean',
                    desc: 'Open <service> API reference page',
                },
                c: {
                    alias: 'cli',
                    type: 'boolean',
                    desc: 'Open <service> CLI command reference page',
                },
                C: {
                    alias: 'console',
                    type: 'boolean',
                    desc: 'Open <service> management console page',
                },
                d: {
                    alias: 'developer-guide',
                    type: 'boolean',
                    desc: 'Open <service> developer guide page',
                },
                g: {
                    alias: 'getting-started',
                    type: 'boolean',
                    desc: 'Open <service> getting started guide page',
                },
                p: {
                    alias: 'pricing',
                    type: 'boolean',
                    desc: 'Open <service> pricing page',
                },
                u: {
                    alias: 'user-guide',
                    type: 'boolean',
                    desc: 'Open <service> user guide page',
                }
            })
            .group(
                ['a', 'c', 'C', 'd', 'g', 'p', 'u']
                , 'Service Options'
            );
    });


// Commands
// -> Miscellaneous
yargs
    .command('calc', 'Open AWS Calculator', {}, (argv) => {
        argv.command = 'calc';
    })
    .alias('calc', 'calculator')
    .help()

// Global settings
yargs
    .usage('Usage: $0 [OPTIONS]... <SERVICE>')
    .example('$0 s3 --pricing')
    .example('$0 ec2 --api --console')
    .example('$0 rds -acCdgpu')
    .example('$0 calc')
    .alias('help', 'h')
    .epilog('More: https://github.com/ganeshnaidu/awsgo');
    
module.exports = yargs;    