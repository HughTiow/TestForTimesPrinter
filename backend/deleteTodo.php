<?php
include('connection.php');
session_start();

      $todoID 	= $_POST['todoID'];

     $result = $con->query("DELETE FROM todo  WHERE `id` = $todoID");
		if($result===true){
				$message ='You are successfully delete TODO!.';
			}else{
				$message ='Error happened.';
			}

		print json_encode($message);
mysqli_close($con);
	
?>