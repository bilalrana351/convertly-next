import dotenv from 'dotenv';
import  uploadImageHandler  from 'src/app/actions/server/document/image/upload/route.js';

// Load environment variables
dotenv.config();

// Dummy base64 images (these are very small, transparent 1x1 pixel images)
const dummyBase64Images = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg=='
];

// Test function
async function testUpload() {
  try {
    const result = await uploadImageHandler('testDocument', dummyBase64Images);
    console.log(result);
  } catch (error) {
    console.error('Error during upload:', error);
  }
}

// Run the test
testUpload();