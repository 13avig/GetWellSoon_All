var conditionVal = window.localStorage.getItem("conditionVal")
var genderVal = window.localStorage.getItem("genderVal")
var ageVal = window.localStorage.getItem("ageVal")
var locationVal = window.localStorage.getItem("locationVal")

var resCondition = encodeURIComponent(conditionVal);
var resGender = encodeURIComponent(genderVal);
var resAge = encodeURIComponent(ageVal);
var resLocation = encodeURIComponent(locationVal);

function loadPage() {
  var leftContainer = document.getElementById("left-container");
  var url = "http://getwellsoonbackend-env.jdxtzxafph.us-east-1.elasticbeanstalk.com/trials/get?condition=" + resCondition;
  //var url = "http://localhost:5000/trials/get?condition=" + resCondition;"
  var request = new XMLHttpRequest();;
  request.open("GET", url);
  request.send();
  request.onload = function() {
    if(request.status >= 200 && request.status < 400) {
      window.localStorage.setItem("response", this.response);
      var trials = JSON.parse(this.response);
      var count = 0;
      trials.forEach(trial => {
        //console.log("all: " + trial.trialUniqueId + " " + trial.trialName);
        trialContainer = document.createElement("div");
        trialContainer.setAttribute("class", "trial-container");
        trialContainer.onclick = function() {
          window.localStorage.setItem("trialUniqueIdVal", trial.trialUniqueId);
          console.log("specific: " + trial.trialUniqueId);
          window.location.href = "details.html";
        };
        leftContainer.appendChild(trialContainer);
        const trialName = document.createElement("p");
        trialName.setAttribute("class", "trial-name");
        trialName.textContent = trial.trialName;
        trialContainer.appendChild(trialName);
        count++;
      })
      console.log(count);
      const trialCount = document.getElementById("trial-count");
      if(count == 1) {
        trialCount.innerHTML = "1 trial found";
      } else {
        trialCount.innerHTML = count + " trials found";
      }
    }
    leftContainer.style.display = "table-cell";
    var formContainer = document.getElementById("form-container");
    formContainer.style.display = "table-cell";
  }
}

//autofillForm();


//var url = "http://getwellsoonbackend-env.jdxtzxafph.us-east-1.elasticbeanstalk.com/trials/get?condition=" + resCondition;
//var url = "http://localhost:5000/trials/get?condition=" + resCondition;

//makeGetCallAndUpdateUI(url);

/*function changeForm() {
  var trialSecondaryContainer = document.getElementById('trials-secondary-container');
  trialSecondaryContainer.parentNode.removeChild(trialSecondaryContainer);
  var givenDistance = document.querySelector("input[name = 'location-filter']:checked").value;
  var url = "http://getwellsoonbackend-env.jdxtzxafph.us-east-1.elasticbeanstalk.com/trials/getByDistance/" + resCondition + "/" + resGender + "/" + resAge + "/" + resLocation + "/" + encodeURIComponent(givenDistance);
  makeGetCallAndUpdateUI(url);
}*/

/*function autofillForm() {
  var conditionField = document.getElementById("condition-field");
  conditionField.value = conditionVal;
  var genderField = document.getElementById("gender-field");
  genderField.value = genderVal;
  var ageField = document.getElementById("age-field");
  ageField.value = ageVal;
  var locationField = document.getElementById("location-field");
  locationField.value = locationVal;
}*/

