import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs'
import AboutPage from '@/pages/AboutPage'
import BoardPage from '@/pages/BoardPage'
import HomePage from '@/pages/HomePage'
import KanbanBoardPage from '@/pages/KanbanBoardPage'
import LoginPage from '@/pages/LoginPage'
import NotFound from '@/pages/NonFound'
import ProjectPage from '@/pages/ProjectPage'
import SignupPage from '@/pages/SignupPage'
import PrivateRoutes from '@/routes/PrivateRoutes'
import { Route, Routes } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<AboutPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='*' element={<NotFound />} />

      <Route element={<>
        <Breadcrumbs />
        <PrivateRoutes />
      </>
      }>
        <Route path='/:id' element={<BoardPage />} />
        <Route path='/:id/:kanbanBoardId' element={<KanbanBoardPage />} />
        <Route path='/:id/:kanbanBoardId/:projectId' element={<ProjectPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes