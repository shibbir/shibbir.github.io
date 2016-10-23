---
layout: post
title: "Beginning RequireJS"
date: 2013-01-19 20:04:00 +0600
tags: javascript
category: javascript
excerpt: জাভাস্ক্রিপ্ট এমন এক জিনিস যে প্রজেক্টের বয়স বাড়ার সাথে সাথে এটা ম্যানেজ করা কঠিন থেকে কঠিন হতেই থাকে। আবার অনেক সময় অনেক প্লাগইন ইউজ করতে হয়। তো এই যে আমরা এত এত প্লাগইন আমাদের প্রজেক্টে ইমপোর্ট করি বেশির ভাগ সময়ই দেখা যায় একটা জাভাস্ক্রিপ্ট লাইব্রেরি (প্লাগইন) আরেকটা লাইব্রেরির উপর নির্ভরশীল
---

জাভাস্ক্রিপ্ট এমন এক জিনিস যে প্রজেক্টের বয়স বাড়ার সাথে সাথে এটা ম্যানেজ করা কঠিন থেকে কঠিন হতেই থাকে। আবার অনেক সময় অনেক প্লাগইন ইউজ করতে হয়। তো এই যে আমরা এত এত প্লাগইন আমাদের প্রজেক্টে ইমপোর্ট করি বেশির ভাগ সময়ই দেখা যায় একটা জাভাস্ক্রিপ্ট লাইব্রেরি (প্লাগইন) আরেকটা লাইব্রেরির উপর নির্ভরশীল।

যেমন যদি আমাদের **myScript.js** নামে একটা কাস্টম ফাইল থাকে যেটাতে এই কোড আছেঃ

```javascript
$(function () {
     alert("document is loaded");
});
```

