import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import CalculatorsPage from '../pages/calculators'
import DashboardPage from '../pages/DashboardPage'
import NotFoundPage from '../pages/NotFoundPage'
import SettingsPage from '../pages/SettingsPage'
import ProjectsPage from '../pages/projects'
import MoreProjectsPage from '../pages/more-projects'
import UsersPage from '../pages/UsersPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/calculators" element={<CalculatorsPage />} />
        <Route path="/calculators/:calculatorId" element={<CalculatorsPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:projectId" element={<ProjectsPage />} />
        <Route path="/more-projects" element={<MoreProjectsPage />} />
        <Route path="/more-projects/:projectId" element={<MoreProjectsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  )
}
