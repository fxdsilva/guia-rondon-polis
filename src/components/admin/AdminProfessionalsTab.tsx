import { useState } from 'react'
import { Edit2, CheckCircle2, Trash2, Star, CreditCard } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import useMainStore from '@/stores/main'
import { useToast } from '@/hooks/use-toast'

export function AdminProfessionalsTab() {
  const {
    populatedProfessionals,
    reviews,
    updateProfessional,
    togglePremium,
    deleteReview,
    registerPayment,
  } = useMainStore()
  const { toast } = useToast()
  const [filter, setFilter] = useState<'all' | 'premium' | 'pending'>('all')
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [editingPro, setEditingPro] = useState<any>(null)

  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [paymentForm, setPaymentForm] = useState({ amount: '50.00', method: 'pix', notes: '' })

  const [form, setForm] = useState({
    name: '',
    phone: '',
    description: '',
    address: '',
    premium_highlight: 'none',
    subscription_status: 'active',
    verified: false,
  })

  const filtered = populatedProfessionals.filter((p) => {
    if (filter === 'premium') return p.plan?.id === 'plan-premium'
    if (filter === 'pending') return p.plan?.id === 'plan-pending'
    return true
  })

  const handleEdit = (pro: any) => {
    setEditingPro(pro)
    setForm({
      name: pro.name || '',
      phone: pro.phone || '',
      description: pro.description || '',
      address: pro.address || '',
      premium_highlight: pro.premium_highlight || 'none',
      subscription_status: pro.subscription_status || 'active',
      verified: pro.verified || false,
    })
    setIsSheetOpen(true)
  }

  const handleSave = () => {
    if (editingPro) {
      updateProfessional(editingPro.id, {
        name: form.name,
        phone: form.phone,
        description: form.description,
        address: form.address,
        premium_highlight:
          form.premium_highlight === 'none' ? null : (form.premium_highlight as any),
        subscription_status: form.subscription_status as any,
        verified: form.verified,
      })
      toast({ title: 'Profissional atualizado com sucesso!' })
    }
    setIsSheetOpen(false)
  }

  const handleOpenPayment = () => {
    setPaymentForm({ amount: '50.00', method: 'pix', notes: '' })
    setIsPaymentOpen(true)
  }

  const handleConfirmPayment = async () => {
    if (!editingPro) return
    await registerPayment(editingPro.id, {
      amount: parseFloat(paymentForm.amount) || 0,
      method: paymentForm.method,
      notes: paymentForm.notes,
    })
    setForm({ ...form, subscription_status: 'active' })
    setIsPaymentOpen(false)
    toast({
      title: 'Pagamento registrado!',
      description: 'Assinatura renovada e ativada com sucesso.',
    })
  }

  const proReviews = reviews.filter((r) => r.professional_id === editingPro?.id)

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
            <SelectItem value="pending">Solicitações Premium</SelectItem>
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
                  {pro.plan_id === 'plan-pending' ? (
                    <div className="flex flex-col items-center gap-1.5">
                      <Badge className="bg-amber-500 hover:bg-amber-600 text-[10px] uppercase font-bold shadow-sm whitespace-nowrap px-1.5 py-0.5">
                        Aprovar Pagamento
                      </Badge>
                      <Switch checked={false} onCheckedChange={() => togglePremium(pro.id)} />
                    </div>
                  ) : (
                    <Switch
                      checked={pro.plan?.id === 'plan-premium'}
                      onCheckedChange={() => togglePremium(pro.id)}
                    />
                  )}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(pro)}
                    title="Editar Profissional e Premium"
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
        <SheetContent className="sm:max-w-md overflow-y-auto w-full">
          <SheetHeader className="mb-6">
            <SheetTitle>Gerenciar Profissional</SheetTitle>
          </SheetHeader>

          <div className="mb-6">
            <p className="font-semibold text-lg">{form.name || editingPro?.name}</p>
            <p className="text-sm text-muted-foreground">{editingPro?.category?.name}</p>
          </div>

          <Tabs defaultValue="assinatura" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 p-1">
              <TabsTrigger value="assinatura" className="text-xs sm:text-sm">
                Assinatura
              </TabsTrigger>
              <TabsTrigger value="dados" className="text-xs sm:text-sm">
                Dados
              </TabsTrigger>
              <TabsTrigger value="avaliacoes" className="text-xs sm:text-sm">
                Avaliações
              </TabsTrigger>
            </TabsList>

            <TabsContent value="assinatura" className="space-y-6 animate-fade-in">
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

              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
                <div>
                  <label className="text-sm font-medium text-secondary">Perfil Verificado</label>
                  <p className="text-xs text-muted-foreground">Concede o selo azul de confiança.</p>
                </div>
                <Switch
                  checked={form.verified}
                  onCheckedChange={(v) => setForm({ ...form, verified: v })}
                />
              </div>

              <div className="mt-6 border-t pt-6">
                <h4 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Sistema de Pagamento
                </h4>
                <p className="text-xs text-muted-foreground mb-4">
                  Registre pagamentos manuais (PIX/Transferência) realizados pelo profissional para
                  renovar a assinatura.
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 border-green-200"
                  onClick={handleOpenPayment}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Registrar Pagamento Manual
                </Button>
              </div>

              <Button className="w-full mt-6" onClick={handleSave}>
                Salvar Alterações
              </Button>
            </TabsContent>

            <TabsContent value="dados" className="space-y-4 animate-fade-in">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nome do Profissional</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">WhatsApp</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço</label>
                <Input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="h-32"
                />
              </div>
              <Button className="w-full mt-6" onClick={handleSave}>
                Salvar Alterações
              </Button>
            </TabsContent>

            <TabsContent value="avaliacoes" className="space-y-4 animate-fade-in">
              <p className="text-xs text-muted-foreground mb-4">
                Gerencie os comentários deixados pelos clientes. Você pode remover avaliações
                ofensivas ou indevidas.
              </p>
              {proReviews.length > 0 ? (
                proReviews.map((r) => (
                  <div key={r.id} className="p-3 border rounded-lg bg-slate-50 relative group">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-sm">{r.reviewer_name}</p>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < r.rating ? 'fill-accent text-accent' : 'text-muted'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          deleteReview(r.id)
                          toast({
                            title: 'Avaliação removida',
                            description: 'O comentário foi apagado do perfil do prestador.',
                          })
                        }}
                        title="Remover avaliação"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Nenhuma avaliação encontrada para este profissional.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Registrar Pagamento Manual</DialogTitle>
            <DialogDescription>
              Insira os detalhes da transação para renovar a assinatura Premium de{' '}
              {editingPro?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="amount" className="text-sm font-medium">
                Valor Recebido (R$)
              </label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="method" className="text-sm font-medium">
                Forma de Pagamento
              </label>
              <Select
                value={paymentForm.method}
                onValueChange={(v) => setPaymentForm({ ...paymentForm, method: v })}
              >
                <SelectTrigger id="method">
                  <SelectValue placeholder="Selecione o método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="transfer">Transferência Bancária</SelectItem>
                  <SelectItem value="cash">Dinheiro em Espécie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Observações / Código do Comprovante (Opcional)
              </label>
              <Textarea
                id="notes"
                placeholder="Ex: Pagamento recebido via PIX chave CPF..."
                value={paymentForm.notes}
                onChange={(e) => setPaymentForm({ ...paymentForm, notes: e.target.value })}
                className="h-20"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmPayment}>Confirmar Pagamento</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
