const validateImageAspectRatio = async (imageFile:File):Promise<boolean> => {
    return new Promise((resolve) => {
     // Create a URL for the image to preview
     const imgUrl = URL.createObjectURL(imageFile);
    
     // Create an image element to check dimensions
     const img = new Image();

     // Load the image to get its dimensions
     img.src = imgUrl;

     img.onload = () => {
        const aspectRatio = img.width / img.height;
        console.log('aspectRatio:', aspectRatio);
  
        // Define the expected aspect ratio for Aadhaar card (approximately 1.58)
        const expectedAspectRatio = 1.58;
  
        // Check if the aspect ratio is close enough to the expected one
        const isCorrectAspectRatio = Math.abs(aspectRatio - expectedAspectRatio) < 0.05;
        console.log("isCorrectAspectRatio:", isCorrectAspectRatio);
  
        if (!isCorrectAspectRatio) {
          console.log('false');
          resolve(false);  // Resolve the promise with false if the aspect ratio is incorrect
        } else {
          resolve(true);  // Resolve the promise with true if the aspect ratio is correct
        }
      };
    })   
}

export default validateImageAspectRatio