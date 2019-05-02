export const removeCardFromShowCase = card => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profileId = getState().firebase.auth.uid;
    const showCase = getState().firebase.profile.showCase;
    const newShowCase = showCase.filter(item => item.cardId !== card.cardId);

    firestore
      .collection("users")
      .doc(profileId)
      .set(
        {
          showCase: newShowCase
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: "REMOVE_SHOWCASE_CARD", id: card.d });
      })
      .catch(err => {
        dispatch({ type: "REMOVE_SHOWCASE_CARD_ERROR", err });
      });
  };
};

export const addCardToShowCase = card => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profileId = getState().firebase.auth.uid;
    const showCase = getState().firebase.profile.showCase;

    firestore
      .collection("users")
      .doc(profileId)
      .set(
        {
          showCase: [
            ...showCase,
            {
              cardId: card.cardId,
              name: card.name,
              marvelId: card.marvelId,
              img: card.img,
              rarity: card.rarity,
              value: card.value,
              obtained: card.obtained
            }
          ]
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: "ADD_SHOWCASE_CARD", id: card.id });
      })
      .catch(err => {
        dispatch({ type: "ADD_SHOWCASE_CARD_ERROR", err });
      });
  };
};

export const sellCard = card => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();

    const profileId = getState().firebase.auth.uid;
    const cards = getState().firebase.profile.cards;
    const newCards = cards.filter(item => item.cardId !== card.cardId);
    const newCurrency = getState().firebase.profile.currency + card.value;

    firestore
      .collection("cards")
      .doc(card.cardId)
      .delete()
      .then(() => {
        console.log("card deleted from cards collection");
      })
      .catch(err => {
        console.log("cards collection delete error", err);
      });

    firestore
      .collection("users")
      .doc(profileId)
      .set(
        {
          cards: newCards,
          currency: newCurrency
        },

        { merge: true }
      )
      .then(() => {
        dispatch({ type: "SELL_CARD", name: card.name });
      })
      .catch(err => {
        dispatch({ type: "SELL_CARD_ERROR", err });
      });
  };
};

export const buyCardPackage = order => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profileId = getState().firebase.auth.uid;
    const cardPackages = getState().firebase.profile.cardPackages;

    const newCardPackages = parseInt(cardPackages) + parseInt(order);
    const newCurrency = getState().firebase.profile.currency - order * 100;

    firestore
      .collection("users")
      .doc(profileId)
      .set(
        {
          cardPackages: newCardPackages,
          currency: newCurrency
        },

        { merge: true }
      )
      .then(() => {
        dispatch({ type: "BUY_CARD_PACKAGE" });
      })
      .catch(err => {
        dispatch({ type: "BUY_CARD_PACKAGE_ERROR", err });
      });
  };
};

export const openGift = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const firebase = getFirebase();
    const profileId = getState().firebase.auth.uid;
    const cardPackages = getState().firebase.profile.cardPackages;
    const newCardPackages = parseInt(cardPackages) + 1;

    firestore
      .collection("users")
      .doc(profileId)
      .set(
        {
          cardPackages: newCardPackages,
          lastGift: firebase.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      )
      .then(() => {
        dispatch({ type: "FREE_CARD_PACKAGE" });
      })
      .catch(err => {
        dispatch({ type: "FREE_CARD_PACKAGE_ERROR", err });
      });
  };
};

export const openPackage = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const firebase = getFirebase();
    const profileId = getState().firebase.auth.uid;
    const cardPackages = getState().firebase.profile.cardPackages;
    const cards = getState().firebase.profile.cards;
    const newCardPackages = parseInt(cardPackages) - 1;

    //Creating three cards...
    const charOne = await createAllCards(firestore, firebase);
    const charTwo = await createAllCards(firestore, firebase);
    const charThree = await createAllCards(firestore, firebase);

    //getting data about each card that was created above..
    const characterOne = await firestore
      .collection("cards")
      .doc(charOne.id)
      .get()
      .then(doc => {
        return doc.data();
      });

    const characterTwo = await firestore
      .collection("cards")
      .doc(charTwo.id)
      .get()
      .then(doc => {
        return doc.data();
      });
    const characterThree = await firestore
      .collection("cards")
      .doc(charThree.id)
      .get()
      .then(doc => {
        return doc.data();
      });

    //adding the three cards to the users card collection...
    firestore
      .collection("users")
      .doc(profileId)
      .set(
        {
          cardPackages: newCardPackages,
          cards: [
            ...cards,
            {
              cardId: charOne.id,
              name: characterOne.name,
              marvelId: characterOne.marvelId,
              img: characterOne.img,
              rarity: characterOne.rarity,
              value: characterOne.value,
              obtained: characterOne.obtained
            },
            {
              cardId: charTwo.id,
              name: characterTwo.name,
              marvelId: characterTwo.marvelId,
              img: characterTwo.img,
              rarity: characterTwo.rarity,
              value: characterTwo.value,
              obtained: characterTwo.obtained
            },

            {
              cardId: charThree.id,
              name: characterThree.name,
              marvelId: characterThree.marvelId,
              img: characterThree.img,
              rarity: characterThree.rarity,
              value: characterThree.value,
              obtained: characterThree.obtained
            }
          ]
        },

        { merge: true }
      )
      .then(() => {
        dispatch({ type: "OPEN_PACKAGE" });
      })
      .catch(err => {
        dispatch({ type: "OPEN_PACKAGE_ERROR", err });
      });
  };
};

async function createAllCards(firestore, firebase) {
  let aChar = await getRandChar();
  let imgUrl = `${aChar.thumbnail.path}/portrait_uncanny.${
    aChar.thumbnail.extension
  }`;

  let value = null;
  const rarity = await getRarity();
  if (rarity === "common") {
    value = 10;
  } else if (rarity === "uncommon") {
    value = 25;
  } else if (rarity === "rare") {
    value = 75;
  } else if (rarity === "epic") {
    value = 150;
  } else if (rarity === "legendary") {
    value = 300;
  }

  return firestore.collection("cards").add({
    img: imgUrl,
    marvelId: aChar.id,
    name: aChar.name,
    rarity: rarity,
    value: value,
    obtained: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function getRarity() {
  let rarity = null;
  const number = Math.floor(Math.random() * 101);
  if (number <= 50) {
    rarity = "common";
  } else if (number > 50 && number < 75) {
    rarity = "uncommon";
  } else if (number > 74 && number < 90) {
    rarity = "rare";
  } else if (number > 89 && number < 97) {
    rarity = "epic";
  } else if (number > 96 && number < 101) {
    rarity = "legendary";
  }
  return rarity;
}

async function getRandChar() {
  const BASE_URL = "https://gateway.marvel.com/v1/public/characters?";
  const API_KEY = "e1d70ca81822999fd3f4a684eb772b18";
  const HASH = "7ed9c1c23a0a9e39938cb1de263ff627";

  const bad_img =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";

  let checked_img = false;

  while (!checked_img) {
    const randNumb = await getRandomOffSet();
    const url = `${BASE_URL}limit=1&offset=${randNumb}&ts=1&apikey=${API_KEY}&hash=${HASH}`;
    const randomChar = await fetch(url)
      .then(response => response.json())
      .then(json => json.data.results[0])
      .catch(err => console.log(err));

    if (randomChar.thumbnail.path === bad_img) {
      console.log("no img: " + randomChar.id);
    } else {
      checked_img = true;
      return randomChar;
    }
  }
}

function getRandomOffSet() {
  const totalCharacters = 1491;
  const min = 0;
  const num = Math.floor(Math.random() * (totalCharacters - min) + min);
  return num;
}
