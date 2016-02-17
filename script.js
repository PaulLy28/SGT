/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [
    {studentName: "Daniel Craig", course: "Math", studentGrade: 80},
    {studentName: "Pierce Brosnan ", course: "Science", studentGrade: 85},
    {studentName: "Sean Connery", course: "Math", studentGrade: 90},
    {studentName: "Timothy Dalton", course: "Sciene", studentGrade: 70}
];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
$(document).ready(function(){
    $("#add").click(function () {
        console.log("add button clicked");
        addStudent();
    });
});
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */

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
    if (nameAdded != null && courseAdded != null && gradeAdded != null) {
        student_object.studentName = nameAdded;
        student_object.course = courseAdded;
        student_object.studentGrade = gradeAdded;
       // student_object.delete = buttonDelete;
        student_array.push(student_object);
        console.log(student_object);
    }
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm(){

}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage() {
    var totalGrades = 0;
    for (var i = 0; i < student_array.length; i++) {
        var myIndex = i;
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

/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */

/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */


/**
 * Listen for the document to load and reset the data to the initial state
 */