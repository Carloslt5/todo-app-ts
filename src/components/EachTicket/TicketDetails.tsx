import { ITicketData } from '@/types/Ticket.type'
import { TicketContext, TicketContextType } from '@/contexts/ticket.context'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddNewTodo from '@/components/AddNewTodo/AddNewTodo'
import ChangeDetails from '@/components/ChangeDetails/ChangeDetails'
import ChangePriority from '@/components/ChangePriority/ChangePriority'
import ChangeTitle from '@/components/ChangeTitle/ChangeTitle'
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal'
import Loading from '@/components/Loading/Loading'
import ModalForm from '@/components/ModalForm/ModalForm'
import TicketTodoList from '@/components/TicketTodoList/TicketTodoList'
import { ToDoContext } from '@/contexts/todo.context'
import { ToDoContextType } from '@/contexts/Types/ToDoContext.types'
import { AuthContext } from '@/contexts/auth.context'
import { AuthContextType } from '@/contexts/Types/AuthContext.types'
import { AxiosError } from 'axios'

interface TicketDetailsProps {
  ticketDetails: ITicketData
  toggleModal: () => void
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ toggleModal, ticketDetails }) => {
  const { projectId } = useParams()
  const { user } = useContext(AuthContext) as AuthContextType
  const { loadTicket, deleteTicket, updateTickettTitle, updateTicketPriority, updateTicketDetails } = useContext(TicketContext) as TicketContextType
  const { todoDataBackup, deleteToDo } = useContext(ToDoContext) as ToDoContextType

  const { _id: ticketID, project, state } = ticketDetails

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal)

  const handleDeleteTicket = async () => {
    try {
      if (user) {
        const deleteToDoPromises = todoDataBackup.map(todo => deleteToDo(user._id, todo._id, ticketID))
        await Promise.all(deleteToDoPromises)
        await deleteTicket(ticketID, project._id, state._id)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data)
      }
    }
  }

  if (!projectId) {
    return <Loading />
  }

  return (
    <>
      <div className='max-h-full modal-form'>
        <section>
          <header className='flex justify-between gap-2 pb-3 mb-2 border-b'>

            <ChangeTitle
              data={ticketDetails}
              entityId={projectId}
              updateEntityTitle={updateTickettTitle}
              updateEntity={loadTicket}
            />

          </header>
          <section className='flex flex-col items-stretch gap-2 mb-2'>

            <ChangePriority
              data={ticketDetails}
              entityId={projectId}
              updateEntityPriority={updateTicketPriority}
              updateEntity={loadTicket}
            />

            <ChangeDetails
              data={ticketDetails}
              entityId={projectId}
              updateEntityDetails={updateTicketDetails}
              updateEntity={loadTicket}
            />

          </section>
        </section>

        <header className='pb-3 text-xl border-b'>
          <h2 >Bullet Points</h2>
        </header>

        <AddNewTodo
          {...ticketDetails}
        />
        <TicketTodoList
          {...ticketDetails}
        />

        <section className='flex items-center justify-end w-full gap-3'>

          <button
            className='btn-cancel'
            onClick={toggleModal}
          >
            <span>Close</span>
          </button>
          <button
            onClick={toggleDeleteModal}
            className='p-2 font-bold bg-red-500 rounded hover:bg-red-700'>
            <span>Delete Ticket</span>
          </button>

        </section>
      </div>

      {
        showDeleteModal &&
        <ModalForm>
          <ConfirmationModal
            modalTitle='Confirm Delete'
            message='Do you want to delete TICKET and ALL TASKS'
            onConfirm={handleDeleteTicket}
            onCancel={toggleDeleteModal}
          />
        </ModalForm>
      }

    </>
  )
}

export default TicketDetails