export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCESS" });
      });
  };
};

export const signUp = newUser => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(async resp => {
        const charOne = await createACard(firestore);
        const charTwo = await createACard(firestore);
        const charThree = await createACard(firestore);

        const characterOne = await createTestCard();
        const characterTwo = await createTestCard();
        const characterThree = await createTestCard();

        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            initials: newUser.firstName[0] + newUser.lastName[0],
            currency: 50,
            cardPackages: 0,
            lastGift: firebase.firestore.FieldValue.serverTimestamp(),
            showCase: [],
            cards: [
              {
                cardId: charOne.id,
                name: characterOne.name,
                marvelId: characterOne.marvelId,
                img: characterOne.img,
                rarity: characterOne.rarity,
                value: characterOne.value
              },
              {
                cardId: charTwo.id,
                name: characterTwo.name,
                marvelId: characterTwo.marvelId,
                img: characterTwo.img,
                rarity: characterTwo.rarity,
                value: characterTwo.value
              },

              {
                cardId: charThree.id,
                name: characterThree.name,
                marvelId: characterThree.marvelId,
                img: characterThree.img,
                rarity: characterThree.rarity,
                value: characterThree.value
              }
            ]
          });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

async function createTestCard() {
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
  } else if (rarity == "epic") {
    value = 150;
  } else if (rarity == "legendary") {
    value = 300;
  }

  return {
    img: imgUrl,
    marvelId: aChar.id,
    name: aChar.name,
    rarity: rarity,
    value: value
  };
}

async function getRarity() {
  let rarity = null;
  const number = Math.floor(Math.random() * 100);
  if (number <= 50) {
    rarity = "common";
  } else if (50 < number <= 75) {
    rarity = "uncommon";
  } else if (75 < number <= 90) {
    rarity = "rare";
  } else if (90 < number <= 97) {
    rarity = "epic";
  } else if (97 < number <= 100) {
    rarity = "legendary";
  }

  return rarity;
}

async function createACard(firestore) {
  let aChar = await getRandChar();
  let imgUrl = `${aChar.thumbnail.path}/portrait_uncanny.${
    aChar.thumbnail.extension
  }`;

  return firestore.collection("cards").add({
    img: imgUrl,
    marvelId: aChar.id,
    name: aChar.name,
    onHand: false
  });
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

async function getRandomOffSet() {
  const totalCharacters = 1491;
  const min = 0;
  const num = Math.floor(Math.random() * (totalCharacters - min) + min);
  return num;
}
