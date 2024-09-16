"use server"

import mongoose from "mongoose";

let isConnected; // Track the connection status

const dbConnect = async () => {
  if (isConnected) {
    // If already connected, use the existing connection
    console.log('Using existing database connection');
    return;
  }

  try {
    // Create a new connection if not already connected
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState; // 1 means connected

    console.log('Database connected successfully'); // Remove or replace in production
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1); // Optional: Exit the process if the initial connection fails
  }
};

export default dbConnect;