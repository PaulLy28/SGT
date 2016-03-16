<?php
    $connect = mysqli_connect("localhost", "root", "root", "sgt_dummy") or die("Error " . mysqli_error($connect));
    //require
    $query = "INSERT INTO `todo_items` SET `id` = 00, `title` = 'empty', `details` = 'empty', `timestamp` = '', `user_id` = ''"
    //$query = "INSERT INTO studenttable (`Name`, `Course`, `Grade`, `Student_ID`, `Teacher_ID`) VALUES (`$name`, `$course`, `$grade`, `$studentID`)";
    $result = mysqli_query($connect, $query) or die("Error in Selecting " . mysqli_error($connection));
    //print_r($result);
?>