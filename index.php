<?php
print <<< htmlcode
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
 "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd"> 
<html version="XHTML+RDFa 1.0" xmlns="http://www.w3.org/1999/xhtml"
   xmlns:xhv="http://www.w3.org/1999/xhtml/vocab#"
   xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
   xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
   xmlns:dcterms="http://purl.org/dc/terms/"
   xmlns:vcard="http://www.w3.org/2006/vcard/ns#"
   xmlns:v="http://rdf.data-vocabulary.org/#"> 
   <head> 
      <meta http-equiv="Content-Type" content="text/html;charset=utf-8" /> 
      <title>JSON-LD - Teleconference Logs</title> 
      <link href="../site.css" rel="stylesheet" type="text/css" /> 
      <link rel="shortcut icon" href="favicon.ico" /> 
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script> 
   </head> 
 
   <body> 
      <div id="container"> 
         <div id="header"> 
            <div class="col"> 
               <h1>JSON-LD - Teleconference Logs</h1>
            </div> 
         </div> 

         <div id="content"> 
            <div><a href="../">JSON-LD</a> &gt; Teleconference Logs</div>
            <div id="info"> 
               <h1>Joining Teleconferences</h1>
               
               <p>All JSON-LD teleconferences are open to the public. Anyone may join and participate in the discussion. All teleconferences are announced at least 24 hours in advance on the <a href="http://lists.w3.org/Archives/Public/public-linked-json/">JSON-LD mailing list</a>.</p>

               <ul>
                  <li><strong>Next Meeting:</strong> 
htmlcode;

if(date('l', strtotime('today') === 'Tuesday'))
{
   print date('l, F jS (Y-m-d)', strtotime('today'));
}
else
{
   print date('l, F jS (Y-m-d)', strtotime('next Tuesday'));
}

print <<< htmlcode
                  </li>
                  <li><strong>Time:</strong> 1500 UTC, 7am San Francisco, 10am Boston, 3pm London</li>
                  <li><strong>Where:</strong> Digital Bazaar JSON-LD Telecon Bridge, SIP: <a href="sip:json-ld@digitalbazaar.com">json-ld@digitalbazaar.com</a>, tel: +1.540.961.4469 x6303.</li>
                  <li><strong>IRC:</strong> <a href="irc://freenode.net/#json-ld">irc://freenode.net/#json-ld</a> (<a href="http://webchat.freenode.net?channels=json-ld">join via WebIRC</a>)
                  <li><strong>Duration:</strong> 60 minutes
               </ul>

               <p>Make sure you have a good headset with a microphone as any background noise is distracting to others during the call. If there is excessive noise on your connection, you will be muted until you need to speak. Make sure you join the IRC channel as links and code examples are usually shared over the chat channel.</p>
               
               <h1>Text and Audio Logs</h1>
               <p>The public JSON-LD teleconferences and all of the decisions made in those meetings are listed below. Click on each link to take you to the full text and audio log of the meeting:</p> 
htmlcode;

// Generate the minutes summary cache
$mscfilename = "minutes-summary-cache.html";
$mtime = filemtime($mscfilename);

// refresh the cache on demand, every hour
$mcache = fopen($mscfilename, "c+");
if(!file_exists($mscfilename) or ((time() - $mtime) > 3600))
{
   $allMinutes = array_reverse(scandir('.'));
   fwrite($mcache, "<ul>\n");
   foreach($allMinutes as $minutes)
   {
      if(preg_match("/201[0-9]-[0-9]{2,2}-[0-9]{2,2}/", $minutes))
      {
         fwrite($mcache, "   <li><a href=\"$minutes/\">Text and Audio Minutes for  $minutes</a>\n");

         // open the IRC log file
         $irclogfilename = $minutes . "/irc.log";
         $irclog = file($irclogfilename, 
            FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
         $resolution = 1;

         // process the raw IRC log and output the resolutions
         fwrite($mcache, "      <ol>\n");
         foreach($irclog as $line_num => $line)
         {
            if(preg_match("/.*RESOLVED: (.*)/", $line, $matches))
            {
               // link to each resolution in the HTML minutes
               fwrite($mcache, 
                  "         <li>" .
                  htmlspecialchars($matches[1]) . 
                  " [<a href=\"$minutes/#resolution-$resolution\">" .
                  "permalink</a>]</li>\n");
               $resolution += 1;
            }
         }
         fwrite($mcache, "      </ol></li>");
      }
   }
   fwrite($mcache, "</ul>\n");
   
   fseek($mcache, 0);
   print fread($mcache, 65536);
}
else
{
   print fread($mcache, 65536);
}
fclose($mcache);

print <<< htmlcode
               </p>

               <h1>Tools</h1>
               <ul>
                  <li><a href="scribe-tool">Scribe Tool</a> - The scribe tool makes it easy to clean up minutes recorded in IRC.</li>
               </ul>

            </div>
         </div>
 
         <div id="footer"> 
            <p id="copyright"> 
               Website content released under a <a href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution Share-Alike license</a> except where an alternate is specified.
            </p> 
            <p id="legal"> 
               Part of the <a href="http://payswarm.com/">payswarm.com</a> initiative.
            </p>
         </div> 
      </div> 
   </body> 
</html>

htmlcode;

?>

