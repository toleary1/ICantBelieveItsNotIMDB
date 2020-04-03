<?php
/* Require config.php for connect function */
require_once("config.php");

/* Get POST data from the sign-in entry form */
$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

/* If the JSON is valid and not empty, do stuff */
if (isset($request) && !empty($request)) {
    
/* Sanitize the JSON data */
$username = $request -> signinname;
$password = $request -> signinpassword;

/* SQL to Union the admin and password tables to check both in one query */
$sql ="SELECT userName, userPassword FROM User WHERE userName = '$username' AND userPassword = '$password' UNION SELECT adminName, adminPassword FROM Admin WHERE adminName = '$username' AND adminPassword = '$password'";

    $signinresult = mysqli_query($con, $sql);
    
        /* Get and sanitize the data if the SQL statement was valid */
        while($row = mysqli_fetch_array($signinresult))  
                                  {  
                                    
                                        $dbusername = $row["userName"];  
                                        $dbpassword = $row["userPassword"]; 
                                  }  
        /* If there's a match, success */
        if ($username == $dbusername)
            {
                http_response_code(201);
                echo json_encode($dbusername);
            }
        /* If there's not a match, failure*/
        else 
            {
                $return = array("message"=>"No Username Match");
                http_response_code(422);
                echo json_encode($return);
            }
}

/* If the JSON was empty and nothing worked */
else
{
    echo "JSON is empty";
}
?>