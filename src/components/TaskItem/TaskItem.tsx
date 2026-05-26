import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../types/task.type';
import { useTaskStore } from '../../store/useTaskStore';
import { formatDateForInput } from '../../untils/date';

import clsx from 'clsx';

import { CiEdit } from 'react-icons/ci';
import { FaFlag } from 'react-icons/fa';
import { CiCalendar } from 'react-icons/ci';
import { CiTimer } from 'react-icons/ci';
import { TiTick } from 'react-icons/ti';

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(task);

  const { updateTask, removeTask } = useTaskStore();
  const isImportant = task.isImportant;
  const isCompleted = task.isCompleted;

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
    disabled: isEditing,
  });

  const style = {
    // Dùng Translate thay vì Transform để chống lag khi kéo thả
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const handleToggleImportant = () => {
    updateTask(task.id, { isImportant: !isImportant });
  };

  const handleToggleCompleted = () => {
    updateTask(task.id, { isCompleted: !isCompleted });
  };

  const handleRemoveTask = () => {
    removeTask(task.id);
  };

  const handleEditedTask = () => {
    updateTask(editingTask.id, {
      title: editingTask.title,
      description: editingTask.description,
      dueDate: editingTask.dueDate,
      dueTime: editingTask.dueTime,
    });
    setIsEditing(!isEditing);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        // HIỆU ỨNG LIQUID GLASS Ở ĐÂY
        'w-full p-3 rounded-xl bg-white shadow-md',
        isEditing ? 'bg-white/60' : 'bg-white/40', // Mở edit thì đục hơn chút cho dễ nhìn
        !isEditing &&
          'cursor-grab active:cursor-grabbing hover:bg-white/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]',
        isCompleted && 'opacity-60 bg-white/20',
      )}
      onClick={() => !isEditing && setIsEditing(true)}
    >
      <div className="flex items-start gap-2">
        {/* Checkbox */}
        <div
          className={clsx(
            'group w-5 h-5 mt-0.5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors',
            isCompleted
              ? 'border-green-500 bg-green-500'
              : 'border-gray-500/50 hover:border-blue-500/80',
            isEditing && "hidden"
          )}
          onClick={(e) => {
            e.stopPropagation();
            handleToggleCompleted();
          }}
        >
          <TiTick
            className={clsx(
              isCompleted
                ? 'text-white'
                : 'text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity',
            )}
          />
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1">
          {/* Title + Description */}
          {isEditing ? (
            <div className="flex flex-col gap-2">
              <textarea
                className="w-full font-medium text-sm md:text-md leading-5 bg-white/50 border border-white/50 p-1.5 rounded-md outline-none focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm"
                style={{ resize: 'none' }}
                value={editingTask.title}
                onChange={(e) => setEditingTask((prev) => ({ ...prev, title: e.target.value }))}
                autoFocus
                placeholder="Tên công việc..."
              />
              <textarea
                className="w-full text-sm bg-white/50 border border-white/50 p-1.5 rounded-md outline-none focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm min-h-15"
                style={{ resize: 'none' }}
                value={editingTask.description || ''}
                placeholder="Mô tả chi tiết công việc..."
                onChange={(e) =>
                  setEditingTask((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
          ) : (
            <h6 className="font-medium text-sm md:text-md leading-5 text-gray-800">
              {isCompleted ? <s className="text-gray-500">{task.title}</s> : task.title}
            </h6>
          )}

         <div className='flex'>
           {/* Meta Tags */}
          <div className="flex flex-1 flex-wrap items-center gap-2 mt-2 text-xs">
            {isImportant && (
              <span className="px-2 py-0.5 leading-4 rounded-md bg-red-500/10 border border-red-500/20 text-red-600 font-semibold backdrop-blur-sm shadow-sm">
                Quan trọng
              </span>
            )}

            {isEditing ? (
              <div className='flex gap-1 items-center'>
                <input
                  type="date"
                  className="bg-white/50 border border-white/50 px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-blue-400/50"
                  value={editingTask.dueDate || ''}
                  onChange={(e) => setEditingTask((prev) => ({ ...prev, dueDate: e.target.value }))}
                />
                <input
                  type="time"
                  className="bg-white/50 border border-white/50 px-2 py-1 rounded-md outline-none focus:ring-2 focus:ring-blue-400/50"
                  value={editingTask.dueTime || ''}
                  onChange={(e) => setEditingTask((prev) => ({ ...prev, dueTime: e.target.value }))}
                />
                <button
                  className="px-2 py-1 hover:bg-white/50 transition-colors bg-white/50 border border-white/50 rounded-md outline-none focus:ring-2 focus:ring-blue-400/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleImportant();
                  }}
                >
                  <FaFlag className={clsx("text-sm",isImportant ? 'text-red-500' : 'text-gray-400')} />
                </button>
              </div>
            ) : (
              <>
                {task.dueDate && (
                  <span className="flex leading-4 items-center gap-1 bg-white/40 border border-white/60 px-2 py-0.5 rounded-md text-gray-700 shadow-sm">
                    <CiCalendar />
                    {formatDateForInput(task.dueDate)}
                  </span>
                )}
                {task.dueTime && (
                  <span className="flex leading-4 items-center gap-1 bg-white/40 border border-white/60 px-2 py-0.5 rounded-md text-gray-700 shadow-sm">
                    <CiTimer />
                    {task.dueTime}
                  </span>
                )}
              </>
            )}
          </div>
          <div>
            {/* Actions (View mode) */}
            {!isEditing && (
              <div className="flex items-center">
                <button
                  className="p-1.5 rounded-md hover:bg-white/50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleImportant();
                  }}
                >
                  <FaFlag className={isImportant ? 'text-red-500' : 'text-gray-400'} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="p-1.5 rounded-md hover:bg-white/50 transition-colors"
                >
                  <CiEdit className="text-lg text-blue-600" />
                </button>
              </div>
            )}
          </div>
         </div>
        </div>
      </div>

      {/* Footer actions (Edit Mode) */}
      {isEditing && (
        <div
          className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleRemoveTask}
            className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
          >
            Xoá task
          </button>

          <div className="flex gap-2">
            <button
              className="px-4 py-1.5 text-sm font-medium rounded-md bg-white/50 border border-white/60 hover:bg-white/70 text-gray-700 transition-colors shadow-sm"
              onClick={() => {
                setEditingTask(task);
                setIsEditing(false);
              }}
            >
              Huỷ
            </button>

            <button
              className="px-4 py-1.5 text-sm font-medium rounded-md bg-blue-600/90 hover:bg-blue-600 border border-blue-500/50 text-white transition-colors shadow-sm backdrop-blur-sm"
              onClick={handleEditedTask}
            >
              Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
