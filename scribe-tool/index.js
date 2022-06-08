var async = require('async');
var fs = require('fs');
var path = require('path');
var program = require('commander');
var scrawl = require('./scrawl');
var wp = require('wporg');

program
  .version('0.3.0')
  .option('-d, --directory <directory>', 'The directory to process.')
  .option('-m, --html', 'If set, write the minutes to an index.html file')
  .option('-i, --index', 'Build meeting index')
  .option('-q, --quiet', 'Don\'t print status information to the console')
  .parse(process.argv);

var dstDir;
var logFile;
var indexFile;
var gDate;

if(program.directory) {
  dstDir = path.resolve(path.join(program.directory));
  logFile = path.resolve(path.join(program.directory, 'irc.log'));
  indexFile = path.resolve(path.join(program.directory, 'index.html'));
  gDate = path.basename(dstDir);
  gDate = gDate.match(/([0-9]{4}-[0-9]{2}-[0-9]{2})/)[1];
}

// setup global variables
var htmlHeader = fs.readFileSync(
  __dirname + '/header.html', {encoding: 'utf8'});
var htmlFooter = fs.readFileSync(
  __dirname + '/footer.html', {encoding: 'utf8'});
var peopleJson = fs.readFileSync(
  __dirname + '/people.json', {encoding: 'utf8'});
var haveAudio = false;

// configure scrawl
scrawl.group = 'JSON-LD CG Telecon';
scrawl.people = JSON.parse(peopleJson);

/************************* Utility Functions *********************************/
/*************************** Main Functionality ******************************/

async.waterfall([ function(callback) {
  if(program.directory) {
    // check to make sure the log file exists in the given directory
    //console.log("dstDir:", dstDir, "\nlogFile:", logFile);
    fs.exists(logFile, function(exists) {
      if(exists) {
        fs.readFile(logFile, 'utf8', function(data) {
          // generate the index.html file
          var minutes =
            htmlHeader +
            '<div><div><div class="container">' +
            '<div class="row"><div class="col-md-8 col-md-offset-2">' +
            scrawl.generateMinutes(data, 'html', gDate, haveAudio) +
            '</div></div></div></div></div>' + htmlFooter;
          // write the index.html file to disk
          if(program.html) {
            if(!program.quiet) {
              console.log('scrawl: Writing', indexFile);
            }
            fs.writeFile(indexFile, minutes, {}, callback);
          }
        });
      } else {
        callback('Error: ' + logFile +
          ' does not exist, required for processing.');
      }
    });
  } else {
    callback()
  }
}, function(callback) {
  // write the index.html file to disk
  if(program.index) {
    if(!program.quiet) {
      console.log('scrawl: Writing meeting summaries...');
    }
    var minutesDir = __dirname + '/..';
    var logFiles = [];
    async.auto({
      readDirs: function(callback) {
        fs.readdir(minutesDir, callback);
      },
      findLogs: ['readDirs', function(callback, results) {
        async.each(results.readDirs, function(item, callback) {
          var ircLog = minutesDir + '/' + item + '/irc.log';
          fs.exists(ircLog, function(exists) {
            if(exists) {
              logFiles.push(ircLog);
            }
            callback();
          });
        }, function(err) {
          callback(err, logFiles);
        });
      }],
      buildSummaries: ['findLogs', function(callback, results) {
        var summaries = {};
        async.each(results.findLogs, function(item, callback) {
          fs.readFile(item, "utf8", function(err, data) {
            if(err) {
              return callback(err);
            }

            // generate summary items
            var summary = {
              topic: [],
              resolution: []
            };
            summary.topic = data.match(/topic: (.*)/ig);
            summary.resolution = data.match(/resolved: (.*)/ig);

            // strip extraneous information
            for(var i in summary.topic) {
              summary.topic[i] = summary.topic[i].replace(/topic: /ig, '');
            }
            for(var j in summary.resolution) {
              summary.resolution[j] =
                summary.resolution[j].replace(/resolved: /ig, '');
            }

            var date = item.match(/([0-9]{4}-[0-9]{2}-[0-9]{2}-?[^\/]*)/)[1];
            summaries[date] = summary;
            callback();
          });
        }, function(err) {
          callback(err, summaries);
        });
      }]
    }, function(err, results) {
      if(err) {
        return callback(err);
      }

      // write out summary file
      var summaryHtml = htmlHeader +
        '<div id="info">' +
        '<h1>Joining Teleconferences</h1>' +
        '<p>All JSON-LD teleconferences are open to the public. Anyone may join and participate in the discussion. All teleconferences are announced at least 24 hours in advance on the <a href="http://lists.w3.org/Archives/Public/public-linked-json/">JSON-LD mailing list</a>.</p>' +
        '<ul>' +
         '<li><strong>Meetings:</strong> generally every other week</li>' +
         '<li><strong>Time:</strong> 1800 UTC, 9am San Francisco, 12pm Boston, 6pm Berlin</li>' +
         '<li><strong>Where:</strong> Zoom (details in <a href="https://www.w3.org/groups/cg/json-ld/calendar">W3C calendar</a>)</li>' +
         '<li><strong>IRC:</strong> <a href="irc://irc.w3.org/#json-ld">irc://irc.w3.org/#json-ld</a></li>' +
         '<li><strong>Duration:</strong> 60 minutes</li>' +
         '</ul>' +
         '<p>Make sure you have a good headset with a microphone as any background noise is distracting to others during the call. If there is excessive noise on your connection, you will be muted until you need to speak. Make sure you join the IRC channel as links and code examples are usually shared over the chat channel.</p>' +
         '<p>Minutes for meetings prior to the creation of the JSON-LD Working group may be found <a href="pre-wg/index.html">here</a>.</p>';

      var summaryKeys = Object.keys(results.buildSummaries).sort().reverse();
      for(var k in summaryKeys) {
        var key = summaryKeys[k];
        var summary = results.buildSummaries[key];
        summaryHtml += '<h3><a href="' + key + '/">Meeting for ' + key + '</a></h3>\n';
        if(summary.topic && summary.topic.length > 0) {
          summaryHtml += '<h4>Topics</h4><ol>\n';
          for(var t in summary.topic) {
            var tcounter = parseInt(t) + 1;
            summaryHtml +=
              '<li><a href="' + key + '/#topic-' + tcounter + '">' +
              summary.topic[t] + '</a></li>\n';
          }
          summaryHtml += '</ol>\n';
        }
        if(summary.resolution && summary.resolution.length > 0) {
          summaryHtml += '<h4>Resolutions</h4><ol>\n';
          for(var r in summary.resolution) {
            var rcounter = parseInt(r) + 1;
            summaryHtml +=
              '<li><a href="' + key + '/#resolution-' + rcounter + '">' +
              summary.resolution[r] + '</a></li>\n';
          }
          summaryHtml += '</ol>\n';
        }
      }
      summaryHtml += htmlFooter;

      fs.writeFileSync(__dirname + '/../index.html', summaryHtml, 'utf-8');
      callback();
    });
  } else {
    callback();
  }
}], function(err) {
  // check to ensure there were no errors
  if(err) {
    console.log('Error:', err);
  }
});
