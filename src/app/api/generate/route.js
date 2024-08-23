// 'app/api/generate/route.js'
// generate gemini api route

import { NextResponse } from "next/server"
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

// initialize model and assign prompt
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: systemPrompt
})

// request handler
export async function POST(req) {
    
    const data = await req.text()

    // const result = await model.generateContent(data);

    let model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json" }
    })

    let result = await model.generateContent({
        contents: [
            {
                role: 'model',
                parts: [{ text: systemPrompt}],
            },
            {
                role: 'user',
                parts: [{ text: data}],
            }
        ]
    })

    // Parse the JSON response 
    const flashcards = JSON.parse(result.response.text())

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards)

}

