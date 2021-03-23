function submitForm() {

  var conditionVal = document.getElementById("condition-field").value;
  var genderVal = document.getElementById("gender-field").value;
  var ageVal = document.getElementById("age-field").value;
  var locationVal = document.getElementById("location-field").value;

  window.localStorage.setItem("conditionVal", conditionVal);
  window.localStorage.setItem("genderVal", genderVal);
  window.localStorage.setItem("ageVal", ageVal);
  window.localStorage.setItem("locationVal", locationVal);

}
