#!/usr/bin/env bash
#
# Generates minutes for the directory given

echo "Generating minutes and social media posts for $1"
DATESTR=`echo $1 | cut -f2 -d/`
MESSAGE="Add text minutes and audio logs for $DATESTR telecon."

# Generate minutes
node index.js -d $1 -m -i
#git add $1/irc.log $1/index.html $1/audio.ogg
#git commit $1/irc.log $1/index.html $1/audio.ogg $1/../index.html -m "$MESSAGE"
#git push

# Generate WordPress and G+ posts
#nodejs index.js -d $1 -w
#nodejs index.js -d $1 -g

# Make sure we want to continue
#read -e -p "Check for problems, press 'y' when ready to tweet/email: " -i "n" BROADCAST

#if [ "$BROADCAST" != "y" ]
#then
#   echo "Aborting social media broadcast."
#   exit
#fi

# Email minutes
#nodejs index.js -d $1 -e

# Tweet telecon results
#export SCRAWL_TWITTER_CONSUMER_KEY=
#export SCRAWL_TWITTER_SECRET=
#export SCRAWL_TWITTER_TOKEN_KEY=
#export SCRAWL_TWITTER_TOKEN_SECRET=
#export SCRAWL_LINKEDIN_CLIENT_ID=
#export SCRAWL_LINKEDIN_CLIENT_SECRET=
#
#nodejs index.js -d $1 -t 
#
