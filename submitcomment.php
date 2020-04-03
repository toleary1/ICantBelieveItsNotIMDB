<?php
/* Require config.php for connect function */
require_once("config.php");

/* Get POST data from the axios object */
$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

if (isset($request) && !empty($request)) {

 $movieid = mysqli_real_escape_string($con, $request -> postmovieID);
 $user = mysqli_real_escape_string($con, $request -> postuser);
 $comment = mysqli_real_escape_string($con, $request -> postcomment);
  
 $useridsql = "SELECT userID from User WHERE userName='$user'";
 
 if($useridresult = mysqli_query($con, $useridsql))
 {
    
 
     while($row = mysqli_fetch_assoc($useridresult))
     {
         $userid = $row['userID'];
     }
 }

 $submitcommentsql = "INSERT INTO Comment (commentID, userID, movieID, commentContent, commentDate) values (NULL, '$userid', '$movieid', '$comment', NULL)";
 if(mysqli_query($con, $submitcommentsql))
 {
     http_response_code(202);
     echo json_encode("Success");
 }
 
}
else
{
    http_response_code(404);
    echo json_encode("Something went wrong");
}

?>