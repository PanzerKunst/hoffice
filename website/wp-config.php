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
define('DB_HOST', '8b.nu');

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
define('AUTH_KEY',         '|fXY-WJXmxvEpxSw6yRD9_VvbU}k.BF*=_A.xl3si-3]za>XVcgm{KuD_>dx4v/v');
define('SECURE_AUTH_KEY',  'fb+v{L3iTNalS+JfUI_N:vSqCzi/|8BB>DCL9#w@(S|}b3QW^G,+Ci_kHh8hLFzW');
define('LOGGED_IN_KEY',    'P7|(Cu_nJ#AR^|7Q@6]tv_!uly{bwed=;1J#y=*)U6P~v_F#8sYbN`{e<L:SX3!g');
define('NONCE_KEY',        '^z.Ut(wa*CAN+Ku?WKd/GV@aIyx8flLao@L.4a{o~@G<Tv{@!%waltNGll$^2Mdm');
define('AUTH_SALT',        'D(ts)K.ku$Eg|8(%^U<-)bB+R8Pll*0W(4DH#yg<:R3}]T[AxirgE=l<e)`42yMh');
define('SECURE_AUTH_SALT', ')l|Rlk&K=M8+JE.RS])n[z|6Dmq+~NW!^hM.^9`hLs7~zICi,aFJ$|),v>Uh9X>K');
define('LOGGED_IN_SALT',   '9sw^8%u4D$~~u7`(9F@Zw6-SML-_!$i8^O@jvVs?igHWBc/1%YQM52|K;@71=WF5');
define('NONCE_SALT',       '8Le.xrVw[+-/,%,*Eg^o._M79A}$!wk}L}D>32>&0>G}+Gdu(/R?rh8V3GAsx+?k');

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