তো দেখা যাচ্ছে আমাদের এই কোডে [jQuery](http://jquery.com/) এর একটা ফাংশন আছে। এখন এই কোড ইউজ করতে হলে আমাদের jQuery লাইব্রেরি ইমপোর্ট করতে হবে। অনেকটা এরকমঃ

```html
<script src="http://code.jquery.com/jquery.min.js"></script>
<script src="myScript.js"></script>
```

এখানে গুরুত্তপূর্ন ব্যাপার হচ্ছে **jQuery** অবশ্যই **myScript.js** এর আগে ইমপোর্ট করতে হবে। কারন আমাদের কাস্টম ফাইল jQuery এর একটা ফাংশন ইউজ করছে। তাই আমরা যদি এদের অর্ডার চেঞ্জ করে দেই এভাবেঃ

```html
<script src="myScript.js"></script>
<script src="http://code.jquery.com/jquery.min.js"></script>
```

এখন আর আমাদের কোড কাজ করবে না। কারন **jQuery** পরে ইমপোর্ট করা হয়েছে। এখন ব্রাউজার কনসোল খুললে দেখা যাবে এই এরর দিচ্ছেঃ

```bash
ReferenceError: $ is not defined
```

তো দেখা যাচ্ছে আমাদের **myScript.js** সবসময় **jQuery** এর উপর নির্ভরশীল।

আবার যদি আমরা [BACKBONE](http://backbonejs.org/) ইউজ করতে চাই সেটা আবার [UNDERSCORE](http://underscorejs.org/) উপর নির্ভরশীল। আবার **UNDERSCORE** স্বয়ং **jQuery** এর উপর নির্ভরশীল।

এই সমস্যা সমাধানের উপায় হচ্ছে সবসময় যেই লাইব্রেরি আগে লোড হওয়া দরকার সেটা আগে লোড করা। কিন্তু যেহেতু আমাদের অনেক থার্ড পার্টি লাইব্রেরি প্রজেক্টে ইমপোর্ট করা লাগে, তাই কে কোন লাইব্রেরির উপর নির্ভরশীল তা মনে রাখা সবসময় সম্ভব হয় না। তাই আমাদের এমন কোন সল্যুশন দরকার যাতে করে আমরা ইচ্ছেমত লাইব্রেরি ইমপোর্ট করব কিন্তু আমাদের কখনই কে কার আগে লোড হবে এগুলা নিয়ে চিন্তা করা লাগবে না।

সমাধানঃ

[![requirejs](https://res.cloudinary.com/shibbir/image/upload/v1477255580/requirejs_b90gw1.png)](http://requirejs.org/)

[RequireJS](http://requirejs.org/) হচ্ছে এ সমস্যার অন্যতম একটি সমাধান। RequireJS এ আমরা শুধু একটা কনফিগার অপশন লিখব আর RequireJS নিশ্চিত করবে যে সকল লাইব্রেরি ঠিকভাবে লোড করা হয়েছে।

প্রথমে আমরা RequireJS ইমপোর্ট করবঃ

```html
<script src="require.js" data-main="main"></script>
```

এখানে `data-main` এ একটা ফাইলের নাম দেয়া আছে। অর্থাৎ main হচ্ছে **main.js**।
আর main.js এ নিচের কোড লিখবঃ

```javascript
// প্রথমে বলে দিতে হবে কোন কোন লাইব্রেরি লোড করতে হবে। ফাইল অর্ডারিং কোন ফ্যাক্ট না
requirejs.config({
     paths: {
          "jquery": "http://code.jquery.com/jquery.min"
           // এখানেও ফাইলের শেষে .js এক্সটেনশন দরকার নাই
     }
});
 
require(["jquery"], function ($) {
     // এখানে [] এর মধ্যে বলে দিতে হবে কোন কোন ফাইল লোড করা থাকতে হবে, যদি
     // একের অধিক ফাইল দরকার হয় তবে কমা সেপারেট করে বলে দিতে হবে।
     // যেমন- ["jquery", "otherFile"]. এখন নিচের কোড তখনই রান করবে
     // যখন [] এর ভিতরে যা উল্লেখ করা আছে তা লোড শেষ হবে
     $(function () {
          alert("document is loaded!");
     });
});
```

কমন কিছু কনফিগারেশনঃ

```text
baseUrl: // পথ সেট করে দেয়া যাবে যে requireJS কোন লোকেশনে ফাইল খুজবে।
         // যদি baseUrl সেট করা না হয় তবে ডিফল্ট ভ্যালু হবে যে পেজ এ requireJS
         // রেফার করা হয়েছে তার লোকেশন
 
paths: // ফাইল পথ বলে দিতে যেগুলো baseUrl এ থাকবেনা। যেমন- যদি কোন ফাইল
       // CDN থেকে রেফার করা হয় তবে ওই ফাইল অবশ্যই baseUrl এ খুজলে
       // পাওয়া যাবে না
 
waitSeconds: // স্ক্রিপ্ট লোড করার আগে requireJS কত সেকেন্ড অপেক্ষা করবে
 
scriptType: // স্ক্রিপ্ট টাইপ বলে দেয়া যাবে। ডিফল্ট হচ্ছে "text/javascript"
```

## AMD with RequireJS

এখন অনেক সময় কাজের সুবিদার্থে (কোড রি-ইউজ করা, কোড ক্লিন রাখা ইত্যাদি) আমাদের বিভিন্ন মডিউল তৈরি করা লাগে যেমন – কাস্টমার মডিউল, ইউজার মডিউল। এবার দেখব আমরা কিভাবে “AMD” প্যাটার্ন ফলো করে এই মডিউল গুলো তৈরি করে কাজ করব। [AMD (Asynchronous Module Definition)](https://en.wikipedia.org/wiki/Asynchronous_module_definition) হচ্ছে জাভাস্ক্রিপ্টে মডিউল তৈরি করার একটা পপুলার গাইডলাইন।

আমদের প্রজেক্টের ডিরেক্টরি স্ট্রাকচার হবে এরকমঃ

* index.html
* js
  * main.js
  * libs
    * jquery.js
    * require.js
    * underscore.js
    * backbone.js   
  * module // আমাদের মডিউল গুলো এখানে থাকবে
    * module1.js
    * module2.js

`index.html`:

```html
<!DOCTYPE html>
<html>
<head>
     <meta charset=utf-8 />
     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
 
     <title>AMD & RequireJS</title>
</head>
<body>
     <script src="js/libs/require.js" data-main="js/main"></script>
</body>
</html>
```

এবার আমরা একটা মডিউল তৈরি করব যার লোকেশন হবে **js/module/repository.js**:

```javascript
define("repository", function() {
     var customerData = [
          { id: 1, name: "Nina" },
          { id: 2, name: "Tina" },
          { id: 3, name: "Mina" }
     ];
 
     return {
          customerData: customerData
     };
});
```

এখানে, `define` মেথড দিয়ে মডিউল তৈরি করতে হয়। প্রথম প্যারামিটার হচ্ছে মডিউল এর নাম (যেমন আমাদের ক্ষেত্রে **repository**)। এটা অপশনাল। যদি না নেই তাহলে বাই ডিফল্ট ফাইলের নামটাই মডিয়ুলের নাম হবে। এটা তখনি দেয়া জরুরী যখন আমরা আরো অনেক ফাইল একসাথে কনক্যাট করে একটা ফাইল বানাব।

দ্বিতীয় প্যারামিটার হচ্ছে একটা অ্যারে যেটা আমরা দেই নাই। এই অ্যারেতে থাকবে এই মডিউল রান করার জন্য অন্য যেসব মডিউল বা লাইব্রেরি আমাদের দরকার। এটার উদাহরণ আমরা পরে দেখব।

শেষের প্যারামিটার হচ্ছে একটা কলব্যাক ফাংশন যেটার ভিতরে ওই মডিউলের কোড থাকবে।

এবার আমরা `main.js` এর ভিতর সবকিছু কনফিগার করব:

```javascript
requirejs.config({
     paths: {
          "jquery": "libs/jquery.min",
          "repository": "module/repository"
     },
     baseUrl: "js"
});
 
require(["jquery", "repository"], function ($, repo) {
     $(function () {
          var data = repo.customerData,
          output = [],
          k = 0;
 
          data.forEach(function (key) {
               output[k++] = "<p>";
               output[k++] = "Id: " + key.id + " | ";
               output[k++] = "Name: " + key.name;
               output[k++] = "</p>";
          });
          $("body").append(output.join(""));
     });
});
```

এখন ধরে নেই আমাদের কাস্টম মডিউল **repository** অন্য আরেকটা মডিউলের উপর নির্ভরশীল। যেটার নাম হচ্ছে **js/module/service.js**:

```javascript
define("service", function() {
     var orders = [
          { customerId: 1, orderId: "ORD101" },
          { customerId: 2, orderId: "ORD201" },
          { customerId: 3, orderId: "ORD301" }
     ];
 
     return {
          orders: orders
     };
});
```

এখন এই মডিউলটা আমরা আমাদের **repository** মডিউলে ব্যাবহার করব। প্রথমে আমাদের `main.js` ফাইলে **service** মডিউলের রেফারেন্স যোগ করবঃ

```javascript
requirejs.config({
     paths: {
          "jquery": "libs/jquery.min",
          "repository": "module/repository",
          "service": "module/service"
     },
     baseUrl: "js"
});
```

এরপর আমাদের **repository** মডিউলের `define` মেথডের দ্বিতীয় প্যারামিটারে আমাদের এই মডিউলের জন্য ডিপেন্ডেন্সি বলে দিব। এক্ষেত্রে সেটা হচ্ছে **service** মডিউলঃ

```javascript
define("repository", ["service"], function(service) {
     var customerData = [
          { id: 1, name: "Nina", orderId: service.orders[0].orderId },
          { id: 2, name: "Tina", orderId: service.orders[1].orderId },
          { id: 3, name: "Mina", orderId: service.orders[2].orderId }
     ];
 
     return {
          customerData: customerData
     };
});
```

## Loading Non AMD scripts

এবার আমরা দেখব কিভাবে স্ক্রিপ্ট লোড করব যেগুলো এমডি প্যাটার্ন ফলো করে তৈরি করা হয় নাই। আমরা এবার **Backbone** আমাদের প্রজেক্টে অ্যাড করব। **Backbone** হচ্ছে একটা পপুলার জাভাস্ক্রিপ্ট ফ্রেমওয়ার্ক। কিন্তু **Backbone** যেহেতু "AMD" না তাই আমাদের একটু কনফিগার করে নিতে হবেঃ

```javascript
requirejs.config({
     shim: {
          underscore: {
               exports: "_"
          },
          backbone: {
               exports: "Backbone",
               deps: ["underscore"]
          }
     },
     paths: {
          "jquery": "libs/jquery.min",
          "underscore": "libs/underscore-min",
          "backbone": "libs/backbone-min",
          "repository": "module/repository",
          "service": "module/service"
     },
     baseUrl: "js"
});
```

প্রথমে `paths` অবজেক্ট এর ভিতরে **Backbone** এবং **Underscore** ফাইলের লোকেশন বলে দিলাম। **Underscore** লোড করা দরকার কারন **Backbone** নিজেই এর উপর নির্ভরশিল। এরপর `shim` অবজেক্ট এর ভিতরে আমরা এগুলো লোড করলাম। লক্ষ্য করে দেখুন যে **Backbone** ডিফাইন করার সময় **Underscore** কে এর ডিপেন্ডেন্সি হিসাবে দেখান হয়েছে।

এখন আমরা **backbone** ইউজ করতে পারবঃ

```javascript
require(["jquery", "underscore", "backbone"], function ($, _, B) {
     console.log("Underscore Version: " + _.VERSION);
     console.log("Backbone Version: " + B.VERSION);
});
```

সব মিলিয়ে আমাদের `main.js` হবে এরকমঃ

```javascript
requirejs.config({
     shim: {
          underscore: {
               exports: "_"
          },
          backbone: {
               exports: "Backbone",
               deps: ["underscore"]
          }
     },
     paths: {
          "jquery": "libs/jquery.min",
          "underscore": "libs/underscore-min",
          "backbone": "libs/backbone-min",
          "repository": "module/repository",
          "service": "module/service"
     },
     baseUrl: "js"
});

require(["jquery", "repository"], function ($, repo) {
     $(function () {
          var data = repo.customerData,
              output = [],
              k = 0;
 
          data.forEach(function (key) {
               output[k++] = "<p>";
               output[k++] = "Id: " + key.id + " | ";
               output[k++] = "Name: " + key.name + " | ";
               output[k++] = "Order Id: " + key.orderId;
               output[k++] = "</p>";
          });
          $("body").append(output.join(""));
     });
});
 
require(["jquery", "underscore", "backbone"], function ($, _, B) {
     console.log("Underscore Version: " + _.VERSION);
     console.log("Backbone Version: " + B.VERSION);
});
```
