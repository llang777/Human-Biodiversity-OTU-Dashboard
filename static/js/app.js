// URL for the data
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data and populate the dropdown
d3.json(url).then(function(data) {
  // Populate the dropdown menu with sample names
  var dropdownMenu = d3.select("#selDataset");
  data.names.forEach(function(name) {
    dropdownMenu.append("option").text(name).property("value", name);
  });

  // Use the first sample from the list to build the initial plots
  const firstSample = data.names[0];
  buildCharts(firstSample);
});

// Function to build the charts
function buildCharts(sample) {
  d3.json(url).then(function(data) {
    // Filter the data for the object with the desired sample number
    var sampleData = data.samples.filter(obj => obj.id === sample)[0];

    // Get the top 10 OTUs for the selected individual
    var otuIds = sampleData.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
    var sampleValues = sampleData.sample_values.slice(0, 10);
    var otuLabels = sampleData.otu_labels.slice(0, 10);

    // Create the trace for the bar chart
    var barData = [{
      y: otuIds.reverse(),
      x: sampleValues.reverse(),
      text: otuLabels.reverse(),
      type: "bar",
      orientation: "h"
    }];

    // Define the layout for the bar chart
    var barLayout = {
      title: "Top 10 OTUs Found",
      margin: { t: 30, l: 150 }
    };

    // Use Plotly to plot the bar data with the layout
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function called by DOM changes
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
}
