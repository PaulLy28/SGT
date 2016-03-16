<?php
    require('mysql_connect.php');
    print_r($_POST);
    $id = $_POST['student_id'];
    $querySetStatus = "UPDATE `studenttable` SET `Status`= 0 WHERE `Student_ID` = ".$id;
    $resultSetStatus = mysqli_query($connect, $querySetStatus) or die("Error in Selecting " . mysqli_error($connect));

    include('get_data.php');
    //$queryGetSID = "SELECT studenttable.Student_ID";
    //$resultGetSID = mysqli_query($connect, $query) or die("Error in Selecting " . mysqli_error($connect));
?>