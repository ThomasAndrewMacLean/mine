# mine

[![Greenkeeper badge](https://badges.greenkeeper.io/ThomasAndrewMacLean/mine.svg)](https://greenkeeper.io/)

## running dev server

`yarn start-dev` or `npm start-dev` starts a hot reload server on [port 1234](http://localhost:1234/)

## techniques

The game is played in a html-canvas. Settings are stored in localStorage.

HighScores are saved in AWS dynamoDB, and accessed using AWS API gateway and AWS lambda functions.

On commit tests are run on netlify and if none fail app is published on netlify.

Scripts are also set up to be used with zeit now. 
