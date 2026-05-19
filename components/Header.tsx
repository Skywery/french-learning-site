'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import AuthModal from './AuthModal';

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:opacity-80 transition">
                <h1 className="text-xl font-bold text-purple-600">🐇 小兔法语</h1>
              </Link>
              <span className="text-xs text-gray-400 hidden sm:inline">Lapin Français</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-purple-600 text-sm flex items-center gap-1">🔔 通知</button>
              <button className="text-gray-600 hover:text-purple-600 text-sm flex items-center gap-1">💬 消息</button>
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700">退出</button>
                </div>
              ) : (
                <>
                  <button onClick={() => setShowAuthModal(true)} className="text-gray-600 hover:text-purple-600 text-sm">登录</button>
                  <button onClick={() => setShowAuthModal(true)} className="bg-purple-600 text-white px-4 py-1.5 rounded-lg text-sm">注册</button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}