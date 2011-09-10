/**
 * Scrawl is a tool that is useful for taking minutes via IRC and cleaning them
 * up for public consumption. It takes an IRC log as input and generates a
 * nice, stand-alone HTML page from the input.
 */
(function($)
{
   window.scrawl = window.scrawl || {};
   var scrawl = window.scrawl;

   /* Standard regular expressions to use when matching lines */
   var commentRx = /^\[(.*)\]\s+\<(.*)\>\s+(.*)$/;
   var scribeRx = /^scribe:.*$/i;
   var chairRx = /^chair:.*$/i;
   var proposalRx = /^(proposal|proposed):.*$/i;
   var resolutionRx = /^(resolution|resolved):.*$/i;
   var topicRx = /^topic:\s*(.*)$/i;
   var voipRx = /^voip.*$/i;
   var toVoipRx = /^voip.{0,4}:.*$/i;
   var queueRx = /^q[+-]\s.*|^q[+-].*|^ack\s+.*|^ack$/i;
   var voteRx = /^[+-][01]\s.*|[+-][01]$/i;
   var agendaRx = /^agenda:\s*(http:.*)$/i;
	var urlRx = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/;

   scrawl.generateAliases = function()
   {
      var rval = {};

      for(p in scrawl.people)
      {
         var person = scrawl.people[p];
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
            alias = alias.toLowerCase();
            if(alias.length > 2 && !(alias in rval))
            {
               rval[alias] = p;
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
          scrawl.htmlencode(msg) + "</h1>\n";
   };
   
   scrawl.information = function(msg)
   {
      return "<div class=\"information\">" +  
          scrawl.htmlencode(msg) + "</div>\n";
   };

   scrawl.proposal = function(msg)
   {
      return "<div class=\"proposal\"><strong>PROPOSAL:</strong> " +
          scrawl.htmlencode(msg) + "</div>\n";
   };

   scrawl.resolution = function(msg)
   {
      return "<div class=\"resolution\"><strong>RESOLUTION:</strong> " +
          scrawl.htmlencode(msg) + "</div>\n";
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
         rval += " [scribe assist by " + scrawl.htmlencode(assist) + "]";
      }
      
      rval += "</div>\n";
      
      return rval;
   };

   scrawl.scribeContinuation = function(msg)
   {
      var rval = "<div class=\"comment-continuation\">" +  
          scrawl.htmlencode(msg) + "</div>\n";

      return rval;
   }

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
          scrawl.htmlencode(msg) + "</div>\n";
   };

   scrawl.processLine = function(context, aliases, line)
   {
       var rval = "";
       var match = commentRx.exec(line);

       if(match)
       {
          var time = match[1];
          var nick = match[2].toLowerCase();
          var msg = match[3];
          
          // check for a scribe line
          if(msg.search(scribeRx) != -1)
          {
             var scribe = msg.split(":")[1].replace(" ", "");
             scribe = scribe.toLowerCase();

             if(scribe in aliases)
             {
                 context.scribenick = scribe;
                 context.scribe = aliases[scribe];
                 scrawl.present(context, aliases[scribe]);
                 rval = scrawl.information(context.scribe + " is scribing.");
             }
          }
          else if(msg.search(chairRx) != -1)
          {
             var chair = msg.split(":")[1].replace(" ", "").split(" ")[0];
             chair = chair.toLowerCase();

             if(chair in aliases)
             {
                 context.chair = aliases[chair];
                 scrawl.present(context, aliases[chair]);
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
          // check for proposal line
          else if(msg.search(proposalRx) != -1)
          {
             var proposal = msg.split(":")[1];
             rval = scrawl.proposal(proposal);
          }
          // check for resolution line
          else if(msg.search(resolutionRx) != -1)
          {
             var resolution = msg.split(":")[1];
             rval = scrawl.resolution(resolution);
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
                rval = scrawl.scribe(msg, aliases[nick]);
             }
          }
          // the line is by the scribe
          else if(nick == context.scribenick)
          {
             if(msg.indexOf("…") == 0 || msg.indexOf("...") == 0)
             {
                // the line is a scribe continuation
                rval = scrawl.scribeContinuation(msg);
             }
             else if(msg.indexOf(":") != -1)
             {
                var alias = msg.split(":", 1)[0].replace(" ", "").toLowerCase();
                
                if(alias in aliases)
                {
                    // the line is a comment made by somebody else that was
                    // scribed
                    var cleanedMessage = msg.split(":").splice(1).join(":");

                    scrawl.present(context, aliases[alias]);
                    rval = scrawl.scribe(cleanedMessage, aliases[alias]);
                }
                else
                {
                    // The scribe is noting something and there just happens
                    // to be a colon in it
                    rval = scrawl.scribe(msg);
                }
             }
             else
             {
                // The scribe is noting something
                rval = scrawl.scribe(msg);
             }
          }
          // the line is a comment by somebody else
          else if(nick != context.scribenick)
          {
             if(msg.indexOf(":") != -1)
             {
                var alias = msg.split(":", 1)[0].replace(" ", "").toLowerCase();
                
                if(alias in aliases)
                {
                    // the line is a scribe assist
                    var cleanedMessage = msg.split(":").splice(1).join(":");

                    scrawl.present(context, aliases[alias]);
                    rval = scrawl.scribe(cleanedMessage, aliases[alias], 
                       aliases[nick]);
                }
                else if(alias.indexOf("http") == 0)
                {
                   rval = scrawl.scribe(msg, aliases[nick]);
                }
                else if(aliases.hasOwnProperty(nick))
                {
                   rval = scrawl.scribe(msg, aliases[nick]);
                }
                else
                {
                   rval = scrawl.error("(IRC nickname not recognized)" + line);
                }
             }
             else
             {
                // the line is a scribe line by somebody else
                scrawl.present(context, aliases[nick]);
                rval = scrawl.scribe(msg, aliases[nick]);
             }
          }
          else
          {
             rval = scrawl.error("(Strange line format)" + line);
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

      rval += "<h1>" + group +" Telecon</h1>\n";
      rval += "<h2>Minutes for " + time.getFullYear() + "-" + 
         (time.getMonth() + 1) + "-" + time.getDate() +"</h2>\n";
      rval += "<div class=\"summary\">\n<dl>\n";
      rval += "<dt>Agenda</dt><dd><a href=\"" + 
          agenda + "\">" + agenda + "</a></dd>\n";
      rval += "<dt>Chair</dt><dd>" + chair + "</dd>\n";
      rval += "<dt>Scribe</dt><dd>" + scribe + "</dd>\n";
      rval += "<dt>Present</dt><dd>" + present.join(", ") + "</dd>\n";
      rval += "<dt>Audio Log</dt><dd>" +
          "<div><a href=\"" + audio + "\">" + audio + "</a></div>\n" +
          "<div><audio controls=\"controls\" preload=\"none\">\n" + 
          "<source src=\"" + audio + "\" type=\"audio/ogg\" />" +
          "Warning: Your browser does not support the HTML5 audio element, " +
          "please upgrade.</div></dd>\n";

      rval += "</dl>\n</div>\n";

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
         "group": "JSON for Linking Data", 
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
