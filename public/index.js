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
        "</p><div class='contentChangeContainer'><p class='recommendedBy'> Recommended by: <span class='recommendedName'>" +
        props.recommendedBy +
        "</span></p><p class='deleteContainer'><span id='" +
        props._id +
        "' class='indicator' onclick='indicator(this.id)'>Indicator</span><span onclick='showDeleteButton()' class='bin'><i class='fas fa-trash-alt'></i></span><span id='" +
        props._id +
        "' onclick='deleteLocation(this.id)' class='deleteButton  btn-sm btn-danger '>Delete</span></p>",
      // Add this.id as a parameter so we know which id to find and delete with mongoose
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });
  }
  addMarker(home);

  // Add a marker for each item in database
  $(document).ready(() => {
    // First grab all locations from database by getting them from route "/locations"
    $.getJSON("/locations", (data) => {
      data.forEach((location) => {
        addMarker(location);
      });
    });
  });
}

// This handles when form is submitted and we server side returns json string when there are invalid lat and lng.
$(() => {
  $("#formContainer").submit((event) => {
    event.preventDefault();
    $.ajax({
      url: "/new_location",
      type: "post",
      data: $("#formContainer").serialize(),
      success: (data) => {
        // $("#jsonResult").text(JSON.stringify(data));
        if (data == "invalid lat and lng") {
          alert("Please enter a valid latitude and longitude variable");
        } else if (data == "invalid lat") {
          alert("Please enter a valid latitude variable");
        } else if (data == "invalid lng") {
          alert("Please enter a valid longitude variable");
        } else window.location.reload(true);
      },
    });
  });
});

// show delte button when the bin is clicked
let showing = false;
const showDeleteButton = () => {
  if (showing) {
    $(".deleteButton").hide("medium");
    showing = false;
  } else {
    $(".deleteButton").show("medium");
    showing = true;
  }
};

// Delete marker (on span element we added onclick=deleteLocation(this.id) to send id of element as parameter.
// I made sure each id for the bin element was the mongodb _id of that location)
const deleteLocation = (id) => {
  console.log("bin is clicked");
  $.ajax({
    type: "DELETE",
    url: "/deleteLocation",
    data: { _id: id },
    success: () => {
      alert("The location has been deleted");
      window.location.reload(true);
    },
  });
};

// Edit location marker by changing color to green if we have been there or red if we have not.
const indicator = (id) => {
  console.log("indicator clicked");
  $.ajax({
    type: "PUT",
    url: "/editLocation",
    data: { _id: id },
    success: () => {
      alert("The location has been updated");
      window.location.reload(true);
    },
  });
};
