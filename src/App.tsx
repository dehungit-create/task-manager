import { useState } from 'react';

function App() {
  const [isDark, setIsDark] = useState(false);

  // Hàm xử lý bật tắt Dark Mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    // Khối bao ngoài cùng: test background, flexbox và min-height
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 p-4">
      
      // Card hiển thị: test bo góc (rounded), bóng đổ (shadow), spacing (p-8, space-y)
      <div className="p-8 max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl space-y-6 text-center transform transition-all hover:-translate-y-1 hover:shadow-2xl">
        
        {/* Test Gradient Text */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Tailwind is Ready! 🚀
        </h1>
        
        <p className="text-gray-600 dark:text-gray-300">
          Nếu em thấy card này có bóng đổ, chữ có màu gradient, và nút bấm đổi màu khi hover, tức là Tailwind đã cài đặt thành công mỹ mãn!
        </p>

        {/* Nút bấm: test hover, active (nhấn xuống), và transitions */}
        <button 
          onClick={toggleDarkMode}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition-all duration-200 active:scale-95"
        >
          {isDark ? 'Chuyển sang Light Mode ☀️' : 'Chuyển sang Dark Mode 🌙'}
        </button>
      </div>

    </div>
  );
}

export default App;