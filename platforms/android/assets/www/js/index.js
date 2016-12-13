"use strict";
if (document.deviceready) {
    document.addEventListener('deviceready', onDeviceReady);
}
else {
    document.addEventListener('DOMContentLoaded', onDeviceReady);
}
let pages = []; 
let links = []; 
let team = new Array(4);

function onDeviceReady() {
    console.log("Ready");
    serverData.getJSON();
    pages = document.querySelectorAll('[data-role="page"]');
    links = document.querySelectorAll('[data-role="nav"] a');
    document.getElementById('reloadApp').addEventListener("click", function () {
        serverData.getJSON();
    });
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", navigate);
    }
}
let serverData = {
    url: "http://griffis.edumedia.ca/mad9014/sports/quidditch.php"
    , httpRequest: "GET"
    , getJSON: function () {
        let headers = new Headers();
        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
        console.dir("headers: " + headers.get("Content-Type"));
        console.dir("headers: " + headers.get("Accept"));
        let options = {
            method: serverData.httpRequest
            , mode: "cors"
            , headers: headers
        };
        let request = new Request(serverData.url, options);
        console.log(request);
        fetch(request).then(function (response) {
            console.log(response);
            return response.json();
        }).then(function (data) {
            setupStandings(data);
            displayData(data);
        }).catch(function (err) {
            alert("Error: " + err.message);
        });
    }
};

function displayData(data) {
    localStorage.setItem("kapc003", JSON.stringify(data));
    console.log(data);
    //    var myScoreData = JSON.parse(localStorage.getItem("kapc0003"));
    //    console.log("From LS: ");
    //    console.log(myScoreData);
    console.log(data.teams);
    console.log(data.scores);
    let ul = document.querySelector(".results-list");
    ul.innerHTML = " "; //clear existing items
    data.scores.forEach(function (value) {
        let li = document.createElement("li");
        li.className = "score";
        let h3 = document.createElement("h3");
        h3.textContent = value.date;
        let homeTeam = null;
        let awayTeam = null;
        ul.appendChild(li);
        ul.appendChild(h3);
        let tableResults = document.createElement("table");
        tableResults.className = "resultsTable";
        let theadResults = document.createElement("thead");
        let theadHome = document.createElement("th");
        theadHome.textContent = "Home";
        let theadScore = document.createElement("th");
        theadScore.textContent = "Scores";
        let theadAway = document.createElement("th");
        theadAway.textContent = "Away";
        theadResults.appendChild(theadHome);
        theadResults.appendChild(theadScore);
        theadResults.appendChild(theadAway);
        tableResults.appendChild(theadResults);
        value.games.forEach(function (item) { 
            homeTeam = getTeamName(data.teams, item.home);
            awayTeam = getTeamName(data.teams, item.away);
            let teamIconHome = document.createElement("img");
            if (homeTeam == "Gryffindor") {
                teamIconHome.src = "./img/Gryffindor.png";
            }
            else if (homeTeam == "Ravenclaw") {
                teamIconHome.src = "./img/Ravenclaw.png";
            }
            else if (homeTeam == "Slytherin") {
                teamIconHome.src = "./img/Slytherin.png";
            }
            else if (homeTeam == "Hufflepuff") {
                teamIconHome.src = "./img/Hufflepuff.png";
            }
            let teamIconAway = document.createElement("img");
            if (awayTeam == "Gryffindor") {
                teamIconAway.src = "./img/Gryffindor.png";
            }
            else if (awayTeam == "Ravenclaw") {
                teamIconAway.src = "./img/Ravenclaw.png";
            }
            else if (awayTeam == "Slytherin") {
                teamIconAway.src = "./img/Slytherin.png";
            }
            else if (awayTeam == "Hufflepuff") {
                teamIconAway.src = "./img/Hufflepuff.png";
            }
            let tbodyResults = document.createElement("tbody");
            let trResults = document.createElement("tr");
            let tdHome = document.createElement("td");
            tdHome.textContent = homeTeam;
            let tdScores = document.createElement("td");
            tdScores.textContent = "    " + item.home_score + " - " + item.away_score + "  ";
            let tdAway = document.createElement("td");
            tdAway.textContent = awayTeam;
            if (item.home_score > item.away_score) {
                for (let i = 0; i < team.length; i++) {
                    if (team[i].name == homeTeam) {
                        team[i].wins += 1;
                    }
                }
                for (let i = 0; i < team.length; i++) {
                    if (team[i].name == awayTeam) {
                        team[i].loses += 1;
                    }
                }
            }
            else if (item.home_score < item.away_score) {
                for (let i = 0; i < team.length; i++) {
                    if (team[i].name == homeTeam) {
                        team[i].loses += 1;
                    }
                }
                for (let i = 0; i < team.length; i++) {
                    if (team[i].name == awayTeam) {
                        team[i].wins += 1;
                    }
                }
            }
            else if (item.home_score == item.away_score) {
                for (let i = 0; i < team.length; i++) {
                    if (team[i].name == homeTeam) {
                        team[i].ties += 1;
                    }
                }
                for (let i = 0; i < team.length; i++) {
                    if (team[i].name == awayTeam) {
                        team[i].ties += 1;
                    }
                }
            }
            
            
            // Display for Phone
            if(homeTeam == "Slytherin"){
                let br = document.createElement("br");
                tdHome.appendChild(br);
            
            }
            if(homeTeam == "Gryffindor"){
                let br = document.createElement("br");
                tdHome.appendChild(br);
            
            }
            if(homeTeam == "Hufflepuff"){
                let br = document.createElement("br");
                tdHome.appendChild(br);
            
            }
            if(homeTeam == "Ravenclaw"){
                let br = document.createElement("br");
                tdHome.appendChild(br);
            
            }
            if(awayTeam == "Slytherin"){
                let br = document.createElement("br");
                tdAway.appendChild(br);
            }
             if(awayTeam == "Gryffindor"){
                let br = document.createElement("br");
                tdAway.appendChild(br);
            }
             if(awayTeam == "Hufflepuff"){
                let br = document.createElement("br");
                tdAway.appendChild(br);
            }
             if(awayTeam == "Ravenclaw"){
                let br = document.createElement("br");
                tdAway.appendChild(br);
            }
            
            
            trResults.appendChild(tdHome);
            tdHome.appendChild(teamIconHome);

            trResults.appendChild(tdScores);
            
            trResults.appendChild(tdAway);
            tdAway.appendChild(teamIconAway);
            
            tbodyResults.appendChild(trResults);
            tableResults.appendChild(tbodyResults);
            ul.appendChild(tableResults);
        });
    });
    displayStandings();
}

