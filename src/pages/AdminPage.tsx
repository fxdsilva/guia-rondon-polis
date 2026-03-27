import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AdminProfessionalsTab } from '@/components/admin/AdminProfessionalsTab'
import { AdminCategoriesTab } from '@/components/admin/AdminCategoriesTab'
import { AdminAdsTab } from '@/components/admin/AdminAdsTab'
import { AdminReportsTab } from '@/components/admin/AdminReportsTab'
import { AdminUsersTab } from '@/components/admin/AdminUsersTab'
import { AdminQuotesTab } from '@/components/admin/AdminQuotesTab'

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
            <h1 className="text-2xl font-bold text-secondary mb-2">Acesso Admin</h1>
            <p className="text-sm text-muted-foreground">Sistema de Gestão SaaS</p>
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
          <Button type="submit" className="w-full h-12 text-base">
            Acessar Painel
          </Button>
        </form>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in max-w-6xl">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gestão completa de assinantes, clientes e métricas financeiras.
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)} className="bg-white">
          Sair do Sistema
        </Button>
      </div>

      <Tabs defaultValue="profissionais" className="w-full">
        <TabsList className="mb-8 flex flex-wrap gap-2 h-auto bg-transparent justify-start">
          <TabsTrigger
            value="profissionais"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white px-6 h-10 shadow-sm"
          >
            Prestadores / Assinantes
          </TabsTrigger>
          <TabsTrigger
            value="clientes"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white px-6 h-10 shadow-sm"
          >
            Clientes / Usuários
          </TabsTrigger>
          <TabsTrigger
            value="orcamentos"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white px-6 h-10 shadow-sm"
          >
            Orçamentos / Serviços
          </TabsTrigger>
          <TabsTrigger
            value="relatorios"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white px-6 h-10 shadow-sm"
          >
            Métricas e Financeiro
          </TabsTrigger>
          <TabsTrigger
            value="categorias"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white px-6 h-10 shadow-sm"
          >
            Categorias
          </TabsTrigger>
          <TabsTrigger
            value="anuncios"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border bg-white px-6 h-10 shadow-sm"
          >
            Empresas Parceiras
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profissionais">
          <AdminProfessionalsTab />
        </TabsContent>
        <TabsContent value="clientes">
          <AdminUsersTab />
        </TabsContent>
        <TabsContent value="orcamentos">
          <AdminQuotesTab />
        </TabsContent>
        <TabsContent value="relatorios">
          <AdminReportsTab />
        </TabsContent>
        <TabsContent value="categorias">
          <AdminCategoriesTab />
        </TabsContent>
        <TabsContent value="anuncios">
          <AdminAdsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage
