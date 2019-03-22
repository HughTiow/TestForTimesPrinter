<?php
include('connection.php');

      $username 	= $_POST['username'];
      $password  	= $_POST['password'];
      $password   	= sha1($password);

      $result = $con->query("SELECT username FROM user WHERE username='$username'");
		if($result -> num_rows > 0){
			$message ='Your Email have been used!.';
		}else{
			$result = $con->query("INSERT INTO user (`username`, `password`) VALUES ('$username', '$password')");
			if($result===true){
				$message ='You are successfully sign up!.';
			}else{
				$message ='Error happened.';
			}
		}

		print json_encode($message);
	
?>