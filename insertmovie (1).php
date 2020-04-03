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
$cast = $request -> objcast;

//Get the genreid of the genreName
$genresql = "SELECT genreID from Genre WHERE GenreName = '$moviegenre'";

if ($genreresult = mysqli_query($con, $genresql))
{
    
    while($row = mysqli_fetch_array($genreresult)) 
    {
    $genreid = $row["genreID"];
    }
}

//Insert the movie into the database
$sql = "INSERT INTO Movie (movieID, movieName, movieSynopsis, movieReleaseDate, genreID) values (NULL, '$movietitle', '$moviesynopsis', '$moviereleasedate', '$genreid')";
mysqli_query($con, $sql);

//value for incrementing cast insert function
$cr = 0;
//insert the cast if they're not in the cast list already
if (isset($cast) && !empty($cast)) {
   
    $firstnamecheck = mysqli_real_escape_string($con, $cast[$cr]->FirstName);
    if($firstnamecheck == null)
    {
        echo json_encode("Movie submitted with no cast");
        return;
    }
foreach($cast as $row)
{
    //escape string the names, sanitize the data along with populating a cast array
    //which we'll need for populating the cast array
    $firstname = mysqli_real_escape_string($con, $cast[$cr]->FirstName);
    $castarray[$cr]['FirstName'] = $firstname;
    $lastname = mysqli_real_escape_string($con, $cast[$cr]->LastName);
    $castarray[$cr]['LastName'] = $lastname;
    $role = mysqli_real_escape_string($con, $cast[$cr]->Role);
    $castarray[$cr]['Role'] = $role;
    
//insert the actor into the database
$actorsql = "INSERT INTO Actor (actorID, ActorFirstName, ActorLastName) VALUES (NULL, '$firstname', '$lastname')";
    mysqli_query($con, $actorsql);
    $cr++;
}
}
//get the movieID of the newly inserted movie
$movieidsql = "SELECT movieID FROM Movie WHERE movieName = '$movietitle'";
if ($movieidresult = mysqli_query($con, $movieidsql))
{
    while($row = mysqli_fetch_array($movieidresult)) 
    {
    $movieid = $row["movieID"];
    }
}

$cr = 0;
if(is_array($castarray))
{
    foreach($castarray as $row)
    {
        $castfirstname = $castarray[$cr]['FirstName'];
        $castlastname = $castarray[$cr]['LastName'];
        $castrole = $castarray[$cr]['Role'];
        $actoridsql = "SELECT actorID FROM Actor WHERE ActorFirstName = '$castfirstname' AND ActorLastName = '$castlastname'";
        if ($actoridresult = mysqli_query($con, $actoridsql))
        {
            while($row = mysqli_fetch_array($actoridresult)) 
            {
            $actorid = $row["actorID"];
            }
        }
    if($actorid == null)
    {
        return;
    }
    $insertcastsql = "INSERT INTO Cast (actorID, movieID, Role) VALUES ('$actorid', '$movieid', '$castrole')";
    mysqli_query($con, $insertcastsql);
    $cr++;
    }

}

    echo("Movie Added Successfully");
}

else
{
    echo "JSON is empty";
    echo json_last_error_msg();

}
?>