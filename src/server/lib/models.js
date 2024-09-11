import { Schema } from "mongoose";

// Document Schema
const DocumentSchema = new Schema({
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
const UserSchema = new Schema({
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

// Models
const User = mongoose.model('User', UserSchema);

const Document = mongoose.model('Document', DocumentSchema);

export { User, Document }
