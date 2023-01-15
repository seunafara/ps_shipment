# Shipment Assignment

This program assigns shipment destinations to drivers in a way that maximizes the total suitability score over the set of drivers.

## Requirements

[Node.js](https://nodejs.org/)

## Input

The program takes as input two newline separated files, the first containing the street addresses of the shipment destinations and the second containing the names of the drivers.

## Output

The program prints the total suitability score and a match between shipment destinations and drivers.

## Usage

1. Clone the repository or download the javascript file
2. Open a command prompt and navigate to the directory where the file is located
3. Create two files, the first containing the street addresses of the shipment destinations, and the second containing the names of the drivers
4. Run the command `node shipment_assignment.js [destinations_file] [drivers_file]`

    - Replace `[destinations_file]` with the file name of the destinations file

    - Replace `[drivers_file]` with the file name of the drivers file

## Example

Assume that you have two files in the same directory as your javascript file
 - `destinations.txt` with the following content

```
JS Ave
Python Dr
Go Town
```
 - `drivers.txt` with the following content

```
John Doe
Mary Doe
Ben Doe
```
 - You can run the code by typing in the command line :

```
node shipment_assignment.js destinations.txt drivers.txt
```
 - This will execute the program and print the output on the console:

```
Total Suitability Score: 15.5
Shipment Destination - Driver Matches:
JS Ave - John Doe
Python Dr - Mary Doe
Go Town - Ben Doe
```

The output is the total SS and the matching between shipment destinations and drivers. The output is generated based on the top-secret algorithm defined in the problem statement.

## Note
- The program is case-insensitive
- The program does not handle malformed input
    
## Top-secret algorithm
- If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
- If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.
- If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.
