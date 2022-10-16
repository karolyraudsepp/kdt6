(function () {
  "use strict";

  //clock

  document.addEventListener("DOMContentLoaded", function () {
    let c = document.getElementById("clock");

    //setTimeout(updateClock, 2000);
    setInterval(updateClock, 1000);

    function updateClock() {
      let date = new Date();
      let h = date.getHours() % 12;
      let ELorPL = h >= 12 ? "EL" : "PL";
      let m = date.getMinutes();
      let s = date.getSeconds();

      if (h < 10) {
        h = "0" + h;
      }

      if (m < 10) {
        m = "0" + m;
      }

      if (s < 10) {
        s = "0" + s;
      }

      c.innerHTML = h + ":" + m + ":" + s + " " + ELorPL;
    }
  });

  // forms

  document.getElementById("form").addEventListener("submit", estimateDelivery);

  let e = document.getElementById("delivery");
  e.innerHTML = "0 &euro;";

  function estimateDelivery(event) {
    let hind = 0;
    event.preventDefault();

    if (document.getElementById('fname').value === "" || document.getElementById('lname').value === "") {
      alert("Palun lisage enda nimi");
      return;
    }

  if(document.querySelector('input[name="fav_language"]:checked') == null) {
    alert("Valige paki kätte saamise viis!");
  }

    if (document.getElementById('kuller').checked) {
      hind += 2;
  }
   if (document.getElementById('pakiautomaat').checked) {
     hind += 1;
  }

    if (document.getElementById("v1").checked) {
      hind += 5;
    }

    if (document.getElementById("v2").checked) {
      hind += 1;
    }

    let linn = document.getElementById("linn");

    if (linn.value === "") {
      alert("Palun valige linn nimekirjast");

      linn.focus();

      return;
    } else if (linn.value === "trt") {
        console.log('siin');
      hind += 2.5;
    } else if (linn.value === "nrv") {
      hind += 2.5;
    } else if (linn.value === "prn") {
      hind += 3;
    }

    document.getElementById("delivery").innerHTML = hind + ' €';
  }
})();

//Map - infoboxidega versioon allpool

let mapAPIKey =
  "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
  "use strict";

  let centerPoint = new Microsoft.Maps.Location(58.38104, 26.71992);
  let UTPoint = new Microsoft.Maps.Location(58.38104, 26.71992);
  let newPoint = new Microsoft.Maps.Location(58.27771128103124, 26.5350615998985);

  map = new Microsoft.Maps.Map("#map", {
    credentials: mapAPIKey,
    center: centerPoint,
    zoom: 10,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    disablePanning: true,
  });

  let pushpin = new Microsoft.Maps.Pushpin(UTPoint, {
    title: "Tartu Ülikool",
    description: 'Hea koht',
    //text: 'UT'
  });

  let newpushpin = new Microsoft.Maps.Pushpin(newPoint, {
    title: "Nõo kirik",
    description: 'Hea koht',
    //text: 'NK'
  });

  map.entities.push(pushpin);
  map.entities.push(newpushpin);
}

// map - infoboxid ei tööta normaalselt, seega siin on versioon, kuidas tegin meetodit koos infoboxidega

/**let mapAPIKey =
  "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
  "use strict";

  let centerPoint = new Microsoft.Maps.Location(58.38104, 26.71992);
  let UTPoint = new Microsoft.Maps.Location(58.38104, 26.71992);
  let newPoint = new Microsoft.Maps.Location(58.27771128103124, 26.5350615998985);

  map = new Microsoft.Maps.Map("#map", {
    credentials: mapAPIKey,
    center: centerPoint,
    zoom: 10,
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    disablePanning: true,
  });

infobox = new Microsoft.Maps.Infobox(centerPoint, {
    visible: false
});

infobox.setMap(map)
  

  let pushpin = new Microsoft.Maps.Pushpin(UTPoint, {
    title: "Tartu Ülikool",
    description: 'Hea koht',
    //text: 'UT'
  });

  let newpushpin = new Microsoft.Maps.Pushpin(newPoint, {
    title: "Nõo kirik",
    description: 'Hea koht',
    //text: 'NK'
  });

  Microsoft.Maps.Events.addHandler(pushpin, 'click', pushpinClicked);
  Microsoft.Maps.Events.addHandler(newpushpin, 'click', pushpinClicked);

  map.entities.push(pushpin);
  map.entities.push(newpushpin);
}

function pushpinClicked(e) {
  if (e.target.metadata) {
      infobox.setOptions({
          location: e.target.getLocation(),
          title: e.target.metadata.title,
          description: e.target.metadata.description,
          visible: true
      });
  }
}**/

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
