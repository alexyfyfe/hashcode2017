/**
 * @Author: John Isaacs <john>
 * @Date:   06-Feb-172017
 * @Filename: index.js
* @Last modified by:   john
* @Last modified time: 23-Feb-172017
 */
var v,e,r,c,x;
var firstline = true;


var fs = require('fs')
    // again
process.argv.forEach(function(val, index, array) {
    filename = val;
});


var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader(filename);

lr.on('error', function(err) {
    console.log(error);
    // 'err' contains error object
});

lr.on('line', function(line) {
    processLine(line);
    // 'line' contains the current line without the trailing newline character.
});

lr.on('end', function() {
    // All lines are read, file is closed now.
    console.log(fullPizza);
    quickSolution();

    writeOutput(slices);
});




function processLine(line){
  if (firstline) {
      firstline = false;
      v = parseInt(line.split(" ")[0]);
      e = parseInt(line.split(" ")[1]);
      r = parseInt(line.split(" ")[2]);
      c = parseInt(line.split(" ")[3]);
      x = parseInt(line.split(" ")[4]);
      console.log("vids: " + v + " endpoints: " + e + " requests: " + r + " cacheservers: " + c + " capacity: ");
  } else {
      var row = [];
      for (var c = 0; c < columns; c++) {
          row.push(line[c]);
      }
      fullPizza.push(row);
      lineNo++;
  }
}



function writeOutput(slices) {
    var logger = fs.createWriteStream(filename + ".out", {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });

    logger.write(slices.length.toString().trim()); // append string to your file
    logger.write("\n");
    for (var i = 0; i < slices.length; i++) {
        var str = slices[i].toString();
        str = str.replace(/,/g, '');
        logger.write(str.trim());
        logger.write("\n");
    }
    logger.end();
}

// function checkNeighbourhood(var thisPosX, var thisPosY, var current){
//   int startPosX = thisPosX;
//   int startPosY = thisPosY;
//   int endPosX =   (thisPosX + 1 > rows) ? thisPosX : thisPosX+1;
//   int endPosY =   (thisPosY + 1 > columns) ? thisPosY : thisPosY+1;
//   // See how many are alive
//   for (int rowNum=startPosX; rowNum<=endPosX; rowNum++) {
//       for (int colNum=startPosY; colNum<=endPosY; colNum++) {
//         // All the neighbors will be grid[rowNum][colNum]
//         return current == fullPizza[rowNum][colNum];
//       }
//     }
// }
