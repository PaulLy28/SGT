<?php
    require('mysql_connect.php');

    $querySetStatus = "UPDATE `studenttable` SET `Status`= 0";
    $resultSetStatus = mysqli_query($connect, $query) or die("Error in Selecting " . mysqli_error($connect));

    $queryGetSID = "SELECT studenttable.Student_ID";
    $resultGetSID = mysqli_query($connect, $query) or die("Error in Selecting " . mysqli_error($connect));
?>