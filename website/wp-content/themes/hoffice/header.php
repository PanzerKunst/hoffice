<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package Hoffice
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11">
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page" class="hfeed site">
	<a class="skip-link screen-reader-text" href="#content"><?php _e( 'Skip to content', 'hoffice' ); ?></a>

	<header id="masthead" class="site-header" role="banner">
		<div class="site-branding">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">
                <?php
                    $opening_wrapper_tag = "";
                    $closing_wrapper_tag = "";

                    if(is_home()) {
                        $opening_wrapper_tag = "<h1>";
                        $closing_wrapper_tag = "</h1>";
                    }
                    echo $opening_wrapper_tag . get_bloginfo( 'name' ) . $closing_wrapper_tag;
                ?>
            </a>
            <button class="styleless"></button>
		</div><!-- .site-branding -->
	</header><!-- #masthead -->

    <nav id="header-menu">
        <!-- Pages -->
        <section id="header-menu-pages">
            <h2>Pages</h2>
            <?php wp_nav_menu(
                array(
                    'theme_location' => 'primary',
                    'walker' => new Walker_Header_Menu_Page_Menu(),
                    'container' => null
                )
            ); ?>
        </section>

        <!-- Posts -->

        <section id="header-menu-posts">
            <h2>Blog posts</h2>
            <ul class="menu">
                <?php foreach(get_posts() as $post) {
                    insertPostMenuItem($post);
                }
                ?>
            </ul>
        </section>
    </nav>

	<div id="content" class="site-content">
