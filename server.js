import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI,
});

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    console.log("AI Response:", aiResponse); // raspunsul de la API
    const image = aiResponse.data[0].url;
    res.send({ image });
  } catch (error) {
    console.error("Error creating image:", error.message);
    res.status(500).send("Error creating image");
  }
});

app.listen(80, () => console.log("Serverul a pornit"));
