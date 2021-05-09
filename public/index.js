function initMap() {
  let home = {
    coords: [{ lat: 38.16669, lng: -85.85179 }],
    location: "Home",
    message: "There is no place like home.",
    iconImage: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    recommendedBy: "Hunter Lacefield",
  };

  // map options
  let options = {
    zoom: 10,
    center: home.coords[0],
  };
  let map = new google.maps.Map(document.getElementById("map"), options);

  function addMarker(props) {
    const marker = new google.maps.Marker({
      position: { lat: props.coords[0].lat, lng: props.coords[0].lng },
      map: map,
    });
    // checks for iconImage
    if (props.iconImage) {
      // set icon image
      marker.setIcon(props.iconImage);
    }

    // set infoWindow (tooltip)
    let infoWindow = new google.maps.InfoWindow({
      content:
        "<h1 class='tooltipHeader'>" +
        props.location +
        "</h1> <p class='tooltipMessage'>" +
        props.message +
        "</p> <p class='recommendedBy'> Recommended by: <span class='recommendedName'>" +
        props.recommendedBy +
        "</span></p>",
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }
  addMarker(home);

  // Add a marker for each item in database
  $(document).ready(() => {
    // First grap all locations from database by getting them from route "/locations"
    $.getJSON("/locations", (data) => {
      //  console.log(data[0].coords[0].lat, "<= data[0].coords[0].lat");
      //  console.log(data[0].coords[0].lng, "<= data[0].coords[0].lng");
      data.forEach((location) => {
        addMarker(location);
      });
    });
  });
}
// Manually add markers/locations to map

//   let arrayOfMarkers = [
//     {
//       coords: { lat: 38.11975265223501, lng: -85.89719806931643 },
//       location: "Mike Linnings",
//       message: "Dad's birthday and father's day spot.",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.22837915899796, lng: -85.73512509260753 },
//       location: "The Post",
//       message: "My favourite pizza spot in Louisville.",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.22911437618618, lng: -85.63937525397466 },
//       location: "Ruth Chris",
//       message: "The best and most expensive steak in Louisville",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.227212057327066, lng: -85.57832155397466 },
//       location: "Olive Garden",
//       message:
//         "The place Laura wants to go to the most because of the breadsticks",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.24006672032459, lng: -85.69966670739245 },
//       location: "Cherokee Park",
//       message:
//         "Park where she can have a scenic walk, watch dogs and play kickball",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.257939366481125, lng: -85.76385235397464 },
//       location: "Louisville Slugger Museum",
//       message: "Show Laura how bats are made and the biggest bat in the world.",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.12657308915887, lng: -85.8369111079493 },
//       location: "Bobby Nichols Golf Course",
//       message: "Take Laura golfing at your old home course.",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.122648571294654, lng: -85.87148117726576 },
//       location: "Beth Haven Christian School",
//       message: "Show Laura the school that you went to",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.154829067442726, lng: -85.83621614602535 },
//       location: "Chick-fil-A",
//       message:
//         "Give Laura the greatest fast food experience she will ever have",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//     {
//       coords: { lat: 38.26637630961762, lng: -85.73898190794931 },
//       location: "Walking Bridge",
//       message: "Take Laura to walking bridge and have a nice meal by the river",
//       iconImage: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//       recommendedBy: "Hunter",
//     },
//  ];

//   for (let i = 0; i < arrayOfMarkers.length; i++) {
//     addMarker(arrayOfMarkers[i]);
//   }
