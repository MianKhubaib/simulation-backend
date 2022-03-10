const axios = require("axios");

let simulateByIdFlag = false;
let simulateAllFlag = false;
let defaultData = [];

const range = 50;
const measuredPower = -59;
const anglePitchMax = 90;
const anglePitchMin = -90;
const angleRollMax = 180;
const angleRollMin = -180;
const movementCountMax = 3000;
const movementCountMin = 0;
const batteryCountMax = 3000;
const batteryCountMin = 2000;

const repeatFunctionAll = async (checkedData, token, intervalTimer) => {
  if (!simulateAllFlag) {
    clearInterval(intervalTimer);
    return;
  }
  let date = new Date();
  date.setHours(date.getHours() - 5);
  const config = {
    headers: { Authorization: token },
  };
  // now you can get the string
  let isodate = date.toISOString();
  checkedData.map(async (ble) => {
    console.log("Ble with id updated", ble.uid);
    // const res2 = await axios.patch(
    //   "https://at-backend1.herokuapp.com/sensor/update/data",
    //   {
    //     sensor: ble.uid,
    //     anglePitch: Math.floor(
    //       Math.random() * (anglePitchMax - anglePitchMin) + anglePitchMin
    //     ),
    //     angleRoll: Math.floor(
    //       Math.random() * (angleRollMax - angleRollMin) + angleRollMin
    //     ).toString(),
    //     movementCount: Math.floor(
    //       Math.random() * (movementCountMax - movementCountMin) +
    //         movementCountMin
    //     ),
    //     batteryVoltage: Math.floor(
    //       Math.random() * (batteryCountMax - batteryCountMin) + batteryCountMin
    //     ),
    //     intervalTime: 5000,
    //     range: Math.floor(Math.random() * 3) + 1 + range,
    //     measuredPower: measuredPower,
    //     anglePitchMax: anglePitchMax,
    //     anglePitchMin: anglePitchMin,
    //     angleRollMax: angleRollMax,
    //     angleRollMin: angleRollMin,
    //     movementCountMax: movementCountMax,
    //     movementCountMin: movementCountMin,
    //     batteryCountMax: batteryCountMax,
    //     batteryCountMin: batteryCountMin,
    //     timestamp: isodate,
    //   },
    //   config
    // );
    //console.log(res2.data);
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
