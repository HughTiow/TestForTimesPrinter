<?php
include('connection.php');
session_start();

      $title 	= $_POST['title'];
      $context  	= $_POST['context'];
      $noteID  	= $_POST['noteID'];

     $result = $con->query("UPDATE note SET `title` = '$title' ,`context`='$context' WHERE `id` = $noteID");
		if($result===true){
				$message ='You are successfully update note!.';
			}else{
				$message ='Error happened.'.mysqli_error($con);
			}

		print json_encode($message);
mysqli_close($con);
	
?>