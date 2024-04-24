import ChangeTitle from '@/components/ChangeTitle/ChangeTitle'
import { TodoData } from '@/interfaces/Todo.type'
import { MdCheck, MdDeleteForever } from 'react-icons/md'
import { useHandleTodo } from '../../hooks/useHandleTodo-Hook'

interface droppableTodo {
  todo: TodoData
  ticketID: string
}

const EachTodo: React.FC<droppableTodo> = ({ todo, ticketID }) => {
  const { handlerUpdateTodo, handlerDeleteToDo, handlerLoadToDos, handlerUpdateTitleToDo } =
    useHandleTodo(todo, ticketID)

  const { _id: todoID, completed } = todo

  return (
    <article className='flex items-center justify-between gap-2 p-2 rounded cursor-pointer bg-slate-600 dark:bg-zinc-700 dark:text-white'>
      <div className='flex items-center w-full gap-2'>
        <button
          className={`rounded-full h-4 w-4 aspect-square flex flex-nowrap border bg-slate-200 dark:bg-zinc-900
          ${completed && 'border flex justify-center items-center bg-gradient-to-b from-emerald-200 from-10% to-emerald-500 to-90%'}`}
          onClick={handlerUpdateTodo}
        >
          {completed && <MdCheck />}
        </button>
        <article className={`${completed && 'line-through'} w-full`}>
          <ChangeTitle
            data={todo}
            entityId={todoID}
            updateEntityTitle={handlerUpdateTitleToDo}
            updateEntity={handlerLoadToDos}
          />
        </article>
      </div>
      <div className='flex gap-2'>
        <button
          className='p-1 font-bold bg-red-500 rounded hover:bg-red-700'
          onClick={handlerDeleteToDo}
        >
          <MdDeleteForever />
        </button>
      </div>
    </article>
  )
}

export default EachTodo
