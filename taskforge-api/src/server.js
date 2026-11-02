
import app from "./app.js";

const PORT = process.env.PORT ;
//const PORT = import.meta.env.PORT || 3000;
//const PORT = 3000;
const APP_NAME = process.env.APP_NAME ;
//const APP_NAME = import.meta.env.APP_NAME || TaskForge;
//const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on http://localhost:${PORT}`)
  //localhost:${PORT}`)
});