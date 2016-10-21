---
layout: post
title: "Introduction to Webpack"
date: 2016-10-21 20:04:00 +0600
tags: webpack
category: javascript
excerpt: Webpack is a module bundler. Modules are like small chunk of code that can be reused or distributed among other projects. Most of the programming languages have some sort of features that offers a way to partition of code. Unfortunately, JavaScript doesn't have a built in module system, except for, distributing code over different files.
---

## Introduction

Webpack is a module bundler. Modules are like small chunk of code that can be reused or distributed among other projects. Most of the programming languages have some sort of features that offers a way to partition of code. Unfortunately, JavaScript doesn't have a built in module system, except for, distributing code over different files. But fortunately there are some standards available that we can use to create module in JavaScript.

Some standards to define module in JavaScript:

* CommonJS: A synchronous way to load modules. Node.js uses this module system.
* AMD(Asynchronous Module Definition): RequireJS is the most popular implementation.
* ES6 modules

## Why Webpack
Webpack supports all those module systems. By using webpack, developer can choose their favorite module system. Webpack also makes it easy to add custom module styles. Webpack can also replace grunt/gulp as your only build tool. It also has [Code Splitting](http://webpack.github.io/docs/code-splitting.html) feature which is very cool.

## Lets get started

Lets say we have two JavaScript module in our application and we want to load those in correct order. We want module1.js to be loaded first and then we want to load module2.js. We will do something similar to this:

`index.html`
```html
<!DOCTYPE html>
<html>
<body>
    <script src="module1.js"></script>
    <script src="module2.js"></script>
</body>
</html>
```

`module1.js`
```javascript
console.log('This is module 1');
```

and `module2.js`
```javascript
console.log('This is module 2');
```

The problem is we are making two HTTP request to load those two modules. Also those modules can have their own dependencies to other modules and we also want them to load in a correct order. This is where we would normally use a build tool like gulp or grunt to bundle those modules in a single file. However, in this case we will use webapck to do the bundling for us.

So we want a single entry file that will eventually load other modules in a correct order.

Lets call that single entry file as `app.js` that **requires** module1 and module2

```javascript
require('./module1.js');
require('./module2.js');
```

and we need to reference `app.js` in our page that will eventually load module1 and module2:

```html
<!DOCTYPE html>
<html>
<body>
    <script src="app.js"></script>
</body>
</html>
```

Now, if you run this in browser you will see `Uncaught ReferenceError: require is not defined` error in your browser development console. That's because if you look at `app.js`, we loads module1 and module2 using CommonJS style which is not supported in browser. It only works in Node.js environment. This is the place where we need to use webpack so that it will transform/bundle those modules in a way that browser can understand.

## Installing Webpack

Webpack is available through **NPM**. To get NPM you need to have [node.js](https://nodejs.org/en/) installed in your machine.

After installing node.js, now we need a `pacakge.json` file. open your terminal and type:

```bash
npm init --yes
```

This will generate a `package.json` file with some default configurations.

Now install webpack globally and also as your development dependency:

```bash
npm install -g webpack
npm install -D webpack
```

Now, lets bundle those modules by simply writing this:

```bash
webpack ./app.js app.bundle.js
```

So we tell webpack what is our source file and also the destination file. You will webpack creates a `app.bundle.js` in your project root (this is also configurable).

![]({{site.url}}/assets/img/2016/10/webpack-1.PNG)

Finally we have to reference `app.bundle.js` in html:

```html
<!DOCTYPE html>
<html>
<body>
    <script src="app.bundle.js"></script>
</body>
</html>
```

## Getting Real

We only see how we can bundle modules. Webpack has much more advanced features. Almost everything is customizable. To gain access to those features we need a `webpack.config.js` configuration file that instructs webpack how to behave. Then we can simply run `webpack` command in the terminal and webpack will execute the instructions from the config file.

```javascript
module.exports = {
    entry: './app.js',
    output: {
        filename: 'app.bundle.js'
    }
};
```
The above code is same as running `webpack ./app.js app.bundle.js`, but as you can see this is much more expressive than using the command line.

## Using plugins

Plugins add functionality typically related to bundles in webpack. We use plugins using the plugins property in the webpack config.


```javascript
var webpack = require('webpack');

module.exports = {
    entry: './app.js',
    output: {
        filename: 'app.bundle.js'
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ]
};
```

Webpack came with some built in plugins. Here we are using `DedupePlugin` and `UglifyJsPlugin` plugin. You can find a list of plugins [here](http://webpack.github.io/docs/list-of-plugins.html). If your run `webpack` command again you will see `app.bundle.js` is now minified.

## Multiple entry points

One of the selling point of webpack is the ability to split your code into multiple chunks. This can keep the initial download small and downloads code on demand when requested by the application. To
