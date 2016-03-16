<?php
    $connect = mysqli_connect("localhost", "root", "root", "sgt_dummy") or die("Error " . mysqli_error($connect));
    $query = "UPDATE `studenttable` SET `Status`= 1";
?>