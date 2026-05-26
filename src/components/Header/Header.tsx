// src/layouts/Header.tsx
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock} from 'react-icons/fa';
import { FaTasks } from "react-icons/fa";


export const Header = () => {
  // 1. Lấy hàm mở Modal từ Zustand


  // 2. State lưu trữ thời gian thực
  const [time, setTime] = useState(new Date());

  // 3. Effect đếm ngược, cập nhật lại thời gian mỗi 1 phút (60000ms) để UI luôn đúng giờ
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000);
    // Cleanup function để tránh rò rỉ bộ nhớ khi chuyển trang
    return () => clearInterval(timer);
  }, []);

  // 4. Format ngày và giờ chuẩn tiếng Việt
  const dateString = time.toLocaleDateString('vi-VN', {
    weekday: 'long', // Thứ (VD: Thứ Tư)
    day: '2-digit',  // Ngày (VD: 06)
    month: 'long',   // Tháng (VD: tháng 5)
    year: 'numeric'  // Năm (VD: 2026)
  });

  const timeString = time.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    // Dùng w-full thay vì w-150, bỏ fixed inset-0 đi để nó nằm ngoan ngoãn trong Layout
    <header className="w-full md:max-w-150 fixed flex flex-col justify-center mx-auto inset-0 h-22 bg-blue-700 text-white px-6 rounded-b-xl shadow-md z-20">
      
      {/* Cụm Tiêu đề */}
      <div className='flex gap-4 items-center'>
        <FaTasks className='text-[32px]' />
        <h2 className="text-[32px] font-bold tracking-wide">LÀM ĐI</h2> 
      </div>

      {/* Cụm Công cụ bên phải (Thời gian + Nút Add) */}
      <div className="flex items-center gap-6">
        
        {/* Khối hiển thị Ngày & Giờ */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-xs text-blue-300" />
            <span className="text-xs font-medium">{dateString}</span>
          </div>
          <div className="w-px h-4 bg-blue-500"></div> {/* Vạch kẻ dọc chia cách */}
          <div className="flex items-center gap-2">
            <FaClock className="text-xs text-blue-300" />
            <span className="text-xs font-bold tracking-wider">{timeString}</span>
          </div>
        </div>

        {/* Nút Thêm Task siêu nổi bật */}
        

      </div>
    </header>
  );
}

export default Header;