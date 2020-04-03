
<?php

// Moving our file from the form submission stream to the server
$movietitle = $_POST['movietitle'];
 $success = move_uploaded_file($_FILES['image']['tmp_name'], "static/media/{$movietitle}.jpg");
 $movietitle = $_POST['movietitle'];

 if ($success) {
 http_response_code(201);
 
 }
 else {
 http_response_code(422);
 }

?>