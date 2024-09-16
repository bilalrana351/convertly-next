'use server'

import mongoose from "mongoose";
// Document Schema
const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: '',
  },
  images: {
    type: [String], // Base64 encoded strings
    default: [],
  },
  chatHistory: {
    type: [[String]], // Array of arrays of strings
    default: [],
  },
});

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  documents: {
    type: [DocumentSchema],
    default: [],
  },
});

// Use a function to create and cache models
function getModels() {
  console.log(mongoose.models.User);

  if (mongoose.models.User && mongoose.models.Document) {
    return {
      User: mongoose.models.User,
      Document: mongoose.models.Document
    };
  }

  const User = mongoose.model('User', UserSchema);
  const Document = mongoose.model('Document', DocumentSchema);

  return { User, Document };
}

export default getModels;