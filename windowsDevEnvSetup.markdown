# PHP installation

1. Download the x86 distro of PHP for windows, from [windows.php.net](http://windows.php.net/download/)
2. Extract it to `c:\ProgramFiles\php-5.6.3`
3. Download and install the [VC redist for x86 platform](http://www.microsoft.com/en-us/download/details.aspx?id=30679)
4. Run `C:\ProgramFiles\php-5.6.3>php-cgi.exe -b 127.0.0.1:9000` and check that it works


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

4. Restart PHP: `php-cgi.exe -b 127.0.0.1:9000` and Nginx: `nginx -s reload`
5. Reload [http://localhost](http://localhost)
6. Hide warnings from the web page: edit `website/index.php` and add the following lines at the top:

        // toggle this to change the log config
        define('DEV', true);
        ini_set('display_errors', DEV ? 'On' : 'Off');
        ini_set('error_reporting', DEV ? 'E_ALL & ~E_WARNING' : 'E_ALL & ~E_WARNING & ~E_DEPRECATED & ~E_STRICT');
        ini_set('ignore_repeated_errors', 'On');
        ini_set("log_errors", 1);
        ini_set("error_log", "d:/ProgramFiles/nginx-1.7.7/logs/php-error.log");
