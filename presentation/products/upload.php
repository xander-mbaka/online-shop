<?php

// A list of permitted file extensions
$allowed = array('png', 'jpg', 'gif');

if(isset($_FILES['product-image']) && $_FILES['product-image']['error'] == 0){

	$extension = pathinfo($_FILES['product-image']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}

	if(move_uploaded_file($_FILES['product-image']['tmp_name'], '../../assets/products/'.$_FILES['product-image']['name'])){
		echo '{"status":"success"}';
		exit;
	}
}

echo '{"status":"error"}';
exit;