<?php
    require('mysql_connect.php');
    //this query string returns all active students
    //$studentQuery = "SELECT studenttable.name, studenttable.course, studenttable.grade, studenttable.Student_ID WHERE studenttable.Status = 1";
    $query = "SELECT studenttable.name, studenttable.course, studenttable.grade, studenttable.Student_ID AS 'id',
        teachertable.Name AS 'Teacher Name', studenttable.Teacher_ID FROM studenttable, teachertable WHERE studenttable.Status = 1";
    $result = mysqli_query($connect, $query) or die("Error in Selecting " . mysqli_error($connect));
    //print_r($result);
    $numberOfRows = mysqli_num_rows($result);

    $sgtArray = ['success' => true];
    while($singleRow = mysqli_fetch_assoc($result)){
        $sgtArray['data'][] = $singleRow;
    }
    echo json_encode($sgtArray); //outputs json encode
?>