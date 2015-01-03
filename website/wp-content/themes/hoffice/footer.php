<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Hoffice
 */
?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer" role="contentinfo">
        <div>
            <?php wp_nav_menu(
                array(
                    'theme_location' => 'primary',
                    'walker' => new Walker_Header_Menu_Page_Menu(),
                    'container' => null
                )
            ); ?>
            <a id="mail-to" href="mailto:info@hoffice.nu"><span class="glyphicon glyphicon-envelope"></span>info@hoffice.nu</a>
            <?php echo '<a class="rss-feed" href="' . get_site_url() . '/feed" target="_blank"></a>' ?>
            <a class="facebook" href="https://www.facebook.com/hoffice.nu" target="_blank"></a>
        </div>
		<!-- div class="site-info">Wordpress website made by <a href="http://www.8b.nu">8b</a>, Stockholm Sweden.</div --><!-- .site-info -->
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

<!-- FastClick init -->
<script>
    window.addEventListener('load', function() {
        FastClick.attach(document.body);
    }, false);
</script>

</body>
</html>
