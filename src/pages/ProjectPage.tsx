import { MdPostAdd } from 'react-icons/md'
import Loading from '@/components/Loading/Loading'
import ModalForm from '@/components/ModalForm/ModalForm'
import ColumnState from '@/components/ColumnState/ColumnState'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import NewStateForm from '@/components/Forms/NewStateForm'
import ChangeTitle from '@/components/ChangeTitle/ChangeTitle'
import SettingModal from '@/components/SettingModal/SettingModal'
import { useProject } from '@/hooks/useProject.Hook'
import { useModalHook } from '@/hooks/useModal-Hook'

const ProjectPage = () => {

  const {
    projectId,
    projectData,
    loadProject,
    updateProjectTitle,
    handleDelete
  } = useProject()

  const {
    showModal,
    toggleModal
  } = useModalHook()

  if (!projectData || !projectId || !projectData.state) {
    return <Loading />
  }

  return (
    <div className='container h-full mx-auto max-w-7xl'>

      <header className='flex items-stretch justify-between gap-2 pb-3'>
        <ChangeTitle
          data={projectData}
          entityId={projectId}
          updateEntityTitle={updateProjectTitle}
          updateEntity={loadProject}
          variant='title-page'
        />
        <SettingModal
          textData='Delete Project'
          deleteEntity={handleDelete}
        />
      </header>

      <button
        className='flex items-center gap-2 mb-6 btn-add'
        onClick={toggleModal}>
        <MdPostAdd />
        <span>Add State</span>
      </button>

      <DndProvider backend={HTML5Backend}>
        <section className='h-[75%] mt-2'>
          <ul className='flex flex-row items-stretch max-h-full gap-4 pb-2 mb-3 overflow-y-auto text-white'>
            {
              projectData.state.map((state, idx) => (
                <ColumnState {...state} key={idx} />
              ))
            }
          </ul>
          <p className='mt-2 text-sm text-center text-slate-500 dark:text-zinc-500'>
            Drag and Drop ticket to change status
          </p>
        </section >
      </DndProvider>

      {
        showModal &&
        <ModalForm >
          <NewStateForm
            modalTitle='Insert New State'
            onCancel={toggleModal}
          />
        </ModalForm>
      }

    </div >

  )

}

export default ProjectPage