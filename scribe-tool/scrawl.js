/**
 * Scrawl is a tool that is useful for taking minutes via IRC and cleaning them
 * up for public consumption. It takes an IRC log as input and generates a
 * nice, stand-alone HTML page from the input.
 */
(function($)
{
   window.scrawl = window.scrawl || {};
   var scrawl = window.scrawl;

   var people = 
   {
      "Bradley Allen":
      {
         "alias": ["ballen"],
         "homepage": "http://bradleypallen.org/about"
      },
      "Michael Johnson":
      {
         "alias": ["mjohnson"]
      },
      "Gregg Kellogg":
      {
         "alias": "gkellogg",
         "homepage": "http://greggkellogg.net/pages/about"
      },
      "Niklas Lindström":
      {
         "alias": ["lindstream"]
      },
      "David I. Lehn":
      {
         "alias": ["dil", "dlehn"],
         "homepage": "http://dil.lehn.org/"
      },
      "Dave Longley":
      {
         "alias": ["dlongley", "dlongley-db"]
      },
      "Manu Sporny":
      {
         "alias": ["manu-db", "manu1"],
         "homepage": "http://manu.sporny.org/about"
      },
      "Thomas Steiner":
      {
         "alias": ["tomayac"],
         "homepage": "https://plus.google.com/103733874714446059779/about"
      }
   };

   /* Standard regular expressions to use when matching lines */
   var commentRx = /^\[(.*)\]\s+\<(.*)\>\s+(.*)$/;
   var scribeRx = /^scribe:.*$/i;
   var topicRx = /^topic:\s*(.*)$/i;
   var voipRx = /^voip.*$/i;
   var toVoipRx = /^voip.{0,4}:.*$/i;
   var queueRx = /^q[+-]\s.*|q[+-].*|ack\s+.*|ack$/i;
   var voteRx = /^[+-][01]\s.*|[+-][01]$/i;
   var agendaRx = /^agenda:\s*(http:.*)$/i;
	var urlRx = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/;

   scrawl.generateAliases = function()
   {
      var rval = {};

      for(p in people)
      {
         var person = people[p];
         var names = p.split(" ")

         // append any aliases to the list of known names
         if("alias" in person)
         {
            names = names.concat(person["alias"]);
         }

         // Add the aliases and names if they don't already exist in the aliases
         for(n in names)
         {
            var alias = names[n];
            alias.toLowerCase();
            if(alias.length > 2 && !(alias in rval))
            {
               rval[names[n]] = p;
            }
         }
      }

      return rval;
   };

   scrawl.htmlencode = function(text)
   {
      var modified = $('<div/>').text("" + text).html()
      modified = modified.replace(urlRx, "<a href=\"$1\">$1</a>");

      return modified;
   };

   scrawl.topic = function(msg, id)
   {
      return "<h1 id=topic-" + id + " class=\"topic\">Topic: " +  
          scrawl.htmlencode(msg) + "</h1>";
   };
   
   scrawl.information = function(msg)
   {
      return "<div class=\"information\">Note: " +  
          scrawl.htmlencode(msg) + "</div>";
   };

   scrawl.scribe = function(msg, person, assist)
   {
      var rval = "<div ";
   
      if(person != undefined)
      {
         rval += "class=\"comment\"><span class=\"name\">" + 
            scrawl.htmlencode(person) + "</span>: ";
      }
      else
      {
         rval += "class=\"information\">";
      }
      
      rval += scrawl.htmlencode(msg);
      
      if(assist != undefined)
      {
         rval += "[scribe assist by " + scrawl.htmlencode(assist) + "]";
      }
      
      rval += "</div>";
      
      return rval;
   };

   scrawl.present = function(context, person)
   {
      if(person != undefined)
      {
         context.present[person] = true;
      }
   };

   scrawl.error = function(msg)
   {
      return "<div class=\"error\">Error: " +  
          scrawl.htmlencode(msg) + "</div>";
   };

   scrawl.processLine = function(context, aliases, line)
   {
       var rval = "";
       var match = commentRx.exec(line)

       if(match)
       {
          var time = match[1];
          var nick = match[2].toLowerCase();
          var msg = match[3];
          
          // check for a scribe line
          if(msg.search(scribeRx) != -1)
          {
             var scribe = msg.split(":")[1].replace(" ", "");
             if(scribe in aliases)
             {
                 context.scribenick = scribe;
                 context.scribe = aliases[scribe];
                 rval = scrawl.information(context.scribe + " is scribing.");
             }
          }
          // check for topic line
          else if(msg.search(topicRx) != -1)
          {
             var topic = msg.match(topicRx)[1];
             context.topics = context.topics.concat(topic);
             rval = scrawl.topic(topic, context.topics.length);
          }
          // check for Agenda line
          else if(msg.search(agendaRx) != -1)
          {
             var agenda = msg.match(agendaRx)[1];
             context.agenda = agenda;
          }
          else if(nick.search(voipRx) != -1 || msg.search(toVoipRx) != -1)
          {
             // the line is from or is addressed to the voip bot, ignore it
          }
          else if(msg.search(queueRx) != -1)
          {
             // the line is queue management, ignore it
          }
          // the line is a +1/-1 vote
          else if(msg.search(voteRx) != -1)
          {
             if(nick in aliases)
             {
                rval = scrawl.scribe(msg, aliases[nick])
             }
          }
          // the line is by the scribe
          else if(nick == context.scribenick)
          {
             if(msg.indexOf(":") != -1)
             {
                var alias = msg.split(":")[0].replace(" ", "");
                var msg = msg.split(":")[1]
                
                if(alias in aliases)
                {
                    scrawl.present(context, aliases[alias])
                    rval = scrawl.scribe(msg, aliases[alias])
                }
                else
                {
                    rval = scrawl.scribe(msg)
                }
             }
             else
             {
                rval = scrawl.scribe(msg)
             }
          }
          // the line is a comment by somebody else
          else if(nick != context.scribenick)
          {
             // the line is a scribe line by somebody else
             scrawl.present(context, aliases[nick])
             rval = scrawl.scribe(msg, aliases[nick])
          }
          else
          {
             rval = scrawl.error(line);
          }
       }
       
       return rval;
   };

   scrawl.generateSummary = function(context)
   {
      var rval = "";
      var time = new Date();
      var group = context.group;
      var agenda = context.agenda;
      var audio = $("#meeting-audio").val();
      var chair = context.chair;
      var scribe = context.scribe;
      var present = Object.keys(context.present);

      rval += "<h1>" + group +" Telecon</h1>";
      rval += "<h2>Minutes for " + time.getFullYear() + "-" + 
         (time.getMonth() + 1) + "-" + time.getDate() +"</h2>";
      rval += "<div class=\"summary\"><dl>";
      rval += "<dt>Agenda</dt><dd><a href=\"" + 
          agenda + "\">" + agenda + "</a></dd>";
      rval += "<dt>Chair</dt><dd>" + chair + "</dd>";
      rval += "<dt>Scribe</dt><dd>" + scribe + "</dd>";
      rval += "<dt>Present</dt><dd>" + present.join(", ") + "</dd>";
      rval += "<dt>Audio Log</dt><dd>" +
          "<div><a href=\"" + audio + "\">" + audio + "</a></div>" +
          "<div><audio controls=\"controls\" preload=\"none\">" + 
          "<source src=\"" + audio + "\" type=\"audio/ogg\" />" +
          "Warning: Your browser does not support the HTML5 audio element, " +
          "please upgrade.</div></dd>";

      rval += "</dl></div>";

      return rval;
   };

   scrawl.generateMinutes = function()
   {
      var minutes = "";
      var summary = "";
      var header = "";
      var ircLines = $("#meeting-irc-log").val().split("\n");
      var aliases = scrawl.generateAliases();
      var context = 
      { 
         "group": "Linked Data in JSON", 
         "chair": "Manu Sporny",
         "present": {},
         "topics": []
      };

      for(var i = 0; i < ircLines.length; i++)
      {
         var line = ircLines[i];

         minutes += scrawl.processLine(context, aliases, line);
      }
      summary = scrawl.generateSummary(context);
      
      $("#summary").html(summary);
      $("#output").html(minutes);
      
      $("#code").html($('<div/>').text("" + summary).html());
      $("#code").append($('<div/>').text("" + minutes).html());
   };

})(jQuery);
