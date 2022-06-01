/* 
Read data from coordinates.csv.  Each row has coordinates of a meteorite.
Use the API to find the friendly location name matching the coordinates.

You will need to install these first:
    npm install axios
    npm install csv-parser
    npm install csv-writer
*/


const axios = require('axios');  // for sending web requests

var api_key = '16385e5cc80c4852a425bdd06bbb6012';

const fs = require('fs'); 
const csv = require('csv-parser');
var results = []

// Create a CSV writer for the output
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out2.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'lng', title: 'lng'},
    {id: 'lat', title: 'lat'},
    {id: 'loc', title: 'loc'},
  ]
});


// Start reading the csv
ReadCsv()


// new function for reading the csv
async function ReadCsv() {
    // Process the file, create a results array holding all rows from the csv file
    fs.createReadStream("coordinates-short.csv")
        .pipe(csv())
        .on('data', async function(data){
            // We have a row, so save it to the results array
            //await console.log("csv" + data.name)
            results.push(data)
            //await CallApi(data)
            //await csvWriter.writeRecords([data])
        })
        .on('end',async function(){
            // We have all the file, so now call the API on each row
            //console.log(results);
            for (let i=0; i<results.length; i++) {
                //await csvWriter.writeRecords([results[i]])
                await CallApi(results[i])
            }
        }); 
}


// Function to call the API
async function CallApi(data) {
    // Build the search URL.  See the api documentation for details of what's allowed
    url = new URL("https://api.opencagedata.com/geocode/v1/json")
    url.searchParams.append("key", api_key)
    url.searchParams.append("q", encodeURIComponent(data.lng + ',' + data.lat))
    url.searchParams.append("pretty", 1)
    url.searchParams.append("no_annotations", 1)
    await console.log(url.href)  
    
    // Submit the URL and get the response
    await axios.get(url.href).then(async response => {
        // Get the api's response
        if (response.data.results.length>0) {
            //await console.log(response.data.results[0].formatted)
            data["loc"] = response.data.results[0].formatted
        }
        else
            data["loc"] = "not found"
        
        // Return the data - will be picked up by the 'then'
        //WriteCsv(data)
        return data
    }).then(async d => {
        // Write the data to csv
        //await console.log(data)
        await csvWriter.writeRecords([d])
    });

    
}
