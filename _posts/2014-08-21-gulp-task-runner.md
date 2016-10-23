---
layout: post
title: "Gulp task runner"
date: 2014-08-21 20:04:00 +0600
tags: gulp
category: javascript
excerpt: Gulp is a task runner or build tool for web development. When working on a javascript projects, quite often we have to do some repetitive tasks such as minifying the css or javascript, concatenating them into one file to reduce the HTTP round trip between server to the client browser, optimizing images, running the tests etc
---

[Gulp](http://gulpjs.com/) is a task runner or build tool for web development. When working on a javascript projects, quite often we have to do some repetitive tasks such as minifying the css or javascript, concatenating them into one file to reduce the HTTP round trip between server to the client browser, optimizing images, running the tests etc. Depending on the size of the projects, managing those tasks can be very time consuming and tedious. But with the help of a task runner like Gulp.js, you can really automate this whole process and just focus on the application.

## Installing Gulp

Gulp is based on Node.js. You can install it via node package manager (npm). To get **npm** you have to install **node.js** in your machine. Simply go to [https://nodejs.org/](https://nodejs.org/) and install it if you haven't already.

```bash
npm install -g gulp-cli
```

## Integrate Gulp in your project

Now we need to install gulp as our project dependency. Inside your project root directory create a **package.json** file by issuing:

```bash
npm init --yes
```

That will create a `package.json` file with defaults and not prompt you for any options.

Now install gulp as your development dependency:

```bash
npm install gulp --save-dev
```

After the download is finished, you will see that the package.json will contain something like this:

```json
{
  "devDependencies": {
    "gulp": "^3.8.7"
  }
}
```
Now the way gulp work is each task is separated through modules. so each module does exactly one task. for example to minify css we can install the **gulp-minify-css** plug-in:

```bash
npm install gulp-minify-css --save-dev
```

## Working with Gulp

Lets create a css file, for example **site.css**

```css
#container {
   color: green;
}
```

We will create a task to minify this file. Gulp tasks are reside in a **gulpfile.js**. Let’s create that file:

```javascript
var gulp      = require("gulp"),
    minifycss = require("gulp-minify-css");

gulp.task("css", function() {
    return gulp.src("css/site.css")
        .pipe(minifycss())
        .pipe(gulp.dest("build/css"));
});
```

First we brought in the required packages. In this case **gulp** and **gulp-minify-css**.

Next, we created a task called "css". Inside that task we told gulp what is the file path for our css that we want to minify (you can certainly specify multiple files). Than we minify the css file using the `minifycss()` method that **gulp-minify-css** plugin provides.

Finally we specify the destination directory for our minified file. You can see that we can chain methods together to describe our tasks (much like **jQuery**).

## Running Gulp

Open your terminal and type:

```bash
# Syntax: gulp <task_name>
gulp css
```

Gulp will go through the `gulpfile.js` file and find the "css" task and run that task.

Now if you open **build/css** directory you will see a file site.css which contains the minified css. Like so:

```css
#container{color:green;}
```

You can also make a default task which may contain multiple tasks. for example:

```javascript
gulp.task("default", ["task_1", "task_2", "task_3"]);
```

The benefit of this is now instead of calling `gulp task_1` or `gulp task_2`, you can simply call gulp. That will trigger the default task and run all the tasks that are specified in that task.

You can also **watch** specific files so that you don’t have to manually run gulp each time your source files change. lets create a task for that:

```javascript
gulp.task("watch", function() {
    gulp.watch("css/site.css", ["css"]);
});
```
Now simply run gulp watch. Now gulp will automatically trigger "css" task that we defined earlier whenever you change our source css file.

## Real world example
Lets create a real world example. We will minify, concat our css and js files and also compress our image files. Our directory structure will look like this:

![before-gulp](https://res.cloudinary.com/shibbir/image/upload/q_100/v1477222564/before-gulp_y9nznh.png)

First, lets download the necessary packages we need for this particular scenario:

```bash
npm install -D gulp gulp-minify-css gulp-concat gulp-imagemin gulp-rename gulp-uglify del
```

Lets edit the gulpfile.js:

```javascript
var gulp      = require("gulp"),
    del       = require("del"),
    uglify    = require("gulp-uglify"),
    concat    = require("gulp-concat"),
    rename    = require("gulp-rename"),
    imagemin  = require("gulp-imagemin"),
    minifycss = require("gulp-minify-css");

var paths = {
    css: {
        site: [
            "css/vendor/foundation.css",
            "css/style.css"
        ]
    },
    scripts: {
        vendors: [
            "js/vendor/jquery.js",
            "js/vendor/toastr.js"
        ],
        app: [
            "js/customerModule.js",
            "js/productModule.js"
        ]
    },
    images: "img/**/*"
};

var css = function(path, outputFileName, destination) {
    destination = destination || "build/css";

    return gulp.src(path)
        .pipe(concat(outputFileName))
        .pipe(gulp.dest(destination))
        .pipe(rename({ suffix: ".min" }))
        .pipe(minifycss())
        .pipe(gulp.dest(destination));
};

var scripts = function(path, outputFileName, destination) {
    destination = destination || "build/js";

    return gulp.src(path)
        .pipe(concat(outputFileName))
        .pipe(gulp.dest(destination))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest(destination));
};

gulp.task("Clean", function(cb) {
    del(["build"], cb);
});

gulp.task("Images", ["Clean"], function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest("build/img"));
});

gulp.task("VendorScripts", ["Clean"], function() {
    return scripts(paths.scripts.vendors, "vendor.js");
});

gulp.task("AppScripts", ["Clean"], function() {
    return scripts(paths.scripts.app, "app.js");
});

gulp.task("SiteCSS", ["Clean"], function() {
    return css(paths.css.site, "site.css");
});

gulp.task("Watch", function() {
    gulp.watch(paths.scripts.app, ["AppScripts"]);
    gulp.watch(paths.css.site, ["SiteCSS"]);
    gulp.watch(paths.images, ["Images"]);
});

gulp.task("default", ["Watch", "SiteCSS", "Images", "VendorScripts", "AppScripts"]);
```

Here, we’ve two function css and scripts for some code re-usability. Both function accepts three parameter

```
path           = what is file path for the source files
outputFileName = name of the final output file
destination    = destination path for final resulted file
```

All of the plug-ins used here are self-explanatory. We have used the "del" plug-in so that on each gulp run it will delete the whole build directory. We have also create a default task that will trigger the others tasks. Now just run:

```bash
gulp
```

Now, lets check the solution directory again:
![after-gulp](https://res.cloudinary.com/shibbir/image/upload/q_100/v1477222564/after-gulp_drwfxr.png)

You can see that gulp has created a build directory and inside that it creates both css and js directory with both minified and unminified files. Also creates a img folder that contains the compressed images.

## Wrap up

Easy, right? Although we've gone through only the basics of Gulp. Gulp can do much more than this and can be very complex or very simple depending on the project.

#### Here some of the useful gulp plugins for your next project:
* [gulp-util](https://www.npmjs.com/package/gulp-util)
* [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
* [gulp-concat](https://www.npmjs.com/package/gulp-concat)
* [gulp-rename](https://www.npmjs.com/package/gulp-rename)
* [gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
* [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)
