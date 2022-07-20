%  — 2022-07-06

![W3C Logo](https://www.w3.org/Icons/w3c_home)


# JSON-LD CG — Minutes


**Date:** 2022-07-06

See also the [Agenda](https://www.w3.org/events/meetings/37dfdfbe-ffa4-4fff-9589-0bdc12401128/20220706T160000#agenda) and the [IRC Log](https://www.w3.org/2022/07/06-json-ld-irc.txt)

## Attendees

**Present:** Gregg Kellogg, Anatoly Scherbakov, David I. Lehn, Rob Atkinson, Juuso Autiosalo, Niklas Lindström, Benjamin Young, Ted Thibodeau Jr., Pierre-Antoine Champin, Orie Steel, Vladimir Alexiev

**Regrets:** 

**Guests:** 

**Chair:** Gregg Kellogg

**Scribe(s):** Anatoly Scherbakov

## Content:
* [1. Announcements and Introductions.](#1-announcements-and-introductions.)
* [2. Approve Minutes.](#2-approve-minutes.)
* [3. YAML-LD.](#3-yaml-ld.)
* [4. Resolutions](#4-resolutions)

---


### 1. Announcements and Introductions.

**Gregg Kellogg:** Introductions. Juuso?.  

**Juuso Autiosalo**: I am from Aalto university in Finland, finished my dissertation in December about Digital Twins. My background is Mechanical Engineering, but last 5-ish years I am getting more into programming. Now I am interested in YAML-LD initiative. Being new to W3C activity, will be watching how this goes..

**Benjamin Young:** I am Benjamin Young, co-chair of JSON-LD working group. Glad about this community group to be up and running, excited to be here..  

**Rob Atkinson:** Engineer working on Semantic interoperability in general, looking to use about JSON-LD for that. Driving an activity to describe Geospatial data. Publishing Component data models, JSON-LD contexts. Facing a plethora of JSON Schemas and looking into using JSON-LD to manage that. Currently residing in the UK; it will be more difficult when I am in Australia but looking forward to continue working with this group..  

**Gregg Kellogg:** A long standing problem in W3C is finding a convenient time for meetings both from Europe and Americas..  

**Rob Atkinson:** NB - with the OGC (OpenGeospatial Consortium).  

**Vladimir Alexiev:** I'm chief Data Architect at Ontotext, a BG semantic technologies company. I work in the KG Solutions group, focusing on industrial data in the last couple of years.  
… I am an informational architect for OntoText, a Semantic Technology company from Bulgaria..  
… we've recently been acquired for ≈30M Euro and this will help us expand. My daily job is to explore ontologies, find interesting open data sets to build knowledge graphs, suggest how KGs can help machine learning and data science, participate in research problems. Last 2-3 years I am focused on industrial data: architecture, construction, manufacturing. We work on all sorts of data apart from life sciences..  
… I started YAML-LD out of curiosity, saw a project on GitHub about Semantic data in YAML. Quite glad that people are showing interest in this. We need to decide some consensus: should YAML-LD deal with formatting issues or be limited to data model? This is the first meeting I am in, previously I contributed to SHACL, RDF-star, and a lot of issues in bunch of different projects. Looking forward to this effort..  

### 2. Approve Minutes.

> *Gregg Kellogg:* [https://json-ld.org/minutes/2022-06-22/](https://json-ld.org/minutes/2022-06-22/).

**Gregg Kellogg:** let's review minutes from the previous minutes. If anyone has corrections present them here or issue a PR..  
… let's review minutes from the previous meeting. If anyone has corrections present them here or issue a PR..  

### 3. YAML-LD.

> *Roberto Polli:* gkellogg: can I fix where I work ?.

> *Gregg Kellogg:* [https://github.com/json-ld/yaml-ld/projects/1](https://github.com/json-ld/yaml-ld/projects/1).

> *Gregg Kellogg:* yaml-ld#34.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/34](https://github.com/json-ld/yaml-ld/issues/34) -> Pull Request 34 Preliminary rules for discussion (ioggstream).

**Gregg Kellogg:** Onto the body of the meeting, we have a number of open issues, there is a project that I've tried to use to organize the various PRs and issues around here. Taken the liberty of selecting some of them..  

**Roberto Polli:** This PR contains a basic concept about YAML, some examples. I think the PR is received a lot of comments. I think that it's okay just as it is. When you speak about strings or streams, the concept is a YAML document. The concept is fine, I hope there are no objections to merge it..  

> *Vladimir Alexiev:* +1 to approve PRs in this early stage quick, so we can proceed with adding more material.

**Gregg Kellogg:** We should faster merge these PRs on this stage. We can correct later by following PRs. I do not offer to vote on each of those if there are specific concerns we can discuss them..  

> *Gregg Kellogg:* yaml-ld#37.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/37](https://github.com/json-ld/yaml-ld/issues/37) -> Pull Request 37 Add remaining Use Case Issues. (gkellogg) UCR.

**Gregg Kellogg:** I put something to use case document. Some of these Use Cases are likely contradictory. We follow up with requirement sections referenced by use cases and potentially move use cases which are no longer pertinent to a separate section..  

**Vladimir Alexiev:** quite a lot of discussion on some cases, people say we don't want it. We need to discuss which UCR issues are real use cases. Then we will be able to draft sections of UCR spec. Some of them need to be reformatt4ed. We should agree about the format. I have tagged some people in my UCRs. To give an example, in polyglot modeling, I listed maybe 9 bullets with guesses on who might be interested. First of all[CUT].  

> *Roberto Polli:* +1 for using github and collect them after.

**Vladimir Alexiev:** ... to Polyglot Modeling. We need to engage with these people. I am unsure what is the best way to capture use cases. In git? With tags: agreed vs rejected..  

> *Vladimir Alexiev:* UCR spec: I think it's too early to collect UCRs in a doc. Maybe keep them as github issues, with some tags eg "UCR agreed but editing needed", "UCR agreed", "UCR rejected".

**Roberto Polli:** we have a view of the document. We need to draft an MVP of the document. Then, once we identified general constraints of the MVP then we can add better identify reasons for use cases. There are maybe constraints we do not actually see. Probably once we get them it will be easier to manage work around use cases..  

**Rob Atkinson:** what is the broad architecture? There seems to be a lot of JSON-LD use cases. Which of them are specific to YAML I am not really sure. What is the general use case around JSON-LD? Perhaps JSON-LD Framing? SHACL and ShEx validation? How can modular schemas be used together? I am surprised to see use cases specifically for YAML rather then JSON-LD as a whole..  

> *Niklas Lindström:* +1 for "what is YAML-specific?".

> *Orie Steel:* +1 to seperating the use cases for "use yaml features" vs "json compatibility".

**Benjamin Young:** YAML provides capabilities JSON does not have. YAML at its core is a superset of JSON. Minimally, there is no real variance between JSON and YAML. You wouldn't need additional use case docs. However, if we'd want to use special features of YAML then we would need use cases for these specific features. Multi documents, hypermedia, et cetera. It depends on the direction the group goes. is this a one to one mapp[CUT].  
… extra features?.  

> *Niklas Lindström:* I should write an issue for this, but just a heads up: beware of YAML-complexities such as YAML-bombs: [https://en.wikipedia.org/wiki/Billion_laughs_attack](https://en.wikipedia.org/wiki/Billion_laughs_attack).

> *Vladimir Alexiev:* +1 for "exploit extra YAML features". We're currently a bit in a "hammer seeks nail" mode ;-) but that's ok..

> *Orie Steel:* +1 to leaning into the "human write yaml" perspective..

> *Niklas Lindström:* +1 too for "for humans to write"; YAML on the wire "scares" me....

**Anatoly Scherbakov**: YAML is human writable whereas JSON is machine writable. I suggest to lean towards that direction..

> *Benjamin Young:* YAML spec's "Relation to JSON" summary (fwiw) [http://yaml.org/spec/1.2-old/spec.html#id2759572](http://yaml.org/spec/1.2-old/spec.html#id2759572).

> *Vladimir Alexiev:* "humans read & write yaml" suggests that all formatting/presentation issues are fair game, eg "use 2 spaces for indentation" should be specifiable in a "context/frame".

> *Rob Atkinson:* + for the delta to help folks understand scope and overlap.

**Gregg Kellogg:** I will create a proposal to put off use cases. We will not merge the branch in question. We should focus use cases on delta between JSON-LD and YAML-LD and on things that make sense for YAML-LD specifically..  

> **Proposed resolution: delay merging UCR use cases, and focus on YAML-specific use cases.** *(Gregg Kellogg)*

> *Roberto Polli:* gkellogg: +1 to focus on YAML-specific.

> *Rob Atkinson:* we copuld have profiles - one for basic round trippable - one extended.

**Ted Thibodeau Jr.:** There is an early goal that YAML-LD should be round-trippable with JSON-LD in either direction, lossless. That would seem to preclude making YAML-LD super-special and making use of its specific features that JSON does not support. Those would eliminate the round-tripping. I believe that is an intentional goal to maintain this round-trippability..  

> *Orie Steel:* I think round tripping is ONLY relevant to the "JSON compatibility" case..

> *Rob Atkinson:* +1 for round-trippable to RDF - at OGC this is our use case - so we can perform CI/CT validation using SHACL/SHex etc..

**Vladimir Alexiev:** round-trippability is important. At what level? JSON-LD and YAML-LD both are round-trippable to RDF. I am not 100% sure that on serialization you can restore the `@nest` nodes. On YAML side you find presentation aspects. Extra features like multiple docs or others we still would not use round-trippability. We focus on YAML extras even though for some of them we might not see the use cases immediately. That'[CUT].  
… YAML we might have much better presentation than JSON-LD*..  

**Juuso Autiosalo**: my opinion about round-tripping. I think we have a clear mission: first we need round-trippable YAML-LD system. After that we can see if there is a demand for additional features of YAML. My opinion is that round-trippable YAML-LD standard is a priority..

**Rob Atkinson:** yaml-ld#35 was about formalizing profiles. One profile is interoperable, another has plus capabilities. This separation can help keep stuff simpler. Some specs in W3C are very complicated, lead to complex implementations. Separation of profiles should help make each of them simpler. My vote is round-trippability as a priority..  

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/35](https://github.com/json-ld/yaml-ld/issues/35) -> Issue 35 [closed] Data round-tripping issues: create a JSON vocabulary (lanthaler) spec-design, api.

> *Orie Steel:* We should acknowledge lossy and lossless paths.

**Gregg Kellogg:** I think it makes sense to consider what we mean by round-trippability. JSON-LD makes great pains that when you expand and then compact it you get what was originally expanded. `@nest` complicates that. Important thing is that there is no semantic loss or limited semantic loss when round-tripping content. Part of the reason YAML is interesting is because YAML does provide features like links and anchors. I'd hate[CUT].  

> *Orie Steel:* and give unique names to each potential path..

> *Ted Thibodeau Jr.:* +1 my round-tripping concern here is about semantic content, not about prettiness/presentation.

**Gregg Kellogg:** because they're not round-trippable. Hence the notion of extended profiles..  

> *Rob Atkinson:* does this mean we need a best practice for internal links in JSON-LD - or maybe one or more formal profiles for different approaches?.

> *Rob Atkinson:* +0.

> *Roberto Polli:* gkellogg: I propose to pospone the merge of yaml-ld#37.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/37](https://github.com/json-ld/yaml-ld/issues/37) -> Issue 37 [closed] Clarify prefix expansion (lanthaler) spec-bug, spec-editorial, syntax.

> **Proposed resolution: do not merge UCR use cases and focus use cases on YAML-specific issues.** *(Gregg Kellogg)*

> *Vladimir Alexiev:* Agree with bigbluehat: TallTed, we always have RDF for the semantic equivalence.

> *Gregg Kellogg:* +1.

> *Orie Steel:* +1.

> *Ted Thibodeau Jr.:* (My concern here is different from my regular concern with preservation of comments in Turtle, because neither JSON nor JSON-LD support comments.).

> *Roberto Polli:* gkellogg: +1.

> *Vladimir Alexiev:* +1 (too early).

> *David I. Lehn:* +0.

> *Anatoly Scherbakov:* +1.

> *Rob Atkinson:* +0.

> *Benjamin Young:* +1.

> *Niklas Lindström:* +1 (to distinguish what is YAML syntax specifics).

> *Pierre-Antoine Champin:* +1.

> *Ted Thibodeau Jr.:* +1 don't merge, but don't delete yet.

> *Rob Atkinson:* comments in turtle is a bad idea IMHO ... we should provide better annotation practices..

> *Juuso Autiosalo:* +1 (don't delete yet).

> ***Resolution #1: do not merge UCR use cases and focus use cases on YAML-specific issues.***

**Ted Thibodeau Jr.:** comments are a hot issue. Turtle files often have useful and vital content in comments and in white space. Turtle should be believe as such, should be treated as whole document, distinct from RDF content ingested into a KG. JSON/JSON-LD do not support comments at all. Until such time, comments do not exist. People do not rely so much on JSON representation because JSON is typically machine generated. Turtle is hu[CUT].  

> *Roberto Polli:* YAML support comments, and that's a feature that people will use whether we like or not :).

**Rob Atkinson:** Turtle comments: in whole range of applications I saw a pattern: people tend to build turtle files built from bits and pieces of external ontologies, a lot of copy-paste. It is dangerous to depend on their content. I'd prefer we base our work on machine graphs not depending on formatting or comments. We will be much better off if we rely upon clear semantic statements..  

> *Niklas Lindström:* +1 "for syntax should be irrelevant" (in spite of me knowing it's never *really* irrelevant, alas).

**Rob Atkinson:** comments are a great problem for interoperability. I'd better see a consistent system of annotation across Turtle, JSON-LD, YAML-LD instead of relying on non machine readable| comments.  

> *Niklas Lindström:* +1 for "comments are editorial only".

> *Orie Steel:* +1 for "comments are editorial only".

**Vladimir Alexiev:** I think comments are super useful. Question: should YAML-LD preserve them though? YAML should be considered documents as their own. They can be manipulated, stored, replaced. This is legitimate. I think comments should be only used for editorial purposes. Like some hints for a future editor or a TODO. I do not think we should preserve comments in YAML because they might be anywhere in the doc instead of s[CUT].  

> *Juuso Autiosalo:* +1 for "comments are editorial only", at least for the first version.

> *Orie Steel:* As someone who has abused comments for semantics... it's a huge anti pattern and mistake... expect comments to be stripped..

**Vladimir Alexiev:** Round-trippability will still not preserve details of formatting or comments. But we should keep them as part of parsing the event stream..  

> *Rob Atkinson:* maybe like RDF^ we could treat comments as reifiable statements - but what to attach then to - the following object declaration?.

> *Roberto Polli:* Let's scrub PRs.

**Gregg Kellogg:** Please keep comments short on point since we are short on time..  

> *Niklas Lindström:* RDF-star annotations is the way to go for *structured* comments on data that is relevant for sharing..

> *Vladimir Alexiev:* +1 for "comments are editorial only".

> *Gregg Kellogg:* +1 to niklasl.

> *Anatoly Scherbakov:* anatoly-scherbakov: rdfs:comment can be used instead of comments..

> *Gregg Kellogg:* yaml-ld#39.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/39](https://github.com/json-ld/yaml-ld/issues/39) -> Pull Request 39 Fix: #38. Stubs Conformance. (ioggstream).

**Gregg Kellogg:** YAML-LD has a normative description how to serialize docs. rdfs:comment is a special property to describe comments. This might be of our future use cases..  

**gkelogg:** this is some more great content. I suggest to merge this and move on. Consider any details later..  

> *Gregg Kellogg:* yaml-ld#41.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/41](https://github.com/json-ld/yaml-ld/issues/41) -> Pull Request 41 Fix: #21. No specific YAML version. (ioggstream).

**Gregg Kellogg:** this is some more great content. I suggest to merge this and move on. Consider any details later..  

> *Vladimir Alexiev:* +1 for yaml-ld#39, yaml-ld#41.

> *Gregg Kellogg:* yaml-ld#50.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/50](https://github.com/json-ld/yaml-ld/issues/50) -> Pull Request 50 Implement Best Practices section (anatoly-scherbakov).

**Gregg Kellogg:** there are questions about minimum version, what kind of version announcement might be required. I'd like to merge this and move on. We can raise issues to amend these things in the future..  
… Adding a Best Practices. I do not know if this goes into a spec. This is a community report though and these two might be combined together to be later split into two docs..  

**Roberto Polli:** We can discuss the Best practices once we're closed some issues and probably for those we need to start writing some code that processes some YAML files, see what happens, maybe try with different parsers and implementations. Then we can identify the best practices on actual implementation. Different communities which use YAML..  

> *Orie Steel:* +1 to considering the users of YAML, specifically OAS, K8s.

**Roberto Polli:** We need to test what we invent for different YAML notifications. We need to write real test code in Python, Java and whatever and see if they work with the YAML-LD content we write, to see if they work properly..  

> *Orie Steel:* Another yaml use case: [https://csrc.nist.gov/publications/detail/sp/800-219/final](https://csrc.nist.gov/publications/detail/sp/800-219/final).

**Roberto Polli:** We need to write test cases, to check whether it works or there is an exception — for Python, Java, Ruby or JavaScript..  

> *Vladimir Alexiev:* +1 to talk to communities. Lots of DOAP is used by the Linux packages communities, and it would be great if we can get some OAS, K8S etc folks indoctrinated in sem tech by using YAML LD.

> *Pierre-Antoine Champin:* should we be concerned if some YAML implementations are not compliant with the YAML spec?? :-/.

**Gregg Kellogg:** I will attempt to do that in Ruby for YAML..  

> **Proposed resolution: YAML is a lot about readability, so formatting/presentation options are fair game for YAML-LD.** *(Vladimir Alexiev)*

> *Roberto Polli:* anatoly-scherbakov: :clap.

> *Orie Steel:* Excellent meeting 👏.

> *Niklas Lindström:* (Reminder to heed my warning about YAML bombs from above. Complex formats on the wire is risky.).

**Vladimir Alexiev:** can we vote for a proposal? It should be possible for YAML-LD to have some options that one can use to define max line length, number of spaces, indentation of objects, stuff like that..  

> *Roberto Polli:* imho we can file an issue and discuss later.

> *Roberto Polli:* we really need testcases for this kind of issues.

> *Vladimir Alexiev:* Please vote in yaml-ld#42.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/42](https://github.com/json-ld/yaml-ld/issues/42) -> Issue 42 YAML presentation ("cosmetic") controls (VladimirAlexiev) UCR.

> *Roberto Polli:* [https://github.com/ietf-wg-httpapi/mediatypes/blob/ioggstream-50-bis/test_yaml_json.py](https://github.com/ietf-wg-httpapi/mediatypes/blob/ioggstream-50-bis/test_yaml_json.py) anatoly-scherbakov.

> *Roberto Polli:* could you provide something like that.

**Gregg Kellogg:** I believe there is an issue for this on GitHub. We need to allocate more debate time. Maybe we should put it up on the agenda for the next time, and this is a valid discussion topic. Let's close the meeting, our next call will be in 2 weeks same time. I will take responsibility for merging the PRs and we'll use that as a basis for further discussion. Thank you everyone for attending, this is a great group, exci[CUT].  

> *Gregg Kellogg:* rssagent, pointer.

---


### 4. Resolutions

* Resolution #1: do not merge UCR use cases and focus use cases on YAML-specific issues.