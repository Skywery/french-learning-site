// app/rabbit-talk/page.tsx
'use client';

import { useState } from 'react';
import Header from '@/components/Header';

export default function RabbitTalk() {
  const [activeTab, setActiveTab] = useState('dialogue');

  const tabs = [
    { id: 'dialogue', label: '💬 情景对话', icon: '💬' },
    { id: 'phrases', label: '📝 常用短语', icon: '📝' },
    { id: 'verbs', label: '🔄 动词变位', icon: '🔄' },
    { id: 'reading', label: '📖 短文阅读', icon: '📖' },
    { id: 'vlog', label: '🎥 法语Vlog', icon: '🎥' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-purple-800">🎤 兔言兔语</h2>
            <p className="text-gray-500 mt-1">口语专项训练，听、说、读、练全拿下～</p>
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
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-[500px]">
            {activeTab === 'dialogue' && <DialogueModule />}
            {activeTab === 'phrases' && <PhrasesModule />}
            {activeTab === 'verbs' && <VerbsModule />}
            {activeTab === 'reading' && <ReadingModule />}
            {activeTab === 'vlog' && <VlogModule />}
          </div>
        </div>
      </div>
    </div>
  );
}

// 以下各个模块函数保持不变（为避免重复，这里只给出占位，实际运行时需要补全，但你之前已有完整代码，直接复制过来即可）
// 由于长度限制，我会提供完整模块函数。请复制下面代码到文件末尾。

function DialogueModule() {
  const dialogues = [
    { id: 1, title: "🥕 在咖啡馆点单", level: "A1", content: "Bonjour, je voudrais un café, s'il vous plaît. – Avec plaisir, voilà." },
    { id: 2, title: "🐰 自我介绍", level: "A1", content: "Je m'appelle Lapin, j'étudie le français. Et toi ?" },
    { id: 3, title: "🎓 谈论天气", level: "A2", content: "Il fait beau aujourd'hui, n'est-ce pas ? – Oui, pas un nuage !" },
  ];
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">💬 情景对话练习</h3>
      <p className="text-gray-500 text-sm mb-4">模拟真实场景，提升口语反应力～</p>
      <div className="space-y-4">
        {dialogues.map(d => (
          <div key={d.id} className="border rounded-lg p-4 hover:bg-purple-50 transition">
            <div className="flex justify-between items-start">
              <h4 className="font-bold">{d.title}</h4>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{d.level}</span>
            </div>
            <p className="text-gray-700 mt-2 text-sm">{d.content}</p>
            <button className="mt-3 text-purple-600 text-sm">🎧 听对话 & 练习 →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhrasesModule() {
  const phrases = [
    { fr: "Comment ça va ?", zh: "你好吗？", category: "问候" },
    { fr: "Merci beaucoup", zh: "非常感谢", category: "礼貌" },
    { fr: "Je suis désolé(e)", zh: "我很抱歉", category: "情感" },
    { fr: "Quel est le problème ?", zh: "有什么问题？", category: "询问" },
  ];
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">📝 常用短语</h3>
      <p className="text-gray-500 text-sm mb-4">每天积累几句，口语更地道～</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {phrases.map((p, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{p.fr}</p>
              <p className="text-xs text-gray-500">{p.zh}</p>
              <span className="text-xs text-purple-400">{p.category}</span>
            </div>
            <button className="text-purple-600 text-sm">🗣️ 跟读</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerbsModule() {
  const verbs = [
    { infinitive: "parler", meaning: "说", present: "je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent" },
    { infinitive: "finir", meaning: "完成", present: "je finis, tu finis, il finit, nous finissons, vous finissez, ils finissent" },
    { infinitive: "venir", meaning: "来", present: "je viens, tu viens, il vient, nous venons, vous venez, ils viennent" },
  ];
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">🔄 动词变位练习</h3>
      <p className="text-gray-500 text-sm mb-4">掌握核心动词，构建法语骨架～</p>
      <div className="space-y-4">
        {verbs.map((v, idx) => (
          <div key={idx} className="border rounded-lg p-3">
            <div className="flex justify-between items-center">
              <span className="font-bold text-purple-700">{v.infinitive}</span>
              <span className="text-sm text-gray-500">({v.meaning})</span>
              <button className="text-purple-600 text-sm">📖 查看变位表</button>
            </div>
            <p className="text-xs text-gray-600 mt-1 break-words">{v.present}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReadingModule() {
  const articles = [
    { title: "🐇 小兔的巴黎日记", level: "A2", summary: "J'adore me promener le long de la Seine...", link: "#" },
    { title: "🎨 法国美食介绍", level: "B1", summary: "La baguette et le fromage sont des trésors nationaux...", link: "#" },
  ];
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">📖 短文阅读</h3>
      <p className="text-gray-500 text-sm mb-4">阅读原汁原味短文，提升语感～</p>
      <div className="space-y-4">
        {articles.map((a, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <h4 className="font-bold">{a.title}</h4>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">{a.level}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">{a.summary}</p>
            <button className="mt-3 text-purple-600 text-sm">🔍 阅读全文 →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function VlogModule() {
  const vlogs = [
    { title: "🇫🇷 小兔带你逛巴黎市场", duration: "8:24", level: "A2" },
    { title: "🍷 法国餐桌礼仪", duration: "6:15", level: "B1" },
    { title: "🎭 阿维尼翁戏剧节", duration: "10:02", level: "B2" },
  ];
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">🎥 法语Vlog</h3>
      <p className="text-gray-500 text-sm mb-4">看视频学地道口语，锻炼听力～</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vlogs.map((v, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
            <div className="h-32 bg-purple-200 flex items-center justify-center text-4xl">🎬</div>
            <div className="p-3">
              <p className="font-bold">{v.title}</p>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>⏱️ {v.duration}</span>
                <span>{v.level}</span>
              </div>
              <button className="mt-2 w-full bg-purple-600 text-white py-1 rounded text-sm">观看视频</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}