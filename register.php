<?php
/* Require config.php for connect function */
require_once("config.php");

/* Get POST data from the sign-in entry form */
$data = file_get_contents('php://input');
$data = utf8_encode($data);
$request = json_decode($data);

/* If the JSON is there and not empty do the rest */
if (isset($request) && !empty($request)) {
    
/* sanitize JSON data */
$username = $request -> regusername;
$email = $request -> regemail;
$password = $request -> regpassword;
$passwordconfirm = $request -> regpasswordconfirm;

$sqlusercheck ="SELECT userName from User WHERE userName = '$username'";

/* Check if the username already exists */
$usernamecheck = mysqli_query($con, $sqlusercheck);
    
        /* Get and sanitize the data if the SQL statement was valid */
        while($row = mysqli_fetch_array($usernamecheck))  
                                  {  
                                    
                                        $dbusername = $row["userName"];  
                                        $dbpassword = $row["userPassword"]; 
                                  }  
if($username == $dbusername)
{
    $return = "Username Already Exists";
    // http_response_code(422);
    echo json_encode($return);
    exit;
}

/* Insert user if user info valid */
$sql = "INSERT INTO User (userID, userName, userPassword, userEmail) values (NULL, '$username', '$password', '$email')";


if (mysqli_query($con, $sql))
    {
        $return = "Successfully Registered. Please sign in";
        http_response_code(201);
        echo json_encode($return);
        
    }
        else 
    {
        $return = "There was an error during registration. Try again.";
        // http_response_code(422);
        echo json_encode($return);
    }
}

/* If POST returned empty JSON */
else
{
    echo "JSON is empty";
    echo json_last_error_msg();
}
?>