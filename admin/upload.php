<?php

// A list of permitted file extensions
$allowed = array('png', 'jpg', 'gif','zip');

if(isset($_FILES['admin-image']) && $_FILES['admin-image']['error'] == 0){

	$extension = pathinfo($_FILES['admin-image']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}

	if(move_uploaded_file($_FILES['admin-image']['tmp_name'], '../../assets/adminimages/'.$_FILES['admin-image']['name'])){
		echo '{"status":"success"}';
		exit;
	}
}

echo '{"status":"error"}';
exit;