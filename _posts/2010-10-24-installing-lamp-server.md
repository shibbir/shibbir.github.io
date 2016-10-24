---
layout: post
title: "Installing Lamp Server"
date: 2010-10-24 20:04:00 +0600
tags: php
category: php
excerpt: In this post we will see how we can install lamp server which is a web service solution stacks for developing php application in ubuntu
---

প্রথমে ল্যাম্প সার্ভার ডাউনলোড করতে হবে। টার্মিনাল খুলে নিচের কমান্ড রান করুনঃ

```bash
sudo apt-get install lamp-server^
```

ইন্সটলের সময় রুট ইওজারের জন্য MySQL ডাটাবেসের পাসওয়ার্ড চাইবে। পাসওয়ার্ড দেয়া হলে বাকি ইন্সটলেশন শেষ হবে।

## এপাচি টেস্ট

এবার এপাচি টেস্ট করার জন্য ওয়েব ব্রাউজার খুলে `http://localhost/` লিখে এন্টার দিতে হবে। সবকিছু ঠিক থাকলে “It Works!” দেখা যাবে।

## পিএইচপি টেস্ট

এবার PHP টেস্ট করার জন্য **hello.php** নামে একটা ফাইল বানাতে হবে **/var/www** -তে। এখন টার্মিনাল ওপেন করুন এবং নিচের কোডটি রান করুন।

```bash
sudo nano /var/www/hello.php
```

এবার `<?php phpinfo(); ?>` লিখে সেভ করতে হবে। এবার এপাচি পুনরায় চালু করতে হবে নিচের কমান্ডের সাহায্যেঃ

```bash
sudo /etc/init.d/apache2 restart
```

এখন ব্রাউজারে **http://localhost/testing.php/** লিখে এন্টার দিলে পিএইচপি সংক্রান্ত ইনফরমেশন দেখা যাবে।

## মাইএসকিউএল কনফিগার

আপনি যে পিসিতে কাজ করছেন তার ip address ডিফল্ট 127.0.0.1 দেয়া আছে। এটা ভেরিফাই করার জন্য টার্মিনালে নিচের কোড দুটি পরপর রান করতে হবেঃ

```bash
cat /etc/hosts | grep localhost
 
cat /etc/mysql/my.cnf | grep bind-address
```

এবার নিচের মত করে আউটপুট দেখা যাবেঃ

```bash
bind-address        = 127.0.0.1
```

## ইন্সটল পিএইচপিমাইএডমিন

নিচের কোডটি রান করুনঃ

```bash
sudo apt-get install libapache2-mod-auth-mysql phpmyadmin
```

এবার আপনাকে ওয়েব সার্ভার সিলেক্ট করতে বলা হবে। অবশ্যই আপনাকে **apache2** সিলেক্ট করতে হবে। এরপরে বাকি ইন্সটলেশন শেষ হবে। এখানে আপনাকে রুট পাসওয়ার্ড দেয়া লাগবে।

HAPPY PHPying :)
