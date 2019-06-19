import axios from "axios";

var instance = axios.create({
  baseURL: "http://10.0.40.99/api"
});

console.log("Testing network");
axios
  .get("/sensorData?name=server_room_one")
  .then(response => {
    console.log("Chosing local server");
    //console.log(response.data);
  })
  .catch(err => {
    console.log(err);
    instance = axios.create({
      baseURL: "http://allem.localtunnel.me/api"
    });
  });

export default instance;
