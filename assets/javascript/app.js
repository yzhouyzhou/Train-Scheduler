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

// Button for adding a new train line
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrainTime = $("#first-train-time-input").val().trim();
  var frequency = $("#frequency-input").val().trim();
  if (trainName.length === 0 ||
    destination.length === 0 ||
    firstTrainTime.length === 0 ||
    frequency.length === 0) {
    alert("Please fill in all the fields for adding a train line");
    return;
  }

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
  console.log(newTrain.trainName);
  console.log(newTrain.destination);
  console.log(newTrain.firstTrainTime);
  console.log(newTrain.frequency);

  alert("A new train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-train-time-input").val("");
  $("#frequency-input").val("");
});

function calcMinutesAway(firstTime, tFrequency) {
  // To avoid negative diff, the first train is set to start this time of last year 
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log("firstTimeConverted: " + firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log("tRemainder: " + tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  return tMinutesTillTrain;
}

function getNextTrainTime(mAway) {
  var nextTrain = moment().add(mAway, "minutes");
  var nextTrainTimeFormat = moment(nextTrain).format("hh:mm a");

  console.log("ARRIVAL TIME: " + nextTrainTimeFormat)
  return nextTrainTimeFormat;
}

// add a new row into database trigger the screen refresh
// reload data from firebase database and display them
// calculate the next train and minutes away for each line
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().train_name;
  var dest = childSnapshot.val().destination;
  var freq = childSnapshot.val().frequency;
  var firstTrainTime = childSnapshot.val().first_train_time;

  // new train Info
  console.log(trainName);
  console.log(dest);
  console.log(freq);
  console.log(firstTrainTime);

  var minutesAway = calcMinutesAway(firstTrainTime, freq);
  var nextTrainTime = getNextTrainTime(minutesAway);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(nextTrainTime),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-schedule-table > tbody").append(newRow);
});
