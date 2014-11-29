<?php

// toggle this to change the log config
define('DEV', false);

ini_set('display_errors', DEV ? 'On' : 'Off');
ini_set('ignore_repeated_errors', 'On');
ini_set("log_errors", 1);
ini_set("error_log", "c:/ProgramFiles/nginx-1.7.7/logs/php-error.log");


// Beginning of original Pico file

define('ROOT_DIR', realpath(dirname(__FILE__)) .'/');
define('CONTENT_DIR', ROOT_DIR .'content/');
define('CONTENT_EXT', '.md');
define('LIB_DIR', ROOT_DIR .'lib/');
define('PLUGINS_DIR', ROOT_DIR .'plugins/');
define('THEMES_DIR', ROOT_DIR .'themes/');
define('CACHE_DIR', LIB_DIR .'cache/');

require_once(ROOT_DIR .'vendor/autoload.php');
require_once(LIB_DIR .'pico.php');
$pico = new Pico();
