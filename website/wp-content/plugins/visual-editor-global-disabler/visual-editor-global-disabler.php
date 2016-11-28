<?php
/**
 * Plugin Name: Visual Editor Global Disabler
 * Plugin URI: https://github.com/PanzerKunst/wordpress-plugin-visual-editor-global-disabler
 * Description: This plugin totally disables the "Visual" tab for writing pages and posts inside the Wordpress admin UI
 * Version: 0.1.0
 * Author: Christophe Bram
 * Author URI: https://github.com/PanzerKunst
 * License: GPL V3
 */

defined('ABSPATH') or die('No script kiddies please!');

add_action( 'load-post-new.php', 'onNewPostPageLoaded' );
function onNewPostPageLoaded() {
    wp_enqueue_script( 'plugin_js', plugins_url( 'visual-editor-global-disabler.js', __FILE__ ) );
}

?>