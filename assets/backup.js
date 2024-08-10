// Initialize an array to store FluOutPre values
let fluOutPreArray = [];

// Function to generate and track FluOutPre values
function trackFluOutPre() {
  // Generate a new FluOutPre value
  let newFluOutPre = generateRandomNumber(247350, 247370);
  
  // Push the new value into the array
  fluOutPreArray.push([newFluOutPre,getCurrentTime()]);
  
  // Update the HTML with the latest value (optional)
  updateHTMLWithId(newFluOutPre, "FluOutPre");
  
  // Log the array to the console (for debugging purposes)
  console.log(fluOutPreArray);
  console.log(getCurrentTime());
  return newFluOutPre
}
function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
console.log(getCurrentTime());
// Example usage
 // Outputs the current time in HH:MM:SS format

// Call the function at regular intervals (e.g., every 3 seconds)
setInterval(trackFluOutPre, 3000);

// not used get x-axis for pressure graph cos not use 2 graph
function getXaxis(baseval,count,data){
    var i = 0;
    while (i < count) {
      var x = baseval;
      data.push(x);
      baseval += TICKINTERVAL;
      i++;
    }
    return xaxis;
  }