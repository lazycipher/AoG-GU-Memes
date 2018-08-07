"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const { dialogflow } = require('actions-on-google');
const app = dialogflow({
    debug: true
});
app.intent("jokes", conv => {
    conv.ask(`new BasicCard({
        image: new image({
          url: 'https://i.imgur.com/Ynn2QZa.png',
          alt: 'GU Memes',
        }),
        display: 'CROPPED',
      })`);
});
exports.googleAction = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map