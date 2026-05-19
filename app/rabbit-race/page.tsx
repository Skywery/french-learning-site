// app/rabbit-race/page.tsx
import Header from '@/components/Header';

export default function RabbitRace() {
  const exams = [
    { name: "DELF A1/A2", description: "法语初级文凭，基础交流能力", level: "A1-A2", icon: "🎖️", color: "green" },
    { name: "DELF B1/B2", description: "独立使用者，日常及工作沟通", level: "B1-B2", icon: "🏅", color: "blue" },
    { name: "DALF C1/C2", description: "高级法语水平，自如表达", level: "C1-C2", icon: "🏆", color: "purple" },
    { name: "TEF / TCF", description: "移民/留学法语水平测试", level: "A1-C2", icon: "📜", color: "orange" },
    { name: "TFS-4", description: "法语专业四级 (大学法语专业基础阶段)", level: "B1-B2", icon: "📘", color: "indigo" },
    { name: "TFS-8", description: "法语专业八级 (大学法语专业高年级阶段)", level: "C1", icon: "📕", color: "red" },
    { name: "TEF Canada", description: "加拿大移民法语水平测试", level: "A1-C2", icon: "🍁", color: "yellow" },
    { name: "TCF Canada", description: "加拿大法语知识测试 (移民/入籍)", level: "A1-C2", icon: "🍁", color: "lime" },
  ];

  const colorMap: Record<string, string> = {
    green: "bg-green-100", blue: "bg-blue-100", purple: "bg-purple-100", orange: "bg-orange-100",
    indigo: "bg-indigo-100", red: "bg-red-100", yellow: "bg-yellow-100", lime: "bg-lime-100",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-purple-800">🏆 兔兔大闯关</h2>
            <p className="text-gray-500 mt-2">挑战法语等级考试，拿下你的荣耀勋章！</p>
            <p className="text-sm text-gray-400 mt-1">TFS / DELF / DALF / TEF / TCF Canada 官方认证水平</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {exams.map((exam, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div className={`h-28 ${colorMap[exam.color]} flex items-center justify-center text-5xl`}>
                  {exam.icon}
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold">{exam.name}</h3>
                  <p className="text-gray-500 text-sm mt-2">{exam.description}</p>
                  <p className="text-purple-600 font-medium text-sm mt-3">等级：{exam.level}</p>
                  <button className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700">
                    开始闯关 🐰
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 text-center">
            <p className="text-purple-800 font-medium">📢 备考小贴士</p>
            <p className="text-gray-600 text-sm mt-1">模拟真题、听说读写专项训练、历年考情分析 — 即将上线，敬请期待！</p>
          </div>
        </div>
      </div>
    </div>
  );
}