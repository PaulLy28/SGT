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
        edit.update(this.student);
        this.student = {};
    }
});

app.controller('mainController', function($firebaseObject, firebaseService){
    this.addStudent = firebaseService.addStudent;
    this.databaseObj = $firebaseObject(firebaseService.firebaseRef);
    this.deleteStudent = firebaseService.deleteStudent;
    this.editStudent = firebaseService.editStudent;
});