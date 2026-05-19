// app/settings/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({ username: '', bio: '' });
  const [passwordForm, setPasswordForm] = useState({ newPassword: '', confirmPassword: '' });

  // 加载当前用户资料
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 尝试从 user_profiles 读取
      const { data, error } = await supabase
        .from('user_profiles')
        .select('username, bio')
        .eq('id', user.id)
        .single();
      if (error && error.code !== 'PGRST116') {
        console.error('加载资料失败:', error);
      } else if (data) {
        setProfile({ username: data.username || '', bio: data.bio || '' });
      }
    };
    loadProfile();
  }, []);

  // 更新资料
  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage('请先登录');
      setLoading(false);
      return;
    }

    const { error } = await supabase
      .from('user_profiles')
      .upsert({ id: user.id, username: profile.username, bio: profile.bio, updated_at: new Date().toISOString() });

    if (error) {
      setMessage('更新失败：' + error.message);
    } else {
      setMessage('资料更新成功');
    }
    setLoading(false);
  };

  // 修改密码
  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage('两次输入的新密码不一致');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setMessage('密码至少6位');
      return;
    }
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.updateUser({ password: passwordForm.newPassword });
    if (error) {
      setMessage('修改密码失败：' + error.message);
    } else {
      setMessage('密码已更新，请重新登录');
      setPasswordForm({ newPassword: '', confirmPassword: '' });
      // 可选：自动退出登录
      await supabase.auth.signOut();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">⚙️ 兔子洞设置</h1>

        {message && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg text-sm">
            {message}
          </div>
        )}

        {/* 个人资料表单 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">🐇 个人资料</h2>
          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">昵称</label>
              <input
                type="text"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="小兔子的昵称"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">简介</label>
              <textarea
                rows={3}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full p-2 border rounded-lg"
                placeholder="介绍一下自己吧～"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              保存资料
            </button>
          </form>
        </div>

        {/* 修改密码 */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold mb-4">🔐 修改密码</h2>
          <form onSubmit={updatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">新密码</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              更新密码
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}