const bleRouter =   require("./routes/ble");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use('/api', bleRouter )

app.listen(process.env.PORT || 3001, () => console.log(`Listening on port ${process.env.PORT || 3001}...`));
