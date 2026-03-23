import { useMemo, useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'
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
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { MultiSelect } from '@/components/MultiSelect'
import { CATEGORY_OPTIONS, CATEGORY_GROUPS } from '@/stores/mockData'
import useMainStore from '@/stores/main'

const AD_TARGET_OPTIONS = [
  ...Object.keys(CATEGORY_GROUPS).map((g) => ({
    label: `Grupo: ${g}`,
    value: g,
    group: 'Grupos Inteiros',
  })),
  ...CATEGORY_OPTIONS,
]

const AdminPage = () => {
  const {
    professionals,
    ads,
    togglePremium,
    toggleVerified,
    toggleAdActive,
    addAd,
    updateAd,
    deleteAd,
  } = useMainStore()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [isAdSheetOpen, setIsAdSheetOpen] = useState(false)
  const [editingAdId, setEditingAdId] = useState<string | null>(null)
  const [adForm, setAdForm] = useState({
    companyName: '',
    description: '',
    imageUrl: '',
    link: '',
    targetCategories: [] as string[],
  })

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'fxdsilva@gmail.com' && password === 'fxds908975@') {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Credenciais inválidas.')
    }
  }

  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAdId) {
      updateAd(editingAdId, adForm)
    } else {
      addAd({ id: `ad-${Date.now()}`, ...adForm, active: true })
    }
    setIsAdSheetOpen(false)
    resetAdForm()
  }

  const resetAdForm = () => {
    setEditingAdId(null)
    setAdForm({ companyName: '', description: '', imageUrl: '', link: '', targetCategories: [] })
  }

  const handleEditAd = (ad: any) => {
    setEditingAdId(ad.id)
    setAdForm({ ...ad })
    setIsAdSheetOpen(true)
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
          <p className="text-muted-foreground">Gerencie profissionais e patrocinadores do guia.</p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
          Sair
        </Button>
      </div>

      <Tabs defaultValue="profissionais" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="anuncios">Patrocinadores / Anúncios</TabsTrigger>
        </TabsList>

        <TabsContent
          value="profissionais"
          className="bg-white rounded-xl shadow-sm border overflow-hidden"
        >
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Profissional</TableHead>
                <TableHead>Categorias</TableHead>
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
                        alt=""
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="font-semibold">{pro.name}</p>
                        <p className="text-xs text-muted-foreground">{pro.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={pro.categories.join(', ')}>
                    {pro.categories.join(', ')}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
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
        </TabsContent>

        <TabsContent value="anuncios" className="space-y-4">
          <div className="flex justify-end">
            <Sheet
              open={isAdSheetOpen}
              onOpenChange={(val) => {
                setIsAdSheetOpen(val)
                if (!val) resetAdForm()
              }}
            >
              <SheetTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" /> Adicionar Patrocinador
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto sm:max-w-md">
                <SheetHeader className="mb-6">
                  <SheetTitle>
                    {editingAdId ? 'Editar Patrocinador' : 'Novo Patrocinador'}
                  </SheetTitle>
                </SheetHeader>
                <form onSubmit={handleAdSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome da Empresa</label>
                    <Input
                      required
                      value={adForm.companyName}
                      onChange={(e) => setAdForm({ ...adForm, companyName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL da Imagem / Banner</label>
                    <Input
                      required
                      value={adForm.imageUrl}
                      onChange={(e) => setAdForm({ ...adForm, imageUrl: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Link de Destino</label>
                    <Input
                      required
                      value={adForm.link}
                      onChange={(e) => setAdForm({ ...adForm, link: e.target.value })}
                      placeholder="WhatsApp ou Site"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Categorias Alvo</label>
                    <MultiSelect
                      options={AD_TARGET_OPTIONS}
                      selected={adForm.targetCategories}
                      onChange={(v) => setAdForm({ ...adForm, targetCategories: v })}
                      placeholder="Onde exibir este anúncio?"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Texto do Anúncio</label>
                    <Textarea
                      required
                      value={adForm.description}
                      onChange={(e) => setAdForm({ ...adForm, description: e.target.value })}
                      className="h-24"
                    />
                  </div>
                  <Button type="submit" className="w-full mt-4">
                    Salvar
                  </Button>
                </form>
              </SheetContent>
            </Sheet>
          </div>

          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Empresa</TableHead>
                  <TableHead>Categorias Alvo</TableHead>
                  <TableHead className="text-center">Ativo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ads.map((ad) => (
                  <TableRow key={ad.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={ad.imageUrl}
                          alt=""
                          className="w-12 h-8 rounded object-cover border bg-muted"
                        />
                        <span className="font-semibold">{ad.companyName}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      className="max-w-[250px] truncate"
                      title={ad.targetCategories.join(', ')}
                    >
                      {ad.targetCategories.join(', ')}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch checked={ad.active} onCheckedChange={() => toggleAdActive(ad.id)} />
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditAd(ad)}>
                        <Edit2 className="w-4 h-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteAd(ad.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {ads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      Nenhum anúncio cadastrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AdminPage
