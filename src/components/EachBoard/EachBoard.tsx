import { IKanbanBoardData } from '@/interfaces/KanbanBoard.type'

const EachBoard: React.FC<IKanbanBoardData> = ({ title }) => {
  return (
    <article className='flex items-center justify-center card-primary '>
      <h2>{title}</h2>
    </article>
  )
}

export default EachBoard
