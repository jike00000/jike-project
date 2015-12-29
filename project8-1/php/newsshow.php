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
echo '<tr>';
echo '<td><button class="del">删除</button></td>';
echo '<td>' .$row['newsid']. '</td>';
echo '<td>' .$row['newstitle']. '</td>';
echo '<td>' .$row['newsimg']. '</td>';
echo '<td>' .$row['newscontent']. '</td>';
echo '<td>' .$row['addtime']. '</td>';
echo '<td>' .$row['source']. '</td>';
echo '</tr>';
}




mysql_close($con);
?>