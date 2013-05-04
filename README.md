# Flipclock
#### Make a flipclock in your website, a javascript plugin for jquery.

## Demos & examples

See [http://particle4dev.github.io/flipclock], or the bundled `index.html` file.

## Source

[Download particle4dev/flipclock](https://github.com/particle4dev/flipclock)

## Features

  * asdhas
 

## Usage

1. Get [JQuery](http://jquery.com/). In these examples, we use [Google's AJAX Libraries API](http://code.google.com/apis/ajaxlibs/).


2. include jQuery and jquery.tweet.js files in your template's `<head>`.

        <script language="javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js" type="text/javascript"></script>
        <script language="javascript" src="/tweet/jquery.tweet.js" type="text/javascript"></script>

3. Also in `<head>`, Initialize tweet! on page load with your Username and other options

        <script type='text/javascript'>
            jQuery(function($){
                $(".tweet").tweet({
                    join_text: "auto",
                    avatar_size: 32,
                    count: 3,
                    loading_text: "loading tweets..."
                });
            });
        </script>

4. In `<body>`, include a placeholder for your tweets. They'll get loaded in via JSON. How fancy!

        <div class="tweet"></div>

5. Style with our stylesheet in `<head>`, or modify as you like!

        <link href="jquery.tweet.css" media="all" rel="stylesheet" type="text/css"/>


### Contribute

Bring your code slinging skills to Github and help us develop new features for tweet!

[Github project page](http://github.com/seaofclouds/tweet/)

    git clone git://github.com/seaofclouds/tweet.git

Report bugs at http://github.com/seaofclouds/tweet/issues

### Licensed under the MIT

[License text](http://www.opensource.org/licenses/mit-license.php)

<hr>

[![](http://api.coderwall.com/purcell/endorsecount.png)](http://coderwall.com/purcell)
