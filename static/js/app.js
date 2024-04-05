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
  buildBubbleChart(firstSample); // Call the bubble chart function
});

// Function to build the bar chart
function buildCharts(sample) {
  d3.json(url).then(function(data) {
    var sampleData = data.samples.filter(obj => obj.id === sample)[0];

    var otuIds = sampleData.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
    var sampleValues = sampleData.sample_values.slice(0, 10);
    var otuLabels = sampleData.otu_labels.slice(0, 10);

    var barData = [{
      y: otuIds.reverse(),
      x: sampleValues.reverse(),
      text: otuLabels.reverse(),
      type: "bar",
      orientation: "h"
    }];

    var barLayout = {
      title: "Top 10 OTUs Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Separate function to build the bubble chart
function buildBubbleChart(sample) {
  d3.json(url).then(function(data) {
    var sampleData = data.samples.filter(obj => obj.id === sample)[0];

    var bubbleTrace = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      text: sampleData.otu_labels,
      mode: 'markers',
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids,
        colorscale: 'Earth'
      }
    };

    var bubbleData = [bubbleTrace];

    var bubbleLayout = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: { title: 'OTU ID' },
      yaxis: { title: 'Sample Value' },
      margin: { t: 0 },
      hovermode: 'closest',
      showlegend: false
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
  });
}

// Function called by DOM changes
function optionChanged(newSample) {
  buildCharts(newSample); // Update the bar chart
  buildBubbleChart(newSample); // Update the bubble chart
}
