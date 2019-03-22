
<?php
include('connection.php');
session_start();

	$userid 	= $_SESSION['login_user'];
	$rowResult  = array();
	$row = array();

	$result = mysqli_query($con,"SELECT * FROM todo WHERE userID='$userid'");

	if (mysqli_num_rows($result) > 0) {
		while($r = $result->fetch_assoc()){
			$row['id'] 		=$r['id'];
			$row['todo'] 	=$r['todo'];
			$row['mark'] 	=$r['mark'];

			array_push($rowResult,$row);
		}
	}

	print json_encode($rowResult);
			

mysqli_close($con);
?>