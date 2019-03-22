<?php
include('connection.php');
session_start();

      $todoID 	= $_POST['todoID'];
      $update  	= $_POST['update'];

     $result = $con->query("UPDATE todo SET `mark` = $update WHERE `id` = $todoID");
		if($result===true){
				$message ='You are successfully update todo!.';
			}else{
				$message ='Error happened.';
			}

		print json_encode($message);
mysqli_close($con);
	
?>