<?php 
$con = mysql_connect('localhost', 'root', '');
if (!$con){
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("mytest", $con);
mysql_query("set names utf8");
$newsid = $_GET['newsid'];
echo "$newsid";
mysql_query( "DELETE FROM `news` WHERE newsid='".$newsid."'");
mysql_close($con);

?>