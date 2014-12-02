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
define('DB_NAME', 'hoffice_wordpress');

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
define('AUTH_KEY',         'wHH0qRf5U^o/J^M|@9!N9i:B{wRe6Ynd=|$N%m*57$QPC.yC871m!^-Er<[7Zn ?');
define('SECURE_AUTH_KEY',  'zYOliS&j2kD@[%pjP=Dm2W)7js7pl6ua1E!?-g=R{(sSs*xN04vMi2qlE#Jp>A,y');
define('LOGGED_IN_KEY',    '>H1Y{Nz~W#wxfHIk~]tw;F]=X~If!>&NPO`6q,edMNh(@=xCSN/f_s$C.Wutw#k@');
define('NONCE_KEY',        '?Cv@(JqYnC7ozb{>We??oozYIyerZBv2}rFk7VB)LNs=7p <yP?n[yhm.S15U^s$');
define('AUTH_SALT',        'aPh;8EB!B7v6j4bSjDATzKTOK&gW4XZiI]QjY~R-+-Efw7<jaWi7)^L<;^)HnM<C');
define('SECURE_AUTH_SALT', ',hd_l$nz!K&*x[sPJnd+Z&_,SenI]aJQL?lL^Q9Mnsz)VAcxV^778?2>Oz?U,}dH');
define('LOGGED_IN_SALT',   '!.)]8427 f.pkU%ld4Ly|w<J[$T% VP*S(_N7Tfr)YZ)wkX%wF;tr89y%[pK/Lj@');
define('NONCE_SALT',       'n+~9C#~Qyi-sh=FHv9[W^M0A2aY:f#V/vJ9e(v}ZwGEpB?WrWk3MS7]2~!9G|Vac');

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
