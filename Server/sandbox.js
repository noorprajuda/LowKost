const googleMapsClient = require("@google/maps").createClient({
  key: "AIzaSyDzDfsgzIHEWr3taa6uchtQ5z8lWyE4qs8",
  Promise: Promise,
});
let result = "";

async function test() {
  let result = "";
  try {
    const response = await googleMapsClient
      .geocode({
        address: "jalan peta selatan nomor 31 rt09/11 kalideres jakarta barat",
      })
      .asPromise();
    let jsn = response.json.results;
    for (let i = 0; i < jsn.length; i++) {
      let res = jsn[i];
      result += res.geometry.location.lat + " " + res.geometry.location.lng;
    }
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
//  googleMapsClient
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
