'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AturanLab from '../components/AturanLab';

export default function AturanLabPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('biomedis_user');
    if (!userData) {
      router.push('/');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('biomedis_user');
    router.push('/');
  };

  if (!user) return null;

  return <AturanLab user={user} onLogout={handleLogout} />;
}