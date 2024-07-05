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
      prompt: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n You are a project manager, you breakdown the project described by the user into todos that can be completed within a day. You are the provide them in a flat list with alternating difficulty to keep the user engaged. The todos can be very technical as long as they can completed. Give the output in terms of an array ONLY. This is important that you only provide todos in an array, with their difficulties in brackets. Do not add any other extra information other than the array <|eot_id|><|start_header_id|>user<|end_header_id|>\n\n ${prompt} <|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
    }),
  });

  let data = await output.json();
  let parsedArrayOfItems = JSON.parse(data.output);

  return NextResponse.json({ data: parsedArrayOfItems });
}
