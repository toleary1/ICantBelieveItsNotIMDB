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
//GET THE USER ID
$usersql = "SELECT userID from User WHERE userName = '$user'";
if ($userresult = mysqli_query($con, $usersql))
{
    while($row = mysqli_fetch_array($userresult)) 
    {
    $userid = $row["userID"];
    }
}
//CHECK IF A REVIEW FOR THE USER EXISTS 
$reviewchecksql = "SELECT userID from Review WHERE movieID = '$movieid' AND userID = '$userid'";

if($reviewcheckresult = mysqli_query($con, $reviewchecksql))
{
    //IF A REVIEW DOES NOT EXIST, ADD A REVIEW
    if($reviewcheckresult->num_rows === 0)
    {
        $reviewsql = "INSERT INTO Review (reviewID, userID, movieID, reviewScore) values (NULL, '$userid', '$movieid', '$review')";
        if ($reviewresult = mysqli_query($con, $reviewsql))
            {
             echo json_encode("Review posted successfully");
            }
    }
    else
    {
        //UPDATE THE EXISTING REVIEW
        $reviewupdatesql = "UPDATE Review SET reviewScore = '$review' WHERE UserID = '$userid'";
        if($updatereview = mysqli_query($con, $reviewupdatesql))
         {
            if($updatereview->num_rows === 0)
            {
                echo json_encode("Nothing got updated");
                return;
            }
            else
            {
                echo json_encode("Your review was updated");
            }
         }
    }
}

}
else
{
    echo json_encode("something went wrong no review JSON");
}

?>