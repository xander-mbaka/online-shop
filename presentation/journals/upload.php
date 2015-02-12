<?php

// A list of permitted file extensions
$allowed = array('png', 'jpg', 'gif','zip');

if(isset($_FILES['journal-image']) && $_FILES['journal-image']['error'] == 0){

	$extension = pathinfo($_FILES['journal-image']['name'], PATHINFO_EXTENSION);

	if(!in_array(strtolower($extension), $allowed)){
		echo '{"status":"error"}';
		exit;
	}

	if(move_uploaded_file($_FILES['journal-image']['tmp_name'], '../../assets/journalcovers/'.$_FILES['journal-image']['name'])){
		echo '{"status":"success"}';
		exit;
	}
}

echo '{"status":"error"}';
exit;