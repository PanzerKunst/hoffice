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
define('AUTH_KEY',         '4Rh(jnO]zkbB PXt/w@R};3%Yr5kev`kqIpBAy_,p0Ck.BK#VDRT3%4yROyQ6%We');
define('SECURE_AUTH_KEY',  'x#C_o$bvo%q}1^ MXhW7| Wf*hl.*(e n1 BIyv]tqJ7C%Cuk[vTo$U:HzIgw?`X');
define('LOGGED_IN_KEY',    '3t.gfdUV9*5+AsQs?8[[42Ry:[)W?<Se_QurUY`deJT!P;D>9ZU.L@%>En1H*lMD');
define('NONCE_KEY',        'h04#;aLr1DWZPxeZH.wwj,NJFj-TcDwJe9kdsvYBU64u!k1Ev`s$Y/ 8Ovv&m<Qs');
define('AUTH_SALT',        '@+Rioy]]*NsgMQ~ $1%^,m#dYJ*c.|xY[TjW)#FC={SCsiH}.e/W5IY.&U2Z;<q;');
define('SECURE_AUTH_SALT', '`PM^P*ioj2C(]$#i2ZWCJ8Xe_-[%:S_)Px5%3].wI<s929SRURlrOxNMQe=zz2E]');
define('LOGGED_IN_SALT',   'fQN:MkJI<GEiHfFz@edVnlWjK^DVi^p`]A/Qw[M^Wv]xL7=6LhuO=Q^c?XlS5.T.');
define('NONCE_SALT',       '.N*XRni~C9#3o%=9yGQorT;^,K#m@Nt66t||kZk`M!JN-.KNUPUA>!CcqOCf*oQu');

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
