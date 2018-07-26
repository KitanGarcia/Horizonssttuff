var _ = require('underscore');
var persist = require('./persist');
var Card = require('./card');
var Player = require('./player');
var readGame = false;

class Game {
  constructor() {
    this.isStarted = false;
    this.players = {};//store id and val of player object
    this.playerOrder = [];
    this.pile = [];
  }

  addPlayer(username) {
    if (this.isStarted)
    {
      throw "error: game already started.";
    }
    if (!username.trim())//fix this (also use trim?)
    {
      throw "error: username empty.";
    }
    for (var key in this.players)
    {
      if (username === this.players[key].username)
      {
        throw "error: usernames not unique.";
      }
    }
    var newPlayer = new Player(username);
    this.playerOrder.push(newPlayer.id);
    this.players[newplayer.id] = newPlayer;
    return newPlayer.id;
  }

  startGame() {
    if (this.isStarted)
    {
      throw "error: game already started";
    }
    if (Object.keys(this.players).length < 2)
    {
      throw "error: not enough players";
    }
    this.isStarted = true;
    var suit = ["spades", "hearts", "clubs", "diamonds"];
    var deck = [];
    for (var i = 1; i < 14; i++)
    {
      for (var j = 0; j < 4; j++)
      {
        var newCard = new Card(suit[j], i);
        deck.push(newCard);
      }
    }//deck has been created!
    var shuffledDeck = _.shuffle(deck);//deck shuffled
  var index = 0
  while (shuffledDeck.length > 0)
  {
    var playerId = this.playerOrder[index];
    this.players[playerId].pile.push(deck[0]);
    deck.shift();
    index++;
    if (index == this.playerOrder.length)
    {
      index = 0;
    }
  }//CARDS NOW DISTRIBUTED
  /*  for (var i = 0; i < 52; i++)
    {
      for (var j = 0; j < Object.keys(this.players).length; j++)
      {
        this.players[playerOrder].pile.push(shuffledDeck[i];
        if (j == Object.keys(this.players.length)
        {
          j = 0;
        }
      }
    }*/
  }

  nextPlayer() {
    if (!this.isStarted)
    {
      throw "error: game not started";
    }
    var firstPlayerHasCards = false;
    while (!firstPlayerHasCards)
    {
      var temp = this.playerOrder[0];
      this.playerOrder.shift();
      this.playerOrder.push(this);
      if (this.player[this.playerOrder[0]].pile.length !== 0)
      {
        firstPlayerHasCards = true;
      }
    }
/*while this.playerOrder[i] != */
//shift this.playerOrder array by one 
//shift until you find someone with cards in their pile
  }

  isWinning(playerId) {
    if (!this.isStarted)
    {
      throw "error: game not started";
    }
    if (this.players[playerId].pile.length == 52)
    {
      this.isStarted = false;
      return true;
    }
      return false;
  }

  playCard(playerId) {
    if (!this.isStarted)
    {
      throw "error: game not started";
    }
    if (this.playerOrder[0].id !== playerId)
    {
      throw "error: player attempting to play out of turn";
    }
    if (this.players[playerId].pile.length == 0)
    {
      throw "error: player has no cards";
    }
    var topCard = this.players[playerId].pile.shift();
    this.pile.push(topCard);
//FINISH THIS: COUNT ON DIRECTIONS
  }

  slap(playerId) {
    // YOUR CODE HERE
  }

  // PERSISTENCE FUNCTIONS
  //
  // Start here after completing Step 2!
  // We have written a persist() function for you to save your game state to
  // a store.json file.
  // =====================
  fromObject(object) {
    this.isStarted = object.isStarted;

    this.players = _.mapObject(object.players, player => {
      var p = new Player();
      p.fromObject(player);
      return p;
    });

    this.playerOrder = object.playerOrder;

    this.pile = object.pile.map(card => {
      var c = new Card();
      c.fromObject(card);
      return c;
    });
  }

  toObject() {
    return {
      isStarted: this.isStarted,
      players: _.mapObject(this.players, val => val.toObject()),
      playerOrder: this.playerOrder,
      pile: this.pile.map(card => card.toObject())
    };
  }

  fromJSON(jsonString) {
    this.fromObject(JSON.parse(jsonString));
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  persist() {
    if (readGame && persist.hasExisting()) {
      this.fromJSON(persist.read());
      readGame = true;
    } else {
      persist.write(this.toJSON());
    }
  }
}

module.exports = Game;
