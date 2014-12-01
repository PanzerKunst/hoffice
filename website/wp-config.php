<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'hoffice-wordpress');

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
define('AUTH_KEY',         'BD6YFj?@?x2{_3|kB`=X1DNQ^Z?:TDxX<6xpW6Qfi@CF@gSk[S/*2,U;/>AG{}|P');
define('SECURE_AUTH_KEY',  'aUiwozff|(ipJK7AcRv$a/.;+}2-Ag|Y;i{dE&}*|WGk1$]l)6v]{&$8f=*0TPC#');
define('LOGGED_IN_KEY',    '-SzK.NO},l4VtDMS:u>RB;bUTr;:wdA%[%G_@Y1UgCpb$TIG$E:ao})/vT[ mNtQ');
define('NONCE_KEY',        ',{<s#Or!%x/d}Q<tUhR&y2J>}3/,vCgU>Tc@M06DA__-E3z~r2uw#cA01)S02:;f');
define('AUTH_SALT',        'Z8V8.XTRZ1S+qSLdGbzmTM|MF&GFm2iz=$tpkz{|jBH/2Dc:;a@mOW<*^Mo}#3vR');
define('SECURE_AUTH_SALT', 'b r3!y}!/hk#=+[Y8Zj}.s%;<eU]Y*Tp6h{x-&e}4R$ouBmPn^ M87@ DT0U~%>S');
define('LOGGED_IN_SALT',   '_(DDjleP;uVG]%G9S!W=EyHPMWX$lNa1<8XH;}q|BvBc-Awp/v4?H u!0EzdV^,}');
define('NONCE_SALT',       'd]&QIC1,r,&GG;%6k8Ah>Ww.jug6x%.!WCF7/P uYJUwJF}=0f@d~yZ;!I2/.fw,');

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

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
