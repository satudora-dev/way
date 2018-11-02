#!/bin/bash

if [[ $TRAVIS_BRANCH == 'master' ]]; then
	firebase use production --token $FIREBASE_TOKEN
	firebase deploy --token $FIREBASE_TOKEN
else
	firebase use development --token $FIREBASE_TOKEN
	firebase deploy --token $FIREBASE_TOKEN
fi
