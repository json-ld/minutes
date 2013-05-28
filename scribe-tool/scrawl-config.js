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
      "David Wood":
      {
         "alias": ["prototypo"],
         "homepage": "http://prototypo.blogspot.com/"
      },
      "Zdenko 'Denny' Vrandečić":
      {
         "alias": ["Denny", "Denny_WMDE", "Denny_WMDE1"],
         "homepage": "http://simia.net/wiki/Denny"
      },
      "Stéphane Corlosquet":
      {
         "alias": ["scor"],
         "homepage": "http://www.linkedin.com/in/scorlosquet"
      },
      "Josh Mandel":
      {
         "alias": ["JoshM"],
         "homepage": "http://joshuamandel.com/"
      },
      "François Daoust":
      {
         "alias": ["tidoust"],
         "homepage": "https://twitter.com/tidoust"
      },
      "Henri Bergius":
      {
         "alias": ["bergie"],
         "homepage": "http://bergie.iki.fi/about/"
      },
      "Ivan Herman":
      {
         "alias": ["ivan_herman"],
         "homepage": "http://www.w3.org/People/Ivan/"
      },
      "Lin Clark":
      {
         "alias": ["linclark", "lin"],
         "homepage": "http://lin-clark.com/"
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
      "Paul Kuykendall":
      {
         "alias": "pkuyken",
         "homepage": "https://twitter.com/pkuyken"
      },
      "Markus Lanthaler":
      {
         "alias": ["MarkusLanthaler", "mlnt"],
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
      "Nicholas Car":
      {
         "alias": ["NicholasCar"],
         "homepage": "http://www.csiro.au/"
      },
      "Manu Sporny":
      {
         "alias": ["manu-db", "manu1", "manu`"],
         "homepage": "http://manu.sporny.org/about"
      },
      "Richard Cyganiak":
      {
         "alias": ["cygri"],
         "homepage": "http://richard.cyganiak.de/"
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
      },
      "Sandro Hawke":
      {
         "alias": ["sandro_"],
         "homepage": "http://www.linkedin.com/in/hawke"
      },
      "Stian Soiland-Reyes":
      {
         "alias": ["stain", "stain_"],
         "homepage": "http://soiland-reyes.com/stian/work/"
      },
      "Luca Matteis":
      {
         "alias": ["lmatteis"],
         "homepage": "http://lucaa.org/"
      },
      "Clay Wells":
      {
         "alias": ["clayball"],
         "homepage": "http://www.cwells.org/"
      },
      "Dan Brickley":
      {
         "alias": ["danbri"],
         "homepage": "http://danbri.org/‎"
      },
      "Radu Marian":
      {
         "alias": ["rmarian"],
         "homepage": "http://www.linkedin.com/pub/radu-marian/3/a94/6a9"
      },
      "Kuno Woudt":
      {
         "alias": ["warp"],
         "homepage": "https://frob.nl/"
      },
      "Vikash Agrawal":
      {
         "alias": ["vikash"],
         "homepage": "https://github.com/ivikash/"
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

