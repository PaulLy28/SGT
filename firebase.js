var app = angular.module("sgtApp", ["firebase"])
/*service and controller*/
    .service("studentService", function($firebaseArray){
        var ref = new Firebase("https://studenttable.firebaseio.com/students");
        this.array = $firebaseArray(ref);

        this.addStudent = function(obj, callback){
            console.log("object", obj);
            this.array.$add({
                name: obj.name,
                course: obj.course,
                grade: obj.grade
            })
                .then(
                    function(){
                        callback();
                    }
                )
        },
        this.removeStudent = function(index){
            this.array.$remove(index);
        }
    })

    .controller("mainController", function($scope, $firebaseArray, studentService){
        var mainCtrlScope = this;
        this.studentArray = studentService.array;
        this.studentObj = {};
        this.addNewStudent = function(){
            studentService.addStudent(this.studentObj, this.clearInputs);
            /*studentService.clearInputs();*/
        };
            this.removeStudentServer = function(index){
             studentService.removeStudent(index);
        };
            this.clearInputs = function() {
                mainCtrlScope.studentObj = {};
        }
    });





/*controller only*/
/*    .controller("mainController", function($scope, $firebaseArray){
 this.test = "test string";
 var ref = new Firebase("https://popping-heat-5383.firebaseio.com/students");
 this.studentArray = $firebaseArray(ref);

 this.addStudent = function(){
 this.studentArray.$add({
 name: this.studentName,
 course: this.course,
 grade: this.studentGrade
 })
 }
 this.removeStudent = function(index){
 this.studentArray.$remove(index);
 }
 })*/

/*    /!*service and controller*!/
 .service("studentService", function($firebaseArray){
 var ref = new Firebase("https://studenttable.firebaseio.com/students");
 this.array = $firebaseArray(ref);

 this.addStudent = function(obj, callback){
 console.log("object", obj);
 this.array.$add({
 name: obj.name,
 course: obj.course,
 grade: obj.grade
 })
 .then(
 function(){
 callback();
 }
 )

 },
 this.removeStudent = function(index){
 this.array.$remove(index);
 }


 })

 .controller("mainController", function($scope, $firebaseArray, studentService){
 /!*  var mainCtrlScope = this;*!/
 this.studentArray = studentService.array;
 this.studentObj = {
 /!*            name: this.studentName,
 course: this.course,
 grade: this.studentGrade*!/
 };
 this.addNewStudent = function(){
 /!*
 var studentObj = {
 name: this.studentName,
 course: this.course,
 grade: this.studentGrade
 };*!/
 studentService.addStudent(this.studentObj, this.clearInputs);
 /!*studentService.clearInputs();*!/
 };
 this.removeStudentServer = function(index){
 studentService.removeStudent(index);
 };
 this.clearInputs = function() {
 this.studentObj = {};
 /!*                mainCtrlScope.studentName = "",
 mainCtrlScope.course = "",
 mainCtrlScope.studentGrade = ""*!/
 }
 }); */

