// app/carrot-garden/page.tsx
import Header from '@/components/Header';

export default function CarrotGarden() {
  const courses = [
    { id: 1, name: "🥕 零基础法语生活常用表达", level: "A1", lessons: 24, duration: "2h30", hot: true },
    { id: 2, name: "🥕 日常情景对话 · 进阶篇", level: "A2", lessons: 18, duration: "1h50", hot: false },
    { id: 3, name: "🥕 法语发音入门（重难点）", level: "A1", lessons: 12, duration: "1h20", hot: true },
    { id: 4, name: "🥕 法语语法精讲：动词变位", level: "B1", lessons: 20, duration: "2h", hot: false },
    { id: 5, name: "🥕 法国文化：美食与艺术", level: "B2", lessons: 16, duration: "1h40", hot: true },
    { id: 6, name: "🥕 法语写作训练", level: "C1", lessons: 22, duration: "2h10", hot: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-purple-800">🥕 胡萝卜乐园</h2>
            <p className="text-gray-500 mt-2">挑选你喜欢的胡萝卜，一起快乐学法语～</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition">
                <div className={`h-32 ${course.hot ? 'bg-orange-200' : 'bg-purple-200'} flex items-center justify-center text-4xl`}>
                  🥕
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold">{course.name}</h3>
                    {course.hot && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">🔥 热门</span>}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-500">
                    <span>📚 {course.lessons} 节课</span>
                    <span>⏱️ {course.duration}</span>
                    <span>🎓 {course.level} 等级</span>
                  </div>
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700">
                    开始学习 🐰
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 text-center text-sm text-gray-600">
            🎩 魔术帽俱乐部会员可解锁全部胡萝卜课程 → <a href="#" className="text-purple-600 font-medium">立即加入</a>
          </div>
        </div>
      </div>
    </div>
  );
}