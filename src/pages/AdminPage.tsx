import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useMainStore from '@/stores/main'

const AdminPage = () => {
  const { professionals, togglePremium, toggleVerified } = useMainStore()
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
      <div className="container mx-auto px-4 py-20 flex justify-center items-center flex-1">
        <form
          onSubmit={handleLogin}
          className="max-w-sm w-full bg-white p-8 rounded-2xl shadow-sm border space-y-6"
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-2">Login Admin</h1>
            <p className="text-sm text-muted-foreground">Acesso restrito</p>
          </div>

          {error && (
            <p className="text-destructive text-sm text-center bg-destructive/10 p-2 rounded">
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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerencie os profissionais cadastrados no guia.</p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
          Sair
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Profissional</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Premium</TableHead>
              <TableHead className="text-center">Verificado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {professionals.map((pro) => (
              <TableRow key={pro.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={pro.image}
                      alt={pro.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold">{pro.name}</p>
                      <p className="text-xs text-muted-foreground">{pro.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{pro.category}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Ativo
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Switch checked={pro.premium} onCheckedChange={() => togglePremium(pro.id)} />
                </TableCell>
                <TableCell className="text-center">
                  <Switch checked={pro.verified} onCheckedChange={() => toggleVerified(pro.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminPage
