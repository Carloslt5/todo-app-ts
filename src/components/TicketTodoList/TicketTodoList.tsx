import { ToDoContext } from '@/contexts/todo.context'
import { ToDoContextType } from '@/interfaces/ToDoContext.types'
import React, { useContext, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import EachTodo from '../EachTodo/EachTodo'
import Loading from '../Loading/Loading'

import { ITicketData } from '@/interfaces/Ticket.type'
import todoservices from '@/services/ToDo.services'

const TicketTodoList: React.FC<ITicketData> = ({ _id: ticketID }) => {
  const { id: userID } = useParams()
  const { todoDataBackup, setTodoDataBackup, loadToDos } = useContext(
    ToDoContext
  ) as ToDoContextType

  useEffect(() => {
    if (userID) {
      loadToDos(userID, ticketID)
    }
  }, [loadToDos, userID, ticketID])

  const dragTodo = useRef<number>(0)
  const dragOverTodo = useRef<number>(0)

  const handlerSort = () => {
    const todoDataBackupClone = [...todoDataBackup]
    const temp = todoDataBackupClone[dragTodo.current]
    todoDataBackupClone[dragTodo.current] = todoDataBackupClone[dragOverTodo.current]
    todoDataBackupClone[dragOverTodo.current] = temp
    setTodoDataBackup(todoDataBackupClone)

    const updatedTodoData = todoDataBackupClone.map((todo, index) => ({
      ...todo,
      order: index,
    }))

    todoservices.updateTodoOrder(userID!, updatedTodoData)
  }

  return (
    <article className='flex flex-col w-full p-2 overflow-y-scroll text-white border border-gray-400 rounded bg-slate-500 dark:bg-zinc-800'>
      <ul className='flex flex-col gap-1 overflow-scroll'>
        {!todoDataBackup ? (
          <Loading />
        ) : todoDataBackup.length === 0 ? (
          <p className='p-1 rounded-sm bg-slate-600 dark:bg-zinc-700 dark:text-white'>
            No pending tasks 👍
          </p>
        ) : (
          todoDataBackup.map((todo, index) => (
            <li
              key={todo._id}
              draggable
              onDragStart={() => (dragTodo.current = index)}
              onDragEnter={() => (dragOverTodo.current = index)}
              onDragEnd={handlerSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <EachTodo todo={todo} ticketID={ticketID} />
            </li>
          ))
        )}
      </ul>
    </article>
  )
}

export default TicketTodoList
