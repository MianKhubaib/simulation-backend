const axios = require("axios");

let simulateByIdFlag = false;
let simulateAllFlag = false;

const logitudeMax = 67.33489110379261;
const latitudeMax = 24.77246069072484;
const latitudeMin = 24.768141172216463;
const logitudeMin = 67.33489110379261;
const speed = 0;
const batterylevel = 99;
const xAxis = 0;
const yAxis = 0;
const repeatFunctionAll = async (checkedData, token, intervalTimer) => {
  if (!simulateAllFlag) {
    clearInterval(intervalTimer);
    return;
  }
  let date = new Date();
  //  date.setHours(date.getHours() - 5);
  const config = {
    headers: { Authorization: token },
  };
  // now you can get the string
  let isodate = date.toISOString();
  // const latitude1 = (
  //   Math.random() * (latitudeMax - latitudeMin) +
  //   latitudeMin
  // ).toFixed(14);

  // const logitude2 = (
  //   Math.random() * (logitudeMax - logitudeMin) +
  //   logitudeMin
  // ).toFixed(14);
  checkedData.map(async (ble) => {
    console.log("Ble with id updated", ble.uid);
    const res2 = await axios.patch(
      "https://at-backend1.herokuapp.com/sensor/update/data",
      {
        sensor: ble.uid,
        latitude: (
          Math.random() * (latitudeMax - latitudeMin) +
          latitudeMin
        ).toFixed(14),
        longitude: (
          Math.random() * (logitudeMax - logitudeMin) +
          logitudeMin
        ).toFixed(14),
        timestamp: isodate,
        speed: speed,
        batterylevel: batterylevel,
      },
      config
    );
    console.log(res2.data);
  });
};

const simulateAll = async (req, res) => {
  const checkedData = req.body;
  // console.log(req.body)
  const token = req.header("authorization");
  try {
    simulateAllFlag = true;
    const intervalTimer = setInterval(async () => {
      console.log(simulateByIdFlag, "inside simulateAll Loop");
      await repeatFunctionAll(checkedData, token, intervalTimer);
    }, 5000); // interval is 5 seconds
    setTimeout(() => {
      simulateAllFlag = false;
    }, 1000 * 60); //stop after 1 min;
    return res.sendStatus(200);
  } catch (e) {
    return res.status(404).json({ message: "Data not found", status: 404 });
  }
};

const cancelSimulationAll = async (req, res) => {
  console.log("cancelled all simulation");
  simulateAllFlag = false;
  return res.status(200).send("cancelled all simulation");
};

module.exports.simulateAll = simulateAll;
module.exports.cancelSimulationAll = cancelSimulationAll;
