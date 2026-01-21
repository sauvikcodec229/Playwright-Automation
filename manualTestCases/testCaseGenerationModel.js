const fs = require('fs').promises;
const { OpenAI } = require('openai');

async function main() {
  // 1. Read the README.md file
  const readmeContent = await fs.readFile('E-Commerce_Manual_Test_Cases.md', 'utf-8');

  // 2. Set up the OpenAI client
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // 3. Call the LLM API
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "user", content: `Extract manual test cases from the following project README:\n${readmeContent}` }
    ],
    max_tokens: 800,
  });

  // 4. Print the AI's response
  console.log(completion.choices[0].message.content);
}

main().catch(console.error);
