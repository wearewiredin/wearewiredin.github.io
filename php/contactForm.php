<?php
if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['message'])){
    $name = $_POST['name'];
    $from = $_POST['email'];
    $message = $_POST['message'];
	
	if (mail ($to, $subject, $message, $from)) { 
		$response = array('sent' => 1);
		echo json_encode($response);
	} else { 
		$response = array('sent' => 0);
		echo json_encode($response);
	} 
}
?>