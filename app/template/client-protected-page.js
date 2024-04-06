'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function PrivatePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) {
        router.replace('/');
        return;
      }
      setLoading(false);
    });
  });

  return (
    <>
      {loading && <div>Loading...</div>}
      {!loading && <div>Hello</div>}
    </>
  );
}
