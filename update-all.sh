#!/bin/bash

for folder in ????-??-??/; do
    if [ -d "$folder" ]; then
        scrawl -c config.yaml -d "${folder%/}" -m -i
    fi
done