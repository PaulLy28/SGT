//global array variable defined
var student_array = [];

var inputIds = ['studentName', 'course', 'studentGrade'];

//inline onclick added to button
    //defines what the add button will do once it is clicked. it will add new students
    //update the data of the students
    //and all input fields will be cleared once added
function addStudentClicked(){
 //   addStudent(); don't want this here anymore it will add to the dom and when you click it get data from server it will add the same one to the end once data has been loaded
 //   updateData(); not needed as well it is called in the addStudentToServer function below
    addStudentToServer();
 //   clearAddStudentForm();  not needed here as well anymore it will be called in the addStudentToServer function
}

//inline onclick added to button
    //when the canceled button is clicked all input fields will be cleared
function cancelClicked(){
    clearAddStudentForm();
}
//will reset the dom and the repopulate the dom with data from the server
function getDataClicked(){
    reset();
    getServerData();
}

//function to add new students
    //variable with a empty object
    //variable of name added set equal to the jquery selector of input with attribute of name equal to the student name and return the value.
    //variable of course added set equal to the jquery selector of input with attribute of name equal to the course and return the value.
    //variable of grade added set equal to the jquery selector of input with attribute of name equal to the student grade and return the value.
    //a conditional to check that the input fields are not null. if the input fields are not null the following will occur
        //student object variable with the object key of studentName will be equal to the nameAdded variable
        //student object variable with the object key of course will be equal to the courseAdded variable
        //student object variable with the object key of studentGrade will be equal to the gradeAdded variable
        //after all key values for the new student has been stored to the student object push the data into the student_array variable
        //call function to update the student list
    //a conditional for when the input fields are not null to return undefined
function addStudent(student_data, fromServer) {
    student_object = {};
    //console.log(fromServer);
    if (fromServer == false){
        //if(student_data === undefined) {
        var nameAdded = $("input[name=studentName]").val();
        var courseAdded = $("input[name=course]").val();
        var gradeAdded = $("input[name=studentGrade]").val();
        var studentID= student_data;
    }
    else{
        var nameAdded = student_data.name;
        var courseAdded = student_data.course;
        var gradeAdded = student_data.grade;
        var studentID = student_data.id;
    }

    if (nameAdded != "" && courseAdded != "" && parseInt(gradeAdded) != NaN) {
        student_object.studentName = nameAdded;
        student_object.course = courseAdded;
        student_object.studentGrade = parseInt(gradeAdded);
        student_object.id = studentID;
        student_array.push(student_object);
        $('.noData').remove();
        //console.log(student_object);
        high_and_low_grade(student_object.studentGrade);
        updateStudentList();
    }
    else {
        console.log("error");
        return undefined;
    }
}

//a function to clear the input fields
    //jquery selector selecting the input fields and setting the val to an empty string
function clearAddStudentForm() {
    $('input').val('');
}

//a function to calculate the average grade and display the average
    //local variable of the totalGrades equal to zero
    //for loop going through the student array length
    //concat the totalGrades added to the student array at index position with object key of studentGrade
    //end the for loop
    //a variable of the totalAvg is equal to the totalGrades divided by the student array length
    //return the totalAvg
function calculateAverage(/*gradeToDelete*/) {
    var totalGrades = 0;
    //console.log('before deleting...', student_array.length);
    //console.log('grade to be deleted...', gradeToDelete);

    for (var i = 0; i < student_array.length; i++) {
        totalGrades += parseInt(student_array[i].studentGrade);
        //console.log("totalGrades", totalGrades);
    }
    var totalAvg = Math.round(totalGrades / student_array.length);
    console.log('total average', totalAvg);
    return totalAvg;
}

//function to update the data
    //a jquery selector selecting the class of avgGrade with a text method calling the calculateAverage function
    //call the function to update the student list
function updateData(){
    $('.avgGrade').text(calculateAverage());
    updateStudentList();
}

//loop through student array
    //call addStudentToDom for each student in the array
function updateStudentList(){

/*    $("tbody").empty();
    for(var i= 0; i < student_array.length; ++i)
        addStudentToDom(student_array[i],i);*/

    $('tbody > tr').remove();
    for(var i= 0; i < student_array.length; i++) {
        //console.log(student_array[i]);
        addStudentToDom(student_array[i], i);
    }
}
//studentObj parameter is the object in the student array
//index parameter is the the position of the object (studentObj) in the student array
function addStudentToDom(studentObj, index){
        var trNew = $("<tr>");
        var tdName = $("<td>",{
            text: studentObj.studentName
        });
        var tdCourse = $("<td>",{
            text: studentObj.course
        });
        var tdGrade = $("<td>",{
            text: studentObj.studentGrade
        });
        var tdDelete = $("<td>",{
        });
        var deleteButtonNew = $("<button>",{
            text: 'Delete',
            class: "btn btn-danger",
            'data-index': index,
           // data-toggle: "popover",
            click: function(){

                var newIndex = student_array.indexOf(studentObj);
                console.log('element is ',trNew,studentObj,newIndex);
                console.log('this object is in element # '+index);
                deleteStudentFromServer(studentObj);


                //student_array.splice(student_array.indexOf(studentObj), 1);
                //trNew.remove();

               // console.log(this);

            }
        });
        tdDelete.append(deleteButtonNew);
        trNew.append(tdName, tdCourse, tdGrade, tdDelete);
        $(".student-list > tbody").append(trNew);
        studentObj.element = trNew;
}

