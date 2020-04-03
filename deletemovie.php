<?php
/* Attempt MySQL server connection */
require_once("config.php");

$reviewarray = [];
$commentarray = [];

$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

echo("delete.php");
if (isset($request) && !empty($request)) {

echo("In the request");
$movieid = mysqli_real_escape_string($con, $request -> deleteobjmovieid);
$movietitle = mysqli_real_escape_string($con, $request -> deleteobjmovietitle);
$cast = $request -> objcast;

//delete the movie poster
unlink("static/media/{$movietitle}.jpg");

//delete the cast
$deletecastsql = "Select movieID, actorID from Cast where movieID = '$movieid'";
if($deletecastrequest = mysqli_query($con, $deletecastsql))
{
    
    while($row = mysqli_fetch_array($deletecastrequest))
    {
        $actorid = $row["actorID"];
        $deletefromcastsql = "DELETE FROM Cast WHERE actorID = '$actorid' AND movieID = '$movieid'";
        mysqli_query($con, $deletefromcastsql);
      
    }
}
//delete the reviews
$deletereviewsql = "Select movieID, reviewID from Review WHERE movieid = '$movieid'";
if($deletereviewrequest = mysqli_query($con, $deletereviewsql))
{
    while($row = mysqli_fetch_array($deletereviewrequest))
    {
        $reviewid = $row["reviewID"];
        $deletefromreviewsql = "DELETE FROM Review WHERE reviewID = '$reviewid' AND movieID = '$movieid'";
        mysqli_query($con, $deletefromreviewsql);
        echo("Reviews deleted");
    }
} 
//delete the comments
$deletecommentsql = "Select commentID from Comment WHERE movieID = '$movieid'";
if($deletecommentrequest = mysqli_query($con, $deletecommentsql))
{
    while($row = mysqli_fetch_array($deletecommentrequest))
    {
        $commentid = $row["commentID"];
        $deletefromcommentsql = "DELETE FROM Comment WHERE commentID = '$commentid'";
        mysqli_query($con, $deletefromcommentsql);
        echo("Comments deleted");
    }
}
//delete the movie
$deletemoviesql = "Select movieID from Movie WHERE movieID = '$movieid'";
if($deletemovierequest = mysqli_query($con, $deletemoviesql))
{
    while($row = mysqli_fetch_array($deletemovierequest))
    {
        
        $deletefrommoviesql = "DELETE FROM Movie WHERE movieID = '$movieid'";
        mysqli_query($con, $deletefrommoviesql);
        echo("Movie deleted");
    }
}
echo json_encode("Finished");
}
else
{
    echo json_encode("JSON is empty");
}

?>