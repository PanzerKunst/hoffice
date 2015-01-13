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
define('AUTH_KEY',         '5RW+Uv)p=f.BE/ggE9hLwhcW?&j88:R}P?7VbuTY`ilKot,dMc1L~|$lh29opGzf');
define('SECURE_AUTH_KEY',  'Yn.pi8p%8~z/01-0zE&%EEsS3j4.LQYU[Qyz~W*9Yy>{&:S!mtF?k|W8RFEv<65c');
define('LOGGED_IN_KEY',    'V00jS,}*%i=9%R:&= O]H3_Iah:rJ>#-A~>85we5]4l,XNfr(*uMf7MxT(Q9Dt&}');
define('NONCE_KEY',        '~sh~Z({>~xtLhVEOPS.{!6sne]QjRD Q+gM6SDP[ESOTH^`) 0_mo,2<Tz3/B;Tm');
define('AUTH_SALT',        'k+S#H*T7/Z{ tzxX2}51.h*A.qHbtOQcLSQ4>&M{ohT( 1ie.7uDpVW?`^c3XD9)');
define('SECURE_AUTH_SALT', 'wKoG_8P9]7yPVERP1xv+/hT4#,HQy.(OqlgRJTGL^|g[Xgo= 95L)w$i%V>1o,BF');
define('LOGGED_IN_SALT',   '{?m[ion.PTM$b1s5H7A*!|!_/lu@sYhkWqEK~jPd;YUJH6`-Q +BXP]>dZn/Qup,');
define('NONCE_SALT',       'kJV>}B_/?cu],upb`-`e-t}=YY3/~.E)*g7>kA0qs=;@Z|aDVK-|Jqy7:EaCNgOm');

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
