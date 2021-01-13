let people = 1;
let maxPeople = 8;
let minPeople = 1;
let actType = "diy";
let activ = "nothing yet";
let activeLink = "noLink";

window.onload = () => setupEverything();
function setupEverything() { 
    updateText();
}
function getNewActivity() {
    activ = "waiting";
    updateText()
    fetch(`https://www.boredapi.com/api/activity?type=${actType}&participants=${people}`)
        .then((d) => {
            return d.json();
        })
        .then((dJson) => {
            
            if (typeof dJson.error !== 'undefined') {
                activ = "No Ideas. sorry!" + dJson.error;
                activeLink = "noLink"
            } else { 
                activ = dJson.activity;
                activeLink = dJson.link != "" ? activeLink = dJson.link : "noLink";
            }
            updateText()
        })
        .catch((err) => {
            console.log("error: " + "something aint working");
        })
    }
    
function changeActivityType(newActType) {
    actType = newActType;
    updateText()
 }

function addPeople(num) {
        if (people + num >= maxPeople) {
            people = maxPeople
        } else if (people + num < minPeople) { 
            people = minPeople
        }else {
            people += num;
    }
    updateText();
    }
    
    function updateText() {
        let thePeopleDiv = document.getElementById("peopleText");
        thePeopleDiv.innerHTML = people;
        let theTypeDiv = document.getElementById("activityTypeText");
        theTypeDiv.innerHTML = actType;
        let theActivityDiv = document.getElementById("actText");
        theActivityDiv.innerHTML = activ;
        let linkText = document.getElementById("actLinkText");
        linkText.innerHTML = activeLink == "noLink" ? "" : "Learn More";
        linkText.parentElement.href = activeLink;
 }