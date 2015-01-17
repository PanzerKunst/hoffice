# Raise the upload limit

`$ sudo vi /etc/nginx/nginx.conf`

Add `client_max_body_size 8M;` at the bottom of the Basic Settings section.

`$ sudo service nginx reload`

`$ sudo vi /etc/php5/fpm/php.ini`

Update to `upload_max_filesize = 7M`

`$ sudo service php5-fpm restart`


# File permissions

`$ sudo chown -R www-data /home/play/hoffice`
