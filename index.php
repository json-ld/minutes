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
   xmlns:v="http://rdf.data-vocabulary.org/#"
   > 
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
               <h1>Text and Audio Logs</h1>
               <p>The JSON-LD teleconferences (minutes available as text and audio):</p>
               <ul>
htmlcode;

$allMinutes = scandir('.');

foreach($allMinutes as $minutes)
{
   if(preg_match("/201[0-9]-[0-9]{2,2}-[0-9]{2,2}/", $minutes))
   {
     print("                 <li><a href=\"$minutes/\">$minutes</a></li>");
   }
}

print <<< htmlcode
               </ul>

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

