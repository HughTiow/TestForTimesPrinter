<?php
include('connection.php');
session_start();

      $userid 	= $_SESSION['login_user'];
      $noteTitle  	= $_POST['noteTitle'];
      $context  	= $_POST['context'];

     $result = $con->query("INSERT INTO note (`userID`, `title`,`context`) VALUES ('$userid', '$noteTitle', '$context')");
		if($result===true){
				$message ='You are successfully add new note!.';
			}else{
				$message ='Error happened.';
			}

		print json_encode($message);
mysqli_close($con);
	
?>