<?php 
header("Content-type:application/json;charset=utf-8");
$con = mysql_connect("localhost","root","");
if (!$con) {
	die('Could not connect:'.mysql_error());
}

mysql_select_db("mytest", $con);
mysql_query("set names utf8");
$newsid = $_GET['newsid'];
$newstitle = $_GET['newstitle'];
$newsimg = $_GET['newsimg'];
$newscontent = $_GET['newscontent'];
$addtime = $_GET['addtime'];
$source = $_GET['source'];

$sql ="INSERT INTO `news` (`newsid`, `newstitle`, `newsimg`, `newscontent`, `addtime`) VALUES ('".$newsid."','".$newstitle."', '".$newsimg."','".$newscontent."','".$addtime."');";
$result= mysql_query($sql,$con);


if (!$result) {
  die('Error: ' . mysql_error());
  }
else{
	echo '<tr>';
	echo '<td><button class="del">删除</button></td>';
	echo '<td>' .$newsid. '</td>';
	echo '<td>' .$newstitle. '</td>';
	echo '<td>' .$newsimg. '</td>';
	echo '<td>' .$newscontent. '</td>';
	echo '<td>' .$addtime. '</td>';
	echo '<td>' .$source. '</td>';
	echo '</tr>';
  }


mysql_close($con);
?>