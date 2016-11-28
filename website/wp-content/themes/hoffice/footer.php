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
                    'theme_location'  => 'primary',
                    'container' => null
                )
            ); ?>
            <article>
                <label><?php insertLocalised("Kontakta oss", "Contact us"); ?></label>
                <div>
                    <a id="mail-to" href="mailto:info@hoffice.nu"><span class="glyphicon glyphicon-envelope"></span>info@hoffice.nu</a>
                </div>
            </article><!--
         --><article id="follow-us-wrapper">
                <label><?php insertLocalised("Följ oss", "Follow us"); ?></label>
                <div>
                    <a class="rss-feed" href="<?php bloginfo("rss2_url"); ?>"></a>
                    <a class="facebook" href="https://www.facebook.com/hoffice.nu" target="_blank"></a>
                </div>
            </article>
        </div>
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
