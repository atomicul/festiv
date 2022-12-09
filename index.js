import qrc from "qrcode-terminal";
import fs from "fs";
import { Client } from "whatsapp-web.js";
import { exit } from "process";

const clog = console.log;

// const getProfilePic = (location) => {
//   return new Promise((res, rej) => {
//     fs.readFile(location, 'ascii', (err, file) => {
//       if (err) rej(err);
//       res(file);
//     });
//   })
// }
// const pPicture = await getProfilePic('./Cat03.jpg');

//WHATSAPP
const client = new Client();
const CHAT = '40744988316@g.us';

client.on("qr", (qr) => {
  qrc.generate(qr, { small: true });
});

client.on("ready", () => {
  clog("Connected to WhatsApp");

  client.getChatById(CHAT).then((q) => {
    q.setSubject("ZIUA LUI RIKI");
    q.setDescription("Luați-vă coifurile!");
  });

  sendCountdown();
});
client.initialize();

//COUNTER
const BDAY = 1659906000000;
const START_TIME = 1670104800000;

const timeLeft = (deathline) => {
  return deathline - Date.now();
};

const sendCountdown = () => {
  let tmLft = timeLeft(BDAY);
  if (Math.floor(tmLft / 100) % 10 === 0 && tmLft < START_TIME * 1000 + 2000) {
    tmLft = Math.floor(tmLft / 1000);
  } else {
    setTimeout(sendCountdown, 100);
    return undefined;
  }
  if (tmLft === 180) client.sendMessage(CHAT, "3 MINUTE CHAT");
  else if (tmLft === 60) client.sendMessage(CHAT, "1MINUT!!!");
  else if (tmLft <= 10) client.sendMessage(CHAT, `*${tmLft}*`);
  else if (tmLft % 10 === 0 || tmLft === 15)
    client.sendMessage(CHAT, `${tmLft} Secunde!`);
  if (tmLft > 1) setTimeout(sendCountdown, 100);
  else {
    setTimeout(() => {
      client.sendMessage(CHAT, "La mulți ani, Sistemule! 🥳🎉").then(() => {
        // client.getChatById(CHAT).then((q) => {
        //   q.setSubject("LA MULTI ANI");
        //   q.setDescription("Foarte festiv :O");
        //   // q.setProfilePicture(pPicture);
        // });
      });
    }, 1000);
  }
};
