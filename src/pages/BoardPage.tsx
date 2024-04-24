import EachBoard from '@/components/EachBoard/EachBoard'
import BoardForm from '@/components/Forms/BoardForm'
import Loading from '@/components/Loading/Loading'
import ModalForm from '@/components/ModalForm/ModalForm'
import { AuthContext } from '@/contexts/auth.context'
import { useKanbanBoard } from '@/hooks/useKanbanBoard-Hooks'
import { useModalHook } from '@/hooks/useModal-Hook'
import { AuthContextType } from '@/interfaces/AuthContext.types'
import { useContext } from 'react'
import { MdPostAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const BoardPage = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const { kanbanBoardData, loadBoard } = useKanbanBoard()

  const {
    showModal,
    toggleModal
  } = useModalHook()

  return (
    <div className='container mx-auto max-w-7xl'>

      <header>
        <h1 className='mb-3 title-primary'>
          My Boards
        </h1>
      </header>

      <button
        className='flex items-center gap-2 mb-6 btn-add'
        onClick={toggleModal}
      >
        <MdPostAdd />
        <span>Add Board</span>
      </button>

      <section className='grid w-full gap-2 mb-4 overflow-y-auto lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[70vh]'>
        {
          !kanbanBoardData
            ? <Loading />
            : kanbanBoardData.map((kanbanBoard, idx) => (
              <Link to={`/${user?._id}/${kanbanBoard._id}`} key={idx}>
                <EachBoard {...kanbanBoard} />
              </Link>
            ))
        }
      </section >

      {
        showModal &&
        <ModalForm >
          <BoardForm
            modalTitle='Insert New Board'
            loadBoard={loadBoard}
            onCancel={toggleModal}
          />
        </ModalForm>
      }

    </div>
  )
}

export default BoardPage