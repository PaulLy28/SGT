<?php
    require('mysql_connect.php');
    //require
    print_r($_POST);
    /*$expectedField = [
            ['field'=>'studentName', 'regex'=>'/[a-zA-Z]{5,35}/', 'error_message'=>'Student Name must be a number 35 characters long'],
            ['field'=>'course', 'regex'=>'/[a-zA-Z]{3,20}/', 'error_message'=>'Course must be 20 characters long'],
            ['field'=>'grade', 'regex'=>'/[0-9]{1,3}/', 'error_message'=>'Grade must be 3 numbers or less'],
            ['field'=>'student_ID', 'regex'=>'/[0-9]{1,20}/', 'error_message'=>'name must be 3 letters or more']
    ];*/
    $studentName = $_POST['student']['name'];
    $courseName = $_POST['student']['course'];
    $studentGrade = $_POST['student']['grade'];
    $student_id = $_POST['student']['student_id'];
    $status = $_POST['student']['status'];
    $query = "INSERT INTO studenttable (`Name`, `Course`, `Grade`, `Student_ID`, `Status`) VALUES ('$studentName', '$courseName', '$studentGrade', '$student_id', $status)";
        //$query = "INSERT INTO `todo_items` SET `id` = 00, `title` = 'empty', `details` = 'empty', `timestamp` = '', `user_id` = ''"
    $result = mysqli_query($connect, $query) or die("Error in Selecting " . mysqli_error($connect));
    //print_r($result);
?>