import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { illness } = body;

    if (!illness) {
      return new Response(JSON.stringify({ error: "No illness provided" }), {
        status: 400,
      });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "system",
          content: "You are a helpful medical assistant who provides information on skin diseases. When given the name of a skin disease, you will provide 4 concise paragraphs, 3-4 sentences each: explanation including symptoms, treatment options, prevention methods, and recovery tips.",
        },
        {
          role: "user",
          content: `${illness}`,
        },
      ],
    });

    const result = completion.choices[0].message.content;

    return new Response(JSON.stringify({ info: result }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "OpenAI error" }), {
      status: 500,
    });
  }
}
