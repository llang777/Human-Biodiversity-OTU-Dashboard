// Function to build the charts
function buildCharts(sample) {
    d3.json(url).then(function(data) {
      // Filter the data for the object with the desired sample number
      var sampleData = data.samples.filter(obj => obj.id === sample)[0];
  
      // Get the top 10 OTUs for the selected individual
      // Bar chart data preparation
      var otuIdsBar = sampleData.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`);
      var sampleValuesBar = sampleData.sample_values.slice(0, 10);
      var otuLabelsBar = sampleData.otu_labels.slice(0, 10);
  
      // Create the trace for the bar chart
      var barData = [{
        y: otuIdsBar.reverse(),
        x: sampleValuesBar.reverse(),
        text: otuLabelsBar.reverse(),
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
  
      // Bubble chart data preparation
      var otuIdsBubble = sampleData.otu_ids;
      var sampleValuesBubble = sampleData.sample_values;
      var otuLabelsBubble = sampleData.otu_labels;
  
      // Create the trace for the bubble chart
      var bubbleData = [{
        x: otuIdsBubble,
        y: sampleValuesBubble,
        text: otuLabelsBubble,
        mode: 'markers',
        marker: {
          size: sampleValuesBubble,
          color: otuIdsBubble,
          colorscale: 'Earth'
        }
      }];
  
      // Define the layout for the bubble chart
      var bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Value' },
        margin: { t: 0 },
        hovermode: 'closest',
        showlegend: false
      };
  
      // Use Plotly to plot the bubble data with the layout
      Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
  }
  
  // Function called by DOM changes
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
  }
  