const fs = require("fs");

const getBaseScore = (destination, driver) => {
  const vowels = "aeiou";
  const driverName = driver.toLowerCase();
  const destName = destination.toLowerCase();
  const driverVowels = driverName
    .split("")
    .reduce((acc, letter) => acc + (vowels.includes(letter) ? 1 : 0), 0);
  const driverConsonants = driverName.length - driverVowels;
  if (destName.length % 2 === 0) {
    return 1.5 * driverVowels;
  } else {
    return driverConsonants;
  }
};

const getScore = (destination, driver) => {
  const baseScore = getBaseScore(destination, driver);
  if (destination.length % driver.length === 0) {
    return baseScore * 1.5;
  }
  return baseScore;
};

const assignShipments = (destinations, drivers) => {
  let totalScore = 0;
  const matches = {};
  for (const destination of destinations) {
    let bestDriver = null;
    let bestScore = 0;
    for (const driver of drivers) {
      const score = getScore(destination, driver);
      if (score > bestScore) {
        bestDriver = driver;
        bestScore = score;
      }
    }
    totalScore += bestScore;
    matches[destination] = bestDriver;
    // Drive has been assigned, remove driver
    drivers.splice(drivers.indexOf(bestDriver), 1);
  }
  return { totalScore, matches };
};

if (process.argv.length !== 4) {
  console.log(
    "Usage: node shipment_assignment.js [destinations_file] [drivers_file]"
  );
  process.exit(1);
}

// Grab [destinations_file] from CLI args
const destinationsFile = process.argv[2];
// Grab [drivers_file] from CLI args
const driversFile = process.argv[3];

const run = () => fs.readFile(destinationsFile, "utf-8", (err, destinations) => {
  if (err) throw err;

  fs.readFile(driversFile, "utf-8", (err, drivers) => {
    if (err) throw err;
    destinations = destinations.trim().split("\n");
    drivers = drivers.trim().split("\n");
    const { totalScore, matches } = assignShipments(destinations, drivers);
    console.log(`Total Suitability Score: ${totalScore}`);
    console.log("Shipment Destination - Driver Matches:");
    for (const destination in matches) {
      console.log(`${destination} - ${matches[destination]}`);
    }
  });
});

run()
