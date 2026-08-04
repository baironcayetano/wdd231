const PARAMS = new URLSearchParams(window.location.search);

//Table Elements
const fNameField = document.getElementById("fName"),
      lNameField = document.getElementById("lName"),
      emailField = document.getElementById("email"),
      pNumberField = document.getElementById("pNumber"),
      bNameField = document.getElementById("bName"),
      memLvlField = document.getElementById("memLvl"),
      timestampField =  document.getElementById("timestamp");

//Information
const fName = PARAMS.get("fname"),
      lName = PARAMS.get("lname"),
      email = PARAMS.get("email"),
      pNumber = PARAMS.get("tel"),
      bName = PARAMS.get("bname"),
      memLvl = PARAMS.get("membership"),
      timestamp = PARAMS.get("timestamp");

//Rendering
fNameField.textContent = fName;
lNameField.textContent = lName;
emailField.textContent = email;
pNumberField.textContent = pNumber;
bNameField.textContent = bName;
memLvlField.textContent = memLvl;
timestampField.textContent = new Date(timestamp).toLocaleString();


