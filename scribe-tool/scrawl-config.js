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
      "Danny Ayers":
      {
         "alias": ["danja"],
         "homepage": "http://dannyayers.com/"
      },
      "Henri Bergius":
      {
         "alias": ["bergie"],
         "homepage": "http://bergie.iki.fi/about/"
      },
      "Nicolas Dufour":
      {
         "alias": ["capnemo"],
         "homepage": "http://www.nemoworld.info/"
      },
      "Michael Johnson":
      {
         "alias": ["mjohnson", "mjohnson_db"]
      },
      "Gregg Kellogg":
      {
         "alias": "gkellogg",
         "homepage": "http://greggkellogg.net/pages/about"
      },
      "Markus Lanthaler":
      {
         "alias": ["MarkusLanthaler"],
         "homepage": "https://twitter.com/markuslanthaler"
      },
      "Niklas Lindström":
      {
         "alias": ["lindstream", "niklasl"]
      },
      "David I. Lehn":
      {
         "alias": ["dil", "dlehn", "taaz"],
         "homepage": "http://dil.lehn.org/"
      },
      "Dave Longley":
      {
         "alias": ["dlongley", "dlongley-db"]
      },
      "Alfonso Martin":
      {
         "alias": ["amartin"]
      },
      "Alexandre Passant":
      {
         "alias": ["terraces"],
         "homepage": "http://apassant.net/"
      },
      "Nathan Rixham":
      {
         "alias": ["webr3"],
         "homepage": "http://webr3.org/"
      },
      "Manu Sporny":
      {
         "alias": ["manu-db", "manu1", "manu`"],
         "homepage": "http://manu.sporny.org/about"
      },
      "Thomas Steiner":
      {
         "alias": ["tomayac"],
         "homepage": "https://plus.google.com/103733874714446059779/about"
      },
      "Ted Thibodeau Jr.":
      {
         "alias": ["macted"],
         "homepage": "http://www.linkedin.com/in/macted"
      }
   };

   var htmlHeader = 
'<!DOCTYPE html> \n' +
' \n' +
'<html> \n' +
'<head> \n' +
'  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> \n' +
'  <title>Linked Data in JSON Telecon</title> \n' +
'  \n' +
'  <style type="text/css"> \n' +
'body {\n' +
'   max-width: 50em;\n' +
'   margin: auto;\n' +
'   font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;\n' +
'   font-weight: 300;\n' +
'}\n' +
'\n' +
'label {\n' +
'   float: left;\n' +
'   text-align: right;\n' +
'   margin-right: 15px;\n' +
'   width: 100px;\n' +
'}\n' +
'\n' +
'a {\n' +
'   color: #4183c4;\n' +
'}\n' +
'\n' +
'ol {\n' +
'   padding-left: 1.2em;\n' +
'   margin: 0em;\n' +
'}\n' +
' \n' +
'.name {\n' +
'   font-weight: bold;\n' +
'}\n' +
' \n' +
'.information {\n' +
'   font-style: italic;\n' +
'}\n' +
' \n' +
'.comment-continuation {\n' +
'   margin-left: 2em;\n' +
'}\n' +
' \n' +
'.proposal {\n' +
'   background: #eee;\n' +
'   border: 0.2em solid #c4c8cc;\n' +
'   margin: 1em;\n' +
'   border-radius: 1em 1em 1em 1em;\n' +
'   padding: 1em 1em 1em 1em;\n' +
'}\n' +
' \n' +
'.resolution {\n' +
'   background: #beb;\n' +
'   border: 0.2em solid #c4c8cc;\n' +
'   margin: 1em;\n' +
'   border-radius: 1em 1em 1em 1em;\n' +
'   padding: 1em 1em 1em 1em;\n' +
'}\n' +
' \n' +
'.action {\n' +
'   background: #bbe;\n' +
'   border: 0.2em solid #c4c8cc;\n' +
'   margin: 1em;\n' +
'   border-radius: 1em 1em 1em 1em;\n' +
'   padding: 1em 1em 1em 1em;\n' +
'}\n' +
'  </style> \n' +
'</head> \n' +
' \n' +
'<body> \n';

   var htmlFooter = '</body>\n' +
'</html>';

   scrawl.group = "JSON-LD Community Group";
   scrawl.htmlHeader = htmlHeader;
   scrawl.htmlFooter = htmlFooter;
   scrawl.people = people;

})(jQuery);

