<?php
header("Access-Control-Allow-Origin: http://philiprenich.com");

if(array_key_exists('send', $_POST)) {
	$result = array(
		'success' => true,
		'text' => 'Message sent'
	);

	$to = "hello@philiprenich.com";
	$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
	$name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
	$message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

	$headers = "From:" . $email . "\r\n" .
				"Reply-To:" . $email;
	mail($to, "philiprenich.com contact form - " . $name, $message, $headers);
	
	if(array_key_exists('ajax', $_POST)) {
		echo json_encode($result);
		exit;
	} else {
		echo 'EMAIL SENT';
	}
}
?>