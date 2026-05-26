import { DndContext, closestCenter, type DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import clsx from 'clsx';


import { useTaskStore } from '../../store/useTaskStore';
import TaskItem from '../TaskItem/TaskItem';

const tabs = ["Đang làm", "Đã xong"]

export const TaskList = () => {
 
  const tasks = useTaskStore((state) => state.tasks)
  const [tab, setTab] = useState("Đang làm")
 

 const displayedTasks = tasks.filter(task => {
    if (tab === "Đang làm") return !task.isCompleted;
    if (tab === "Đã xong") return task.isCompleted;
    return true; // Nếu có tab "Tất cả" thì chạy vào đây
  });


  const {reorderTasks} = useTaskStore()
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, 
      },
    })
  );
  // Hàm này sẽ chạy khi cậu buông chuột thả cái task ra
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // active.id: ID của task cậu đang cầm
    // over.id: ID của vị trí cậu vừa thả xuống
    
    if (active.id !== over?.id) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over?.id);

      // 3. Hoán đổi vị trí sinh ra mảng mới
      const reorderedTasks = arrayMove(tasks, oldIndex, newIndex);

      // 4. Lặp qua mảng mới, cập nhật lại thuộc tính order cho khớp với vị trí
      const finalTasks = reorderedTasks.map((task, index) => ({
        ...task,
        order: index, 
      }));

      // 5. Cập nhật lên Store
      reorderTasks(finalTasks);
    }
  };

  return (
    // DndContext theo dõi toàn bộ sự kiện kéo thả
    <div>
      <div className='flex gap-5 mb-4 '>
        {/* Bộ Nút Lọc (Filter) */}
          {tabs.map((t) => (
            <button 
              key={t}
              className={clsx(
                // Các class cơ bản và trick giữ chỗ (chiếm không gian của font-bold)
                "inline-flex flex-col items-center justify-center after:content-[attr(data-text)] after:font-bold after:h-0 after:invisible after:overflow-hidden",
                // Trạng thái Active / Inactive
                tab === t ? "font-medium text-blue-500" : "text-gray-400"
              )}
              onClick={() => setTab(t)}

            >{t}</button>
          ))}
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        
        {/* SortableContext quản lý danh sách dựa trên mảng các ID */}
        <SortableContext 
          items={tasks.map(t => t.id)} 
          strategy={verticalListSortingStrategy} // Thuật toán kéo danh sách dọc
        >
          <div className="flex flex-col w-full mx-auto gap-4 rounded-2xl">
            {displayedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      
      </DndContext>
    </div>
    
  );
};

export default TaskList;