var app = angular.module("sgtApp", ["firebase"])

    .service("studentService", function($firebaseArray){
        var self = this;
        this.ref = new Firebase("https://studenttable.firebaseio.com/students");
        this.array = {};

        this.addStudent = function(){
            this.array.push(key);

        }

    })

    .controller("mainController", function())