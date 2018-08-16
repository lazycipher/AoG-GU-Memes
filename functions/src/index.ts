import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.database();
const {
    dialogflow,
    Image,
    SimpleResponse

} = require('actions-on-google');
const app = dialogflow({
    debug: true
});
//Handles All Meme Part
app.intent("memes", conv => {
  //Takes Images URL from Database
  return db.ref("memes/").once("value", snapshot => {
    const data = snapshot.val();
    const num = data.length-1;
    const random = Math.floor((Math.random() * num) + 1);

    //Gets the random url from DB
    let imageUrl = data[random];
    //returns data to AoG App
    conv.ask(new SimpleResponse({
        speech: 'Here you go!',
        text: 'Here is one of the best meme!',
      }));
    conv.ask(new Image({
      url: `${imageUrl}`,
      alt: 'GU Memes'  
      }));
      conv.close(new SimpleResponse({
        speech: 'Like Two Bros in Galgotias for more Fun!. Keep Rocking. Ping me back when you need to laugh again!.',
        text: 'Src: Two Bros in Galgotias',
      }));
    })
})
exports.googleAction = functions.https.onRequest(app);