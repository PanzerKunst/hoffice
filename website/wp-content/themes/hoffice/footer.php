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
                    'container' => null
                )
            ); ?>
            <article>
                <label>Contact us</label>
                <div>
                    <a id="mail-to" href="mailto:info@hoffice.nu"><span class="glyphicon glyphicon-envelope"></span>info@hoffice.nu</a>
                </div>
            </article><!--
         --><article id="follow-us-wrapper">
                <label>Follow us</label>
                <div>
                    <?php echo '<a class="rss-feed" href="' . get_site_url() . '/feed" target="_blank"></a>' ?>
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
