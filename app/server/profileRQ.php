<?php
	require_once 'fun_connect2.php';
	require_once 'JSON.php';
	// prevent direct access

	$passer=md5($_GET['pass']);
	$a_json = array();
	$a_json_row = array();
	$sqlcheck = "SELECT * FROM Registered_user WHERE user_id='".mysql_real_escape_string($_GET['email'])."' AND userPassword='$passer'";
	$rescheck=mysql_query($sqlcheck) or die ("Error : could not check values for $email " . mysql_error() );
	$count = mysql_num_rows($rescheck);
	if($count > 0){
		$row= mysql_fetch_array($rescheck);
		  $a_json_row["info"] = 'Authenticated';
		  $a_json_row["userId"] = $row[0];
		  $a_json_row["title"] = $row[1];
		  $a_json_row["lname"] = $row[2];
		  $a_json_row["fname"] = $row[3];
		  $a_json_row["email"] = $row[4];
		  $a_json_row["phone"] = $row[5];
		  $a_json_row["city"] = $row[6];
		  $a_json_row["state"] = $row[7];
		  array_push($a_json, $a_json_row);
		  //$re=turntojson($a_json);
		  //echo($re);
		   $json = json_encode($a_json);
		   echo $json;
	}
	else{
		$a_json_row["info"] = 'error';
		$a_json_row["error_message"] = 'Wrong Username or Password. Please, try again';
		 array_push($a_json, $a_json_row);
		  //$re=turntojson($a_json);
		  //echo($re);
		   echo $_GET['callback'].'('.json_encode($a_json).')';
	}

?>
