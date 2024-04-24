import EachState from '@/components/EachState/EachState'
import EachTicket from '@/components/EachTicket/EachTicket'
import NewTicketForm from '@/components/Forms/NewTicketForm'
import Loading from '@/components/Loading/Loading'
import ModalForm from '@/components/ModalForm/ModalForm'
import { IState } from '@/interfaces/State.type'
import { MdAdd } from 'react-icons/md'
import { useModalHook } from '../../hooks/useModal-Hook'
import { useDragAndDrop } from './useDragAndDrop-Hook'

const ColumnState: React.FC<IState> = (state) => {
  const { ticketData, isOver, drop } = useDragAndDrop(state)

  const { showModal, toggleModal } = useModalHook()

  return (
    <>
      <li>
        <article
          ref={drop}
          className='flex flex-col gap-2 p-2 border border-gray-500 min-w-[15rem] bg-slate-700 dark:bg-zinc-950 rounded max-h-[100%]'
        >
          <EachState stateData={state} />

          <article
            className={`py-2 overflow-y-scroll rounded ${isOver && 'bg-slate-950 dark:bg-zinc-700'}`}
          >
            <ul className='flex flex-col gap-2 overflow-y-hidden'>
              {!ticketData ? (
                <Loading />
              ) : (
                ticketData
                  .filter((ticket) => ticket.state._id === state._id)
                  .map((ticket) => <EachTicket key={ticket._id} {...ticket} />)
              )}
            </ul>
          </article>

          <button
            className='flex items-center w-full gap-2 p-1 rounded h-fit hover:bg-gray-900 dark:hover:bg-zinc-800 focus-outline-none '
            onClick={toggleModal}
          >
            <MdAdd />
            <p>Add Ticket...</p>
          </button>
        </article>
      </li>

      {showModal && (
        <ModalForm>
          <NewTicketForm data={state} onCancel={toggleModal} />
        </ModalForm>
      )}
    </>
  )
}

export default ColumnState
