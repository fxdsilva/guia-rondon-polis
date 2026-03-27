import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AdminProfessionalsTab } from '@/components/admin/AdminProfessionalsTab'
import { AdminCategoriesTab } from '@/components/admin/AdminCategoriesTab'
import { AdminAdsTab } from '@/components/admin/AdminAdsTab'
import { AdminReportsTab } from '@/components/admin/AdminReportsTab'

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'fxdsilva@gmail.com' && password === 'fxds908975@') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Credenciais inválidas.')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center flex-1 animate-fade-in">
        <form
          onSubmit={handleLogin}
          className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-sm border space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-2">Login Admin</h1>
            <p className="text-sm text-muted-foreground">Acesso restrito</p>
          </div>
          {error && (
            <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded font-medium">
              {error}
            </p>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gerencie profissionais, categorias, anúncios e relatórios.
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
          Sair
        </Button>
      </div>

      <Tabs defaultValue="profissionais" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-3xl grid-cols-4">
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="categorias">Categorias</TabsTrigger>
          <TabsTrigger value="anuncios">Anúncios</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="profissionais">
          <AdminProfessionalsTab />
        </TabsContent>

        <TabsContent value="categorias">
          <AdminCategoriesTab />
        </TabsContent>

        <TabsContent value="anuncios">
          <AdminAdsTab />
        </TabsContent>

        <TabsContent value="relatorios">
          <AdminReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage
