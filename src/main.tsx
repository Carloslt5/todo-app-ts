import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import { AuthProviderWrapper } from './contexts/auth.context.tsx'
import { KanbanProviderWrapper } from './contexts/kanban.context.tsx'
import { ProjectProviderWrapper } from './contexts/project.context.tsx'
import { ThemeProviderWrapper } from './contexts/theme.context.tsx'
import { TicketProviderWrapper } from './contexts/ticket.context.tsx'
import { ToDoProviderWrapper } from './contexts/todo.context.tsx'
import './index.css'
import './utils/darkMode.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProviderWrapper>
        <AuthProviderWrapper>
          <KanbanProviderWrapper>
            <ProjectProviderWrapper>
              <TicketProviderWrapper>
                <ToDoProviderWrapper>
                  <App />
                </ToDoProviderWrapper>
              </TicketProviderWrapper>
            </ProjectProviderWrapper>
          </KanbanProviderWrapper>
        </AuthProviderWrapper>
      </ThemeProviderWrapper>
    </Router>
  </React.StrictMode>
)
