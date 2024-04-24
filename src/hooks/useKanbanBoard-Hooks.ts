import { IKanbanBoardData } from '@/interfaces/KanbanBoard.type'
import kanbanservices from '@/services/kanban.services'
import { AxiosError } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const useKanbanBoard = () => {
  const [kanbanBoardData, setKanbanBoardData] = useState<IKanbanBoardData[] | []>([])

  const loadBoard = useCallback(async () => {
    try {
      const { data } = await kanbanservices.getKanbanBoard()
      setKanbanBoardData(data)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 404) {
          toast.error(error.response.data.message)
        }
      }
    }
  }, [])

  useEffect(() => {
    loadBoard()
  }, [loadBoard])

  return {
    kanbanBoardData,
    loadBoard,
  }
}
