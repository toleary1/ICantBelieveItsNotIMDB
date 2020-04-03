<?php
/* Require config.php for connect function */
require_once("config.php");


//array for storing movies
$genres = []; 

//Query to just grab everything from the genre
$sql = "SELECT * FROM Genre"; 

//Just gonna steal this from the CRUD
if ($result = mysqli_query($con, $sql)) 
{
 //index counter for populating the array
 $cr = 0;
 
 //for each row fill in the array
 while ($row = mysqli_fetch_assoc($result)) {
 //populating genres array
 $genres[$cr]['genreID'] = $row['genreID'];
 $genres[$cr]['GenreName'] = $row['GenreName'];
 
 //add one to the index and go again
 $cr++;
 }
 //convert the array to JSON and echo it
 echo json_encode($genres);
}
else {
// if it didn't work throw an error
 http_response_code(404);
 echo json_encode("That didn't work");
}
?>