/*
function submitForm() {
  var name = document.getElementById("name-field").value;
  givenGender = document.getElementById("gender-field").value;
  givenAge = document.getElementById("age-field").value;
  givenCondition = document.getElementById("condition-field").value;
  givenLocation = document.getElementById("location-field").value;
  var givenEmail = document.getElementById("email-field").value;
  var givenPhone = document.getElementById("phone-field").value;
  var data = {};
  data.patientName = givenName;
  data.patientGender = givenGender;
  data.patientAge = givenAge;
  data.patientCondition = givenCondition;
  data.patientZip = givenLocation;
  data.patientEmail = givenEmail;
  data.patientPhone = givenPhone;
  var json = JSON.stringify(data);
  makePostCall(json);
}*/
/*
function autofillTrialAlertsForm() {
  console.log("here");
  var conditionField = document.getElementById("condition-field");
  console.log(conditionField);
  conditionField.value = givenCondition;
  conditionField.style.backgroundColor = "rgb(232, 240, 254)";
  var genderField = document.getElementById("gender-field");
  genderField.value = givenGender;
  genderField.style.backgroundColor = "rgb(232, 240, 254)";
  var ageField = document.getElementById("age-field");
  ageField.value = givenAge;
  ageField.style.backgroundColor = "rgb(232, 240, 254)";
  var locationField = document.getElementById("location-field");
  locationField.value = givenLocation;
  locationField.style.backgroundColor = "rgb(232, 240, 254)";
}*/
/*
//function
function makeGetCallAndUpdateUI(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    if(request.status >= 200 && request.status < 400) {
      console.log("data found");
      const trialContainer = document.getElementById("accordion-container");
      const trialSecondaryContainer = document.createElement("div");
      trialSecondaryContainer.setAttribute("id", "accordion-secondary-container");
      trialContainer.appendChild(trialSecondaryContainer);
      var count = 0;
      data.forEach(trial => {
        console.log(trial);
        count++;
        const trialCard = document.createElement("div");
        trialCard.setAttribute("class", "trial-card");
        trialSecondaryContainer.appendChild(trialCard);
        const trialName = document.createElement("button");
        trialName.setAttribute("class", "trial-name");
        trialName.textContent = trial.trialName;
        trialName.onclick = function() {
          this.classList.toggle("is-open");
          var content = this.nextElementSibling;
          if (content.style.maxHeight) {
            content.style.maxHeight = null;
          } else {
            content.style.maxHeight = content.scrollHeight + "px";
          }
        }
        trialCard.appendChild(trialName);
        const trialContent = document.createElement("div");
        trialContent.setAttribute("class", "trial-content");
        trialCard.appendChild(trialContent);

        if(!trial.conditions.length == 0) {
          const trialConditions = document.createElement("p");
          trialConditions.setAttribute("class", "trial-conditions")
          conditionsStr = "Conditions treated: ";
          for(var x = 0; x < trial.conditions.length; x++) {
            if(x == 0) {
              conditionsStr += trial.conditions[0].conditionName;
            } else {
              conditionsStr += ", ";
              conditionsStr += trial.conditions[x].conditionName;
            }
          }
          trialConditions.textContent = conditionsStr;
          trialContent.appendChild(trialConditions);
        }
        /*
        if(!trial.interventions.length == 0) {
          const trialInterventions = document.createElement("p");
          trialInterventions.setAttribute("class", "trial-interventions")
          interventionsStr = "Interventions tested: ";
          for(var x = 0; x < trial.interventions.length; x++) {
            if(x == 0) {
              interventionsStr += trial.interventions[0].interventionName;
            } else {
              interventionsStr += ", ";
              interventionsStr += trial.interventions[x].interventionName;
            }
          }
          trialInterventions.textContent = interventionsStr;
          trialContent.appendChild(trialInterventions);
        }*//*
        if(!(trial.trialType == null || trial.trialType == "")) {
          const trialType = document.createElement("p");
          trialType.setAttribute("class", "trial-type");
          trialType.textContent = "Type: " + trial.trialType;
          trialContent.appendChild(trialType);
        }
        if(!(trial.trialPurpose == null || trial.trialPurpose == "")) {
          const trialPurpose = document.createElement("p");
          trialPurpose.setAttribute("class", "trial-purpose");
          trialPurpose.textContent = "Purpose: " + trial.trialPurpose;
          trialContent.appendChild(trialPurpose);
        }
        if(!(trial.trialUniqueId == null || trial.trialUniqueId == "")) {
          const trialUniqueId = document.createElement("p");
          trialUniqueId.setAttribute("class", "trial-unique-id");
          trialUniqueId.textContent = "Trial ID: " + trial.trialUniqueId;
          trialContent.appendChild(trialUniqueId);
        }
        if(!(trial.trialParticipantCount == null || trial.trialParticipantCount == 0)) {
          const trialParticipantCount = document.createElement("p");
          trialParticipantCount.setAttribute("class", "trial-participant-count");
          trialParticipantCount.textContent = trial.trialParticipantCount + " participants";
          trialContent.appendChild(trialParticipantCount);
        }

        if(!(trial.trialSponsor == null || trial.trialSponsor == "")) {
          const trialSponsor = document.createElement("p");
          trialSponsor.setAttribute("class", "trial-sponsor");
          trialSponsor.textContent = "Sponsored by " + trial.trialSponsor;
          trialContent.appendChild(trialSponsor);
        }

        if(!(trial.trialUniqueId == null || trial.trialUniqueId == "")) {
          const trialUrl = document.createElement("a");
          trialUrl.setAttribute("class", "trial-link");
          trialUrl.textContent = "See more details";
          trialUrl.href = "https://clinicaltrials.gov/ct2/show/" + trial.trialUniqueId;
          trialUrl.target = "_blank";
          trialContent.appendChild(trialUrl);
        }

      })
      const trialCount = document.getElementById("trial-count");
      if(count == 1) {
        trialCount.innerHTML = "1 trial found";
      } else {
        trialCount.innerHTML = count + " trials found";
      }
    } else {
      console.log("API Get Call Error: " + request.status);
    }
  }
  request.send();
}

function makePostCall(data) {
  var request = new XMLHttpRequest();
  request.open("POST", "http://getwellsoonbackend-env.jdxtzxafph.us-east-1.elasticbeanstalk.com/patients/add", true);
  //request.open("POST", "http://localhost:5000/patients/add", true);
  request.setRequestHeader('Content-type','application/json;');
  request.onload = function () {
    console.log(request.responseText);
  }
  request.send(data);
}

function accord() {
  var button = document.getElementById("hello")
  button.classList.toggle("is-open");
  var content = button.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";

  }
}*/

/*
if(givenCondition == "" && givenGender == "" && givenAge == "" && givenLocation == "") {
  var url = "http://localhost:5000/trials/get";
  makeGetCallAndUpdateUI(url);
} else if (givenCondition == "" || givenGender == "" || givenAge == "" || givenLocation == "") {
  console.log("Error");
} else {
  autofillTrialAlertsForm();
  var url = "http://localhost:5000/trials/getBy/" + resCondition + "/" + resGender + "/" + resAge + "/" + resLocation;
  makeGetCallAndUpdateUI(url);
}
*/
