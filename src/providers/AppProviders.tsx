import { AuthProviderWrapper } from '@/contexts/auth.context'
import { KanbanProviderWrapper } from '@/contexts/kanban.context'
import { ProjectProviderWrapper } from '@/contexts/project.context'
import { ThemeProviderWrapper } from '@/contexts/theme.context'
import { TicketProviderWrapper } from '@/contexts/ticket.context'
import { ToDoProviderWrapper } from '@/contexts/todo.context'
import { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
};
export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <>
      <ThemeProviderWrapper>
        <AuthProviderWrapper>
          <KanbanProviderWrapper>
            <ProjectProviderWrapper>
              <TicketProviderWrapper>
                <ToDoProviderWrapper>{children}</ToDoProviderWrapper>
              </TicketProviderWrapper>
            </ProjectProviderWrapper>
          </KanbanProviderWrapper>
        </AuthProviderWrapper>
      </ThemeProviderWrapper>
    </>
  )
}
