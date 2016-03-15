var app = angular.module("sgtApp",[]);

/*
app.controller("mainController", function(){
    this.studentArray = [{
        name: "Peter Parker",
        course: "Photography",
        grade: "94"
    }];
    this.addData = function(obj){
        this.studentArray.push(obj);
    };
    this.deleteData = function(index){
        this.studentArray.splice(index,1);
    }

});
*/

app.directive("addStudent", function(){
    return {
        restrict: "E",
        transclude: true,
        templateUrl: "form-template.html",
/*        scope: {
            add: "&"
        },*/
       /* link: function(scope, elem, attrs){
            elem.find("#add-student-btn").bind("click", function(){
                scope.$apply(function(){
                    scope.add({student: scope.student});
                    scope.student = {};
                });
            });
        }*/
    }
});

app.directive("tableDirective", function(){
   return {
       restrict: "E",
       templateUrl: "table-template.html",
/*       scope: {
           array: "=",
           deleteFunc: "&"
       },
       controller: 'ioController',
        controllerAs: "io",*/
       link: function(scope, elem, attrs){

           elem.on("click", "button", function(){
               var tableScope = this;
               /*scope.deleteFunc({index: $(this).attr("attr")});
               scope.$apply();*/
               scope.$apply(function(){
                   scope.deleteFunc({index: $(tableScope).attr("attr")});
               });
           });
       }
   }
});
/*added*/

app.provider('sgtData', function(){
    //Create a variable to hold this
    var self = this;
    //Create a variable to hold your api key but set it to an empty string
    var api_key = "";
    //Create a variable to hold the API url but set it to an empty string
    var api_url = "";

    //Add the necessary services to the function parameter list
    this.$get = function($http, $q, $log){
        //return an object that contains a function to call the API and get the student data
        //Refer to the prototype instructions for more help
        return {
            callApi: function () {
                $log.log("callAPI");
                var apiData = {api_key: self.api_key};
                var apiStr = $.param(apiData);

                // var defer = $q.defer();

                return $http({
                    url: self.api_url,
                    method: "post",
                    data: apiStr,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                });
                /*  .then(
                 function success(data){
                 defer.resolve(data);
                 },
                 function fail(data){
                 defer.reject("fail");
                 });*/
                // return defer.promise;
            },
            addStudent: function () {
                $log.log("callAPI");
/*                var apiData = {
                    api_key: "1fu4QTyxd4",
                    name: $("input[name=studentName]").val(),//student's name
                    course: $("input[name=course]").val(),//student's course
                    grade: parseInt($("input[name=studentGrade]").val()),
                };*/
                var apiStr = $.param({
                    api_key: "1fu4QTyxd4",
                    name: $("input[name=studentName]").val(),//student's name
                    course: $("input[name=course]").val(),//student's course
                    grade: parseInt($("input[name=studentGrade]").val()),
                });
                return  $http({
                        url: 'http://s-apis.learningfuze.com/sgt/create',
                        method: "post",
                        data: apiStr,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        })
            },

            deleteStudent: function(num) {
                console.log("delete clicked", num);
                console.log("student id", data.data.data.id);
                var apiStr = $.param({
                    api_key: "1fu4QTyxd4",
                    student_id: selfCtrl.studentData.id
                });
                return  $http({
                    url: 'http://s-apis.learningfuze.com/sgt/delete',
                    method: "post",
                    data: apiStr,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                })
            },
            clearInputs: function() {
            $("input[name=studentName]").val("");
            $("input[name=course]").val("");
            $("input[name=studentGrade]").val("");

            }
        }
    }
});

//Config your provider here to set the api_key and the api_url
app.config(function(sgtDataProvider){
    sgtDataProvider.api_key = "1fu4QTyxd4";
    sgtDataProvider.api_url = "http://s-apis.learningfuze.com/sgt/get";
});

/*app.controller("mainController", function(sgtData){
     this.studentArray = sgtData;
     this.addData = function(obj){
     this.studentArray.push(obj);
     };
     this.deleteData = function(index){
     this.studentArray.splice(index,1);
     }

    this.addNewStudent = function(){
        sgtData.addStudent()
            .then(
                function success(data){
                    selfCtrl.getData();
                    sgtData.clearInputs();
                });
    };
});*/

//Include your service in the function parameter list along with any other services you may want to use
app.controller('ioController', function(sgtData){
    //Create a variable to hold this, DO NOT use the same name you used in your provider
    var selfCtrl = this;
    //Add an empty data object to your controller, make sure to call it 'data'
    this.studentData = {};
    this.test = "test string";
    this.addNewStudent = function(){
        console.log("add student");
        sgtData.addStudent()
            .then(
            function success(data){
                selfCtrl.getData();
                sgtData.clearInputs();
            });
    };
    //Add a function called getData to your controller to call the SGT API
    //Refer to the prototype instructions for more help
    this.getData = function(){
        sgtData.callApi()
            .then(
                function success(data){
                    selfCtrl.studentData = {};
                    selfCtrl.studentData = data.data.data;
                    console.log("data", selfCtrl.studentData);
                },
                function fail(data){
                    $log.log("fail");
                });
    }
    this.deleteData = function(num){
        sgtData.deleteStudent(num);
        selfCtrl.getData();
    }
});


