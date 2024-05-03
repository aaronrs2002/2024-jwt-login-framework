<?php

header('Access-Control-Allow-Origin: *');//put what ever your domain is here and replace the *

header('Access-Control-Allow-Methods: GET, POST');

header("Access-Control-Allow-Headers: X-Requested-With");


ini_set ('display_errors',1);

error_reporting (E_ALL & ~ E_NOTICE);

  //create short variable names
  $url=$_POST['url'];

  $name=$_POST['name'];

  $phone=$_POST['phone'];

  $email=$_POST['email'];

  $message=$_POST['message'];

  
  if (empty($email)){
	echo "Missing values.";
   exit();
}

  $toaddress = 'YOUR@EMAIL.COM';

  $subject = 'Feedback from web site';

  $mailcontent = 'Customer name: '.$name."\n"

                 .'Customer phone: '.$phone."\n"

				 .'Customer email: '.$email."\n"

				 ."Customer comments: \n".$message."\n";

  mail($toaddress, $subject, $mailcontent);

?>
<html>
<head>
<title>Thank you for reaching out</title>
<style>
body {
	background-color:#fff;
	font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
	font-size:13px;
	color:#000;
	line-height:20px;
	text-align:center;
}
h1, a:link, a:hover, a:active, a:visited {
	font-size:15px;
	font-weight:bold;
	color:#000;
	text-align:center;
}
#noteWrapper {
	width:100%;
}
#noteBack {
	width:300px;
	margin: 0 auto 0 auto;
}
#logo {
	width:291px;
	margin: 0 auto 0 auto;
}
</style>
</head>
<body>
<div id="noteWrapper">
  <div id="noteBack">
    <?php

ini_set ('display_errors',1);

error_reporting (E_ALL & ~ E_NOTICE);

print "<p>Thank You, <strong> ".$name." </strong>.</p>"; 

print "<p>You wrote: ".$message." </p>";

print "<p>I will contact you at: ".$email.".</p>";


print "<input type='hidden' value=".$url." id='urlAddress' />";

print "<a href=".$url." >Return to website</a>";

?>
    

  </div>
</div>
<!--end wrapper-->


<script type="text/javascript">
var url = document.getElementById("urlAddress").value;

setTimeout(function(){ 
    console.log("We should head to: "+url);
	window.location.href =  url;
	return false;
}, 3000);
</script>
</body>
</html>
