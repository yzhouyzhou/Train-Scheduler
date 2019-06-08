// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAMJZofxoffV7y5BwARMaoYoahXWn-URVY",
  authDomain: "trainschedule-d6a59.firebaseapp.com",
  databaseURL: "https://trainschedule-d6a59.firebaseio.com",
  projectId: "trainschedule-d6a59",
  storageBucket: "trainschedule-d6a59.appspot.com",
  messagingSenderId: "110018426333",
  appId: "1:110018426333:web:ff7bdf5fe8d2b253"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = $("#first-train-time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding user input train data
  var newTrain = {
    train_name: trainName,
    destination: destination,
    first_train_time: firstTrainTime,
    frequency: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.trainname);
  console.log(newTrain.destination);
  console.log(newTrain.firsttraintime);
  console.log(newTrain.frequency);

  alert("A new train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train_name;
  var dest = childSnapshot.val().destination;  
  var freq = childSnapshot.val().frequency;
  var firstTrainTime = childSnapshot.val().first_train_time;

  // one train Info
  console.log(trainName);
  console.log(dest);
  console.log(freq);
  console.log(firstTrainTime);
  
  var ms = moment(firstTrainTime,"HH:mm a").diff(moment());
var d = moment.duration(ms);
// var s = d.format("hh:mm:ss");
console.log(ms, d);
var timeArr = moment().format('x');
let diff =(timeArr - moment(firstTrainTime,"HH:mm a").format('x')) / (1000* 60);
diff/1000
console.log(ms, d, timeArr, diff);

  // first train time
  // var trainTime = moment(firstTrainTime, "HH:mm a");
  // var trainTimeHour = parseInt(moment(firstTrainTime, "HH:mm a").format("HH"));
  // var trainTimeMin = parseInt(moment(firstTrainTime, "HH:mm a").format("mm"));
  // var totalMin = trainTimeHour * 60 + trainTimeMin;
  // console.log(trainTime, trainTimeHour, trainTimeMin, totalMin );
  // Calculate the minutes away
  // var thisMoment = moment().format("mm");

  // var thisMomentHour = parseInt(moment().format("HH") ) ;
  // var thisMomentMinute = parseInt(moment().format("mm"));
  // var momentMin = thisMomentHour * 60 + thisMomentMinute; 
  // console.log(minutesAway, thisMomentHour,thisMomentMinute, momentMin );
  // var diff;
  // if(momentMin < totalMin){
  //   diff = (momentMin + 24 * 60 - totalMin) % 20;
  // }
  // else{
  //   diff = (momentMin  - totalMin) % 20;
  // }
  // console.log(diff);
  var minutesAway = 20 ;//- diff;

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(firstTrainTime),    
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-schedule-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
