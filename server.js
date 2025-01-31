const express = require("express");
const cors = require("cors");
const connectDB = require("./backend/configs/db");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const eventRoutes = require("./backend/routes/event");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/events", eventRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
