<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'AcB65oRo!F');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '3oY$G.)H@x$yzUlFP8i}c?:Z%f+]oV+h5~qfxU] <@QtkNSFuD^`8jMSh!(B|6t<');
define('SECURE_AUTH_KEY',  'U4Aiy7B0)[To,~K%hCiNUs2y NQAXD:lu+N-7ePIKWN9Z8GZod/HBEtIJbR.})%2');
define('LOGGED_IN_KEY',    'HG/Rka|2MW]1_v0&idevZhZ-Shu4GTn)lyP]T7]9D#=Y``v!WM fxF+zMcfB G6}');
define('NONCE_KEY',        'r#v63vLhkEWygoyl~%EEz:8^r}$Thc6kPDfG>]VL9NT}IIpxPy9R)o>ag/Qp#Qam');
define('AUTH_SALT',        'k46bm?h?&hjM_CYDz$b,20WJDJyay3)_vhRL#ZrMuZQD1>n.Zbsd|BMnX+4Y_pf/');
define('SECURE_AUTH_SALT', 'dbWRy,E2)25<(X0M-n*b$/svkr){$;+>>8#0H_aw,g%F+XE=hT eWEIt^`<#VGg,');
define('LOGGED_IN_SALT',   'a27ik|jvp|djyRaFzZEtfs_|/9&8KZaSCP<vdvKOU;4TqsvM|/4/xG.8pBnjW*64');
define('NONCE_SALT',       'vR;*F%VK.%wXE0f(u`fy1-</tmN~IRhpxzIHc+c&L.]*E~EErSi<%c_TqGVwyF+,');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* Multisite */
define( 'WP_ALLOW_MULTISITE', true );
define('MULTISITE', true);
define('SUBDOMAIN_INSTALL', false);
define('DOMAIN_CURRENT_SITE', '192.168.1.125');
define('PATH_CURRENT_SITE', '/');
define('SITE_ID_CURRENT_SITE', 1);
define('BLOG_ID_CURRENT_SITE', 1);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
