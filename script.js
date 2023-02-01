let timezone = document.getElementById("timezone");
let latitude = document.getElementById("lat");
let longitude = document.getElementById("long");
let offsetstd = document.getElementById("std");
let offsetstdSeconds = document.getElementById("std-sec");
let offsetdst = document.getElementById("dst");
let offsetdstSeconds = document.getElementById("dst-sec");
let country = document.getElementById("country");
let postcode = document.getElementById("pst-code");
let city = document.getElementById("city");

function getlocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=af0f41b0286e41ab82050bd33b801ab3`;
    async function getData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        showdata(data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  });
}
function showdata(data) {
  // console.log(data);
  timezone.innerHTML += `${data.results[0].timezone.name}`;
  latitude.innerHTML += `${data.results[0].lat}`;
  longitude.innerHTML += `${data.results[0].lon}`;
  offsetstd.innerHTML += `${data.results[0].timezone.offset_STD}`;
  offsetstdSeconds.innerHTML += `${data.results[0].timezone.offset_STD_seconds}`;
  offsetdst.innerHTML += `${data.results[0].timezone.offset_DST}`;
  offsetdstSeconds.innerHTML += `${data.results[0].timezone.offset_DST_seconds}`;
  country.innerHTML += `${data.results[0].country}`;
  postcode.innerHTML += `${data.results[0].postcode}`;
  city.innerHTML += `${data.results[0].city}`;
}
let address = document.getElementById("address");
let submitbtn = document.getElementById("btn");
let resTimezone = document.getElementById("result-timezone");
let resLatitude = document.getElementById("result-lat");
let resLongitude = document.getElementById("result-long");
let resOffsetstd = document.getElementById("result-std");
let resOffsetstdSeconds = document.getElementById("result-std-sec");
let resOffsetdst = document.getElementById("result-dst");
let resOffsetdstSeconds = document.getElementById("result-dst-sec");
let resCountry = document.getElementById("result-country");
let resPostcode = document.getElementById("result-pst-code");
let resCity = document.getElementById("result-city");

function search() {
  const url = `https://api.geoapify.com/v1/geocode/search?text=${address.value}&apiKey=af0f41b0286e41ab82050bd33b801ab3`;

  async function searchData() {
    try {
      const response = await fetch(url);
      const resdata = await response.json();

      resultant(resdata);
      // console.log(resdata.features);
    } catch (err) {
      console.log(err);
    }
  }
  searchData();
  function resultant(resdata) {
    if (resdata.features.length > 0) {
      document.getElementById("valid").style.display = "block";
      document.getElementById("error").style.display = "none";
      resTimezone.innerHTML += `${resdata.features[0].properties.timezone.name}`;
      resLatitude.innerHTML += `${resdata.features[0].properties.lat}`;
      resLongitude.innerHTML += `${resdata.features[0].properties.lon}`;
      resOffsetstd.innerHTML += `${resdata.features[0].properties.timezone.offset_STD}`;
      resOffsetstdSeconds.innerHTML += `${resdata.features[0].properties.timezone.offset_STD_seconds}`;
      resOffsetdst.innerHTML += `${resdata.features[0].properties.timezone.offset_DST}`;
      resOffsetdstSeconds.innerHTML += `${resdata.features[0].properties.timezone.offset_DST_seconds}`;
      resCountry.innerHTML += `${resdata.features[0].properties.country}`;
      resPostcode.innerHTML += `${resdata.features[0].properties.postcode}`;
      resCity.innerHTML += `${resdata.features[0].properties.city}`;
    } else {
      document.getElementById("error").style.display = "block";
      document.getElementById("valid").style.display = "none";
    }
  }
}

getlocation();
submitbtn.addEventListener("click", search);
