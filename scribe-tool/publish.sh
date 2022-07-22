#!/usr/bin/env bash
#
# Generates minutes for the directory given

echo "Generating minutes for $1"
DATESTR=`echo $1 | cut -f2 -d/`
MESSAGE="Add text minutes $DATESTR telecon."

node index.js -d $1 -m -i
