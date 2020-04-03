<?php
/* Require config.php for connect function */
require_once("config.php");

/* Get POST data from the axios object */
$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

$comment = [];
/* If the JSON is valid and not empty, do stuff */
if (isset($request) && !empty($request)) {
    
/* Sanitize the JSON data */
$movieid = $request -> commentmovieID;


$commentsql = "SELECT Comment.movieID, commentContent, commentDate, User.userName FROM Comment INNER JOIN User on Comment.userID = User.userID WHERE Comment.movieID = '$movieid' ORDER BY commentDate";

if ($commentresult = mysqli_query($con, $commentsql)) 
{
    
 //index counter for populating the array
 $cr = 0;
 
 //for each row fill in the array
 while ($row = mysqli_fetch_assoc($commentresult)) {
 //populating movie array
 $comment[$cr]['userName'] = $row['userName'];
 $comment[$cr]['commentContent'] = $row['commentContent'];
 $comment[$cr]['commentDate'] = $row['commentDate'];
 
 //add one to the index and go again
 $cr++;
 }
    http_response_code(202);
    echo json_encode($comment);
}


}
else {
// if it didn't work throw an error
 http_response_code(404);
}

?>