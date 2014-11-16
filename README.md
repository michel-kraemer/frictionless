# frictionless [![Build Status](https://travis-ci.org/michel-kraemer/frictionless.svg?branch=master)](https://travis-ci.org/michel-kraemer/frictionless)

This tool helps you check your open source projects to reduce
*contributor friction*, sometimes referred to as the *time to first commit*
(TTFC).

Keeping the time that possible contributors have to spent before they can
commit to your project to a minimum may increase the number of contributions.
See [Ben Balter's article](benbalter) for more information.

frictionless has been inspired by [Flint][flint] and [Friction][friction]
written in Go and Ruby respectively. The goal of this project is to provide a
tool that is easier to install (in particular for people who don't have Ruby
installed) and to support multiple programming languages.

[benbalter]: http://ben.balter.com/2013/08/11/friction/
[flint]: https://github.com/pengwynn/flint
[friction]: https://github.com/rafalchmiel/friction

## Install

Installing frictionless is as easy as this:

    npm install -g frictionless

Of course, you need to have [Node.js](https://nodejs.org) installed.

## Usage

Change to the directory of the project you want to check and enter

    frictionless

The tool's output may look like this:

![Console output with errors](https://raw.github.com/michel-kraemer/frictionless/gh-pages/failure.png)

If your project meets all requirements the output will look as follows:

![Console output without errors](https://raw.github.com/michel-kraemer/frictionless/gh-pages/success.png)

If you want to check a specific directory enter

    frictionless directory/to/check

To get help just enter

    frictionless --help

## Contributing

You've got an idea how to improve frictionless? Contributions are more than
welcome! See the [CONTRIBUTING](CONTRIBUTING.md) guide for more information.

## License

frictionless is released under the **MIT license**. See the [LICENSE](LICENSE)
file for more information.
