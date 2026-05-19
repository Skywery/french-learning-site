// app/my-studio/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Header from '@/components/Header';

export default function MyStudio() {
  const [activeTab, setActiveTab] = useState('stones');

  const tabs = [
    { id: 'stones', label: '🪵 绊脚石收集册' },
    { id: 'words', label: '🗂️ 新词磨坊' },
    { id: 'treasure', label: '⭐ 我的百宝箱' },
    { id: 'draw', label: '✏️ 画胡萝卜' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-purple-800">✨ 兔兔学习工坊</h2>
            <p className="text-gray-500 mt-1">整理绊脚石、研磨新词、珍藏宝贝、创作胡萝卜</p>
          </div>
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-t-lg text-sm font-medium transition ${
                    activeTab === tab.id
                      ? 'bg-white text-purple-700 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-purple-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[400px]">
            {activeTab === 'stones' && <StonesCollector />}
            {activeTab === 'words' && <WordsMill />}
            {activeTab === 'treasure' && <TreasureBox />}
            {activeTab === 'draw' && <DrawCarrot />}
          </div>
        </div>
      </div>
    </div>
  );
}

// 绊脚石收集册组件
function StonesCollector() {
  const [stones, setStones] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [newMistake, setNewMistake] = useState('');

  // 获取当前用户ID
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  // 加载错题
  const loadMistakes = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('mistakes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('加载错题失败:', error);
    } else {
      setStones(data || []);
    }
  };

  useEffect(() => {
    if (userId) loadMistakes();
  }, [userId]);

  // 添加错题
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMistake.trim() || !userId) return;
    const { error } = await supabase
      .from('mistakes')
      .insert([{ user_id: userId, content: newMistake }]);
    if (error) {
      console.error('添加失败:', error);
      alert('添加失败：' + error.message);
    } else {
      setNewMistake('');
      loadMistakes();
    }
  };

  // 删除错题（掌握啦）
  const handleMaster = async (id: number) => {
    const { error } = await supabase.from('mistakes').delete().eq('id', id);
    if (error) {
      console.error('删除失败:', error);
      alert('删除失败');
    } else {
      loadMistakes();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">🪵 绊脚石收集册</h3>
      <p className="text-gray-500 text-sm mb-4">记录学习中被绊倒的地方，下次就不会再摔了～</p>

      {/* 添加新错题的表单 */}
      <form onSubmit={handleAdd} className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="例如：动词变位 le passé composé"
          value={newMistake}
          onChange={(e) => setNewMistake(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
          required
        />
        <button type="submit" className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
          添加绊脚石
        </button>
      </form>

      {stones.length === 0 ? (
        <p className="text-gray-400 text-center py-8">🎉 太棒了！目前没有绊脚石，继续加油～</p>
      ) : (
        <div className="space-y-3">
          {stones.map(stone => (
            <div key={stone.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">{stone.content}</p>
                <p className="text-xs text-gray-400">错题时间：{new Date(stone.created_at).toLocaleDateString()}</p>
              </div>
              <button onClick={() => handleMaster(stone.id)} className="text-purple-600 text-sm">
                掌握啦 ✓
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 新词磨坊组件
// 新词磨坊 - 连接数据库
function WordsMill() {
  const [words, setWords] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  const loadWords = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) console.error('加载生词失败:', error);
    else setWords(data || []);
  };

  useEffect(() => {
    if (userId) loadWords();
  }, [userId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !userId) return;
    const { error } = await supabase
      .from('words')
      .insert([{ user_id: userId, word: newWord, meaning: newMeaning }]);
    if (error) alert('添加失败：' + error.message);
    else {
      setNewWord('');
      setNewMeaning('');
      loadWords();
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('words').delete().eq('id', id);
    if (error) alert('删除失败');
    else loadWords();
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">🗂️ 新词磨坊</h3>
      <p className="text-gray-500 text-sm mb-4">把生词放进磨坊，慢慢变成你的词汇～</p>
      <form onSubmit={handleAdd} className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="生词 (ex: éblouissant)"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
          required
        />
        <input
          type="text"
          placeholder="释义 (ex: 令人目眩的)"
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
          className="flex-1 p-2 border rounded-lg"
        />
        <button type="submit" className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm">
          添加
        </button>
      </form>
      {words.length === 0 ? (
        <p className="text-gray-400 text-center py-8">✨ 磨坊里空空如也，去学点新词吧～</p>
      ) : (
        <div className="space-y-2">
          {words.map((w) => (
            <div key={w.id} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
              <div>
                <span className="font-medium">{w.word}</span>
                {w.meaning && <span className="text-gray-500 text-sm ml-2">({w.meaning})</span>}
              </div>
              <button onClick={() => handleDelete(w.id)} className="text-purple-600 text-sm">
                已记住
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 我的百宝箱组件
// 我的百宝箱 - 完整版（无需网址）
function TreasureBox() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [loading, setLoading] = useState(false);

  // 获取当前用户ID
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  // 加载收藏列表
  const loadFavorites = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('加载收藏失败:', error);
      alert('加载失败：' + error.message);
    } else {
      setFavorites(data || []);
    }
  };

  useEffect(() => {
    if (userId) loadFavorites();
  }, [userId]);

  // 添加收藏
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !userId) return;
    setLoading(true);
    const { error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, title, description: desc }]);
    if (error) {
      alert('添加失败：' + error.message);
    } else {
      setTitle('');
      setDesc('');
      loadFavorites();
    }
    setLoading(false);
  };

  // 删除收藏
  const handleDelete = async (id: number) => {
    if (!confirm('确定要移除这个收藏吗？')) return;
    const { error } = await supabase.from('favorites').delete().eq('id', id);
    if (error) {
      alert('删除失败：' + error.message);
    } else {
      loadFavorites();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">⭐ 我的百宝箱</h3>
      <p className="text-gray-500 text-sm mb-4">珍藏你喜欢的课程、句子、资源～</p>

      <form onSubmit={handleAdd} className="mb-4 space-y-2">
        <input
          type="text"
          placeholder="标题 (必填) 例如：日常情景对话 · 进阶篇"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="备注 (可选)"
          rows={2}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-3 py-2 rounded-lg text-sm"
        >
          {loading ? '添加中...' : '添加到百宝箱'}
        </button>
      </form>

      {favorites.length === 0 ? (
        <p className="text-gray-400 text-center py-8">📦 百宝箱空空的，去收藏一些宝贝吧～</p>
      ) : (
        <div className="space-y-3">
          {favorites.map((item) => (
            <div key={item.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{item.title}</p>
                {item.description && <p className="text-sm text-gray-500">{item.description}</p>}
                <p className="text-xs text-gray-400 mt-1">
                  收藏于 {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
              <button onClick={() => handleDelete(item.id)} className="text-red-400 text-sm ml-2">
                移除
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 画胡萝卜组件
function DrawCarrot() {
  const [courses, setCourses] = useState<any[]>([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // 获取当前登录用户
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserId(user.id);
    });
  }, []);

  // 加载用户创建的课程
  const loadCourses = async () => {
    if (!userId) return;
    const { data, error } = await supabase
      .from('user_courses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (error) {
      console.error('加载课程失败:', error);
    } else {
      setCourses(data || []);
    }
  };

  useEffect(() => {
    if (userId) loadCourses();
  }, [userId]);

  // 提交新课程
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !userId) return;
    setLoading(true);
    const { error } = await supabase
      .from('user_courses')
      .insert([{ user_id: userId, title: form.title, description: form.description }]);
    if (error) {
      console.error('发布失败:', error);
      alert('发布失败：' + error.message);
    } else {
      setForm({ title: '', description: '' });
      loadCourses(); // 刷新列表
    }
    setLoading(false);
  };

  // 删除课程
  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个胡萝卜吗？')) return;
    const { error } = await supabase.from('user_courses').delete().eq('id', id);
    if (error) {
      console.error('删除失败:', error);
      alert('删除失败');
    } else {
      loadCourses();
    }
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">✏️ 画胡萝卜</h3>
      <p className="text-gray-500 text-sm mb-4">创作你自己的课程，分享给其他小兔子～</p>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="课程名称"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 border rounded-lg"
          required
        />
        <textarea
          placeholder="课程简介"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
        <button type="submit" disabled={loading} className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
          {loading ? '发布中...' : '发布胡萝卜 🥕'}
        </button>
      </form>

      {courses.length === 0 ? (
        <p className="text-gray-400 text-center py-4">还没有画过胡萝卜，试试创建一个吧～</p>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <div key={course.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium">{course.title}</p>
                <p className="text-sm text-gray-500">{course.description || '暂无简介'}</p>
                <p className="text-xs text-gray-400 mt-1">创作于 {new Date(course.created_at).toLocaleDateString()}</p>
              </div>
              <button onClick={() => handleDelete(course.id)} className="text-red-400 text-sm ml-2">删除</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}