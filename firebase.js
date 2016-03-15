var app = angular.module("sgtApp", ["firebase"]);

app.service("addStudentService", function(){
    this.name = studentName;
    this.course = studentCourse;
    this.grade = studentGrade;
    var firebaseRef = new Firebase("http://blinding-fire-7828.firebaseio.com");

});

app.controller("mainController", function(){




});