//function to reset the application
    //set the student array to and empty array
    //call the function to update the student list
function reset(){
    student_array=[];
    updateStudentList();
    var unavailable = $('<td>').addClass('noData').attr('colSpan','4').html('<h4>User Info Unavailable</h4>');
    $('.student-list > tbody').append(unavailable);
}

//v1.0 scope
function getServerData() {
    var apiKey = {api_key: "1fu4QTyxd4"};
    $.ajax({
        dataType: "json",
        data: apiKey,
        method: "post",
        url: "http://s-apis.learningfuze.com/sgt/get",
        success: function (response) {
            //serverData = response;
            console.log(response);
            for(var i = 0; i < response.data.length; i++){
                //student_array.push(serverData.data[i]);
                addStudent(response.data[i], true);
            }
            updateData();
        }
    });
}
//studentobj is a parameter that is each student object in the student array
//in the success function the parameter response is the result being returned from the ajax call
//the conditional below verifies if the ajax call is successful then that object in the student array will be deleted (element is the table row)
//declared a variable that is referencing the index position of the student object in the student array
//in the student array remove 1 student object
//if success is false then alert message will appear. in the alert message it is targeting the response and in the response the errors at position 0. (in the dev tool, network tab, select "delete", preview tab, expand success false, expand errors, shows position.
function deleteStudentFromServer(studentObj){
    var deleteData = {api_key: "1fu4QTyxd4", student_id: studentObj.id};
    $.ajax({
        dataType: "json",
        data: deleteData,
        method: "post",
        url: "http://s-apis.learningfuze.com/sgt/delete",
        success: function(response) {
            console.log(response);
            if (response.success === true) {
                studentObj.element.remove();
                console.log(studentObj, response);
                var studentIndex = student_array.indexOf(studentObj);
                student_array.splice(studentIndex, 1);
            }
            else {
                alert(response.errors[0]);
            }
            calculateAverage(); //go to calculate average
            updateData(); //update data after calculating
        }
    });
}
//var studentDataToServer;
function addStudentToServer(){
   // var idToStore;
    $.ajax({
        dataType: 'json',
        data: {
            api_key: "1fu4QTyxd4",
            name: $("input[name=studentName]").val(),//student's name
            course: $("input[name=course]").val(),//student's course
            grade: parseInt($("input[name=studentGrade]").val()),
            //id: 'new_value'
        },
        method: 'post',
        url: 'http://s-apis.learningfuze.com/sgt/create',
        success: function(response){
            //idToStore = response.new_id;
            //addStudent(response.new_id, false);
            //updateData();
            if (response.success == true) {
                addStudent(response.new_id, false);
                updateData();
                clearAddStudentForm();
            }
            console.log('the ajax call is successful! ', response);
           // console.log("data", $("input[name=studentName]").val(), $("input[name=course]").val(),
                //parseInt($("input[name=studentGrade]").val()));
        },
        error: function(response){
            console.log('the ajax call is unsuccessful! ');
        }
    })
}

//onload event that will call the reset function

$(document).ready(function(){
    reset();
    getServerData();
});

/*//code below is for the autocomplete.
var courseList ={};
function autoComplete(input){
    for(var i=0; i < student_array.length; i++)
        var course =student_array[i].course;
    courseList[course]=1;
}

//timer for the autocomplete. Not required but nice feature
var timer= null;
$('body').on('keyup', 'input', function (event) {
    console.log('keyup: ', event);
    if(timer!=null){
        clearTimeout(timer);
    }
    timer= setTimeout(autoComplete,500);
});
//end of timer*/

//Function to check for the lowest and highest grades
var highgrade = null;
var lowgrade = null;
function high_and_low_grade( studentGrade ) {
    if( highgrade == null ) {
        highgrade = studentGrade;
        lowgrade = studentGrade;
        console.log("High Grade: " + highgrade, "Low Grade: " + lowgrade);
    }
    else if( studentGrade > highgrade ) {
        highgrade = studentGrade;
        console.log("High Grade: " + highgrade, "Low Grade: " + lowgrade);
    }
    else if( studentGrade < lowgrade ) {
        lowgrade = studentGrade;
        console.log("High Grade: " + highgrade, "Low Grade: " + lowgrade);
    }
}

//highlight function will highlight highest and lowest grades

/*function highlighter(){
    var lowest = 100;
    var highest = 0;
    var temp;
    for (var i = student_array.length-1; i >= 0; i--) {
        temp = student_array[i].studentGrade;
        if (temp < lowest) {
            lowest = temp;
            $('.table.student-list > tbody > tr.table:nth-child(' + i + ') > td ').addClass('bg-danger');
        }
        if (temp > highest) {
            highest = temp;
            $('.table.table > tbody > tr.table:nth-child(' + i + ') > td ').addClass('bg-success');
        }
    }
    console.log('highest is', highest);
    console.log('lowest is', lowest);
}*/

    //
    ////moved keyup code here to test. keyup works here
    //var timer= null;
    //$('body').on('keyup', 'input', function (event) {
    //    console.log('keyup: ', event);
    //    if(timer!=null){
    //        clearTimeout(timer)
    //    }
    //    timer= setTimeout(autoComplete,500)
    //});
    ////end keyup


