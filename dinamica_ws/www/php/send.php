<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta content="width=device-width, initial-scale=1.0" name="viewport">
	<meta content="IE=edge" http-equiv="X-UA-Compatible">

	<title>Sendy | Advanced Contact Form</title>

	<!-- Favicon -->
	<link href="../img/favicon.png" rel="shortcut icon">
	<link href="../img/apple-touch-icon.png" rel="apple-touch-icon">

	<!-- Google Fonts - Poppins -->
	<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">

	<!-- Font Awesome CSS -->
	<link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet">

	<!-- Bootstrap CSS -->
	<link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

	<!-- Scrollbar Custom CSS -->
	<link href="../vendor/custom-scrollbar/css/custom-scrollbar.min.css" rel="stylesheet">

	<!-- Filepond CSS -->
	<link href="../vendor/filepond/filepond.css" rel="stylesheet">

	<!-- Custom Font Icons -->
	<link href="../vendor/icomoon/css/iconfont.min.css" rel="stylesheet">

	<!-- Main Style -->
	<link href="../css/style.light.blue.css" rel="stylesheet">

</head>

<body onLoad="setTimeout('delayedRedirect()', 5000)">

<?php
// Import the PHPMailer class into the global namespace
require 'phpmailer/autoload.php';

// Create a new PHPMailer instance
$mail = new PHPMailer;

// Init an array to collect temp folders
$tmp_dirs = [];

try {

    // Send the mail to the given email address of the user
	$user_mail = $_POST['email'];

	// Set the username
	$user_name = $_POST['fullname'];

	// Set the sender
	// The name is optional and will not be used if not present
	$mail->setFrom('noreply@yourdomain.com', 'Sendy');

	// Set an alternative reply-to address
	// The name is optional and will not be used if not present
	$mail->addReplyTo('replyto@yourdomain.com', 'Sendy');

	// Set the recipients
	// The name is optional and will not be used if not present
	$mail->addAddress('websolutions.ultimate@gmail.com', 'Ultimate Websolutions');
	$mail->addAddress($user_mail, $user_name);

	// Set the subject line
	$mail->Subject = 'Message from Sendy';

	// Add attachment if exists
	$attachment_ids = $_POST['filepond'];
	foreach($attachment_ids as $attachment_id) {

		$dir = 'tmp/'.$attachment_id;
		$tmp_dirs[] = $dir;
		$file = glob('tmp/'.$attachment_id.'/*.*')[0];
		$mail->addAttachment($file);
	}

    // Content
    $mail->isHTML(true);
	$mail->Body    = '<b>We got the message with the following data.</b> ' . '<br/><br/>' .
	'<b>Name:</b> ' . $_POST['fullname'] . '<br/>' .
	'<b>Subject:</b> ' . $_POST['subject'] . '<br/>' .
	'<b>Email:</b> ' . $_POST['email'] . '<br/>' .
	'<b>Phone:</b> ' . $_POST['phone'] . '<br/><br/>' .
	'<b>Message:</b> '. '<br/>' . $_POST['message'] . '<br/>';
	$mail->AltBody = 'We got the message with the following data.' . '\n\n' .
	'Name: ' . $_POST['fullname'] . '\n'.
	'Subject: ' . $_POST['subject'] . '\n'.
	'Email: ' . $_POST['email'] . '\n'.
	'Phone: ' . $_POST['phone'] . '\n\n'.
	'Message: ' . '\n' . $_POST['message'] . '\n';

    $mail->send();

} catch (Exception $e) {

	echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";

} finally {

	foreach($tmp_dirs as $tmp_dir) {

		foreach(scandir($tmp_dir) as $file_name) {

			if($file_name != '.' && $file_name != '..') {
				unlink($tmp_dir.'/'.$file_name);
			}
		}
		// Clean up the tmp folder
		rmdir($tmp_dir);
	}
}

?>
<!-- END MAIL SCRIPT -->

<div id="success">
    <div class="icon icon-order-success svg">
              <svg width="72px" height="72px">
                <g fill="none" stroke="#00b7f0" stroke-width="2">
                  <circle cx="36" cy="36" r="35" style="stroke-dasharray:240px, 240px; stroke-dashoffset: 480px;"></circle>
                  <path d="M17.417,37.778l9.93,9.909l25.444-25.393" style="stroke-dasharray:50px, 50px; stroke-dashoffset: 0px;"></path>
                </g>
              </svg>
    </div>
<h4>Thank you for contacting us.</h4>
<small>Check your mailbox.</small>
</div>

<!-- Redirect Javascript File -->
<script src="../js/redirect.js"></script>
</body>
</html>