function getTeamName(teams, id) {
    for (let i = 0; i < teams.length; i++) {
        if (teams[i].id == id) {
            return teams[i].name;
        }
    }
    return "unknown";
}

function navigate(ev) {
    ev.preventDefault();
    let link = ev.currentTarget;
    console.log(link);
    // split a string into an array of substrings using # as the seperator
    let id = link.href.split("#")[1]; // get the href page name
    console.log(id);
    //update what is shown in the location bar
    history.replaceState({}, "", link.href);
    for (let i = 0; i < pages.length; i++) {
        if (pages[i].id == id) {
            pages[i].classList.add("active");
        }
        else {
            pages[i].classList.remove("active");
        }
    }
}

function setupStandings(data) {
    for (let i = 0; i < team.length; i++) {
        team[i] = {
            name: data.teams[i].name
            , wins: 0
            , loses: 0
            , ties: 0
        };
    }
}

function displayStandings() {
    team.sort(function (a, b) {
        let nameA = a.wins;
        let nameB = b.wins;
        if (nameA < nameB) {
            return 1;
        }
        if (nameA > nameB) {
            return -1;
        }
        return 0;
    });
    let tbody = document.querySelector(".standingsBody");
    tbody.innerHTML = " ";
    for (let i = 0; i < team.length; i++) {
        let tr = document.createElement("tr");
        let tdName = document.createElement("td");
        tdName.textContent = team[i].name;
        let tdWins = document.createElement("td");
        tdWins.textContent = team[i].wins;
        let tdLoses = document.createElement("td");
        tdLoses.textContent = team[i].loses;
        let tdTies = document.createElement("td");
        tdTies.textContent = team[i].ties;
        let teamIcon = document.createElement("img");
        if (team[i].name == "Gryffindor") {
            teamIcon.src = "./img/Gryffindor.png";
        }
        else if (team[i].name == "Ravenclaw") {
            teamIcon.src = "./img/Ravenclaw.png";
        }
        else if (team[i].name == "Slytherin") {
            teamIcon.src = "./img/Slytherin.png";
        }
        else if (team[i].name == "Hufflepuff") {
            teamIcon.src = "./img/Hufflepuff.png";
        }
        tdName.appendChild(teamIcon);
        tr.appendChild(tdName);
        tr.appendChild(tdWins);
        tr.appendChild(tdLoses);
        tr.appendChild(tdTies);
        tbody.appendChild(tr);
    }
}