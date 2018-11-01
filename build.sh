#!/bin/bash

if [[ $TRAVIS_BRANCH == 'develop' ]]; then
	npm run-script build:development
elif [[ $TRAVIS_BRANCH == 'master' ]]; then
	npm run-script build:production
else
	npm run-script build:development
fi
