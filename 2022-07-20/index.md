![W3C Logo](https://www.w3.org/Icons/w3c_home)


# JSON-LD CG  — Minutes

**Date:** 2022-07-20

See also the [Agenda](https://www.w3.org/events/meetings/37dfdfbe-ffa4-4fff-9589-0bdc12401128/20220720T160000) and the [IRC Log](https://www.w3.org/2022/07/20-json-ld-irc.txt)

## Attendees

**Present:** Gregg Kellogg, Anatoly Scherbakov, Juuso Autiosalo, Rob Atkinson, Orie Steel, Niklas Lindström, David I. Lehn

**Regrets:** Pierre-Antoine Champin

**Guests:** 

**Chair:** Gregg Kellogg

**Scribe(s):** Anatoly Scherbakov, Gregg Kellogg

## Content:
* [1. Announcements and Introductions.](#1-announcements-and-introductions.)
* [2. Approve Minutes.](#2-approve-minutes.)
* [3. YAML-LD.](#3-yaml-ld.)
* [4. Resolutions](#4-resolutions)
* [5. Action Items](#5-action-items)

---


> *Juuso Autiosalo:* juuso-aut has joined #json-ld.

> *Anatoly Scherbakov:* anatoly-scherbakov has joined #json-ld.

### 1. Announcements and Introductions.

> *Orie Steel:* is this the channel?.

> *Niklas Lindström:* I'm about to, some technical difficulties.

> *Gregg Kellogg:* [https://www.w3.org/events/meetings/37dfdfbe-ffa4-4fff-9589-0bdc12401128/20220720T160000](https://www.w3.org/events/meetings/37dfdfbe-ffa4-4fff-9589-0bdc12401128/20220720T160000).

> *Gregg Kellogg:* [https://w3c.github.io/rdf-star-wg-charter/](https://w3c.github.io/rdf-star-wg-charter/).

**Gregg Kellogg:** There is an upcoming vote for RDF-star working group. If you're a part of the member organization, encourage your W3C representative to support the creation of this working group. This is more about metadata about RDF statements. We'll touch every RDF spec over time to add an ability to extend itself..  

> *Gregg Kellogg:* [https://www.w3.org/2022/09/TPAC/Overview.html](https://www.w3.org/2022/09/TPAC/Overview.html).

**Gregg Kellogg:** Secondly, TPAC planning. It is coming pretty soon on our calendars, it is not too far ahead. We do have a two-hour slot on Monday afternoon Vancouver time for face-to-face meeting. This will be a hybrid meeting. Ideally, we'll finish issues that are hard to close otherwise. We will arrive with a recommendation or a report of the working group to move it towards a candidate proposal and to a final recommendation [CUT].  

> *Rob Atkinson:* is there a specific link for the vote process for RDF-star I can forward?.

> *Gregg Kellogg:* [https://www.w3.org/events/meetings/6b900451-f0a7-46b0-8668-3cc20e0b026c](https://www.w3.org/events/meetings/6b900451-f0a7-46b0-8668-3cc20e0b026c).

> *Juuso Autiosalo:* juuso-aut_ has joined #json-ld.

**Gregg Kellogg:** for that, we need to come up with an agenda and specific tasks for the meeting. About the voting process: I'll add something into the minutes about the voting process. There is typically a call for that..  

### 2. Approve Minutes.

> *Gregg Kellogg:* [https://json-ld.org/minutes/2022-07-06/](https://json-ld.org/minutes/2022-07-06/).

**Gregg Kellogg:** Without further discussion we are approving these minutes and moving on..  

> *Gregg Kellogg:* [https://github.com/json-ld/yaml-ld/pulls](https://github.com/json-ld/yaml-ld/pulls).

> *Gregg Kellogg:* yaml-ld#58.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/58](https://github.com/json-ld/yaml-ld/issues/58) -> Pull Request 58 Propose YAML-LD document definition (anatoly-scherbakov) spec.

**Anatoly Scherbakov:** I'm trying to add a definition of a YAML-LD document, as a YAML document that can be treated as JSON-LD if converted..
.. This definition is still incomplete, as I don't have a specification for this conversion process, as it's not in the YAML spec..  
… That's the main focus of the change..  
… Additionally, there is are references and a discussion of a YAML stream..  
… I have some reviews (TallTed and gkellogg), and there are some open questions in the PR..  
… I'm happy to answer any questions on the PR..  
… The PR is not expected to be perfect but it adds something useful. No need to resolve every known issue in its PR itself, but it is useful to add editor notes to point out issues and areas needing further development..  

> *Gregg Kellogg:* [https://json-ld.org/minutes/2022-07-06/](https://json-ld.org/minutes/2022-07-06/).

> *Gregg Kellogg:* yaml-ld#12.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/12](https://github.com/json-ld/yaml-ld/issues/12) -> Issue 12 Convert JSON-LD to YAML-LD using standard YAML libraries (pchampin) UCR.

**Gregg Kellogg:** once you're satisfied go ahead and go forward with merging the PR....  
… issue 12 relates to the question about a standardized YAML to JSON conversion process..  

**Rob Atkinson:** There was a discussion about YAML-LD profiles to restrict the roundtripping process and using SHACL or ShEx for validation..  

**Gregg Kellogg:** They operate on semantic level whereas basic or extended profiles are more about YAML syntax..  

**Rob Atkinson:** Some validation mechanism, a schema validation, is still needed..  

**Gregg Kellogg:** does JSON Schema allow to validate YAML-specific structures? It probably would require types beyond those supported by JSON..  

**Rob Atkinson:** You can assert that a given string is actually a URI for example..  

> *Orie Steel:* See also: [https://json-schema.org/understanding-json-schema/reference/string.html#built-in-formats](https://json-schema.org/understanding-json-schema/reference/string.html#built-in-formats).

**Gregg Kellogg:** It would be worth to develop JSON Schema usable to verify whether a YAML document conforms to the Basic profile or not. The processor should make a best effort to interpret whatever it receives. Basic profile is more inclined towards the roundtripping commitment. But we didn't discuss what we want to do about types beyond basic JSON types..  
… or, whether it is possible to use YAML anchors. When you convert to JSON-LD all that information is being lost..  
… We can define JSON to YAML conversion fairly strightforwardly. YAML only encodes lists, maps and simple values. Maybe adding a section for that and creating GitHub issues (going to do that...).  

> ***Action #1: add section outlining conversion to JSON.. (Gregg Kellogg)***

> *ghurlbot:* Created [https://github.com/json-ld/json-ld.org/issues/782](https://github.com/json-ld/json-ld.org/issues/782) -> action 782 add section outlining conversion to JSON. (on ) due 27 Jul 2022.

**Rob Atkinson:** My concept of round-tripping is to be lossless. Can we capture YAML-specific things in a special format inside JSON to preserve them? Or, there should be a round-trippable basic subset. It is hard to articulate a whole picture of the whole process..  

**Gregg Kellogg:** We need to define what we mean under round-tripping. Easiest target to reach is semantic round-tripping. Anything that can be expressed in YAML-LD can be transformed to JSON-LD and then back to YAML-LD, all of these formats expressing the same semantic information. Your point is: what happens to the extra structure that might be in YAML-LD? This is similar to JSON-LD framing, where information expressed in JSON-[CUT].  
… JSON-LD won't be preserved in the same format where it was..  
… Maybe some extensions to framing or an analog to framing which can help transform basic formatted data to extended formatted data. If some component of a YAML-LD doc was in a shared tag, how do you convey that? Perhaps by something similar to RDF-star though it's not its use case..  

**Juuso Autiosalo:**: We need round-trippable YAML-LD as a subset, as a basic profile. We have so many JSON-LD processors — they have to know whether the document is round-trippable or not. When we need extended YAML features then we clearly state that we cannot use an existing JSON-LD processor because it is not compatible. It makes it clearer if we state whether it is round-trippable or not..

> *Rob Atkinson:* so we need to formalise this basic profile as an artefact with governance.

**Gregg Kellogg:** Perhaps the definition of the basic profile is that it is round-trippable..  

**Rob Atkinson:** I am happy to participate in development of this profile definitions.  

> ***Action #2: contribute section on the basic profile.. (Rob Atkinson)***

> *ghurlbot:* Created [https://github.com/json-ld/json-ld.org/issues/783](https://github.com/json-ld/json-ld.org/issues/783) -> action 783 contribute section on the basic profile. (on ) due 27 Jul 2022.

> *Anatoly Scherbakov:* (My apologies, I had to pause scribing as I had an issue with my headset. Continuing now.).

**Gregg Kellogg:** we can always move the auto-created issue to the YAML-LD repo..  

**Rob Atkinson:** this might also apply to any expression of JSON-LD actually so it can stay there..  

**Niklas Lindström:** I am not entirely comfortable about calling it the Basic profile. I do not see how we can do anything beyond what is already round-trippable. Using framing — it is possible to get somewhat further, and the other thing I can see difficult to round-trip are anchors and references. They're not going to be round-trippable. This is beneath what triples are about, you cannot represent that. Let's try avoiding trying [CUT].  

**Gregg Kellogg:** do you believe it is beyond what we might do by extending JSON-LD framing?.  

> *Rob Atkinson:* isnt the issue the graph you can "reason" over - or at least query...

**Niklas Lindström:** I think JSON-LD Framing itself is on the border of semantics and representation itself, where we are working on presentation, templating systems and whatnot. It is important to grasp this and get it right..  
…  it could be the same thing as to serialize and preserve comments as we don't have comments in JSON. We've not seen anyone asking about preserving XML comments in RDF/XML as Turtle comments. Which would be horrible to do..  

**Rob Atkinson:** The issue about controlling the serialization is orthogonal to graph isomorphism. If we semantically capture the same information. If there's information in YAML-LD that cannot be implemented as a graph then we should ignore it in the basic profile..  
… is all this about structure preservation or semantic preservation?.  

**Niklas Lindström:** structure preservation is tricky; you have to use framing to be able to get to the original structure..  

**Rob Atkinson:** how can additional semantics be expressed in YAML-LD in a way that JSON-LD can't express? Would like to see examples of that..  

**Niklas Lindström:** so should round-tripping be semantic one or structural one? Perhaps we should split these issues and tackle semantic transformation first..  

> *Niklas Lindström:* YAML-LD *might* be able to represent certain datatyped literals more succinctly. That ought to be all....

**Gregg Kellogg:** JSON-LD can express anything that any one RDF serialization can. If YAML-LD can express _more_ then it expresses things that no other RDF serialization can express. JSON-LD has a few built-in data types, boolean and numeric. Numeric has very low fidelity. YAML-LD can losslessly express integers and floats. There is some potential of preserving that information or possibly round-tripping it back and expressing it[CUT].  
…  YAML can express datetimes as per 1.2.2 spec and there is a question where that will remain. There is a possibility to use that, but maybe outside the basic profile. Extended profile can express a YAML datetime as a value object in JSON-LD. But structural round-tripping is probably not reasonable for us to preserve..  
… we don't probably want to even burden JSON-LD Framing with these features, say to convert a YAML document without anchors to a document that does use them. We might try doing this with purely YAML means but this might be outside of our current scope..  

> *Rob Atkinson:* do we need to define extended profiles of json-ld - with extra annotation elements or schema rules for this additional information?.

**Niklas Lindström:** I pull back on my obsession about the Basic profile if Extended profile is going to be about better handling of data types and structures, to enable YAML-LD to inline types when converting to JSON-LD..  
… It's good to avoid confusing this with structural preservation of the document tree itself. YAML and JSON can preserve that structure at the syntactic level and we can talk about that but I am uncertain how that fits the whole picture. I made a tool for JSON-LD as an AST to represent how you enter a Turtle or an RDF/XML document, to preserve the QNames, the order of properties. I only did that to teach people tha[CUT].  
… thing. We should actually avoid specifying things like that, they are pure syntax..  

> *Anatoly Scherbakov:* (Sure, will make line breaks more often.).

**Gregg Kellogg:** Do you think this experience can apply to YAML-LD?.  

**Niklas Lindström:** It might but in the cases I've done this for it was just to represent more or less native RDF.  
… formats, like RDF/XML, which is a subset of XML. But YAML is not a subset of RDF. I don't.  
… think my experiment applies to the YAML case in full..  

> *Niklas Lindström:* The tool I mentioned (and its rationale): [https://github.com/niklasl/ldtr#rationale](https://github.com/niklasl/ldtr#rationale).

**ggkellogg:** Round-tripping aspect is something of a best effort. We can say that round-tripping.  
… the Extended profile is out of scope of this group, it is a research topic or should be done.  
… at the YAML level rather than YAML-LD level..  

> *Niklas Lindström:* +1 to "best effort".

**Rob Atkinson:** To recap my action items: difference between semantic and syntactic round-tripping; profile of YAML that is datetype safe against JSON-LD and does not use extra data types;.  
… Maybe an extended profile of JSON-LD that allows to capture that extended information, say fine-grained data types. This might require extensions to JSON-LD or inline data structures with additional information..  
… There seem to be three different pieces that I can identify here. The syntactic round-tripping issue.  
… is I think much more process..  

> **Proposed resolution: extensive round-tripping to preserve original YAML shape is out-of-scope..** *(Gregg Kellogg)*

> *Anatoly Scherbakov:* +1.

> *Niklas Lindström:* +1.

> *Gregg Kellogg:* +1.

> *Rob Atkinson:* +1.

> *David I. Lehn:* +0.

> *Juuso Autiosalo:* 0+.

> ***Resolution #1: extensive round-tripping to preserve original YAML shape is out-of-scope..***

> *Gregg Kellogg:* yaml-ld#57.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/57](https://github.com/json-ld/yaml-ld/issues/57) -> Issue 57 YARRRML Lessons learned (bjdmeest) UCR.

**Gregg Kellogg:** Anything else on round-tripping? I think we've got enough to chew on..  

> *Niklas Lindström:* (syntax always gets in the way of semantics; unfortunately, there are no semantic without syntax ;) ).

**Gregg Kellogg:** this is a great contribution. Does anything know more about YARRRML?.  
… Would someone like to track this issue and research it to report back?.  

> *Gregg Kellogg:* yaml-ld#35.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/35](https://github.com/json-ld/yaml-ld/issues/35) -> Issue 35 Defining various interoperability profiles (ioggstream) UCR.

**Gregg Kellogg:** This recaps the discussion we just had. But we haven't talked about multiple documents..  
… Multiple documents are separated by dividers between them. This is similar to how JSON-LD processor.  
… treats `<script>` tags in HTML, about whether you process one, or multiple JSON-LD docs.  
… embedded in an HTML document. This might give a hint as to how to process multiple YAML-LD.  
… documents in a YAML-LD stream..  

> *Gregg Kellogg:* yaml-ld#13.

> *ghurlbot:* [https://github.com/json-ld/yaml-ld/issues/13](https://github.com/json-ld/yaml-ld/issues/13) -> Issue 13 Define anchor usage in yaml-ld (ioggstream) UCR.

**Gregg Kellogg:** This might be one aspect of the Extended profile. This is related to a transformation.  
… from YAML to JSON, so that YAML-LD can be processed by a JSON-LD processor..  
… My guess: anchors are just unfolded during the transformation, replacing references with.  
… their values..  

> *Rob Atkinson:* isnt this core to a YAML-LD syntax?.

**Rob Atkinson:** Wouldn't this be a natural part of YAML syntax?.  

**Gregg Kellogg:** anchors are probably a part of the Extended profile. Which should explain the transformation process from YAML to JSON..  

**Rob Atkinson:** is this Extended profile or YAML or Extended profile of YAML-LD that supports anchors?.  

**Gregg Kellogg:** Extended profile is the use of YAML expressions beyond what we define as Basic profile. Among them will be anchors and references..  
… we'd need to discuss how to treat them when parsed..  

**Rob Atkinson:** do we have working examples for these?.  

**Gregg Kellogg:** I think this issue has some. Let's direct further discussion to issue #13 as we're short on time..  

> *ghurlbot:* [https://github.com/json-ld/json-ld.org/issues/13](https://github.com/json-ld/json-ld.org/issues/13) -> Issue 13 [closed] API return values (null values vs. Exceptions, framing) (lanthaler) spec-design, api.

**Niklas Lindström:** when you parse YAML you get arrays, objects, literals — we cannot see anchors or references already..  
… they've been expanded by the parser..  

**Gregg Kellogg:** there should be. But' there's no normative description of a YAML to JSON transformation..  

**Niklas Lindström:** reading YAML in a programming language you get something that can be easily converted to JSON. This is not some in-memory representation with unresolved references..  
… some JSON parsers cannot handle empty keys in JSON, for example. We probably cannot access the internal memory structure of unresolved YAML tree normally..  

**Rob Atkinson:** isn't this coming back to questions of syntax contrary to semantics?.  
… anchors seem to be syntactic choice about how to serialize the document. If we think serialization shape out of scope then it is up to YAML processor to handle anchors. And it does not matter whether we use them when converting back to YAML..  

**Gregg Kellogg:** it does require some discussion..  

> *Niklas Lindström:* [https://en.wikipedia.org/wiki/Billion_laughs_attack](https://en.wikipedia.org/wiki/Billion_laughs_attack) (see the YAML bomb example).

> *Rob Atkinson:* seems to be YAML syntax - not a YAML-LD concern?.

> *Anatoly Scherbakov:* juuso-aut_: A random YAML to JSON transformer seems to resolve the anchors, they just diappear. Are we okay with processors doing it their own way? Or do we want to specify it?.

**Gregg Kellogg:** we need a normative definition of how that's done..  

### 3. YAML-LD.

> *Gregg Kellogg:* [https://www.w3.org/events/meetings/37dfdfbe-ffa4-4fff-9589-0bdc12401128/20220803T160000](https://www.w3.org/events/meetings/37dfdfbe-ffa4-4fff-9589-0bdc12401128/20220803T160000).

> *Niklas Lindström:* +1 to we should say something, if for nothing else then to explicitly state that yaml anhcors are *not* the same as "RDF references"..

**Gregg Kellogg:** Next meeting is on Aug 3rd. Thanks everyone for great contributions. We don't have that many meetings before our face to face. If you're able to do some PRs against the spec that would be wonderful. Talk in two weeks!.  

> *Rob Atkinson:* probably cant make this time zone again - but will work on a PR and debate via issue.

> *ghurlbot:* Created [https://github.com/json-ld/json-ld.org/issues/784](https://github.com/json-ld/json-ld.org/issues/784) -> action 784 add section outlining conversion to JSON. [1] (on ) due 27 Jul 2022.

> *ghurlbot:* Created [https://github.com/json-ld/json-ld.org/issues/785](https://github.com/json-ld/json-ld.org/issues/785) -> action 785 contribute section on the basic profile. [2] (on ) due 27 Jul 2022.

---


### 4. Resolutions

* Resolution #1: extensive round-tripping to preserve original YAML shape is out-of-scope..

### 5. Action Items

* Action #1: add section outlining conversion to JSON.. (Gregg Kellogg)
* Action #2: contribute section on the basic profile.. (Rob Atkinson)