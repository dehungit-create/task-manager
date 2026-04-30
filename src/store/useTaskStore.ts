//src/store/useTaskStore.ts

import { create } from 'zustand';
import type { TaskState, Task } from '../types/task.type';


export const useTaskStore = create<TaskState>( (set) => ({

  tasks: [
    {
      id: '1',
      title: 'Thiết kế database',
      description: 'Thiết kế bảng và quan hệ bằng PostgreSQL',
      order: 0,
      createdAt: new Date(),
      dueDate: new Date('2026-05-05'),
      dueTime: '18:00',
      isImportant: true,
      isCompleted: true,
    },
    {
      id: '2',
      title: 'Setup Zustand',
      description: 'Tạo store và cấu trúc state cho task',
      order: 1,
      createdAt: new Date(),
      dueDate: new Date('2026-05-06'),
      dueTime: '20:00',
      isImportant: false,
      isCompleted: true,
    },
    {
      id: '3',
      title: 'Làm UI drag & drop',
      description: 'Sử dụng dnd-kit để kéo thả task',
      order: 2,
      createdAt: new Date(),
      dueDate: new Date('2026-05-04'),
      dueTime: '16:30',
      isImportant: true,
      isCompleted: false,
    }
  ],

  addTask: (taskData) => set((state) => {

    const maxOrder = Math.max(0, ...state.tasks.map(t => t.order));
    //1. Tạo object task hoàn chỉnh
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
    const updateTasks = state.tasks.map((task) => (task.id === id)? {...task,...updatedFields} : task)
    return { tasks: updateTasks}
  }),

  reorderTasks: (reorderedTasks) => set(() => {
    return { tasks: reorderedTasks };
  })


}));