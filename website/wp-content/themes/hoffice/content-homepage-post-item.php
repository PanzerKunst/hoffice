<?php
/**
 * @package Hoffice
 */
?>

--><li id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="entry-content">
        <?php
        switch (get_post_format()) {
            case "video":
                the_content();
                break;
            case false:
                $imageThumbnailField = get_field("thumbnail", get_the_ID());
                echo '<a href="' . esc_url(get_permalink()) . '" rel="bookmark">
                    <div class="menu-item-overlay"></div>
                    <img src="' . $imageThumbnailField["url"] . '"/>
                </a>';
                break;
        }

        wp_link_pages(array(
            'before' => '<div class="page-links">' . __('Pages:', 'hoffice'),
            'after' => '</div>',
        ));
        ?>
    </div><!-- .entry-content -->

    <header class="entry-header">
        <div>
            <?php
            $opening_wrapper_tag = '<a href="' . esc_url(get_permalink()) . '" rel="bookmark">';
            $closing_wrapper_tag = '</a>';

            if (get_post_format() === "video") {
                $opening_wrapper_tag = '';
                $closing_wrapper_tag = '';
            }

            the_title('<h2 class="entry-title">' . $opening_wrapper_tag, $closing_wrapper_tag . '</h2>'); ?>

            <div class="entry-meta">
                <?php hoffice_posted_on(); ?>
            </div><!-- .entry-meta -->
        </div>
        <div class="menu-item-overlay"></div>
    </header><!-- .entry-header -->
</li><!-- #post-## --><!--
