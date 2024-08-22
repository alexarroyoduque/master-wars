# MASTER Wars

Welcome to the most epic battle of Marvel heroes.

This is an experimental game to know technologies like [React](https://facebook.github.io/react) and [Marvel Api](http://developer.marvel.com/)

Online demo: [https://master-wars-online.web.app](https://master-wars-online.web.app)

## The game
1. Press "Get heroes" button: this calls the database to bring new Marvel heroes.
2. Wait to finish loading heroes
3. Press "New battle" button
4. Now choose the hero who would win in the question
5. Repeat steps 3 and 4 until there are no more heroes, then repeat the process from step 1...

## For developers
### Requirements
1. Install [GIT](http://git-scm.com/)
2. Install [Node 6.17.1](http://nodejs.org/)
3. Then install webpack with `npm install -g webpack@1.13.1`

### Run project
1. Clone this repository
  + `git clone https://github.com/alejandroarroyo/master-wars`
  + `cd master-wars`
2. Install dependencies with `npm install`
3. Run project with `npm run serve`

### Build
1. `npm run dist`
2. `npm run serve:dist` to test dist

### Deploy
Need node 18
`nvm use 6 && npm run dist && nvm use 18 && firebase deploy`

## Thanks to

- [Marvel Api](http://developer.marvel.com/) to provide a public API with information about their comics

- newtriks to create the incredible
[generator-react-webpack](https://github.com/newtriks/generator-react-webpack)

## Author
> Alejandro Arroyo Duque

> Portfolio: [http://alexarroyoduque.github.io](http://alexarroyoduque.github.io)

> Twitter: [@AlexArroyoDuque](https://twitter.com/AlexArroyoDuque)
