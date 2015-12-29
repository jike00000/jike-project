<?php  
$con = mysql_connect('localhost', 'root', '');
if (!$con){
	die('Could not connect: ' . mysql_error());
}
mysql_select_db("mytest", $con);
mysql_query("set names utf8");

$sql = "SELECT * FROM `news` WHERE  1";
$result = mysql_query($sql);

while($row = mysql_fetch_array($result))
{
 	echo '<div class="index-list-item">';
 	echo '<div class="index-list-image">';
 	echo '<img src="' .$row['newsimg']. '">';
 	echo '</div>';
 	echo '<div class="index-list-main-text">';
 	echo '<div class="index-list-main-title">' .$row['newstitle']. '</div>';
 	echo '<div class="index-list-main-abs">' .$row['newscontent']. '</div>';
 	echo '</div><div class="index-list-bottom">';
 	echo '<b class="tip-reason tip-fillred">' .$row['source']. '</b>';
 	echo '<b class="tip-time">' .$row['addtime']. '</b></div></div>';
}

mysql_close($con);
?>