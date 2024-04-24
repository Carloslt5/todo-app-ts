import { IKanbanBoardData } from '@/interfaces/KanbanBoard.type'
import kanbanservices from '@/services/kanban.services'
import { ReactNode, createContext, useCallback, useState } from 'react'

export interface KanbanContextType {
  kanbanBoardData: IKanbanBoardData | null
  loadKanbanBoard: (kanbanBoardId: string) => Promise<void>
}

export const KanbanContext = createContext<KanbanContextType | null>(null)

export function KanbanProviderWrapper({ children }: { children: ReactNode }) {
  const [kanbanBoardData, setKanbanBoardData] = useState<IKanbanBoardData | null>(null)

  const loadKanbanBoard = useCallback(async (kanbanBoardId: string) => {
    try {
      if (kanbanBoardId) {
        const { data } = await kanbanservices.getOneKanbanBoard(kanbanBoardId)
        setKanbanBoardData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  const value = { kanbanBoardData, loadKanbanBoard }

  return <KanbanContext.Provider value={value}>{children}</KanbanContext.Provider>
}
