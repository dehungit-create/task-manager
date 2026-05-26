// src/components/AddTaskModal/AddTaskModal.tsx
import { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { FaTimes } from 'react-icons/fa';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
  const addTask = useTaskStore((state) => state.addTask);

  // Khởi tạo các state cho Form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  // Nếu isOpen là false thì không render gì cả (ẩn modal)
  if (!isOpen) return null;

  // Hàm xử lý khi bấm nút Thêm
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Chặn hành vi load lại trang mặc định của thẻ <form>
    
    // Validate: Bắt buộc phải có title
    if (!title.trim()) {
      alert('Vui lòng nhập tiêu đề công việc!');
      return;
    }

    // Gọi hàm từ Zustand để thêm task
    addTask({
      title,
      description,
      dueDate: dueDate || undefined,
      dueTime: dueTime || undefined,
      isImportant,
      isCompleted: false, // Task mới mặc định chưa hoàn thành
    });

    // Clear data trong form và Đóng Modal
    handleClose();
  };

  // Hàm dọn dẹp data trước khi đóng
  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    setIsImportant(false);
    onClose();
  };

  return (
    // Lớp Overlay màu đen mờ phủ kín màn hình
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      
      {/* Khối Modal chính */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header của Modal */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">Thêm công việc mới</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-red-500 transition">
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Nội dung Form */}
        <form onSubmit={handleSubmit} className="p-5 flex flex-col gap-4">
          
          {/* Nhập Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề *</label>
            <input 
              type="text" 
              placeholder="Ví dụ: Thiết kế Database..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus // Tự động trỏ chuột vào đây khi mở Modal
            />
          </div>

          {/* Nhập Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết</label>
            <textarea 
              rows={3}
              placeholder="Ghi chú thêm về công việc này..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Nhập Ngày & Giờ */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Giờ</label>
              <input 
                type="time" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={dueTime}
                onChange={(e) => setDueTime(e.target.value)}
              />
            </div>
          </div>

          {/* Đánh dấu Quan trọng */}
          <div className="flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              id="important-check"
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
            <label htmlFor="important-check" className="text-sm font-medium text-gray-700 cursor-pointer">
              Đánh dấu là công việc quan trọng
            </label>
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <button 
              type="button" 
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Hủy
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Thêm công việc
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;