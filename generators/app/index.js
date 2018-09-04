'use strict';

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(`Welcome to the ${chalk.red('Eventology web app')} generator!`));

    const prompts = [
      {
        type: 'list',
        name: 'repo',
        message: 'Select the base repo',
        choices: [
          {
            name: 'base-web-app',
            value: 'base-web-app'
          }
        ]
      },
      {
        type: 'input',
        name: 'name',
        message: 'Your project name'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  write() {
    const destination = path.join(this.destinationPath(), this.props.name);
    this.fs.copy(
      path.join(__dirname, '../../node_modules/@eventology/base-web-app'),
      destination
    );
    const packagePath = path.join(destination, 'package.json');
    const _package = this.fs.readJSON(packagePath);
    _package.name = this.props.name;
    this.fs.writeJSON(packagePath, _package);
  }

  writing() {}

  install() {
    this.spawnCommand('npm', ['install', '--prefix', this.props.name]);
  }
};
