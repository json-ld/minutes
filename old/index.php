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
      <link href="/site.css" rel="stylesheet" type="text/css" /> 
      <link rel="shortcut icon" href="favicon.ico" /> 
      <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script> 
   </head> 
 
   <body> 
      <div id="container"> 
         <div id="header"> 
            <div class="col"> 
               <h1>JSON-LD - Teleconference Logs (2011-2014)</h1>
            </div> 
         </div> 

         <div id="content"> 
            <div><a href="/">JSON-LD</a> &gt; <a href="../">Teleconference Logs</a> &gt; 2011-2014</div>
            <div id="info"> 
               <h1>Historical Logs</h1>
               
               <p>These logs record work done leading up to the
                 <a href="https://www.w3.org/TR/2014/REC-json-ld-20140116/">JSON-LD 1.0 release</a>
                 which became part of the <a href="https://www.w3.org/2011/rdf-wg/wiki/Main_Page">RDF 1.1 Working Group</a>..</p>
               
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
   print fread($mcache, 131072);
}
else
{
   print fread($mcache, 131072);
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

