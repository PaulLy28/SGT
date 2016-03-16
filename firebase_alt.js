var app = angular.module('firebaseSGT', ['firebase']);

app.service('firebaseService', function(){
    var self = this;
    //this.firebaseRef = new Firebase('https://lfchallenge.firebaseio.com/students');
    this.firebaseRef = new Firebase('https://studenttable.firebaseio.com/students');
    this.student = {};

    this.addStudent = function(){
        self.firebaseRef.push(this.student);
        this.student = {};
    };

    this.deleteStudent = function(key){
        self.firebaseRef.child(key).remove();
    };

    this.editStudent = function(key){
        var edit = self.firebaseRef.child(key);
        /*edit.update(this.student);*/
        this.student = {};

        edit.once("value", function(snapshot){
            $('#modal-edit-name').val(snapshot.val().name);
            $('#modal-edit-course').val(snapshot.val().course);
            $('#modal-edit-grade').val(snapshot.val().grade);

            $('#student-id').val(key);

            console.log("$('#student-id').val(student_id) : ", $('#student-id').val(key));

            $("#edit-modal").modal("show");
        })
    };

        this.studentEdit = function(key) {
        var newName = $('#modal-edit-name').val(),
            newCourse = $('#modal-edit-course').val(),
            newGrade = $('#modal-edit-grade').val();
        console.log('student updated', 'newName: ', newName, 'newCourse: ', newCourse, 'newGrade: ', newGrade);
        // using the correct method, send the new student values to firebase to be updated

        key.update({
            name: newName,
            course: newCourse,
            grade: newGrade
        });

        };

        this.modalEdit =  function() {
/*        console.log("im here");
        console.log("('#edit-modal').find('#student-id').val() :", $('#edit-modal').find('#student-id').val());*/
        var studentFirebaseRef = self.firebaseRef.child($('#edit-modal').find('#student-id').val());
        // edit form click handler
        // Send the correct variable into the student edit function
        self.studentEdit(studentFirebaseRef);
        $("#edit-modal").modal('hide');
    }
});

app.controller('mainController', function($firebaseObject, firebaseService){
    this.addStudent = firebaseService.addStudent;
    this.databaseObj = $firebaseObject(firebaseService.firebaseRef);
    this.deleteStudent = firebaseService.deleteStudent;
    this.editStudent = firebaseService.editStudent;
    this.modalEdit = firebaseService.modalEdit;

});







/*
app.directive("contenteditable", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function() {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur keyup change", function() {
                scope.$apply(read);
            });
        }
    };
});*/
