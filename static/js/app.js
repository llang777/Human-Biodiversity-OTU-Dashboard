// The URL where the JSON data is located
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Use d3.json to fetch the JSON data
d3.json(url).then(function(data) {
  // This function is called once the JSON data is loaded
  // Now you can use your data here
  console.log(data);
  // Further processing of data
}).catch(function(error) {
  // Handle errors here
  console.log(error);
});