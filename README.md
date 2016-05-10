# jQuery Equal Heights

Ensures the elements matched are the height of the highest element.


## Usage

To get started you can either:

 - Clone the repo: `git clone https://github.com/nomensa/jquery.equal-heights.git`
 - Or install with Bower: `bower install jquery.equal-heights`

Then it's just a case of including the following scripts on your page, best at the bottom:

```html
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
  <script src="jquery.equal-heights.min.js"></script>
```


## Options & Defaults

### target

Type: `string`
Default: 'column-inner'
Description: The class name of the element to apply equal heights


## Public API

### Destroy

Description: Returns the DOM to it's original state


## Examples

### Example A: Specifying all options

```javascript
$(function() {
    $('.box').equalheights({
        target: '.column-inner'
    });
});
```


## Development

This plugin requires:

[node.js](http://nodejs.org/) `~0.10.x`
[Grunt](http://gruntjs.com/) `~0.4.0`
[jQuery](http://jquery.com) `~v1.9.x`

### Node
First time setup of this plugin will require the node packages to be installed. On Windows use the command prompt with Ruby or on a Mac use terminal, install the global node.js packages:

```bash
$npm install
```

### Grunt
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to install and use Grunt.

You will need to install the Grunt CLI (command line interface):

```bash
$ npm install -g grunt-cli
# => if you have used grunt before you probably have this (this can be run from any directory)
```

Next install the plugin's node packages:

```bash
$ npm install
```

### Watcher

Running grunt (with watcher) will watch for any changes and recompile - best used during development:

```bash
$ grunt
```


## Tested browsers

 - Firefox 3.5.19;
 - Firefox 23.0.1;
 - Google Chrome 29.0.1547.66;
 - Safari 5.1.7;
 - Internet Explorer 10;
 - Internet Explorer 9;
 - Internet Explorer 8;
 - Internet Explorer 7;
 - Opera 12.16.

Copyright &copy; 2014 [@nomensa](http://nomensa.com)

Licensed under [MIT](http://opensource.org/licenses/mit-license.php)
