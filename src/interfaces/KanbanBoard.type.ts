import { ProjectData } from './Project.type'

export interface IKanbanBoardData {
  _id: string
  title: string
  project: ProjectData[]
  completed: boolean
  owner: string
}
