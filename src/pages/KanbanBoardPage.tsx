import ChangeTitle from '@/components/ChangeTitle/ChangeTitle'
import EachKanbanBoard from '@/components/EachKanbanBoard/EachKanbanBoard'
import ProjectForm from '@/components/Forms/ProjectForm'
import Loading from '@/components/Loading/Loading'
import ModalForm from '@/components/ModalForm/ModalForm'
import { AuthContext } from '@/contexts/auth.context'
import { useModalHook } from '@/hooks/useModal-Hook'
import { useUpdateKanbanHooks } from '@/hooks/useUpdateKanbanBoard-Hooks'
import { AuthContextType } from '@/interfaces/AuthContext.types'
import { useContext } from 'react'
import { MdPostAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'

const KanbanBoardPage = () => {
  const { user } = useContext(AuthContext) as AuthContextType

  const {
    kanbanBoardId,
    kanbanBoardData,
    loadKanbanBoard,
    updateKanbantTitle
  } = useUpdateKanbanHooks()

  const {
    showModal,
    toggleModal
  } = useModalHook()

  if (!kanbanBoardId || !kanbanBoardData) {
    return <Loading />
  }

  return (
    <div className='container mx-auto max-w-7xl'>

      <header className='flex justify-between gap-2 pb-3'>
        <ChangeTitle
          data={kanbanBoardData}
          entityId={kanbanBoardId}
          updateEntityTitle={updateKanbantTitle}
          updateEntity={loadKanbanBoard}
          variant='title-page'
        />
      </header>

      <button
        className='flex items-center gap-2 mb-6 btn-add'
        onClick={toggleModal}>
        <MdPostAdd />
        <span>Add Project</span>
      </button>

      <section className='grid w-full gap-2 mb-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 max-h-[500px] overflow-y-auto'>
        {
          kanbanBoardData.project.map((project, idx) => (
            <Link to={`/${user?._id}/${kanbanBoardId}/${project._id}`} key={idx}>
              <EachKanbanBoard {...project} />
            </Link>
          ))
        }
      </section>

      {
        showModal &&
        <ModalForm>
          <ProjectForm
            modalTitle='Insert New Project'
            kanbanID={kanbanBoardId}
            onCancel={toggleModal} />
        </ModalForm>
      }

    </div >
  )
}

export default KanbanBoardPage

