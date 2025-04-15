import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: "Eres una asistente que ayuda a desarrolladores web." },
      { role: "user", content: "¿Cómo uso React Router en un proyecto con Vite?" }
    ],
  });

  console.log("\n💬 Respuesta:");
  console.log(response.choices[0].message.content);
}

main().catch(console.error);
