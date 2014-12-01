<?php

class Hoffice_Plugin {
	public function before_read_file_meta(&$headers) {
		$headers['header_image'] = 'HeaderImage';
	}
}

?>
