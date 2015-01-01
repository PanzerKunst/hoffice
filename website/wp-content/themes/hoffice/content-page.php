<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package Hoffice
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <?php $imageField = get_field("header_image", get_the_ID()); ?>
    <header id="content-header" class="entry-header" style="background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(<?php echo $imageField["url"]; ?>)">
        <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
    </header><!-- .entry-header -->

	<div class="entry-content hoffice-page-content">
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'hoffice' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<footer class="entry-footer">
		<?php edit_post_link( __( 'Edit', 'hoffice' ), '<span class="edit-link">', '</span>' ); ?>
	</footer><!-- .entry-footer -->
</article><!-- #post-## -->
