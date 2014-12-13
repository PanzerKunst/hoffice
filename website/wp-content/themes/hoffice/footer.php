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
		<div class="site-info">Made by <a href="http://www.8b.nu">8b</a>, Stockholm Sweden.</div><!-- .site-info -->
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
