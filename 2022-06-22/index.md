![W3C Logo](https://www.w3.org/Icons/w3c_home)


# JSON-LD CG/WG — Minutes


**Date:** 2022-06-22

See also the [Agenda](https://www.w3.org/events/meetings/043b29e7-f596-41d3-9c86-3b894bdb1487) and the [IRC Log](https://www.w3.org/2022/06/22-json-ld-irc.txt)

## Attendees

**Present:** Ted Thibodeau Jr., David I. Lehn, Pierre-Antoine Champin, Melinda Minch, Roberto Polli, Orie Steel, Niklas Lindström, Eric Prud'hommeaux, Chris Mungall

**Regrets:** 

**Guests:** 

**Chair:** Gregg Kellogg

**Scribe(s):** Orie Steel, Gregg Kellogg, Pierre-Antoine Champin

## Content:
* [1. Announcements and Introductions.](#1-announcements-and-introductions.)
* [2. YAML-LD.](#2-yaml-ld.)
* [3. JSON-LD-star.](#3-json-ld-star.)
* [4. JSON-LD Spec updates.](#4-json-ld-spec-updates.)
* [5. Schedule next call.](#5-schedule-next-call.)
* [6. Resolutions](#6-resolutions)

---


### 1. Announcements and Introductions.

**Gregg Kellogg:** the CG as been anointed to make updated to specs / publish new ones... by the JSON-LD WG..  
… to start off, we have had a lot of interest in YAML-LD lately..  
… I'm Editor of JSON-LD 1.0 / 1.1, I've worked in CGs as well..  

**Niklas Lindström:** I was also in the WG / co-author JSON-LD 1.0... I work a the national library of sweden, and we use jsonld.  
… i've been interested in RDF * / JSON-lD *.  

**Anatoly Scherbakov:** I work at datafold, i'm a software developer, interested in semantic data... I'm building an open source project that works on knowledge graphs.  
… I first learned of these 10 years ago, but only now I have a project to work on them, excited to be here..  

**David I. Lehn:** I work at Digital Bazaar, we've used JSON-LD for some time, current maintainer of jsonld.js... want to keep pushing the tech forward..  

**Ted Thibodeau Jr.:** I'm with OpenLink Software, I'm in all W3C groups..  

**Philippe Le Hégaret:** I'm the team contact for W3C for the JSON-LD WG..  

**Roberto Polli:** I work for video `<inaudible>` department of italy, interested in web apis.... interested in standardization... I'm also interested in standardizing... <inaudible>.  

> *Orie Steel:* Pierre-Antoine: I joined the W3C Team, I've helped shepherd the RDF WG /RDF *... interested in JSON-LD... and interested in augmenting it to cover RDF*.

**Melinda Minch:** I'm based in BC, CA, I work on the World Data System, international technology office, I was given a task to build federated search for arctic research data... I'm interested in research dataset markup..  

**Orie Steel:** I'm Orie Steel, CTO and founder of transumte. I'm an other of the DID spec and work with Verifiable Credentials..  
… We apply JSON-LD DIDs for securing global trade documents for import/export..  
… I'm interested in YAML-LD and YAML as a more human readable way of working with Linked Data..  

**Gregg Kellogg:** to repeat for those who are not present yet, we are using IRC.  

> *Melinda Minch:* melinda-minch has joined #json-ld.

**Gregg Kellogg:** we use IRC for voting / recording minutes, etc..  

> *Roberto Polli:* Hi folks!.

**Gregg Kellogg:** You can use a native IRC client if you like..  

> *Gregg Kellogg:* [https://www.w3.org/groups/cg/json-ld/calendar](https://www.w3.org/groups/cg/json-ld/calendar).

**Gregg Kellogg:** We have a F2F tentative in Vancouver.  

> *Melinda Minch:* like this? `@present+ Melinda Minch`.

**Gregg Kellogg:** see the calendar.  

### 2. YAML-LD.

> *Gregg Kellogg:* [https://github.com/json-ld/yaml-ld/projects/1](https://github.com/json-ld/yaml-ld/projects/1).

**Gregg Kellogg:** in the WG, we used the github projects feature to manage the open issues.  
… we have created a number of issues.  
… focusing first on use cases.  
… eventually we will look at spec / testing.  
… there is one issue regarding the spec and media types.  

> *Gregg Kellogg:* [https://github.com/json-ld/yaml-ld](https://github.com/json-ld/yaml-ld).

**Gregg Kellogg:** the purpose of working issues, is to create use case documents or working towards a specification.  
… typically we use pull requests, which means we will need to identify editors for each document managed in github.  
… we are seeking editors.  
… there is work required to transform use cases from issues.  
… for example "compatibility with existing libraries".  
… "as a developer I would like to use existing libraries so that work developing is easier...etc".  
… we use "ReSpec" to document specs / use cases as HTML..  
… we have a PR preview tool which helps visualizes the changes made.  
… this allows for the community to review changes and make constructive comments.  

> *Roberto Polli:* Orie: to ease collaboration, it would be great to use bikeshed.

**Gregg Kellogg:** rather than trying to do issue review in this meeting, I would like to move on to other issues.  

> *Roberto Polli:* for building the document out of markdown.

**Gregg Kellogg:** any questions or comments before we move on/.  

**Roberto Polli:** we will not discussion issues?.  

**Gregg Kellogg:** I want to cover the agenda before getting to specific issues.  
… and establish a regular call schedule.  
… we may want to create different calls to cover other items.  

> *Niklas Lindström:* +1 for different calls for different topics.

**Gregg Kellogg:** for example JSON-LD *.  
… there are also specification errata which needs to be addressed.  
… the last thing I want to do is schedule our next call, and agree to recurring meetings.  

**Pierre-Antoine Champin:** I wanted to comment on bikeshed vs respec.  
… from what I know, bikeshed is a markdown version of respec.  
… if folks want to use markdown, i think respec may support it now.  

> *Roberto Polli:* whatever you prefer, as long as it's text :).

**Orie Steel:** I've used both, and I think bikeshed works well..  
… It can be hard to use if it's not set up properly, and there's some additional chances for errors or risks..  
… I think that bikeshed is worth the lift if the advanced featuers warrant..  

**Gregg Kellogg:** group has always used ReSpec... we have plugins / tools in ReSpec.  
… AFAIK, every other RDF group has used ReSpec.  
… my guess is that using ReSpec is probably an easier entry point.  

> **Proposed resolution: Use ReSpec for spec and UCR documents..** *(Gregg Kellogg)*

> *Orie Steel:* +1.

> *Pierre-Antoine Champin:* +1.

> *Ted Thibodeau Jr.:* +1.

> *Anatoly Scherbakov:* +1.

> *Philippe Le Hégaret:* 0.

> *Melinda Minch:* 0.

> *Niklas Lindström:* +0 (no strong opinion).

> *Roberto Polli:* Can respec use .md ?.

**Chris Mungall:** sorry i joined late, should I be looking at something?.  

> *David I. Lehn:* +1, but i had never heard of bikeshed until just now, so not an informed vote.

> *Roberto Polli:* I just want to avoid diffing .xml docs.

> *Roberto Polli:* on PRs.

> *Eric Prud'hommeaux:* +0.

**Gregg Kellogg:** ok so, last call for votes.  

> ***Resolution #1: Use ReSpec for spec and UCR documents..***

**Gregg Kellogg:** we will use respec.  
… any other discussion regarding YAML-LD ?.  

### 3. JSON-LD-star.

> *Gregg Kellogg:* [https://github.com/json-ld/json-ld-star](https://github.com/json-ld/json-ld-star).

**Gregg Kellogg:** its fairly mature spec.  

> *Gregg Kellogg:* [https://github.com/json-ld/json-ld-star/issues](https://github.com/json-ld/json-ld-star/issues).

**Gregg Kellogg:** see the open issues, we hope to move it to a WG.  

**Pierre-Antoine Champin:** RDF-star is an extension of syntax and semantics to use triples as the subject or object of other triples.  

> *Gregg Kellogg:* Draft JSON-LD-star spec: [https://json-ld.github.io/json-ld-star/](https://json-ld.github.io/json-ld-star/).

**Pierre-Antoine Champin:** this extension requires concrete syntax extensions, its been done for turtle... doing this for JSON-LD would cover this same update for JSON-LD.  

**eric:** is there a playground for JSON-LD star.  

**Gregg Kellogg:** I think there is only 1 implementation of JSON-LD start so far.  

> *Gregg Kellogg:* [http://rdf.greggkellogg.net/distiller?command=serialize&format=jsonld&output_format=jsonld](http://rdf.greggkellogg.net/distiller?command=serialize&format=jsonld&output_format=jsonld).

**Gregg Kellogg:** in the ruby version there is an option to pickup jsonld.  
… and serialize as JSON-LD *.  

> *Niklas Lindström:* [https://niklasl.github.io/ldtr/demo/?url=../test/data/diff-annotated.trig](https://niklasl.github.io/ldtr/demo/?url=../test/data/diff-annotated.trig).

**Niklas Lindström:** I wanted to share a tool ^ right now its a simple demo of parse & serialize, but it has some visualization.  
… I have added turtle-start, trig-star and jsonld-star.  
… you can use the tool to explore the formats.  
… its a pseudo playgroun.  

**eric:** the bottom right corner ha a '<<' button which brings up an editor.  

**Gregg Kellogg:** would you consider a PR to the JSON-LD repo to include a link?.  

**Niklas Lindström:** I will look into that.  

### 4. JSON-LD Spec updates.

**Gregg Kellogg:** there are a number of proposed updates to JSON-LD spec and Errata.  
… this is important work for the group to get too.  
… pchampin and I have been following these issues.  
… plh, any info about the process to apply the errata.  

**Philippe Le Hégaret:** the process was updated in Sep 2020, unfortunately, this was after JSON-LD was published.  
… so the current JSON-LD Rec can not take advantage of the new process.  
… because a recommendation have to "opt in" to the new process, and JSON-LD could not..  
… The probability of the process evolving to make this retroactive is very low..  

**Gregg Kellogg:** so when the group is ready to address this modification,.  
… we will need to dedicate some time to dive into the new process..  

### 5. Schedule next call.

**Gregg Kellogg:** I would propose that the group continues to use this timeslot, on a every-other-week basis.  
… (with some exceptions during summer).  
… every other week may not be enough in the future, but we can start with that..  

> **Proposed resolution: go to every other week schedule in this timeslot, with the next meeting being July 6.** *(Gregg Kellogg)*

> *Niklas Lindström:* +1.

> *Gregg Kellogg:* +1.

> *Pierre-Antoine Champin:* <pchampin> +1.

> *David I. Lehn:* +1.

> *Philippe Le Hégaret:* 0.

> *Anatoly Scherbakov:* +1.

> *Melinda Minch:* 0.

> *Ted Thibodeau Jr.:* +0.

> ***Resolution #2: go to every other week schedule in this timeslot, with the next meeting being July 6.***

**Philippe Le Hégaret:** will not be able to attend these calls on a regular basis,.  
… but let me know if you need me..  

**Gregg Kellogg:** ivan also said that he would try to attend, when possible..  

**Ted Thibodeau Jr.:** can we put these calls in the JSON-LD WG/CG calendar?.  

**Gregg Kellogg:** will do (already the case for this call).  
… the minutes will also be included in the calendar, and validated during the next meeting.  

> *Gregg Kellogg:* [https://github.com/json-ld/yaml-ld/projects/1](https://github.com/json-ld/yaml-ld/projects/1).

**Gregg Kellogg:** anyone having an issue they want to start with?.  

> *Gregg Kellogg:* issue json-ld/yaml-ld#19.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/19](https://github.com/json-ld/yaml-ld/issues/19) -> Issue 19 Polyglot Modeling (VladimirAlexiev) UCR.

> *Gregg Kellogg:* [https://github.com/json-ld/yaml-ld/issues](https://github.com/json-ld/yaml-ld/issues).

**Eric Prud'hommeaux:** how are people supposed to add UCRs?.  

**Gregg Kellogg:** there is an issue template for UCRs in the [https://github.com/json-ld/yaml-ld](https://github.com/json-ld/yaml-ld) repo.  

> *Eric Prud'hommeaux:* (meta Q to see if we're on the same page).

**Eric Prud'hommeaux:** do people want to exceed JSON expressivity, or just use YAML as a nicer syntax for JSON?.  

> *Gregg Kellogg:* yaml-ld#8.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/8](https://github.com/json-ld/yaml-ld/issues/8) -> Issue 8 Round-trip safe json-ld -> yaml-ld -> json-ld (ioggstream) UCR.

**Gregg Kellogg:** I think there is an issue about that.  
… (not the one above...).  
… s/see/see/.  

> *Gregg Kellogg:* yaml-ld#17.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/17](https://github.com/json-ld/yaml-ld/issues/17) -> Issue 17 YAML-LD datatypes (and tags for datatypes) (VladimirAlexiev) UCR.

> *Orie Steel:* +1 to JSON-LD and YAML-LD having a similar or identical set of capabilities.

> *Orie Steel:* +1 to exploring both the "identical" and the "enhanced" paths.. at least initially.

> *Orie Steel:* sorry I am talking now.

> *Orie Steel:* I can take back over scribing ir you like.

**Roberto Polli:** we can start with a minimal set of feature.  
… allowing to serialize only roundtrippable data (except for comments).  
… once we have it, we can consider expanding it.  
… for example, leveraging YAML anchors in order to reuse JSON bits in several places.  
… (as long as they are not creating cycles).  
… also, it is important to define a media-type.  

> *Melinda Minch:* Is it a goal to make these formats round-trippable between each other, or anything like that?.

> *Roberto Polli:* ioggstream: q-.

> *Eric Prud'hommeaux:* interestingly, YAML might no offer much referencing advantage (`&node` and `*node`) over JSON-LD 'cause it already had refs.

**Orie Steel:** roundtripping is important for interoperability.  

> *Eric Prud'hommeaux:* but not with the notion of copying data, more with re-using nodes.

**Orie Steel:** it is exciting to explore other features, but in a 2nd time.  

**Niklas Lindström:** worried about the complexity we might open up.  

> *Roberto Polli:* ericP: refs and *node are different. One happens at json-ld level, the other one at seralization level..

> *Anatoly Scherbakov:* I am uncertain how referencing can help; JSON-LD can assign an `@id` to a node, which can be used multiple times all over the document. Do we have to encourage a duplicate feature?.

**Niklas Lindström:** my own colleagues already have problem with the RDF part of JSON-LD, they merely see JSON.  

**Gregg Kellogg:** thanks everyone, we have a lot to chew on.  
… I encourage you to continue the discussion in the issues.  
… From this discussion, I think we will start with a simple profile..  

> *Orie Steel:* thanks all!.

> *Anatoly Scherbakov:* Thank you all very much!.

> *Melinda Minch:* Thanks everyone, nice to meet you all.

> *Gregg Kellogg:* rssagent, bye.

---


### 6. Resolutions

* Resolution #1: Use ReSpec for spec and UCR documents..
* Resolution #2: go to every other week schedule in this timeslot, with the next meeting being July 6.