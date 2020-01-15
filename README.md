# awsgo
awsgo makes AWS user guide, cli reference, console and pricing's links avilable to open from your command line.

## Installation

### Node.js
awsgo is available on npm. To install it, type:

``` $ npm install -g awsgo ```

## Usage

#### As CLI Tool
```
$ awsgo --help

Usage: awsgo [OPTIONS]... <SERVICE>

Commands:
  awsgo <service>     Open <service> API, CLI, console, developer, pricing or
                      user guide page                                  [default]
  awsgo calc          Open AWS Calculator

Service Options
  -a, --api              Open <service> API reference page             [boolean]
  -c, --cli              Open <service> CLI command reference page     [boolean]
  -C, --console          Open <service> management console page        [boolean]
  -d, --developer-guide  Open <service> developer guide page           [boolean]
  -g, --getting-started  Open <service> getting started guide page     [boolean]
  -p, --pricing          Open <service> pricing page                   [boolean]
  -u, --user-guide       Open <service> user guide page                [boolean]

Options:
  --version   Show version number                                      [boolean]
  --help, -h  Show help                                                [boolean]

Examples:
  awsgo s3 --pricing
  awsgo ec2 --api --console
  awsgo rds -acCdgpu
  awsgo calc

More: https://github.com/ganeshnaidu/awsgo

```  
Service could be any one of [AWS Avilable Services](https://docs.aws.amazon.com/cli/latest/reference/index.html)

## Test

TODO
