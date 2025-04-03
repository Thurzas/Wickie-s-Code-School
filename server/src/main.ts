// Load environment variables from .env file
import "dotenv/config";

// Check database connection
// Note: This is optional and can be removed if the database connection
// is not required when starting the application
import "../database/checkConnection";

// Import the Express application from ./app
import app from "./app";

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Start the server and listen on the specified port
app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err: Error) => {
    console.error("Error:", err.message);
  });

import path from "node:path";

app.get("/api/images/users/:imageName", (req, res) => {
  const { imageName } = req.params;
  console.info(req.params);
  const imageDirectory = path.join(__dirname, "../public/assets/images/");

  const imagePath = path.join(imageDirectory, imageName);
  console.info("fetched:", imagePath);
  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error("Erreur lors de l’envoi de l’image :", err);
      res.status(404).send("Image non trouvée");
    }
  });
});
