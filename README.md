# mine

## running dev server

`yarn start-dev` or `npm start-dev` starts a hot reload server on [port 1234](http://localhost:1234/)

## techniques

The game is played in a html-canvas. Settings are stored in localStorage.

HighScores are saved in AWS dynamoDB, and accessed using AWS API gateway and AWS lambda functions.
