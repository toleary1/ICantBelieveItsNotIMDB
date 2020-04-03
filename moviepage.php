<?php
/* Require config.php for connect function */
require_once("config.php");

/* Get POST data from the axios object */
$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

$movie = [];
/* If the JSON is valid and not empty, do stuff */
if (isset($request) && !empty($request)) {
    
/* Sanitize the JSON data */
$moviename = $request -> postmoviename;
$movieid = $request -> postmovieID;


$sql = "SELECT * FROM Movie INNER JOIN Genre ON Movie.genreID=Genre.genreID WHERE movieID = '$movieid'";

if ($result = mysqli_query($con, $sql)) 
{
 //index counter for populating the array
 $cr = 0;
 
 //for each row fill in the array
 while ($row = mysqli_fetch_assoc($result)) {
 //populating movie array
 $movie[$cr]['movieID'] = $row['movieID'];
 $movie[$cr]['movieName'] = $row['movieName'];
 $movie[$cr]['movieSynopsis'] = $row['movieSynopsis'];
 $movie[$cr]['movieReleaseDate'] = $row['movieReleaseDate'];
 $movie[$cr]['GenreName'] = $row['GenreName'];
 
 //add one to the index and go again
 $cr++;
 }

}
$castsql = "SELECT Actor.actorID, actorFirstName, actorLastName, Cast.Role, Cast.movieID FROM Actor INNER JOIN Cast on Actor.actorID = Cast.actorID WHERE movieID = '$movieid' ORDER BY actorLastName";
if ($castresult = mysqli_query($con, $castsql))
{
    $cr = 0;
    while ($row = mysqli_fetch_assoc($castresult))
    {
        $movie[$cr]['actorFirstName'] = $row['actorFirstName'];
        $movie[$cr]['actorLastName'] = $row['actorLastName'];
        $movie[$cr]['actorRole'] = $row['Role'];
        $movie[$cr]['actorID'] = $row['actorID'];
        $movie[$cr]['castmovieID'] = $row['movieID'];
        $movie[$cr]['actorIndex'] = $cr;
        $cr++;
    }
    echo json_encode($movie);
}

}
else {
// if it didn't work throw an error
 http_response_code(404);
}

?>