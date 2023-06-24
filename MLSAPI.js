const leagueAPI =
  "https://api-football-v1.p.rapidapi.com/v3/teams?league=253&season=2023";
// const url2 =
//   "https://api-football-v1.p.rapidapi.com/v3/standings?league=253&season=2023&team=1608";
// const url = "https://api-football-v1.p.rapidapi.com/v3/leagues";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "6decee34d5msh22f17ec7e198e9dp1d23a5jsn4f4bc0ff41f6",
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
};

// let myApiTestTwo = document.getElementById("teamsList");
let teamImageDiv = document.getElementById("imageDiv");


function getTest() {
  fetch(leagueAPI, options)
    .then((resp) => {
      console.log(resp);
      return resp.json();
    })
    .then((data) => {
      console.log(data);
      const teamInformationArray = data.response.map((tObj) => {
        return {
          founded: tObj.team.founded,
          name: tObj.team.name,
          city: tObj.venue.city,
          logo: tObj.team.logo,
          venueName: tObj.venue.name,
          venueCapacity: tObj.venue.capacity,
        };
      });
      console.log(teamInformationArray);



      for (let i = 0; i < teamInformationArray.length; i++) {
        let cur = teamInformationArray[i];
        let teamLogo = document.createElement("img");
        teamLogo.setAttribute("src", cur.logo);
        teamLogo.setAttribute("id", cur.name);
        teamLogo.setAttribute("class", "teamImage")
        teamImageDiv.appendChild(teamLogo);
      }
      return teamInformationArray;
    }).then((teamInformationArray) => {
      let teamImages = document.querySelectorAll('img');
      console.log(teamImages);
      teamImages.forEach((image) => {
        image.addEventListener('click', () => {
          const teamToShow = teamInformationArray.find(team => team.name === image.id)
          showRestOfTeam(teamToShow)
        })
      })
    });
}

function showRestOfTeam(teamInformation) {
  document.getElementById("teamName").innerHTML = teamInformation.name;
  document.getElementById("teamInfo").innerHTML = teamInformation.city;
  document.getElementById("teamFounded").innerHTML = teamInformation.founded;
  document.getElementById("teamVenueName").innerHTML = teamInformation.venueName;
  document.getElementById("teamVenueCapacity").innerHTML = teamInformation.venueCapacity;
}



getTest();

