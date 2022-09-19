/**
 * Scrawl is a tool that is useful for taking minutes via IRC and cleaning them
 * up for public consumption. It takes an IRC log as input and generates a
 * nice, stand-alone HTML page from the input.
 */
(function() {
  const $ = (typeof jQuery !== 'undefined') ? jQuery : undefined;
  /* Standard regular expressions to use when matching lines */
  const commentRx = /^\[?(\S*)\]?\s+<([^>]*)>\s+(.*)$/;
  const scribeRx = /^(scribe|scribenick)[:+\-](.*)$/i;
  const meetingRx = /^meeting:\s(.*)$/i;
  const totalPresentRx = /^total present:\s(.*)$/i;
  const dateRx = /^date:\s(.*)$/i;
  const chairRx = /^chair[:+\-].*$/i;
  const audioRx = /^audio:\s?(.*)$/i;
  const proposalRx = /^(proposal|proposed):.*$/i;
  const presentRx = /^present[:+\-](.*)$/i;
  const regretsRx = /^regrets[:+\-](.*)$/i;
  const resolutionRx = /^(resolution|resolved): ?(.*)$/i;
  const useCaseRx = /^(use case|usecase):\s?(.*)$/i;
  const agendumRx = /^agendum \d+\s+\-\- (.*) \-\-/i
  const topicRx = /^topic:\s*(.*)$/i;
  const actionRx = /^action:\s*(.*)$/i;
  const voipRx = /^voip.*$/i;
  const toVoipRx = /^voip.{0,4}:.*$/i;
  const botRx = /^(rrsagent|zakim|agendabot).*$/i;
  const allowedBotRx = /^(ghurlbot).*$/i;
  const junkRx = / has (joined|left|changed)/i;
  const queueRx = /^qq?[+-?]\s.*|^qq?[+-?].*|^ack\s+.*|^ack$/i;
  const voteRx = /^[+-][01]\s.*|[+-][01]$/i;
  const agendaRx = /^agenda:\s*((https?):.*)$/i;
  const urlRx = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/;

  // Based on https://github.com/w3c/scribe2/blob/51a2e428fb1d6edf1fe1d1eba756c81d9b109cdd/scribe.perl#L820
  var replaceRx = /^ *(s|i)(\/|\|)(.*?)\2(.*?)(?:\2([gG*])? *)?$/;

  // Compatability code to make this work in both node.js and the browser
  const scrawl = {};
  let nodejs = false;
  if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    const Entities = require('html-entities').XmlEntities;
    var entities = new Entities();
    module.exports = scrawl;
    nodejs = true;
  } else {
    window.scrawl = scrawl;
  }

  /* The update counter and the timeout is used to delay the update of the
    HTML output by a few seconds so that reformatting the page doesn't
    overload the CPU. */
  scrawl.updateCounter = 1;
  scrawl.updateCounterTimeout = null;

  scrawl.wordwrap = function(str, width, brk, cut )
  {
    brk = brk || '\n';
    width = width || 65;
    cut = cut || false;

    if (!str) { return str; }

    const regex = '.{1,' + width + '}(\\s|$)' +
      (cut ? '|.{' +width+ '}|.+$' : '|\\S+?(\\s|$)');

    return str.match(new RegExp(regex, 'g')).join(brk);
  };

  // Record diffent categories for people
  scrawl.processPeople = function(context, category, nick, line, remove = false)
  {
    const lower = line.toLowerCase();
    let [, cmd, op, rest] = lower.match(/(\w+)([:+\-])\s*(.*)$/);

    if(!(category in context)) {
      context[category] = [];
    }

    // category: resets the list
    if(op === ':' && remove === true) {
      context[category] = [];
    }

    // line has form of (category)[:+=] nick or first_last
    var whoall = rest
      .split(',')
      .map(n => n.trim())
      .filter(e => !!e);

    // If no who, use nick
    if(whoall.length === 0) {whoall = [nick]}

    for(const who of whoall) {
      if(!(who in context.aliases)) {
        // Create an alias record, presuming this is First_Last name
        context.aliases[who] = who.split('_').join(' ');
      }
      let name = context.aliases[who]

      if(op === '-' && remove === true) {
        // Remove from category
        context[category] = context[category].filter(i => i !== name);
      } else if(!(context[category].includes(name))){
        // Add to category
        context[category].push(name);
      }
    }
  }

  // FIXME: integrate changes from CCG, considering overlap with processPeople
  scrawl.generateAliases = function()
  {
    const rval = {};

    for(const p in scrawl.people)
    {
      const person = scrawl.people[p];
      var names = p.split(' ');

      // append any aliases to the list of known names
      if('alias' in person)
      {
        names = names.concat(person.alias);
      }

      // Add the aliases and names if they don't already exist in the aliases
      for(const n in names)
      {
        const alias = names[n].toLowerCase();
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
    let modified;

    if(nodejs) {
      modified = entities.encodeNonUTF(text);
    } else {
      modified = text.replace(/[\"&<>]/g, function (a) {
        return { '"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;' }[a];
      });
    }
    modified = modified.replace(urlRx, '<a href="$1">$1</a>');

    return modified;
  };

  scrawl.topic = function(msg, id, textMode)
  {
    let rval = '';

    if(textMode === 'html')
    {
      rval = '<h1 id="topic-' + id + '" class="topic">Topic: ' +
       scrawl.htmlencode(msg) + '</h1>\n';
    }
    else
    {
      rval = '\nTopic: ' + msg + '\n\n';
    }

    return rval;
  };

  scrawl.action = function(msg, id, textMode)
  {
    let rval = '';

    if(textMode === 'html')
    {
      rval = '<div id="action-' + id + '" class="action">ACTION: ' +
       scrawl.htmlencode(msg) + '</div>\n';
    }
    else
    {
      rval = '\n\n' + scrawl.wordwrap('ACTION: ' + msg, 65, '\n  ') + '\n\n';
    }

    return rval;
  };

  scrawl.information = function(msg, textMode)
  {
    let rval = '';

    if(textMode === 'html')
    {
      rval = '<div class="information">' +
       scrawl.htmlencode(msg) + '</div>\n';
    }
    else
    {
      rval = scrawl.wordwrap(msg, 65, '\n  ') + '\n';
    }

    return rval;
  };

  scrawl.proposal = function(msg, textMode)
  {
    let rval = '';

    if(textMode === 'html')
    {
      rval = '<div class="proposal"><strong>PROPOSAL:</strong> ' +
       scrawl.htmlencode(msg) + '</div>\n';
    }
    else
    {
      rval =
        '\n' + scrawl.wordwrap('PROPOSAL: ' + msg, 65, '\n  ') + '\n\n';
    }

    return rval;
  };

  scrawl.resolution = function(msg, id, textMode)
  {
    let rval = '';

    if(textMode === 'html')
    {
      rval = '<div onmouseout="$(\'#link-res-' + id + '\').hide()" ' +
        'onmouseover="$(\'#link-res-' + id + '\').show()" ' +
        'id="resolution-' + id + '" class="resolution">\n';
      rval += '<strong>RESOLUTION:</strong> ' +
        scrawl.htmlencode(msg) + '\n';
      rval += '<a id="link-res-' + id +
        '" style="display:none;" href="#resolution-'+ id + '">✪</a></div>\n';
    }
    else
    {
      rval =
        '\n' + scrawl.wordwrap('RESOLUTION: ' + msg, 65, '\n  ') + '\n\n';
    }

    return rval;
  };

  scrawl.usecase = function(msg, textMode)
  {
    let rval = '';

    if(textMode === 'html')
    {
      rval = '<div id="usecase-' + scrawl.counter + '" class="resolution">' +
        '<strong>USE CASE:</strong> ' +
        scrawl.htmlencode(msg) + '</div>\n';
    }
    else
    {
      rval =
        '\n' + scrawl.wordwrap('USE CASE: ' + msg, 65, '\n  ') + '\n\n';
    }

    return rval;
  };

  scrawl.scribe = function(msg, textMode, person, assist)
  {
    let rval = '';

    // capitalize the first letter of the message if it doesn't start with http
    if(!(/^(\s)*https?:\/\//.test(msg))) {
      msg = msg.replace(/(\s)?([a-zA-Z])/, function(firstLetter) {
        return firstLetter.toUpperCase();
      });
    }

    if(textMode === 'html')
    {
      scrawl.counter += 1;
      rval = '<div onmouseout="$(\'#link-' + scrawl.counter + '\').hide()" ' +
        'onmouseover="$(\'#link-' + scrawl.counter + '\').show()" ' +
        'id="' + scrawl.counter + '" ';

      if(person !== undefined)
      {
        rval += 'class="comment"><span class="name">' +
          scrawl.htmlencode(person) + '</span>: ';
      }
      else
      {
        rval += 'class="information">';
      }

      rval += scrawl.htmlencode(msg);

      if(assist !== undefined)
      {
        rval += ' [scribe assist by ' + scrawl.htmlencode(assist) + ']';
      }

      rval += ' <a id="link-' + scrawl.counter +
        '" style="display:none;" href="#'+ scrawl.counter + '">✪</a></div>\n';
    }
    else
    {
      scribeline = '';
      if(person !== undefined)
      {
        scribeline = person + ': ';
      }
      scribeline += msg;
      if(assist !== undefined)
      {
        scribeline += ' [scribe assist by '+ assist + ']';
      }

      rval = scrawl.wordwrap(scribeline, 65, '\n  ') + '\n';
    }

    return rval;
  };

  scrawl.scribeContinuation = function(msg, textMode)
  {
    let rval = '';

    if(textMode === 'html')
    {
      rval = '<div class="comment-continuation">' +
       scrawl.htmlencode(msg) + '</div>\n';
    }
    else
    {
      rval = scrawl.wordwrap('  ' + msg, 65, '\n  ') + '\n';
    }

    return rval;
  };

  scrawl.present = function(context, person)
  {
    if(person !== undefined)
    {
      scrawl.processPeople(context, 'present', person, 'present+', false);
    }
  };

  scrawl.error = function(msg, textMode)
  {
    let rval = '';

    if(textMode === 'html')
    {
      rval = '<div class="error">Error: ' +
        scrawl.htmlencode(msg) + '</div>\n';
    }
    else
    {
      rval = scrawl.wordwrap('\nError: ' + msg, 65, '\n  ') + '\n';
    }

    return rval;
  };

  scrawl.setHtmlHeader = function(header) {
    scrawl.htmlHeader = header;
  };

  scrawl.setHtmlFooter = function(footer) {
    scrawl.htmlFooter = footer;
  };

  scrawl.preprocessLine = function(context, lines, lineNumber)
  {
    const line = lines[lineNumber];
    const match = commentRx.exec(line);
    if(!match)
    {
      return;
    }
    const [_, time, nick, msg] = match;

    // check for a substitution
    const replaceMatch = replaceRx.exec(msg);
    if(replaceMatch)
    {
      const [_, cmd, delim, old, replacement, modifier] = replaceMatch;
      if (cmd !== 's')
      {
        console.error(`command not supported on line ${lineNumber}: ${line}`);
        return;
      }
      const maxReplaces = modifier === 'g' || modifier === 'G' ? Infinity : 1;
      const endLineN = modifier === 'G' ? lines.length-1 : lineNumber-1;
      let numReplaces = 0;
      for(let i = endLineN; i >= 0; i--)
      {
        const line = lines[i];
        const newLine = line.replace(old, replacement);
        if(line !== newLine)
        {
          lines[i] = newLine;
          console.log('Replacing', JSON.stringify(old), 'with', JSON.stringify(replacement), ' on line', i)
          if(++numReplaces >= maxReplaces)
          {
            break;
          }
        }
      }
      lines[lineNumber] = '';
    }
  }

  scrawl.processLine = function(context, line, textMode)
  {
     let rval = '';
     const match = commentRx.exec(line);

     if(!match)
     {
       return '';
     }
     const [_, time, _nick, msg] = match;
     const nick = _nick.toLowerCase();
     const nickName = context.aliases[nick];

     // check for a scribe line
     if(msg.search(scribeRx) !== -1)
     {
       if(nick === 'transcriber') {
         if(!(nick in context.aliases))
         {
           context.aliases[nick] = 'Transcriber'
         }
         context.scribe.push('Transcriber')
         context.scribenick.push('Transcriber')
         rval = scrawl.information('Our Robot Overlords are scribing.');
       } else {
         // 'scribe' collects all scribes in the meeting
         scrawl.processPeople(context, 'scribe', nick, msg, false);

         // 'scribenick' maintains list of current scribes
         scrawl.processPeople(context, 'scribenick', nick, msg, true);

         if(!(msg.includes('scribe-'))) {
           rval = scrawl.information(
            context.scribe[context.scribe.length-1] +
            ' is scribing.', textMode);
         }
       }
     }
     else if(msg.search(chairRx) !== -1)
     {
       scrawl.processPeople(context, 'chair', nick, msg, true);
     }
     // check for meeting line
     else if(msg.search(meetingRx) !== -1)
     {
       const meeting = msg.match(meetingRx)[1];
       context.group = meeting;
     }
     // check for regrets line
     else if(msg.search(regretsRx) !== -1)
     {
       scrawl.processPeople(context, 'regrets', nick, msg, true);
     }
     // check for present line
     else if(msg.search(presentRx) !== -1)
     {
       scrawl.processPeople(context, 'present', nick, msg, true);
     }
     // check for audio line
     else if(msg.search(audioRx) !== -1)
     {
       context.audio = false;
     }
     // check for date line
     else if(msg.search(dateRx) !== -1)
     {
       const date = msg.match(dateRx)[1];
       context.date = new Date(date);
     }
     // check for topic line
     else if(msg.search(topicRx) !== -1)
     {
       const topic = msg.match(topicRx)[1];
       context.topics = context.topics.concat(topic);
       rval = scrawl.topic(topic, context.topics.length, textMode);
     }
       // Agenda handling: the agendum display should be converted into a bona fide topic
     else if(nick === 'zakim' && msg.search(agendumRx) !== -1 )
     {
       const topic = msg.match(agendumRx)[1];
       context.topics = context.topics.concat(topic);
       rval = scrawl.topic(topic, context.topics.length, textMode);
     }
     // check for action line
     else if(nick !== 'rrsagent' && msg.search(actionRx) !== -1)
     {
       const action = msg.match(actionRx)[1];
       context.actions = context.actions.concat(action);
       rval = scrawl.action(action, context.actions.length, textMode);
     }
     // check for Agenda line
     else if(msg.search(agendaRx) !== -1)
     {
       const agenda = msg.match(agendaRx)[1];
       context.agenda = agenda;
     }
     // check for proposal line
     else if(msg.search(proposalRx) !== -1)
     {
       const proposal = msg.split(':')[1];
       rval = scrawl.proposal(proposal, textMode);
     }
     // check for resolution line
     else if(msg.search(resolutionRx) !== -1)
     {
       const resolution = msg.match(resolutionRx)[2];
       context.resolutions = context.resolutions.concat(resolution);
       rval = scrawl.resolution(
         resolution, context.resolutions.length, textMode);
     }
     // check for use case line
     else if(msg.search(useCaseRx) !== -1)
     {
       const usecase = msg.match(useCaseRx)[2];
       rval = scrawl.usecase(usecase, textMode);
     }
     else if(msg.search(totalPresentRx) !== -1)
     {
       context.totalPresent = msg.match(totalPresentRx)[1];
     }
     else if(nick.search(botRx) !== -1 || msg.search(botRx) !== -1 )
     {
       // the line is from or is addressed to a channel bot, ignore it
     }
     else if(nick.search(allowedBotRx) !== -1)
     {
       // add line without other processing
       rval = scrawl.scribe(msg, textMode);
     }
     else if( msg.search(junkRx) !== -1 )
     {
       // Other junk lines
     }
     else if(msg.search(queueRx) !== -1)
     {
       // the line is queue management, ignore it
     }
     // the line is a +1/-1 vote
     else if(msg.search(voteRx) !== -1)
     {
       if(nick in context.aliases)
       {
         rval = scrawl.scribe(msg, textMode, context.aliases[nick]);
         //scrawl.present(context, nick);
       }
     }
     // the line is by a scribe
     else if(context.scribenick.includes(nickName))
     {
       if(msg.indexOf('…') === 0 || msg.indexOf('...') === 0)
       {
         // the line is a scribe continuation
         rval = scrawl.scribeContinuation(msg, textMode);
       }
       else if(msg.indexOf(':') !== -1)
       {
         const alias = msg.split(':', 1)[0].replace(' ', '').toLowerCase();

         if(alias in context.aliases)
         {
            // the line is a comment made by somebody else that was
            // scribed
            const cleanedMessage = msg.split(':').splice(1).join(':');

            //scrawl.present(context, alias);
            rval = scrawl.scribe(
              cleanedMessage, textMode, context.aliases[alias]);
         }
         else
         {
            // The scribe is noting something and there just happens
            // to be a colon in it
            rval = scrawl.scribe(msg, textMode);
         }
       }
       else
       {
         // The scribe is noting something
         rval = scrawl.scribe(msg, textMode);
       }
     }
     // the line is a comment by somebody else
     else if(!context.scribenick.includes(nickName))
     {
       if(msg.indexOf(':') !== -1)
       {
         const alias = msg.split(':', 1)[0].replace(' ', '').toLowerCase();

         if(alias in context.aliases)
         {
            // the line is a scribe assist
            const cleanedMessage = msg.split(':').splice(1).join(':');

            //scrawl.present(context, alias);
            rval = scrawl.scribe(cleanedMessage, textMode,
              context.aliases[alias], context.aliases[nick]);
         }
         else if(alias.indexOf('http') === 0)
         {
           rval = scrawl.scribe(msg, textMode, context.aliases[nick]);
         }
         else if(nick in context.aliases)
         {
           //scrawl.present(context, nick);
           rval = scrawl.scribe(msg, textMode, context.aliases[nick]);
         }
         else
         {
           rval = scrawl.error(
             '(IRC nickname \'' + nick + '\' not recognized)' + line,
             textMode);
         }
       }
       else if (!(nick in context.aliases)) {
         rval = scrawl.error(
           '(IRC nickname \'' + nick + '\' not recognized)' + line,
           textMode);
       }
       else
       {
         // the line is a scribe line by somebody else
         //scrawl.present(context, nick);
         rval = scrawl.scribe(msg, textMode, context.aliases[nick]);
       }
     }
     else
     {
       rval = scrawl.error('(Strange line format)' + line, textMode);
     }

     return rval;
  };

  scrawl.generateSummary = function(context, textMode)
  {
    let rval = '';
    let time = context.date || new Date();
    let month = '' + (time.getMonth() + 1)
    let day = '' + time.getDate()
    const group = context.group;
    const agenda = context.agenda;
    const audio = 'audio.ogg';
    const chair = context.chair;
    const scribe = context.scribe;
    const topics = context.topics;
    const resolutions = context.resolutions;
    const actions = context.actions;
    const present = [];
    const regrets = [];

    // build the list of people present
    for(const name of context.present) {
      const person = scrawl.people[name] || {};
      person['name'] = name;
      if(person.homepage === undefined) {
        person.homepage = 'https://json-ld.org/'
      }
      present.push(person)
    }

    // build the list of regrets
    if(context.regrets) {
      for(const name of context.regrets) {
        const person = scrawl.people[name] || {};
        person['name'] = name;
        if(person.homepage === undefined) {
          person.homepage = 'https://json-ld.org/'
        }
        regrets.push(person)
      }
    }

    // modify the time if it was specified
    if(context.date) {
      time = new Date(context.date)
      time.setHours(35);
    }

    // zero-pad the month and day if necessary
    if(month.length === 1)
    {
      month = '0' + month;
    }

    if(day.length === 1)
    {
      day = '0' + day;
    }

    // generate the summary text
    if(textMode === 'html')
    {
      rval += '<h1>' + group + '</h1>\n';
      rval += '<h2>Minutes for ' + time.getFullYear() + '-' +
         month + '-' + day +'</h2>\n';
      rval += '<div class="summary">\n<dl>\n';

      // generate the list of people present
      var peoplePresent = present.map(person => {
        return '<a href="' + person.homepage + '">'+ person.name + '</a>'
      }).join(', ')

      if(context.totalPresent) {
        peoplePresent += ', ' + context.totalPresent;
      }

      // generate the list of regrets
      const peopleRegrets = regrets.map(person => {
        return '<a href="' + person.homepage + '">'+ person.name + '</a>'
      }).join(', ')

      rval += '<dt>Present</dt><dd>' + peoplePresent + '</dd>\n';
      if(regrets.length > 0) {
        rval += '<dt>Regrets</dt><dd>' + peopleRegrets + '</dd>\n';
      }
      rval += '<dt>Chair(s)</dt><dd>' + chair.join(', ') + '</dd>\n';
      rval += '<dt>Scribe(s)</dt><dd>' + scribe.join(', ') + '</dd>\n';

      rval += '<dt>Agenda</dt><dd><a href="' +
        agenda + '">' + agenda + '</a></dd>\n';
      
      if(topics.length > 0)
      {
        rval += '<dt>Topics</dt><dd><ol>';
        for(i in topics)
        {
          const topicNumber = parseInt(i) + 1;
          rval += '<li><a href="#topic-' + topicNumber + '">' +
            topics[i] + '</a>';
        }
        rval += '</ol></dd>';
      }

      if(resolutions.length > 0)
      {
        rval += '<dt>Resolutions</dt><dd><ol>';
        for(i in resolutions)
        {
          const resolutionNumber = parseInt(i) + 1;
          rval += '<li><a href="#resolution-' + resolutionNumber + '">' +
            resolutions[i] + '</a>';
        }
        rval += '</ol></dd>';
      }

      if(actions.length > 0)
      {
        rval += '<dt>Action Items</dt><dd><ol>';
        for(i in actions)
        {
          const actionNumber = parseInt(i) + 1;
          rval += '<li><a href="#action-' + actionNumber + '">' +
            actions[i] + '</a>';
        }
        rval += '</ol></dd>';
      }

      if(context.audio) {
        rval += '<dt>Audio Log</dt><dd>' +
           '<div><a href="' + audio + '">' + audio + '</a></div>\n' +
           '<div><audio controls="controls" preload="none">\n' +
           '<source src="' + audio + '" type="audio/ogg" />' +
           'Warning: Your browser does not support the HTML5 audio element, ' +
           'please upgrade.</audio></div></dd>\n';
      }

      rval += '</dl>\n</div>\n';
    }
    else
    {
      // generate the list of people present
      var peoplePresent = present.map(person => person.name).join(', ')

      if(context.totalPresent) {
        peoplePresent += ', ' + context.totalPresent;
      }

      // generate the list of regrets
      const peopleRegrets = regrets.map(person => person.name).join(', ')

      rval += group;
      rval += ' Minutes for ' + time.getFullYear() + '-' +
         month + '-' + day + '\n\n';
      rval += 'Agenda:\n  ' + agenda + '\n';

      if(topics.length > 0)
      {
        rval += 'Topics:\n';
        for(i in topics)
        {
          const topicNumber = parseInt(i) + 1;
          rval += scrawl.wordwrap(
            '  ' + topicNumber + '. ' + topics[i], 65,
            '\n    ') + '\n';
        }
      }

      if(resolutions.length > 0)
      {
        rval += 'Resolutions:\n';
        for(i in resolutions)
        {
          const resolutionNumber = parseInt(i) + 1;
          rval += scrawl.wordwrap(
            '  ' + resolutionNumber + '. ' + resolutions[i], 65,
            '\n    ') + '\n';
        }
      }

      if(actions.length > 0)
      {
        rval += 'Action Items:\n';
        for(i in actions)
        {
          const actionNumber = parseInt(i) + 1;
          rval += scrawl.wordwrap(
            '  ' + actionNumber + '. ' + actions[i], 65,
            '\n    ') + '\n';
        }
      }

      rval += 'Organizer:\n  ' + chair.join(' and ') + '\n';
      rval += 'Scribe:\n  ' + scribe.join(' and ') + '\n';
      rval += 'Present:\n  ' +
        scrawl.wordwrap(peoplePresent, 65, '\n  ') + '\n';

      if(regrets.length > 0) {
      rval += 'Regrets:\n  ' +
        scrawl.wordwrap(peopleRegrets, 65, '\n  ') + '\n';
      }

      if(context.audio) {
        rval += 'Audio:\n  https://json-ld.github.io/minutes/' +
          time.getFullYear() + '-' +
           month + '-' + day + '/audio.ogg\n\n';
      } else {
        rval += '\n';
      }
    }

    return rval;
  };

  scrawl.generateMinutes = function(ircLog, textMode, date, haveAudio)
  {
    let minutes = '';
    const ircLines = ircLog.split('\n');
    const aliases = scrawl.generateAliases(ircLog);
    scrawl.counter = 0;

    // initialize the IRC log scanning context
    var context =
    {
      'group': scrawl.group,
      'chair': ['Gregg Kellogg'],
      'present': [],
      'scribe': [],
      'scribenick': [],
      'topics': [],
      'resolutions': [],
      'actions': [],
      'audio': haveAudio,
      'aliases': aliases
    };

    if(date) {
      context.date = new Date(date);
      context.date.setHours(36);
    }

    // pre-process each IRC log line
    for(var i = 0; i < ircLines.length; i++)
    {
      scrawl.preprocessLine(context, ircLines, i);
    }

    // process each IRC log line
    for(line of ircLines)
    {
      minutes += scrawl.processLine(context, line, textMode);
    }

    // generate the meeting summary
    const summary = scrawl.generateSummary(context, textMode);

    // fix spacing around proposals, actions, and resolutions
    minutes = minutes.replace(/\n\n\n/gm, '\n\n');

    // create the final log output
    return summary + minutes;
  }
})();