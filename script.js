/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
//global array variable defined
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds = ['studentName', 'course', 'studentGrade'];
/**
 * addClicked - Event Handler when user clicks the add button
 */
//inline onclick added to button
    //defines what the add button will do once it is clicked. it will add new students
    //update the data of the students
    //and all input fields will be cleared once added
function addStudentClicked(){
        addStudent();
        updateData();
        clearAddStudentForm();
    }
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
//inline onclick added to button
    //when the canceled button is clicked all input fields will be cleared
  function cancelClicked(){
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
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
function addStudent() {
    student_object = {};
    var nameAdded = $("input[name=studentName]").val();
    var courseAdded = $("input[name=course]").val();
    var gradeAdded = $("input[name=studentGrade]").val();
    //if (nameAdded != null && courseAdded != null && gradeAdded != null) {
    if ($("input") != null) {
        student_object.studentName = nameAdded;
        student_object.course = courseAdded;
        student_object.studentGrade = gradeAdded;
        student_array.push(student_object);
        $('.noData').remove();
        console.log(student_object);
        updateStudentList();
    }
    else {
        console.log("error");
        return undefined;
    }
}


/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
//a function to clear the input fields
    //jquery selector selecting the input fields and setting the val to an empty string
function clearAddStudentForm() {
    $('input').val('');
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
//a function to calculate the average grade and display the average
    //local varialbe of the totalGrades equal to zero
    //for loop going through the student array length
    //conccat the totalGrades added to the student array at index position with object key of studentGrade
    //end the for loop
    //a variable of the totalAvg is equal to the totalGrades divided by the student array length
    //return the totalAvg
function calculateAverage() {
    var totalGrades = 0;
    for (var i = 0; i < student_array.length; i++) {
        totalGrades += parseInt(student_array[i].studentGrade);
        console.log("totalGrades", totalGrades);
    }
    var totalAvg = Math.round(totalGrades / student_array.length);
    //console.log("total avg", totalAvg);
    return totalAvg;
}
/**
 * updateData - centralized function to update the average and call student list update
 */
//function to update the data
    //a jquery selector selecting the class of avgGrade with a text method calling the calculateAverage function
    //call the function to update the student list
function updateData(){
    $('.avgGrade').text(calculateAverage());
    updateStudentList();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
//loop through student array
    //call addStudentToDom for each student in the array
function updateStudentList(){
    $('tbody > tr').remove();
    for(var i= 0; i < student_array.length; ++i)
        addStudentToDom(student_array[i],i);
}

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
//get a student from parameter
//create the tr for the student
//create the name td
    //fill it with the student's name
//create the course td
    //fill it with the student's course
//create the grade td
    //fill it with the student's grade
//create the button td
    //create the button
        //fill the button with text
        //fill the button with classes
//add the click handler onto the button
//add the button into the button td
//add the name td, course td, grade td, and button td into the student-list tbody
//drink beer

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
            click: function(){
                console.log('element is ',trNew,studentObj);
                console.log('this object is in element # '+index);
                student_array.splice(trNew, 1);
                $(this).parents('tr').remove();
            }
        });
        tdDelete.append(deleteButtonNew);
        trNew.append(tdName, tdCourse, tdGrade, tdDelete);
    $(".student-list > tbody").append(trNew);
}
//code below is for the autocomplete.
var courseList ={};
function autoComplete(input){
    for(var i=0; i < student_array.length; i++)
    var course =student_array[i].course
    courseList[course]=1;
}

//timer for the autocomplete. Not required but nice feature
var timer= null;
$('body').on('keyup', 'input', function (event) {
    console.log('keyup: ', event);
    if(timer!=null){
        clearTimeout(timer)
    }
    timer= setTimeout(autoComplete,500)
});
//end of timer
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
//function to reset the application
    //set the student array to and empty array
    //call the function to update the student list
function reset(){
    student_array=[];
    updateStudentList();
    var unavailable = $('<td>').addClass('noData').attr('colSpan','4').html('<h4>User Info Unavailable</h4>');
    $('.student-list > tbody').append(unavailable);
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
//onload event that will call the reset function
$(document).ready(function(){
    reset();
    //moved keyup code here to test. keyup works here
    var timer= null;
    $('body').on('keyup', 'input', function (event) {
        console.log('keyup: ', event);
        if(timer!=null){
            clearTimeout(timer)
        }
        timer= setTimeout(autoComplete,500)
    });
    //end keyup
});