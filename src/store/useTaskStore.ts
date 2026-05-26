// src/store/useTaskStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // 1. Import thêm persist
import type { TaskState, Task } from '../types/task.type';

export const useTaskStore = create<TaskState>()(
  persist( // 2. Bọc toàn bộ hàm set trong persist
    (set) => ({
      tasks: [
        
      ],

      isAddTaskModelOpen: false,

      addTask: (taskData) => set((state) => {
        const maxOrder = Math.max(0, ...state.tasks.map(t => t.order));
        const newTask: Task = {
          ...taskData,
          id: crypto.randomUUID(), 
          createdAt: new Date(),
          order: maxOrder + 1,
          isCompleted: taskData.isCompleted ?? false
        }
        return { tasks: [...state.tasks, newTask] }
      }),

      removeTask: (id) => set((state) => ({
        tasks: state.tasks.filter( task => task.id !== id)
      })),

      updateTask: (id, updatedFields) => set((state) => {
        const updateTasks = state.tasks.map((task) => (task.id === id) ? {...task,...updatedFields} : task)
        return { tasks: updateTasks}
      }),

      reorderTasks: (reorderedTasks) => set(() => {
        return { tasks: reorderedTasks };
      }),
      
      openModal: () => set({ isAddTaskModelOpen: true }),
      closeModal: () => set({ isAddTaskModelOpen: false })
    }),
    {
      name: 'task-storage', // 3. Tên của key hiển thị trong LocalStorage
      storage: createJSONStorage(() => localStorage), // 4. Chọn lưu vào localStorage (mặc định sẵn)
    }
  )
);