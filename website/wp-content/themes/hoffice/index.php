<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package Hoffice
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

            <div id="content-header">
                <div>
                    <h1 class="entry-title"><?php bloginfo( 'description' ); ?></h1>
                    <div id="call-to-action">
                        <?php insertLocalisedCallToActionButton(); ?>
                    </div>
                </div>
            </div>

            <?php wp_nav_menu(
                array(
                    'theme_location'  => 'primary',
                    'walker' => new Walker_Index_Page_Menu(),
                    'menu_id' => 'index-menu-pages',
                    'link_before' => '<aside><h2>',
                    'link_after' => '</h2><div class="menu-item-overlay"></div></aside>',
                    'container_class' => 'index-menu-container',
                    'items_wrap' => '<ul id="%1$s" class="%2$s"><!--%3$s--></ul>'
                )
            ); ?>

            <?php if ( have_posts() ) : ?>

                <div class="index-menu-container posts">
                    <ul id="index-menu-posts" class="menu"><!--

                    <?php /* Start the Loop */ ?>
                    <?php while ( have_posts() ) : the_post(); ?>

                        <?php
                            /* Include the Post-Format-specific template for the content.
                             * If you want to override this in a child theme, then include a file
                             * called content-___.php (where ___ is the Post Format name) and that will be used instead.
                             */
                            get_template_part( 'content', 'homepage-post-item' );
                        ?>

                    <?php endwhile; ?>

                 --></ul>
                    <div>
                        <button id="show-more-posts">Show more blog posts</button>
                    </div>
                </div>

            <?php else : ?>

                <?php get_template_part( 'content', 'none' ); ?>

            <?php endif; ?>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>

<script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function () {
        CBR.Controllers.Index().run();
    });
</script>
