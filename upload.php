
<?php

// Moving our file from the form submission stream to the server
 $success = move_uploaded_file($_FILES['image']['tmp_name'], "static/media/" . $_FILES['image']['name']);
 if ($success)
 {
 // YOU WOULD DO SOMETHING WITH YOUR FORM DATA HERE. Speaking of FORM DATA, since
 // we used FormData() to generate key/value pairs in React, we now have access to
 // $_POST in PHP

 // $_POST['user']
 }
 if ($success) {
 http_response_code(201);
 }
 else {
 http_response_code(422);
 }

?>