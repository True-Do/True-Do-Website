'use server';

const { revalidatePath } = require('next/cache');

export default async function revalidate() {
  'use server';
  revalidatePath('/app/notes');
}
