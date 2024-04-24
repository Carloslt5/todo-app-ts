import { IState } from './State.type'

export interface ProjectData {
  _id: string
  description: string
  owner: string
  state: IState[]
  title: string
}
