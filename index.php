<!doctype html>
<html>
<head>
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <script src="script.js"></script>
    <meta name="viewport" content="initial-scale=1, user-scalable=no">
</head>
<body>
<div class="container">
    <!--page header to add a faint gray line under the header-->
    <div class="row page-header">
        <!-- only show this element when the isnt on mobile -->
        <h1 class="hidden-xs">Student Grade Table
            <!--pull right will justify the text to the right-->
            <small class="hidden-xs pull-right">Grade Average : <span class="avgGrade label label-default">0</span></small>
        </h1>
        <!-- only show this element when the user gets to a mobile version -->
        <!--visible-xs should make this section only visible in the mobile version-->
        <h3 class="visible-xs col-xs-12">Student Grade Table
            <small class="pull-right">Grade Average : <span class="avgGrade label label-default">0</span></small>
        </h3>
    </div>
    <!--added .row,.col-md-3, .pull-right classes to make it fit on the same row as 'student-list' table-->
    <div class="student-add-form row col-md-3 pull-right">
        <h4>Add Student</h4>
        <div class="input-group form-group">
            <!-- input-group makes glyphicon on the left of input and form-group gives it the spacing between inputs-->
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-user"></span>
            </span>
            <input type="text" class="form-control" name="studentName" id="studentName" placeholder="Student Name">
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-list-alt"></span>
            </span>
            <input type="text" class="form-control" name="course" id="course"
                   placeholder="Student Course">
        </div>
        <div class="input-group form-group">
            <span class="input-group-addon">
                <span class="glyphicon glyphicon-education"></span>
            </span>
            <input type="text" class=" form-control" name="studentGrade" id="studentGrade"
                   placeholder="Student Grade">
        </div>

        <button id="add" type="button" class="btn btn-success" onclick="addStudentClicked()">Add</button>
        <!-- class btn success makes button green-->
        <button id="cancel" type="button" class="btn btn-default" onclick="cancelClicked()">Cancel</button>
        <button id="getData" type="button" class="btn btn-default" onclick="getDataClicked()">Get Data</button>


    </div>
    <div class="student-list-container pull-left col-md-9">
        <!--added a 'table' class to table element-->
        <table class="table student-list">
            <thead>
            <tr>
                <th>Student Name</th>
                <th>Student Course</th>
                <th>Student Grade</th>
                <th>Operations</th>
            </tr>
            </thead>

            <tbody>
            </tbody>
        </table>
    </div>
</div>
</body>
</html>