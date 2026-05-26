// src/App.tsx
import { useTaskStore } from './store/useTaskStore';
import { FaPlus } from 'react-icons/fa';
import TaskList from './components/TaskList/TaskList';
import AddTaskModal from './components/AddTaskModal/AddtaskModal';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const isAddTaskModelOpen = useTaskStore((state) => state.isAddTaskModelOpen);
  const onClose = useTaskStore((state) => state.closeModal);
  const openModal = useTaskStore((state) => state.openModal)
  return (
    <div className="w-full mx-auto relative">
      <div className='fixed flex items-center justify-center z-999 px-5 py-2 w-full bg-white bottom-2 left-1/2 -translate-x-1/2  '>
          <button 
          className="p-4 rounded-full bg-blue-500 text-white"
          onClick= {openModal}
        >
          <FaPlus />
        </button>
      </div>
      
      <Header/>
      
      <Main> <TaskList /> </Main>
      <Footer/>
      <AddTaskModal isOpen={isAddTaskModelOpen} onClose={onClose} />
    </div>
  );
}

export default App;
