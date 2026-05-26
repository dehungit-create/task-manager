// src/layouts/Main.tsx

import { useTaskStore } from '../../store/useTaskStore';


type MainProps = {
  children: React.ReactNode;
};

export const Main = ({ children }: MainProps) => {
  // 1. Kéo dữ liệu và hàm mở Modal từ Zustand
  const { tasks, openModal } = useTaskStore();
  
  // State cục bộ để đổi màu nút Filter (Tạm thời làm UI)
 

  // 2. Tính toán linh động cho Thanh tiến trình
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.isCompleted).length;
  
  // Nếu không có task thì % là 0 để tránh lỗi chia cho 0 (NaN)
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    // Dùng w-full và max-w-3xl để nó tự động co giãn đẹp trên mọi màn hình
    <main className="w-full md:max-w-150 min-h-screen pt-28 mx-auto p-4">
      
      {/* THANH TIẾN TRÌNH (Chỉ hiển thị khi có ít nhất 1 task) */}
      {totalTasks > 0 && (
        <div className="mb-8 p-4 bg-white shadow-md rounded-2xl">
          <div className="flex justify-between items-end mb-2 ">
            <h3 className="font-bold text-gray-700">Tiến độ công việc</h3>
            <p className="text-sm text-gray-500 font-medium">
              {completedTasks} / {totalTasks}
            </p>
          </div>
          {/* Thanh background xám */}
          <div className="h-2.5 w-full bg-gray-200 rounded-full overflow-hidden">
            {/* Thanh màu xanh chạy theo % */}
            <div
              className="h-full bg-blue-600 transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* RẼ NHÁNH LOGIC: CÓ TASK HAY KHÔNG CÓ TASK? */}
      {totalTasks === 0 ? (
        
        // GIAO DIỆN RỖNG (Empty State)
        <div className="flex flex-col items-center justify-center mt-20 p-10 border-2 border-dashed border-gray-300 rounded-xl bg-white">
          <div className="text-6xl mb-4">📝</div>
          <h6 className="text-lg font-bold text-gray-700 mb-2">Chưa có công việc nào</h6>
          <p className="text-sm text-gray-400 mb-6 text-center max-w-xs">
            Bắt đầu một ngày làm việc năng suất bằng cách thiết lập các mục tiêu mới nhé!
          </p>
          <button 
            onClick={openModal}
            className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition shadow-sm active:scale-95"
          >
            + Thêm công việc ngay
          </button>
        </div>

      ) : (

        // GIAO DIỆN DANH SÁCH (Có Task)
        <div className="space-y-4">
          
          
          
          {/* Nơi hiển thị TaskList từ App.tsx truyền vào */}
          {children}
          
        </div>
      )}
    </main>
  );
};

export default Main;