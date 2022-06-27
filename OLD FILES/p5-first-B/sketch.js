let meteorite

function preload(){
  meteorite = loadJSON('Meteorites.json');
}

// just printing
function setup() {
  createCanvas(400, 400);

  for (let i=0; i<meteorite.data.length; i++) {
    print(meteorite.data[i].reclat)
    print(meteorite.data[i].reclong)
    print(meteorite.data[i].GeoLocation)
    print(meteorite.data[i].name)
  }

}

// printing and downloading the file
/*
function setup() {
  createCanvas(400, 400);

  // creating a csv file
  let writer = createWriter('coordinates.csv');
  for (let i=0; i<meteorite.data.length; i++) {
    print(meteorite.data[i].reclat)
    print(meteorite.data[i].reclong)
    print(meteorite.data[i].GeoLocation)
    print(meteorite.data[i].name)

    // creating the csv file with the info you want
      writer.write([meteorite.data[i].name, meteorite.data[i].reclat, meteorite.data[i].reclong])
    // adding another line in the file  
      writer.write('\n')
    }
  // close the PrintWriter and save the file
  writer.close();
}
 */

function draw() {
  background(220);
}

// print in visual studio
console.log("hello")

