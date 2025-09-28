let zipInput = document.querySelector("#zip");
zipInput.addEventListener("input", getZipInfo);
let passwordInput = document.querySelector("#password");
passwordInput.addEventListener("mouseover", showSuggestedPW);
passwordInput.addEventListener("mouseout", hideSuggestedPW);
let usernameInput = document.querySelector("#username");
usernameInput.addEventListener("input", checkUsername);
let stateInput = document.querySelector("#states-select")
stateInput.addEventListener("input", makeCountyList);

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


    } catch (apiError) {
        console.error(apiError);
    }
}

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

setupForm();

async function getZipInfo() {

    try {
        let queryString = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipInput.value;
        let zipResponse = await fetch(queryString);

        if (!zipResponse.ok) {
            throw new Error("Response Failed")
        }

        let zipData = await zipResponse.json();
        console.log(zipData);

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

        document.querySelector("#suggest-pw").textContent = passwordData.Password;
    } catch (apiError) {
        console.error(apiError);
    }
}
function hideSuggestedPW() {
    document.querySelector("#suggest-pw").textContent = "";
}

async function checkUsername() {
    try {
        let queryString = "https://csumb.space/api/usernamesAPI.php?username=" + usernameInput.value;
        let usernameResponse = await fetch(queryString);

        if (!usernameResponse.ok){
            throw new Error("Response Failed");
        }

        let usernameData = await usernameResponse.json();

        let outputMessage = document.querySelector("#error-message")
        if(!usernameData.available){
            outputMessage.textContent = "Username unavailable!";
            outputMessage.style.color = "red";
        }else{
            outputMessage.textContent = "Username available!";
            outputMessage.style.color = "grey";
        }
        

    } catch (apiError) {
        console.error(apiError);
    }

}
