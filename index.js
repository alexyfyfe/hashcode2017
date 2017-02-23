/**
 * @Author: John Isaacs <john>
 * @Date:   06-Feb-172017
 * @Filename: index.js
* @Last modified by:   john
* @Last modified time: 18-Feb-172017
 */
var rows, columns, minc, cells;
var firstline = true;
var fullPizza = [];
var slices = [];
var filename;
var lineNo = 0;
var column = 0;
var row = 0; //parseInt(rows)-1;
var tcount = 0;
var mcount = 0;
var startRow =0;
var startColumn =0;
var cellcount =0;


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
    processPizzaLine(line);
    // 'line' contains the current line without the trailing newline character.
});

lr.on('end', function() {
    // All lines are read, file is closed now.
    console.log(fullPizza);
    quickSolution();

    writeOutput(slices);
});

function processPizzaLine(line) {
    if (firstline) {
        firstline = false;
        rows = parseInt(line.split(" ")[0]);
        columns = parseInt(line.split(" ")[1]);
        minc = parseInt(line.split(" ")[2]);
        cells = parseInt(line.split(" ")[3]);
        console.log("rows: " + rows + " columns: " + columns + " minimum item: " + minc + " max cells: " + cells);
    } else {
        var row = [];
        for (var c = 0; c < columns; c++) {
            row.push(line[c]);
        }
        fullPizza.push(row);
        lineNo++;
    }
}

function quickSolution() {


        goingDown();

}

function goingDown(){
  while (cellcount < cells  ) {
    if (fullPizza[row][column] === 'T') {
        tcount++;
    }
    if (fullPizza[row][column] === 'M') {
        mcount++;
    }
    checkSlice();
    cellcount++;
    row++;
    if(row>=rows){
      break;
    }
  }
  switchDir("down");
}
function goingUp(){
  while (cellcount < cells ) {
    if (fullPizza[row][column] === 'T') {
        tcount++;
    }
    if (fullPizza[row][column] === 'M') {
        mcount++;
    }
    checkSlice();
    cellcount++;
    row--;
    if(row<=0){
      break;
    }
  }

  switchDir("up");
}
function switchDir(dir){
  column++;
  if(dir === "up"){
    goingDown();
  }
  else{
    goingUp();
  }

}
function checkSlice(){
  if(cellcount>cells){
    cellcount =0 ;
    startRow = row+1;
    startColumn = column+1;
  }
  if ((parseInt(tcount) >= parseInt(minc)) && (parseInt(mcount) >= parseInt(minc))) {
      console.log(tcount + ":" + mcount + ":" + minc);
      storeSlice(startRow, startColumn, row, column);
      startRow = row+1;
      startColumn = column+1;
      cellcount =0;
  }
}
function storeSlice(startRow, startColumn, endRow, endColumn){
  var slice = [startRow + " ", startColumn + " ", endRow+ " ", endColumn + " "];
  slices.push(slice);
}
//console.log(slices);




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
