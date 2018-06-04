const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "MQjqPTCxD02yZdaD0KIAJ8ggeUrlxaCZy8Kd/f6kgOfycP/u73KtE3SmViuqeivZOTcJbkIQF3l62dwMKdbtccKuCc1KBK7xN72YuQNrJGcDgGfrHyVCd5yV6JZ+04doEzwpWos29BZyx5tX/GrkKAdB04t89/1O/w1cDnyilFU=
",
  channelSecret: "585f84a805da9e433d79ba5cd0f91a39",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

function handleEvent(event) {
  
    if(event.message.text == "hai"){
      const echo = { type: 'text', text: "Halo juga :)·" };
      return client.replyMessage(event.replyToken, echo);
    }

    const echo = { type: 'text', text: "Saya tidak mengerti, saya simpan dulu" };
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});