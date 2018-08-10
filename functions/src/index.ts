import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
const db = admin.database();
const {
    dialogflow,
    BasicCard,
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
        speech: 'Here is the Meme of the week For Galgotias University',
        text: 'Here is the Meme of the week For Galgotias University',
      }));
    conv.ask(new BasicCard({
        image: {
          url: `${imageUrl}`,
          accessibilityText: 'GU Memes',
        },
        display: 'WHITE',
      }));
    })
})
exports.googleAction = functions.https.onRequest(app);