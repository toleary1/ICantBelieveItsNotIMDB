<?php
/* Require config.php for connect function */
require_once("config.php");


//array for storing movies
$movies = []; 

//Query to just grab everything from the movie table plus the genre name
$sql = "SELECT * FROM Movie INNER JOIN Genre ON Movie.genreID=Genre.genreID ORDER BY Movie.movieName"; 

//Just gonna steal this from the CRUD
if ($result = mysqli_query($con, $sql)) 
{
 //index counter for populating the array
 $cr = 0;
 
 //for each row fill in the array
 while ($row = mysqli_fetch_assoc($result)) {
 //populating movies array
 $movies[$cr]['movieID'] = $row['movieID'];
 $movies[$cr]['movieName'] = $row['movieName'];
 $movies[$cr]['movieSynopsis'] = $row['movieSynopsis'];
 $movies[$cr]['movieReleaseDate'] = $row['movieReleaseDate'];
 $movies[$cr]['GenreName'] = $row['GenreName'];
 
 //add one to the index and go again
 $cr++;
 }
 //convert the array to JSON and echo it
 echo json_encode($movies);
}
else {
// if it didn't work throw an error
 http_response_code(404);
 echo json_encode("That didn't work");
}
?>