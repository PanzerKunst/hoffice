<?php
/**
 * @package Hoffice
 */
?>

--><li id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
		<?php the_title( '<h2 class="entry-title">', '</h2>' ); ?>

		<div class="entry-meta">
			<?php hoffice_posted_on(); ?>
		</div><!-- .entry-meta -->
	</header><!-- .entry-header -->
</li><!-- #post-## --><!--
