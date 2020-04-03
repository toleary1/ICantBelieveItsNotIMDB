<?php
/* Attempt MySQL server connection */
require_once("config.php");


$castarray = [];
$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

if (isset($request) && !empty($request)) {

$movietitle = mysqli_real_escape_string($con, $request -> objmovietitle);
$moviereleasedate = mysqli_real_escape_string($con, $request -> objmoviereleasedate);
$moviegenre = mysqli_real_escape_string($con, $request -> objmoviegenre);
$moviesynopsis = mysqli_real_escape_string($con, $request -> objmoviesynopsis);
$movieid = mysqli_real_escape_string($con, $request -> objmovieid);
$cast = $request -> objcast;

$movieidsql = "SELECT movieName from Movie WHERE MovieID = '$movieid'";

if ($movieidresult = mysqli_query($con, $movieidsql))
{
    
    while($row = mysqli_fetch_array($movieidresult)) 
    {
    $filecheckmoviename = $row["movieName"];
    }
}

$genresql = "SELECT genreID from Genre WHERE GenreName = '$moviegenre'";

if ($genreresult = mysqli_query($con, $genresql))
{
    
    while($row = mysqli_fetch_array($genreresult)) 
    {
    $genreid = $row["genreID"];
    }
}
//update the movie
$updatemoviesql = "UPDATE Movie SET movieName = '$movietitle', movieSynopsis = '$moviesynopsis', movieReleaseDate = '$moviereleasedate', genreID = '$genreid' WHERE movieID = '$movieid'";

if($updatecheckresult = mysqli_query($con, $updatemoviesql))
{
    
        $filename = "static/media/{$filecheckmoviename}.jpg";
        if (file_exists($filename))
        {
            rename("static/media/{$filecheckmoviename}.jpg", "static/media/{$movietitle}.jpg");
        }
        else
        {
            rename("static/media/{$filecheckmoviename}.jpg", "static/media/{$movietitle}.jpg");
        }

}
//value for incrementing cast insert function
$cr = 0;
//insert the cast if they're not in the cast list already
if (isset($cast) && !empty($cast)) {

foreach($cast as $row)
{
    
    //escape string the names, sanitize the data along with populating a cast array
    //which we'll need for populating the cast array
    $firstname = mysqli_real_escape_string($con, $cast[$cr]->actorFirstName);
    $castarray[$cr]['FirstName'] = $firstname;
    $lastname = mysqli_real_escape_string($con, $cast[$cr]->actorLastName);
    $castarray[$cr]['LastName'] = $lastname;
    $role = mysqli_real_escape_string($con, $cast[$cr]->actorRole);
    $castarray[$cr]['Role'] = $role;
    $actorid = mysqli_real_escape_string($con, $cast[$cr]->actorID);
    $castarray[$cr]['actorID'] = $actorid;
    $castchecksql = "SELECT * FROM Cast WHERE actorID = '$actorid' AND movieID = '$movieid'"; 
    
    if ($castcheckresult = mysqli_query($con, $castchecksql))
    {
        if (mysqli_num_rows($castcheckresult)==1)
        while ($row = mysqli_fetch_assoc($castcheckresult))
        {
            $castupdatesql = "UPDATE Cast SET Role = '$role' WHERE Cast.actorID = '$actorid' AND Cast.movieID = '$movieid'";
            mysqli_query($con, $castupdatesql);
            $actorupdatesql = "UPDATE Actor SET ActorFirstName = '$firstname', ActorLastName = '$lastname' WHERE actorID = '$actorid'";
             mysqli_query($con, $actorupdatesql);
        }
        else
        {
            $actorsql = "INSERT INTO Actor (actorID, ActorFirstName, ActorLastName) VALUES (NULL, '$firstname', '$lastname')";
            mysqli_query($con, $actorsql); 
            $actoridsql = "SELECT actorID FROM Actor WHERE ActorFirstName = '$firstname' AND ActorLastName = '$lastname'";
        if ($actoridresult = mysqli_query($con, $actoridsql))
        {
            while($row = mysqli_fetch_array($actoridresult)) 
            {
            $newactorid = $row["actorID"];
            }
            $insertcastsql = "INSERT INTO Cast (actorID, movieID, Role) VALUES ('$newactorid', '$movieid', '$role')";
            mysqli_query($con, $insertcastsql);
        }
        }
        if($role == "")
        {
        $deletecastsql = "DELETE FROM Cast WHERE actorID = '$actorid' AND Cast.movieID = '$movieid'";
        mysqli_query($con, $deletecastsql);
        }
    }
    
    $cr++;
}

}
 http_response_code(201);
echo json_encode("Movie Successfully Updated");
}
else
{
     http_response_code(422);
    echo json_encode("Error: No data submitted");
}