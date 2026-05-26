//src/types/task.type.ts

//Cấu trúc của một task
export interface Task {
  id: string;
  title: string;
  description?: string;
  order: number; // Thuộc tính để sắp xếp task và làm Drag and Drop dễ dàng hơn
  createdAt: Date;
  dueDate?: string;
  dueTime?: string; // Định dạng "HH:mm"
  isImportant: boolean;
  isCompleted: boolean;
}
//=============================
//Cấu hình State của toàn bộ Store
//Khi dùng interface TaskState để định nghĩa kiểu cho Zustand store, chúng ta sẽ có các thuộc tính sau:
//- tasks: Một mảng chứa tất cả các task hiện có trong ứng dụng.
//- addTask: Một hàm để thêm một task mới vào store. Hàm này nhận vào một đối tượng task (không bao gồm id và createdAt vì chúng sẽ được tạo tự động) và không trả về giá trị nào (void).
//- removeTask: Một hàm để xóa một task khỏi store dựa trên id của nó. Hàm này nhận vào một chuỗi id và không trả về giá trị nào (void).
//- updateTask: Một hàm để cập nhật thông tin của một task dựa trên id của nó. Hàm này nhận vào một chuỗi id và một đối tượng chứa các trường cần cập nhật (ngoại trừ id và createdAt) và không trả về giá trị nào (void).
//- reorderTasks: Một hàm để sắp xếp lại thứ tự của các task khi người dùng kéo thả.

//Và khi dùng TaskState thì phải khai báo đầy đủ các thuộc tính và hàm này trong Zustand store để đảm bảo rằng store hoạt động đúng và có kiểu dữ liệu chính xác.
export interface TaskState {
  tasks: Task[];

  // Các action để quản lý task
  // Thêm task mới, id và createdAt sẽ được tạo tự động, chỉ cần truyền vào title và description (nếu có)
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'order'>) => void; 
  
  // Xóa task theo id
  removeTask: (id: string) => void; 

  // Cập nhật task theo id, chỉ cập nhật các trường được truyền vào (updatedFields), không được cập nhật id và createdAt
  updateTask: (id: string, updatedFields: Partial<Omit<Task, 'id' | 'createdAt'>>) => void; 

  // Sắp xếp lại thứ tự task khi kéo thả
  reorderTasks: (reorderTasks: Task[]) => void; 

  isAddTaskModelOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
//==============================