import { getPriorityColor } from '@/const/Ticket-Priority'
import { useModalHook } from '@/hooks/useModal-Hook'
import { ITicketData } from '@/interfaces/Ticket.type'
import { useDrag } from 'react-dnd'
import ModalForm from '../ModalForm/ModalForm'
import TicketDetails from './TicketDetails'

const EachTicket: React.FC<ITicketData> = ({
  _id,
  title,
  state,
  description,
  completed,
  priority,
  project,
  owner,
  todos,
}) => {
  const { showModal, toggleModal } = useModalHook()

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'Ticket',
    item: {
      _id: _id,
      title: title,
      description: description,
      state: state,
      completed: completed,
      priority: priority,
      project: project,
      todos: todos,
      owner: owner,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const priorityColor = getPriorityColor(priority)

  const ticketDetails = {
    _id,
    title,
    state,
    description,
    completed,
    priority,
    project,
    todos,
    owner,
  }

  return (
    <>
      <li
        ref={drag}
        className={`flex justify-start items-stretch gap-2 bg-gray-500 overflow-hidden rounded cursor-pointer hover:bg-gray-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 ${isDragging && 'opacity-30'} `}
        onClick={toggleModal}
      >
        <div className={`${priorityColor} w-2`} />
        <article className='flex items-center justify-between w-full py-1'>
          <p>{title}</p>
        </article>
      </li>

      {showModal && (
        <ModalForm>
          <TicketDetails ticketDetails={ticketDetails} toggleModal={toggleModal} />
        </ModalForm>
      )}
    </>
  )
}

export default EachTicket
