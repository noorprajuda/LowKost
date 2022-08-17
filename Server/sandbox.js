require("dotenv").config();

const googleMapsClient = require("@google/maps").createClient({
  key: process.env.GOOGLE_MAPS_API,
  Promise: Promise,
});
const axios = require("axios");
async function test() {
  let result = "";
  try {
    const response = await googleMapsClient
      .geocode({
        address:
          "Jalan Madrasah No./Kav. 1A, Kecamatan Cipayung, DKI Jakarta 13890, Indonesia",
      })
      .asPromise();
    console.log(response);
    let jsn = response.json.results;
    for (let i = 0; i < jsn.length; i++) {
      let res = jsn[i];
      result += res.geometry.location.lat + " " + res.geometry.location.lng;
    }
    console.log(result);
    console.log(result.split(" ")[0]);
    // const resp = await axios.get(
    //   "https://maps.googleapis.com/maps/api/geocode/json?latlng=-6.1484511,106.697525&key=0G2eiLs"
    // );
    // console.log(resp.data.results[0].address_components);
  } catch (err) {
    console.log(err);
  }
}
// //  googleMapsClient
//   .geocode({
//     address: "jalan peta selatan nomor 31 rt09/11 kalideres jakarta barat",
//   })
//   .asPromise()
//   .then((resp) => {
//     const jsn = resp.json.results;
//     for (let i = 0; i < jsn.length; i++) {
//       let res = jsn[i];
//       result += res.geometry.location.lat + " " + res.geometry.location.lng;
//     }
//     console.log(result);
//   })
//   .catch((err) => console.log(err, ">>>>"));

test();
