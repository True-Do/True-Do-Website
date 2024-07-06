import { NextResponse } from 'next/server';

// TODO Allow access only from same-origin somehow

export async function POST(request) {
  const { prompt } = await request.json();

  const output = await fetch('https://api.lamini.ai/v1/completions', {
    headers: {
      Authorization: `Bearer ${process.env.LAMINI_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      model_name: 'meta-llama/Meta-Llama-3-8B-Instruct',
      prompt: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n You are a project manager, you breakdown the project described by the user into todos that can be completed within a day. You are the provide them in a flat array with alternating difficulty to keep the user engaged. The todos can be very technical as long as they can be completed. Give the output in terms of an array ONLY with their difficulties in rounded brackets ONLY IN WORDS. \n IMPORTANT - Do not add any extra information before or after the array and The array should only be in one line and give a title to the project in 5 words or less and add that as the last item of the array. \n\n This is an example output: ["Set up Next.js project (easy)", "Create API endpoint for article fetching (medium)", "Implement Medium API authentication (hard)", "Create API endpoint for article posting (medium)", "Implement Dev.to API authentication (hard)", "Format article content for Dev.to (medium)", "Test API endpoints (easy)", "Deploy to Vercel (easy)", "Integrate API endpoints with UI (hard)", "Test UI functionality (easy)", "Finalize and deploy project (easy)", "Article Migrator"]. <|eot_id|><|start_header_id|>user<|end_header_id|>\n\n ${prompt} <|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
    }),
  });

  let data = await output.json();
  console.log(data);
  let parsedArrayOfItems = JSON.parse(data.output);

  return NextResponse.json({ data: parsedArrayOfItems });
}
