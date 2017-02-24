/**
 * @Author: John Isaacs <john>
 * @Date:   06-Feb-172017
 * @Filename: index.js
* @Last modified by:   john
* @Last modified time: 24-Feb-172017
 */
var v, e, r, c, x;
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
    console.log(videos.length);
    console.log(latencyD + ":" + k_servers);
    console.log(endpoint_cache.length);
    console.log(request_descriptions.length);
    bananas2();
    console.log(finalCaches.length);

    //quickSolution();

    writeOutput2();
});
var videos = [];
var endpoint_cache = [];
var request_descriptions = [];
var vidsection = false;
var latencysection = false;
var latencyD;
var k_servers;
var current_endpoint = [];
var caches = [];

function processLine(line) {
    if (firstline) {
        firstline = false;
        v = parseInt(line.split(" ")[0]);
        e = parseInt(line.split(" ")[1]);
        r = parseInt(line.split(" ")[2]);
        c = parseInt(line.split(" ")[3]);
        x = parseInt(line.split(" ")[4]);
        console.log("vids: " + v + " endpoints: " + e + " requests: " + r + " cache servers: " + c + " capacity: " + x);
        vidsection = true;
    } else if (vidsection) {
        videos = line.split(' ');
        vidsection = false;
        latencysection = true;
    } else if (latencysection) {
        //console.log("latency");
        if (endpoint_cache.length > e) {
            endpointsection = false;
            requestsection = true;
        }
        latencyD = parseInt(line.split(" ")[0]);
        k_servers = parseInt(line.split(" ")[1]);
        console.log(latencyD + ":" + k_servers);
        latencysection = false;
        endpointsection = true;
    } else if (endpointsection) {
        //console.log("endpoint");
        //console.log(endpoint_cache.length);

        if (endpoint_cache.length > e) {
            latencysection = false;
            endpointsection = false;
            requestsection = true;
        } else if (current_endpoint.length > k_servers - 1) {
            endpoint_cache.push(current_endpoint);
            current_endpoint = [];
            latencyD = parseInt(line.split(" ")[0]);
            k_servers = parseInt(line.split(" ")[1]);
            console.log(latencyD + ":" + k_servers);
        } else {
            current_endpoint.push(line.split(' '));
        }


    } else if (requestsection) {
        request_descriptions.push(line.split(' '));
    } else {
        //    var row = [];
        //    for (var c = 0; c < columns; c++) {
        //        row.push(line[c]);
        //    }
        //    fullPizza.push(row);
        //    lineNo++;
    }
}

var finalCaches = [];
var finalCacheSizes = [];
var videosadded = [];

function bananas2() {
    //console.log(endpoint_cache);
    //console.log(endpoint_cache);
    request_descriptions.sort(sortRFunction);

    for (var r = 0; r < request_descriptions.length; r++) {
        var endpoint = request_descriptions[r][1];
        var video = request_descriptions[r][0];
        var latencyArray = endpoint_cache[endpoint];
        latencyArray.sort(sort1Function);
        var la = 0;
        var cache = latencyArray[la][0];

        while (la < latencyArray.length) {
            //console.log(la);
            cache = latencyArray[la][0];
            //console.log("cache "+cache);
            var currentcache = [];
            if (!finalCacheSizes[cache]) {
                finalCacheSizes[cache] = 0
            };
            //console.log(parseInt(finalCacheSizes[cache])+":"+parseInt(videos[video]));
            if(videosadded.length > 5000){
              break;
            }
            if (videosadded.indexOf(video) > -1) {
                break;
            } else {
                if (parseInt(finalCacheSizes[cache]) + parseInt(videos[video]) < x) {
                    if (finalCaches[cache]) {
                        finalCaches[cache] = finalCaches[cache] + (video + " ");
                        videosadded.push(video);
                        console.log(videosadded.length);

                    } else {
                        finalCaches[cache] = (video + " ");
                        videosadded.push(video);
                        console.log(videosadded.length);
                    }
                    finalCacheSizes[cache] = parseInt(finalCacheSizes[cache]) + parseInt(videos[video]);
                    //console.log(finalCaches);
                    break;
                } else {
                    la++;
                }
            }
        }
    }
}






function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    } else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function sortRFunction(a, b) {
    if (a[2] === b[2]) {
        return 0;
    } else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}

function sort1Function(a, b) {
    if (a[1] === b[1]) {
        return 0;
    } else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function bananas() {
    var vcount = 0;
    var cx = 0;
    var current = [];
    var csize = 0;

    current.push(0 + " ");
    var vidsort = [];

    for (var j = 0; j < videos.length; j++) {
        var row = [];
        row.push(videos[j]);
        row.push(j);
        vidsort.push(row);
    }

    //console.log(vidsort);
    vidsort.sort(sortFunction);

    while (vcount < v && cx < c) {

        if ((csize + parseInt(vidsort[vcount][0])) > parseInt(x)) {
            //console.log(current);
            caches.push(current);
            cx++;
            current = [];
            current.push(cx + " ");
            csize = 0;

        } else {
            //console.log(vcount);
            current.push(vidsort[vcount][1] + " ");
            csize = parseInt(csize) + parseInt(vidsort[vcount][0]);
        }
        vcount++;
    }
}





function writeOutput() {
    var logger = fs.createWriteStream(filename + ".out", {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });

    logger.write(caches.length.toString().trim()); // append string to your file
    logger.write("\n");
    for (var i = 0; i < caches.length; i++) {
        //console.log(caches[i]);
        var str = caches[i].toString();
        str = str.replace(/,/g, '');
        logger.write(str.trim());
        logger.write("\n");
    }
    logger.end();
}

function writeOutput2() {
    var logger = fs.createWriteStream(filename + ".out", {
        flags: 'a' // 'a' means appending (old data will be preserved)
    });

    logger.write(finalCaches.length.toString().trim()); // append string to your file
    logger.write("\n");
    for (var i = 0; i < finalCaches.length; i++) {
        //console.log(caches[i]);
        if (finalCaches[i]) {
            var str = finalCaches[i].toString();
            str = str.replace(/,/g, '');
            logger.write(i + " " + str.trim());
            logger.write("\n");
        }
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
