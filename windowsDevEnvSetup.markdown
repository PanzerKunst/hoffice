# PHP installation

1. Download the x86 non-TS distro of PHP for windows, from [windows.php.net](http://windows.php.net/download/)
2. Extract it to `c:\ProgramFiles\php-5.6.3`
3. Download and install the [VC redist for x86 platform](http://www.microsoft.com/en-us/download/details.aspx?id=30679)
4. Run `C:\ProgramFiles\php-5.6.3>php-cgi.exe -b 127.0.0.1:9000` and check that it works


# XDebug installation

1. Download the x86 non-TS version of XDebug, from [www.xdebug.org/download.php](http://www.xdebug.org/download.php)
2. Extract the DLL to `c:\ProgramFiles\php-5.6.3\ext`

3. Open `php.ini`, and add the following below the extensions section:

        [XDebug]
        zend_extension="php_xdebug-2.2.6-5.6-vc11-nts.dll"

4. Restart PHP, open the test.php page in a browser and check that the XDebug extension is loaded.

5. Integrate with IntelliJ IDEA by following [these steps](https://www.jetbrains.com/idea/help/topicId318.html#d117177e294)


# Nginx installation

1. Download and extract to `c:\ProgramFiles\nginx-1.7.7`

2. Open `conf/nginx.conf` and do the following changes:
    1. Uncomment lines in section `# pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000`
    2. Update the `fastcgi_param` line with: `fastcgi_param  SCRIPT_FILENAME  c:/ProgramFiles/nginx-1.7.7/html/$fastcgi_script_name;`
    3. Update the `location /` block nested in the uncommented `server {` line from `index  index.html index.htm;` to `index  index.php index.html index.htm;`

3. Launch the Nginx server (C:\ProgramFiles\nginx-1.7.7> nginx) and check that there are no errors in `c:\ProgramFiles\nginx-1.7.7\logs\error.log`
        
        
# Testing PHP

1. Create `c:\ProgramFiles\nginx-1.7.7\html\test.php` with content:

        <?php
            phpinfo();
        ?>

3. Restart Nginx: `nginx -s reload`
4. Access [http://localhost/test.php](http://localhost/test.php) and check that the page loads correctly


# Wordpress installation

1. Extract `wordpress-X.Y.Z.zip` to `c:\ProgramFiles\nginx-1.7.7\html`

2. To point to the IDEA project:
    * Change the `root` directive inside the `location /` block to `root   c:/Pro/hoffice/website;`
    * Change the `root` directive inside the `location ~ \.php$` block to `root           c:/Pro/hoffice/website;`
    * Change the `fastcgi_param` directive inside the `location ~ \.php$` block to `SCRIPT_FILENAME  c:/Pro/hoffice/website/$fastcgi_script_name;`
    
3. Activate the MySQL extension for PHP: copy `php.ini-development` to `php.ini` and uncomment the following 2 lines:

        include_path = "."
        extension_dir = "ext"
        extension=php_mysql.dll

4. Increase the max size for file uploads:
    * Edit `php.ini` and set `upload_max_filesize = 7M`
    * Edit `nginx.conf` and set add `client_max_body_size 8m;` (same as PHP's `post_max_size`) in the `http` section.
        
5. Restart PHP: `php-cgi.exe -b 127.0.0.1:9000` and Nginx: `nginx -s reload`

6. Create DB on server and allow external access:

        $ mysql -u root -p
        > CREATE DATABASE `hoffice_wordpress` CHARACTER SET utf8 COLLATE utf8_swedish_ci;
        > GRANT ALL ON `hoffice_wordpress`.* TO `root`@'%' IDENTIFIED BY 'AcB65oRo!F';
        > FLUSH PRIVILEGES;

6. Update `my.cnf` to allow remote access: `sudo vi /etc/mysql/my.cnf` then add a new `bind-address` line: `bind-address = 188.40.99.15`.
7. `sudo service mysql restart`
8. Run Wordpress installation by accessing [http://localhost](http://localhost)


# Wordpress settings

1. Inside the Wordpress admin UI, click on `Settings > General` and update the following fields:
    * "Tagline" to `Gå med i vår gemenskap av skaparna`
    * "Time Format" to "HH:mm"

2. In `Settings > Writing`, uncheck `Convert emoticons`, then save.


# Permalinks

1. In the Wordpress admin interface, navigate to `Settings > Permalinks` and enable permalinks (Custom Structure: `/blog/%postname%/`).
2. Test that permalinks work by clicking on a post title.


# Plugins

1. Search and install the following plugins:
    * Advanced Custom Fields
    * Disqus Comment System
    * JP Markdown
    * Polylang

2. Activate all 4, and take the opportunity to delete `Akismet` and `Hello Dolly`.


# Hoffice theme

1. Create a zip file containing the source code of the Hoffice theme. At the root of that zip file should be the `hoffice` folder (and inside it all the files).
2. `Add New > Upload Theme` and upload the zip file.
3. Activate it.


# Polylang

1. Go to `Settings > Languages` and add Swedish with order 1.
2. Add English with order 2.
3. Click on the "Strings translation" tab and update the English tagline to `Join our community of creators`
4. Save changes.
5. Click on the "Settings" tab, and check `There are posts, pages, categories or tags without language set. Do you want to set them all to default language ?`
6. Save changes.


# Primary menus

1. Open `Appearance > Menus`, remove `Home` from the menu, rename it to "Menu SV" and click on the `Create Menu` button.
2. Once created, click on the `Manage Locations` tab and select it as the primary menu for Swedish.
3. Do similarly for the English menu, adding pages written in English.


# Sidebar

1. Open `Appearance > Widgets`.
2. Add `Language Switcher`, remove everything else, and save.


# Custom fields

1. On the admin of the main site, add a new field group named "All", with location rules `Post Type is equal to post and Post Format is equal to Standard, or Post Type is equal to page`.

2. Add the header image field, with the following properties:
    * Field Label: `Header image`
    * Field Name: `header_image`
    * Field Type: `Image`
    * Field Instructions: `Must be 4/3 format. Ideally no less than 1920px wide, and ideally no much more than that either.`
    * Required: `Yes`

3. Add the thumbnail field, with the following properties:
    * Field Label: `Thumbnail`
    * Field Name: `thumbnail`
    * Field Type: `Image`
    * Field Instructions: `Must be exactly 448 * 336px (that's a 4/3 format).`
    * Required: `Yes`

4. Publish.
5. Update pages and posts


# Disqus

Go to `Comments > Disqus` and follow the instructions.