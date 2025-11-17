const express = require('express');
const wppconnect = require('@wppconnect-team/wppconnect');
const path = require('path');
const app = express();

app.use(express.json());

// Statik faylları xidmət etmək üçün
app.use(express.static(path.join(__dirname, 'public')));

let whatsappClient = null;

wppconnect.create().then(client => {
    whatsappClient = client;
    console.log("WhatsApp client connected");
});

app.post("/send-message", async (req, res) => {
    if (!whatsappClient) return res.send({status:"error", msg:"Client not ready"});
    const { number, message } = req.body;
    try {
        await whatsappClient.sendText(number + "@c.us", message);
        res.send({ status: "sent" });
    } catch(e) {
        res.send({ status:"error", msg:e.toString() });
    }
});

app.listen(process.env.PORT || 3000, () => console.log("API running"));
