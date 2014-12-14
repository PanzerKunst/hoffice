<?php
/**
 * @package Hoffice
 */
?>

--><li id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="entry-content">
        <?php the_content(); ?>
        <?php
        wp_link_pages( array(
            'before' => '<div class="page-links">' . __( 'Pages:', 'hoffice' ),
            'after'  => '</div>',
        ) );
        ?>
    </div><!-- .entry-content -->

    <header class="entry-header">
		<?php the_title( '<h2 class="entry-title">', '</h2>' ); ?>

		<div class="entry-meta">
			<?php hoffice_posted_on(); ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->

	<footer class="entry-footer">
		<?php hoffice_entry_footer(); ?>
	</footer><!-- .entry-footer -->
</li><!-- #post-## --><!--
