var app = angular.module("sgtApp",[]);

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

app.directive("addStudent", function(){
    return {
        restrict: "E",
        transclude: true,
        templateUrl: "form-template.html",
        scope: {
            add: "&"
        },
        link: function(scope, elem, attrs){
            elem.find("#add-student-btn").bind("click", function(){
                scope.$apply(function(){
                    scope.add({student: scope.student});
                    scope.student = {};
                });
            });
        }
    }
});

app.directive("tableDirective", function(){
   return {
       restrict: "E",
       templateUrl: "table-template.html",
       scope: {
           array: "=",
           deleteFunc: "&"
       },
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

