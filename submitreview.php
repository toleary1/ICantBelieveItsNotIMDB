<?php
/* Attempt MySQL server connection */
require_once("config.php");


$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

if (isset($request) && !empty($request)) {


$review = mysqli_real_escape_string($con, $request -> postreview);
$movieid = mysqli_real_escape_string($con, $request -> postmovieID);
$user = mysqli_real_escape_string($con, $request -> postuser);

$usersql = "SELECT userID from User WHERE userName = '$user'";
if ($userresult = mysqli_query($con, $usersql))
{
 
    while($row = mysqli_fetch_array($userresult)) 
    {

    $userid = $row["userID"];
    }
}

$reviewsql = "INSERT INTO Review (reviewID, userID, movieID, reviewScore) values (NULL, '$userid', '$movieid', '$review')";

if ($reviewresult = mysqli_query($con, $reviewsql))
{

    echo json_encode("Review posted successfully");
}
}

else
{
    echo json_encode("something went wrong no review JSON");
}

?>