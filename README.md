# Aadhaar OCR System

The Aadhaar OCR System is a web-based application that allows users to upload updated Aadhaar card images (front and back) separately. It extracts and processes text content from the images using the Tesseract.js OCR library and manually parses the data using regex to retrieve key details such as name, date of birth, gender, Aadhaar number, address, and pincode.

## Features

- **User-Friendly Interface**: Simple and intuitive UI for uploading Aadhaar card images.
- **Image Upload**: Supports uploading front and back images separately.
- **Format Support**: Accepts `.png`, `.jpg`, and `.jpeg` image formats up to 2 MB.
- **Loading Indicator**: Displays a spinner while processing OCR.
- **Error Handling**: Shows user-friendly error messages for invalid uploads or processing issues.
- **Data Extraction**: 
  - **Front Image**: Extracts name, date of birth, gender, and Aadhaar number.
  - **Back Image**: Extracts s/o or c/o, address, and pincode.
- **Key-Value Display**: Displays extracted data in a structured key-value format alongside the raw OCR response.

### Limitations
- Only supports the latest Aadhaar card format for data extraction.
- The OCR accuracy depends on the image clarity.

---

## Technologies Used

### Frontend
- **React (with TypeScript)**: For building the user interface.

### Backend
- **Node.js + Express.js**: For handling server-side logic and API requests.

---

## Packages

- **Tesseract.js**: OCR processing for extracting text from images.
- **Multer**: For handling file uploads and storing images locally.
- **Axios**: For making API calls.
- **FS Module**: For file system operations.
- **Regex**: Custom data parsing from OCR output.

---

## Installation

1. **Extract the Zip File**  
   Unzip the provided `aadhaar-ocr-system.zip` file into a folder of your choice.

2. **Navigate to the Project Directory**  
   Open your terminal and navigate to the extracted folder:  
   ```bash
   cd aadhaar-ocr-system

3. **Install Frontend Dependencies**
Run the following command to install the required dependencies:

bash
Copy code

cd client
npm install

4. **Install Backend Dependencies**
Run the following command to install the required dependencies:

bash
Copy code

cd server
npm install

5. **Start the Backend Server**
In the server folder, start the backend:

npm start

6. **Start the Frontend Development Server**
Open a new terminal, navigate to the client folder, and start the frontend:

npm run dev

7. **Open the Application**
Visit the application at:
http://localhost:3000

## Testing
Currently, no automated tests are implemented. Manual testing is required to verify functionality.

## How It Works

1. Upload Images: Users upload Aadhaar front and back images separately.
2. OCR Processing: Tesseract.js extracts text content from the uploaded images.
3. Data Parsing: Regex-based manual filtering extracts relevant details from the OCR output.
4. Result Display: Displays extracted data in a structured format.

## Notes

Ensure the uploaded images are clear and meet the size and format requirements for accurate OCR results.
The system relies on manual regex-based filtering, so it may not support older Aadhaar card formats.

## ------- Thank you ----------


