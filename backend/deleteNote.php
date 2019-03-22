<?php
include('connection.php');
session_start();

      $noteId 	= $_POST['noteId'];

     $result = $con->query("DELETE FROM note  WHERE `id` = $noteId");
		if($result===true){
				$message ='You are successfully delete Note!.';
			}else{
				$message ='Error happened.';
			}

		print json_encode($message);
mysqli_close($con);
	
?>