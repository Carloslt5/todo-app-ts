import { ProjectContext, ProjectContextType } from '@/contexts/project.context'
import { TicketContext, TicketContextType } from '@/contexts/ticket.context'
import { IState } from '@/interfaces/State.type'
import stateservices from '@/services/state.services'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useModalHook } from './useModal-Hook'

export const useHandleState = (stateData: IState) => {
  const { _id, stateName } = stateData
  const { projectId } = useParams()

  const { loadProject } = useContext(ProjectContext) as ProjectContextType
  const { ticketData, deleteState } = useContext(TicketContext) as TicketContextType

  const { toggleModal } = useModalHook()

  const stateForm = useForm<IState>({
    defaultValues: {
      _id: _id,
      stateName: stateName,
    },
  })
  const { register, handleSubmit } = stateForm

  const submitHandler = async (stateFormData: IState): Promise<void> => {
    try {
      if (projectId) {
        await stateservices.editState(stateFormData)
        toggleModal()
        loadProject(projectId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlerDeleteStateAndTicket = async () => {
    if (ticketData) {
      try {
        await deleteState(stateData._id)
        toggleModal()
        await loadProject(projectId!)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return {
    register,
    handleSubmit,
    submitHandler,
    handlerDeleteStateAndTicket,
  }
}
