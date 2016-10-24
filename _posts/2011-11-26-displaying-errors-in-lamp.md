---
layout: post
title: "Displaying PHP Errors on LAMP Server"
date: 2011-11-26 20:04:00 +0600
tags: php
category: php
excerpt: By default the LAMP server doesn't display any error if there are errors in your php file. It just shows a blank page. That means you cannot see in which line the error is occurred. Hopefully, you can enable the error display option easily
---

By default the LAMP server doesn't display any error if there are errors in your php file. It just shows a blank page. That means you cannot see in which line the error is occurred. Hopefully, you can enable the error display option easily.

You'll need to modify PHP's initialization file called `php.ini`. So, just open it:
    
```bash
sudo nano /etc/php5/apache2/php.ini
```

find the lines:

```text
; This directive controls whether or not and where PHP will output
;errors, notices and warnings too. Error output is very useful during
; development, but it could be very dangerous in production
; environments. Depending on the code which is triggering the error,
; sensitive information could potentially leak out of your application ;
such as database usernames and passwords or worse. It's
; recommended that errors be logged on production servers
; rather than having the errors sent to STDOUT.
; Possible Values:
; Off = Do not display any errors
; stderr = Display errors to STDERR (affects only CGI/CLI binaries!)
; On or stdout = Display errors to STDOUT
; Default Value: On
; Development Value: On
; Production Value: Off
; http://php.net/display-errors display_errors = Off
display_errors = Off
```

Now, you have to change the last line like this:

```text
display_errors = on
```

Save the file and restart the apache server:

```bash
sudo /etc/init.d/apache2 restart
```

Now, you can see the errors of your php file if there any error exists.
