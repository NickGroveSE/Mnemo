// 'app/api/generate/route.js'
// generate gemini api route

import { NextResponse } from "next/server"
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const systemPrompt = `
You are a flashcard creator, you take in text, where a user specifies topics and/or areas of study and you create multiple flashcards from it. 
The user will be prompted to add how many flashcards they want but if they do not say, make sure to create exactly 10 flashcards.
Both front, that should be a question and back, that is an answer to the corresponding question, should be at least one sentence long.
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

