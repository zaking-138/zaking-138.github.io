let zipInput = document.querySelector("#zip");
zipInput.addEventListener("input", getZipInfo);

let passwordInput = document.querySelector("#password");
passwordInput.addEventListener("focus", showSuggestedPW);
passwordInput.addEventListener("blur", hideSuggestedPW);
// passwordInput.addEventListener("input", checkPassword);

let passwordError = document.querySelector("#password-error");
// passwordInput.addEventListener("focus", checkPassword);
// passwordInput.addEventListener("blur", hidePasswordError);

let retypeInput = document.querySelector("#retype-password");
// retypeInput.addEventListener("input", checkRetypedPassword);

let usernameInput = document.querySelector("#username");
// usernameInput.addEventListener("input", checkUsername);

let stateInput = document.querySelector("#states-select")
stateInput.addEventListener("input", makeCountyList);

let zipError = document.querySelector("#zip-error");
zipError.style.display = "none";

let submitBtn = document.querySelector("#sign-up");
submitBtn.addEventListener("click", checkPassword);
submitBtn.addEventListener("click", checkRetypedPassword);
submitBtn.addEventListener("click", checkUsername);


async function setupForm() {

    try {
        let statesResponse = await fetch("https://csumb.space/api/allStatesAPI.php");

        if (!statesResponse.ok) {
            throw new Error("Response Failed")
        }

        let statesData = await statesResponse.json();
        console.log(statesData);

        let statesSelect = document.querySelector("#states-select");

        for (let stateData of statesData) {
            let stateOption = document.createElement("option");
            stateOption.id = stateData.usps;
            stateOption.value = stateData.usps;
            stateOption.textContent = stateData.state;
            statesSelect.appendChild(stateOption);
        }
        makeCountyList();
        hideSuggestedPW();
        hidePasswordError();

    } catch (apiError) {
        console.error(apiError);
    }
}
setupForm();

async function makeCountyList() {
    try {
        let queryString = "https://csumb.space/api/countyListAPI.php?state=" + stateInput.value;
        let countiesResponse = await fetch(queryString);

        if (!countiesResponse.ok) {
            throw new Error("Response Failed")
        }

        let countiesData = await countiesResponse.json();
        console.log(countiesData);

        let countiesSelect = document.querySelector("#counties-select");
        countiesSelect.innerHTML = '';

        for (let countyData of countiesData) {
            let countyOption = document.createElement("option");
            countyOption.id = countyData.county;
            countyOption.value = countyData.county;
            countyOption.textContent = countyData.county;
            countiesSelect.appendChild(countyOption);
        }


    } catch (apiError) {
        console.error(apiError);
    }
}



async function getZipInfo() {

    try {
        let queryString = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipInput.value;
        let zipResponse = await fetch(queryString);

        if (!zipResponse.ok) {
            throw new Error("Response Failed")
        }

        let zipData = await zipResponse.json();
        console.log(zipData);

        if (!zipData) {
            zipError.style.display = "inline";
        } else {
            zipError.style.display = "none";
        }

        document.querySelector("#city").textContent = zipData.city;
        document.querySelector("#latitude").textContent = zipData.latitude;
        document.querySelector("#longitude").textContent = zipData.longitude;


    } catch (apiError) {
        console.error(apiError);
    }

}

async function showSuggestedPW() {
    try {
        let passwordResponse = await fetch("https://csumb.space/api/suggestedPassword.php?length=8");

        let passwordData = await passwordResponse.json();

        let suggestedPW = document.querySelector("#suggested-pw");
        suggestedPW.textContent = `Suggested Password: ${passwordData.password}`;
        suggestedPW.style.color = "grey";
        suggestedPW.style.display = "flex";

    } catch (apiError) {
        console.error(apiError);
    }
}
function hideSuggestedPW() {
    let suggestedPassword = document.querySelector("#suggested-pw")
    suggestedPassword.style.display = "none";

}
function checkPassword() {
    passwordError.style.display = "flex";
    if (passwordInput.value.length == 0) {
        passwordError.textContent = "";
        return;
    }
    if (passwordInput.value.length < 6) {
        passwordError.textContent = "Password too short!";
        passwordError.style.color = "orange";
        return;
    } else {
        passwordError.textContent = "";
    }
    
}
function hidePasswordError(){
    passwordError.style.display = "none";
}
function checkRetypedPassword() {
    let input = retypeInput;
    let retypeError = document.querySelector("#retype-error");
    if (input.value == "") {
        retypeError.textContent = "";
        return;
    }
    if(input.value === passwordInput.value){
        retypeError.textContent = "Passwords match!";
    }else{
        retypeError.textContent = "Error: Inputs don't match!"
    }


}

async function checkUsername() {
    let outputMessage = document.querySelector("#error-message")
    if (usernameInput.value.length == 0) {
        outputMessage.textContent = "";
        return;
    }
    if (usernameInput.value.length < 3) {
        outputMessage.textContent = "Username too short!";
        outputMessage.style.color = "orange";
        return;
    }

    try {
        let queryString = "https://csumb.space/api/usernamesAPI.php?username=" + usernameInput.value;
        let usernameResponse = await fetch(queryString);

        if (!usernameResponse.ok) {
            throw new Error("Response Failed");
        }

        let usernameData = await usernameResponse.json();


        if (!usernameData.available) {
            outputMessage.textContent = "Username unavailable!";
            outputMessage.style.color = "red";
        } else {
            outputMessage.textContent = "Username available!";
            outputMessage.style.color = "green";
        }


    } catch (apiError) {
        console.error(apiError);
    }

}
