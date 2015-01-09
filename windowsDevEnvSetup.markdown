# PHP installation

1. Download the x86 distro of PHP for windows, from [windows.php.net](http://windows.php.net/download/)
2. Extract it to `c:\ProgramFiles\php-5.6.3`
3. Download and install the [VC redist for x86 platform](http://www.microsoft.com/en-us/download/details.aspx?id=30679)
4. Run `C:\ProgramFiles\php-5.6.3>php-cgi.exe -b 127.0.0.1:9000` and check that it works


# Apache HTTPD installation

1. Download the x86 version from [www.apachelounge.com/download](https://www.apachelounge.com/download) and extract to `c:\ProgramFiles\Apache24`
2. Download the x86 modules files from that same page, and extract `mod_fcgid.so` to `c:\ProgramFiles\Apache24\modules`
3. Open `conf/httpd.conf` and do the following changes:
    1. Update the `ServerRoot` declaration to `ServerRoot "c:/ProgramFiles/Apache24"`
    2. Add line `LoadModule fcgid_module modules/mod_fcgid.so` at the bottom of the `LoadModule` section
    3. Below it, add the following section:
    
            <IfModule fcgid_module>
            # Where is your php.ini file?
            FcgidInitialEnv PHPRC        "c:/ProgramFiles/php-5.6.3"
            <Files ~ (\.php)>
                AddHandler fcgid-script .php  
                FcgidWrapper "c:/ProgramFiles/php-5.6.3/php-cgi.exe" .php
                Options  ExecCGI
            </Files>
            </IfModule>

    4. Update the document root. To those 2 lines:
    
            DocumentRoot "c:/ProgramFiles/Apache24/htdocs"
            <Directory "c:/ProgramFiles/Apache24/htdocs">
        
        
# Testing PHP in Apache

1. Create `c:\ProgramFiles\Apache24\htdocs\test.php` with content:

        <?php
            phpinfo();
        ?>

2. Restart Apache: `C:\ProgramFiles\Apache24\bin>httpd.exe`
3. Access [http://localhost/test.php](http://localhost/test.php) and check that the page loads correctly


# Wordpress installation

1. Extract `wordpress-X.Y.Z.zip` to `c:\ProgramFiles\Apache24\htdocs`
2. Point Apache to the IDEA project by updating the document root to:
    
        DocumentRoot "c:/Pro/hoffice/website"
        <Directory "c:/Pro/hoffice/website">
    
3. Activate the MySQL extension for PHP: copy `php.ini-development` to `php.ini` and uncomment the following 2 lines:

        include_path = "."
        extension_dir = "ext"
        extension=php_mysql.dll

4. Increase the max size for file uploads:
    * Edit `php.ini` and set `upload_max_filesize = 7M`
    * In the Apache conf, add the following line in the `<IfModule fcgid_module>` section: `FcgidMaxRequestLen 7340032`.
        
5. Restart PHP: `php-cgi.exe -b 127.0.0.1:9000` and Apache.
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
    * "Tagline" to `Join our community of creators"
    * "Time Format" to "HH:mm"
2. In `Settings > Writing`, uncheck `Convert emoticons`, then save.


# Enabling permalinks

1. To avoid a global 403 Forbidden on the website when enabling permalinks, update the `Options` directive of `<Files ~ (\.php)>`, adding `FollowSymLinks`.
2. Update section `DocumentRoot` with `AllowOverride FileInfo`.
2. In `conf/httpd.conf`, uncomment `LoadModule rewrite_module modules/mod_rewrite.so`
3. In the Wordpress admin interface, navigate to `Settings > Permalinks` and enable permalinks.
4. Test that permalinks work by clicking on a post title.


# Enabling multisite

1. Follow the instructions at [codex.wordpress.org/Create-A-Network](http://codex.wordpress.org/Create_A_Network)
2. Add a new site with same title and `/en` URL.
3. Check that accessing both `http://localhost/en` and `http://localhost/en/wp-admin` work
4. Apply the same settings for this new site as in the `Wordpress settings` section above.
5. Enable permalinks on the new site, and verify that they work


# Add plugins

1. Hover `My Sites`, and click on `Network Admin > Plugins`, then `Add new`.

2. Search and install the following plugins:
    * Advanced Custom Fields
    * Disqus Comment System
    * JP Markdown

3. Network-activate them 3, and take the opportunity to delete `Akismet` and `Hello Dolly`.


# Add Hoffice theme

1. Create a zip file containing the source code of the Hoffice theme. At the root of that zip file should be the `hoffice` folder (and inside it all the files).
2. `Add New > Upload Theme` and upload the zip file.
3. Network-enable the theme.
4. Activate it in both sites.
