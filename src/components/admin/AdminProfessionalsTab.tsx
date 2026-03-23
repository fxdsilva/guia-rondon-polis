import { useState } from 'react'
import { Edit2 } from 'lucide-react'
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
import { Switch } from '@/components/ui/switch'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useMainStore from '@/stores/main'

export function AdminProfessionalsTab() {
  const { populatedProfessionals, updateProfessional, togglePremium } = useMainStore()
  const [filter, setFilter] = useState<'all' | 'premium'>('all')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingPro, setEditingPro] = useState<any>(null)
  const [form, setForm] = useState({
    premium_highlight: 'none',
    subscription_status: 'active',
    verified: false,
  })

  const filtered = populatedProfessionals.filter((p) => {
    if (filter === 'premium') return p.plan?.id === 'plan-premium'
    return true
  })

  const handleEdit = (pro: any) => {
    setEditingPro(pro)
    setForm({
      premium_highlight: pro.premium_highlight || 'none',
      subscription_status: pro.subscription_status || 'active',
      verified: pro.verified || false,
    })
    setIsSheetOpen(true)
  }

  const handleSave = () => {
    if (editingPro) {
      updateProfessional(editingPro.id, {
        premium_highlight:
          form.premium_highlight === 'none' ? null : (form.premium_highlight as any),
        subscription_status: form.subscription_status as any,
        verified: form.verified,
      })
    }
    setIsSheetOpen(false)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
          <SelectTrigger className="w-[200px] bg-white">
            <SelectValue placeholder="Filtrar por Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Profissionais</SelectItem>
            <SelectItem value="premium">Apenas Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Profissional</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Mensalidade</TableHead>
              <TableHead>Destaque Premium</TableHead>
              <TableHead className="text-center">É Premium?</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((pro) => (
              <TableRow key={pro.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={pro.image}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold flex items-center gap-1">
                        {pro.name}
                        {pro.verified && (
                          <span className="text-blue-500 text-xs" title="Verificado">
                            ✓
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground">{pro.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="max-w-[150px] truncate" title={pro.category?.name}>
                  {pro.category?.name || '-'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      pro.subscription_status === 'expired'
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }
                  >
                    {pro.subscription_status === 'expired' ? 'Expirada' : 'Ativa'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {pro.premium_highlight === 'top1' && (
                    <Badge className="bg-[#FFD700] hover:bg-[#F2C800] text-amber-950 border-transparent">
                      Top 1
                    </Badge>
                  )}
                  {pro.premium_highlight === 'recommended' && (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-transparent">
                      Recomendado
                    </Badge>
                  )}
                  {!pro.premium_highlight && (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={pro.plan?.id === 'plan-premium'}
                    onCheckedChange={() => togglePremium(pro.id)}
                  />
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(pro)}
                    title="Editar Status Financeiro/Premium"
                  >
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Nenhum profissional encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Gerenciar Assinatura Premium</SheetTitle>
          </SheetHeader>
          <div className="space-y-6">
            <div>
              <p className="font-semibold text-lg">{editingPro?.name}</p>
              <p className="text-sm text-muted-foreground">{editingPro?.category?.name}</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status da Mensalidade</label>
              <Select
                value={form.subscription_status}
                onValueChange={(v) => setForm({ ...form, subscription_status: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Pagamento em dia (Ativa)</SelectItem>
                  <SelectItem value="expired">Atrasado / Inadimplente (Expirada)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Controla o status de cobrança mensal deste profissional.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Destaque na Busca (Label)</label>
              <Select
                value={form.premium_highlight}
                onValueChange={(v) => setForm({ ...form, premium_highlight: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem destaque especial</SelectItem>
                  <SelectItem value="recommended">Mais Recomendado (Ícone Azul)</SelectItem>
                  <SelectItem value="top1">Top 1 da Categoria (Ícone Ouro)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Define como o card aparecerá nas buscas da categoria.
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 p-4 border rounded-lg bg-muted/30">
              <div>
                <label className="text-sm font-medium text-secondary">Perfil Verificado</label>
                <p className="text-xs text-muted-foreground">Concede o selo azul de confiança.</p>
              </div>
              <Switch
                checked={form.verified}
                onCheckedChange={(v) => setForm({ ...form, verified: v })}
              />
            </div>

            <Button className="w-full mt-6" onClick={handleSave}>
              Salvar Alterações
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
