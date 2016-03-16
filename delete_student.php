<?php
    $connect = mysqli_connect("localhost", "root", "root", "sgt_dummy") or die("Error " . mysqli_error($connect));

    $querySetStatus = "UPDATE `studenttable` SET `Status`= 0";
    $resultSetStatus = mysqli_query($connect, $query) or die("Error in Selecting " . mysqli_error($connect));

    $queryGetSID = "SELECT studenttable.Student_ID";
    $resultGetSID = mysqli_query($connect, $query) or die("Error in Selecting " . mysqli_error($connect));
?>