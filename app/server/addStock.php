<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	require_once 'fun_connect2.php';
	//$stock=json_decode($_GET['stockE']);
	print_r($_GET);
	$stock=$_GET;
	//print_r($stock);
	//echo "<pre>".$stock[fname."</pre>";
	$t=time();
		$sql="INSERT INTO stock VALUES (NULL,
			'".mysql_real_escape_string($stock[type])."',
			'".mysql_real_escape_string($stock[date])."',
			'".mysql_real_escape_string($stock[purl])."',
			'".mysql_real_escape_string($stock[ourl])."',
			'".mysql_real_escape_string($stock[desc])."',
			'".mysql_real_escape_string($stock[author])."',
			'".mysql_real_escape_string($stock[uprice])."',
			'".mysql_real_escape_string($stock[discount])."',
			'".mysql_real_escape_string($stock[visibility])."',
			$t,
			0,
			'".mysql_real_escape_string($stock[quantity])."',
			'".mysql_real_escape_string($stock[tags])."')";
		$res=mysql_query($sql)or die ("Error : could not insert values" . mysql_error());
		$stock_id = mysql_insert_id();
		if($res && ($stock[quantity]>0)){
			$sql="INSERT INTO inventory VALUES (NULL,
				'".$stock_id."',
				'Add',
				'".mysql_real_escape_string($stock[quantity])."',
				'".$t."',
				'Admin'
				)";
			$res=mysql_query($sql)or die ("Error : could not insert values" . mysql_error());
		}
		if($res){echo $_GET['callback'].'(o)';}
	
	
?>
