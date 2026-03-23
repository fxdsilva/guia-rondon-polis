import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { MainStoreProvider } from '@/stores/main'
import Layout from './components/Layout'
import Index from './pages/Index'
import CategoryPage from './pages/CategoryPage'
import ProfessionalPage from './pages/ProfessionalPage'
import RegisterPage from './pages/RegisterPage'
import EditProfilePage from './pages/EditProfilePage'
import AdminPage from './pages/AdminPage'
import NotFound from './pages/NotFound'

const App = () => (
  <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
    <MainStoreProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/categoria/:slug" element={<CategoryPage />} />
            <Route path="/profissional/:id" element={<ProfessionalPage />} />
            <Route path="/cadastrar" element={<RegisterPage />} />
            <Route path="/editar-perfil" element={<EditProfilePage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </MainStoreProvider>
  </BrowserRouter>
)

export default App
