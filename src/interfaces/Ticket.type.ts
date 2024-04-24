import { ProjectData } from './Project.type'
import { IState } from './State.type'
import { TodoData } from './Todo.type'

export interface ITicketData {
  _id: string
  title: string
  description: string
  completed: boolean
  project: ProjectData
  todos: TodoData[]
  priority: string
  state: IState
  owner: string
}