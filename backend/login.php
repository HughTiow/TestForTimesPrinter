
<?php
include('connection.php');

$username 	=$_POST['username'];
$password	=$_POST['password'];


	$username 	=mysqli_real_escape_string($con,$username);
	$password  	=mysqli_real_escape_string($con,$password);
$password	=sha1("$password");

$result = mysqli_query($con,"SELECT * FROM user WHERE username='$username' AND password ='$password'");

if (mysqli_num_rows($result) > 0) {
	while($r = $result->fetch_assoc()){
		$member_username =$r['id'];
	}
}else{
	$member_username = null;
}
session_start();
$_SESSION['login_user']=$member_username;

print json_encode($member_username);
			

mysqli_close($con);
?>