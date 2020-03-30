<?php
/* Attempt MySQL server connection */
require_once("config.php");

$reviewscore = 0;
$counter = 0;
$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

if (isset($request) && !empty($request)) {

$movieid = mysqli_real_escape_string($con, $request -> postmovieID);


$reviewsql = "SELECT * from Review WHERE movieID = '$movieid'";
if ($reviewresult = mysqli_query($con, $reviewsql))
{
 
    while($row = mysqli_fetch_array($reviewresult)) 
    {

    $reviewscore = $row["reviewScore"] + $reviewscore;
    $counter++;
    }
    $reviewscore = $reviewscore / $counter;
    $reviewscore = round($reviewscore, 1);
    echo json_encode($reviewscore);
}
else
{
    echo json_encode("Something went wrong");
}
}

else
{
    echo json_encode("something went wrong no review JSON");
}

?>