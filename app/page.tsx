// app/page.tsx
'use client';

import { useStudyTimer } from '@/lib/useStudyTimer';
import Header from '@/components/Header';

export default function Home() {
  const { todayMinutes, isStudying, startStudy, endStudy } = useStudyTimer();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="w-full px-4 md:px-8 lg:px-12 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* 左侧导航 - 宽度 w-72 */}
          <aside className="md:w-72 flex-shrink-0 flex flex-col">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20 flex flex-col flex-grow">
              <nav className="space-y-1">
                <a href="/" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition bg-purple-100 text-purple-700 font-medium">
                    🐇 兔窝
                  </div>
                </a>
                <a href="/carrot-garden" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition text-gray-700 hover:bg-gray-100 flex items-center justify-between">
                    <span>🥕 胡萝卜乐园</span>
                    <span className="text-xs text-red-500 font-bold">🔥 HOT</span>
                  </div>
                </a>
                <a href="/my-studio" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition text-gray-700 hover:bg-gray-100">
                    ✨ 兔兔学习工坊
                  </div>
                </a>
                <a href="/rabbit-talk" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition text-gray-700 hover:bg-gray-100">
                    🎤 兔言兔语
                  </div>
                </a>
                <a href="/rabbit-race" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition text-gray-700 hover:bg-gray-100">
                    🏆 兔兔大闯关
                  </div>
                </a>
                <a href="#" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition text-gray-700 hover:bg-gray-100">
                    🎩 魔术帽俱乐部
                  </div>
                </a>
                <a href="#" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition text-gray-700 hover:bg-gray-100">
                    📣 喇叭花分享
                  </div>
                </a>
              </nav>

              <div className="flex-grow"></div>

              <nav className="space-y-1 border-t border-gray-100 pt-4 mt-4">
                <a href="#" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition text-gray-700 hover:bg-gray-100">
                    ⚙️ 兔子洞设置
                  </div>
                </a>
                <a href="#" className="block">
                  <div className="px-3 py-2 rounded-lg text-sm cursor-pointer transition text-gray-700 hover:bg-gray-100">
                    💌 寄信给兔子
                  </div>
                </a>
              </nav>

              <div className="mt-6 pt-4 border-t border-gray-100 text-center">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
                  <p className="text-xs text-purple-700 font-medium">🎩 魔术帽俱乐部</p>
                  <p className="text-xs text-gray-500 mt-1">解锁全部胡萝卜课程</p>
                  <button className="mt-2 bg-purple-600 text-white text-xs px-3 py-1 rounded-full w-full">
                    立即加入
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* 右侧主要内容 */}
          <main className="flex-1 space-y-5">
            {/* 欢迎横幅 + 邀请奖励 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div>
                  <h2 className="text-2xl font-bold">🐰 欢迎回来，小兔子！</h2>
                  <p className="text-gray-500 text-sm mt-1">
                    我们为你准备了全新的胡萝卜课程，一起高效学法语～
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                    开始学习
                  </button>
                  <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg text-sm">
                    📣 喇叭花分享
                  </button>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 items-center text-sm border-t pt-4">
                <span className="bg-purple-50 px-3 py-1 rounded-full text-purple-700 text-xs">
                  🎩 年会员 +30天
                </span>
                <span className="bg-purple-50 px-3 py-1 rounded-full text-purple-700 text-xs">
                  🎩 月会员 +5天无上限
                </span>
                <span className="text-gray-400 text-xs">邀请好友得会员，双方都有奖励</span>
              </div>
            </div>

            {/* 今日学习时长卡片（集成计时器） */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500 text-sm">⏱️ 今日学习时长</p>
                  <p className="text-4xl font-bold text-purple-600">
                    {todayMinutes}{' '}
                    <span className="text-lg font-normal text-gray-500">分钟</span>
                  </p>
                </div>
                <div className="text-right text-sm text-gray-400">
                  {isStudying ? '📖 学习中...' : '⚡ 点击下方按钮开始学习'}
                </div>
              </div>
              <button
                onClick={isStudying ? endStudy : startStudy}
                className={`mt-4 w-full py-2 rounded-lg text-white font-medium ${
                  isStudying ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isStudying ? '结束学习并保存时长' : '🐰 开始学习'}
              </button>
            </div>

            {/* 最近的课程列表 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">📚 最近的胡萝卜</h3>
                <button className="text-purple-600 text-sm">查看全部 🥕</button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">🥕 零基础法语生活常用表达</p>
                    <p className="text-xs text-gray-400">上次学习：2026/5/8</p>
                  </div>
                  <button className="text-purple-600 text-sm">继续啃 🐰</button>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">🥕 日常情景对话 · 进阶篇</p>
                    <p className="text-xs text-gray-400">上次学习：2026/5/7</p>
                  </div>
                  <button className="text-purple-600 text-sm">继续啃 🐰</button>
                </div>
                <div className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">🥕 法语发音入门（重难点）</p>
                    <p className="text-xs text-gray-400">上次学习：2026/5/6</p>
                  </div>
                  <button className="text-purple-600 text-sm">继续啃 🐰</button>
                </div>
              </div>
            </div>

            {/* 底部小提示 */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 text-center text-sm text-gray-600">
              💡 邀请好友得会员，双方都有奖励 &nbsp;|&nbsp; 🐇 官网：xiaotufayu.com
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}