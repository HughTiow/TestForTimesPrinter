<?php
include('connection.php');
session_start();

      $userid 	= $_SESSION['login_user'];
      $todoAdd  	= $_POST['todoAdd'];

     $result = $con->query("INSERT INTO todo (`userID`, `todo`) VALUES ('$userid', '$todoAdd')");
		if($result===true){
				$message ='You are successfully add new TODO!.';
			}else{
				$message ='Error happened.';
			}

		print json_encode($message);
mysqli_close($con);
	
?>