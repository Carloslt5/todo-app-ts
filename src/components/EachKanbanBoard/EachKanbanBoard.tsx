import { ProjectData } from '@/interfaces/Project.type'

const EachKanbanBoard: React.FC<ProjectData> = ({ title }) => {
  return (
    <article className='relative flex flex-col items-center justify-center h-32 card-primary'>
      <h2>{title}</h2>
    </article>
  )
}

export default EachKanbanBoard
