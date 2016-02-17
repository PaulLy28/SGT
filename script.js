/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */
var inputIds = ['studentName', 'course', 'studentGrade'];
/**
 * addClicked - Event Handler when user clicks the add button
 */
function addStudentClicked(){
        addStudent();
        updateData();
        clearAddStudentForm();
    }
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
  function cancelClicked(){
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent() {
    student_object = {};
    var nameAdded = $("input[name=studentName]").val();
    var courseAdded = $("input[name=course]").val();
    var gradeAdded = $("input[name=studentGrade]").val();
    //var buttonDelete = $("button").addClass("btn btn-danger").text("delete");
    //if (nameAdded != null && courseAdded != null && gradeAdded != null) {
    if ($("input") != null) {
        student_object.studentName = nameAdded;
        student_object.course = courseAdded;
        student_object.studentGrade = gradeAdded;
       // student_object.delete = buttonDelete;
        student_array.push(student_object);
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
function clearAddStudentForm() {
    $('input').val('');
}

/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var totalGrades = 0;
    for (var i = 0; i < student_array.length; i++) {
        totalGrades += student_array[myIndex].studentGrade;
        console.log("totalGrades", totalGrades);
    }
    var totalAvg = totalGrades / student_array.length;
    //console.log("total avg", totalAvg);
    return totalAvg;
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData(){
    $('.avgGrade').text(calculateAverage());
    updateStudentList();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList(){
    for(var i= 0; i < student_array.length; ++i)
        addStudentToDom(student_array[i],i);
}

//loop through student array
//  call addStudentToDom for each student in the array

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

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset(){
    student_array=[];
    updateStudentList();
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function(){
    reset();
});