import { ReactNode, createContext, useCallback, useState } from 'react'
import { ProjectData } from '../types/Project.type'
import projectservices from '../services/project.services'

export interface ProjectContextType {
  projectData: ProjectData | null
  // setProjectData: React.Dispatch<React.SetStateAction<ProjectData | null>>
  loadProject: (projectId: string) => Promise<void>
}

export const ProjectContext = createContext<ProjectContextType | null>(null)

export function ProjectProviderWrapper({ children }: { children: ReactNode }) {

  const [projectData, setProjectData] = useState<ProjectData | null>(null)

  const loadProject = useCallback(async (projectId: string) => {
    try {
      if (projectId) {
        const { data } = await projectservices.getOneProject(projectId)
        setProjectData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <ProjectContext.Provider value={{ projectData, loadProject }}>
      {children}
    </ProjectContext.Provider >
  )

}