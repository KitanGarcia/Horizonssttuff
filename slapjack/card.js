class Card {
  constructor(suit, value) {
    // YOUR CODE HERE
    this.value = value;//??????
    this.suit = suit;//"???????
  }

  toString()
  {
    var cardSuit;
    var cardVal;
    if (this.value == 1)
    {
      cardVal = "Ace";
    }
    else if (this.value == 11)
    {
      cardVal = "Jack";
    }
    else if (this.value == 12)
    {
      cardVal = "Queen";
    }
    else if (this.value == 13)
    {
      cardVal = "King";
    }
    else
    {
      cardVal = this.value;
    }

    cardSuit = this.suit.charAt(0).toUpperCase() + this.suit.slice(1);
    return (cardVal + " of " + cardSuit);
  }

  // PERSISTENCE FUNCTIONS
  //
  // Start here after completing Step 2!
  // We have written a persist() function for you to save your game state to
  // a store.json file.
  // =====================
  fromObject(object) {
    this.value = object.value;
    this.suit = object.suit;
  }

  toObject() {
    return {
      value: this.value,
      suit: this.suit
    };
  }
}

module.exports = Card;
