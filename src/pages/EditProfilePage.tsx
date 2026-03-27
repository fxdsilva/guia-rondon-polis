import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogIn,
  Trophy,
  ThumbsUp,
  DollarSign,
  Target,
  CheckCircle2,
  ListTodo,
  MessageSquare,
  Briefcase,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'
import { useToast } from '@/hooks/use-toast'
import { PLAN_PREMIUM_ID, PLAN_PENDING_ID } from '@/stores/mockData'

const EditProfilePage = () => {
  const {
    currentUserId,
    setCurrentUserId,
    populatedProfessionals,
    updateProfessional,
    categories,
    neighborhoods,
    generateOtp,
    verifyOtp,
    quotes,
    clients,
    updateQuote,
  } = useMainStore()

  const navigate = useNavigate()
  const { toast } = useToast()

  const [loginPhone, setLoginPhone] = useState('')
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [otp, setOtp] = useState('')
  const [pendingPhone, setPendingPhone] = useState<string>('')
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    if (currentUserId) {
      const pro = populatedProfessionals.find((p) => p.id === currentUserId)
      if (pro) {
        setFormData({
          name: pro.name,
          phone: pro.phone,
          description: pro.description,
          address: pro.address || '',
          categoryId: pro.category_id,
          neighborhoodId: pro.neighborhood_id,
          planId: pro.plan_id,
        })
      }
    }
  }, [currentUserId, populatedProfessionals])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanPhone = loginPhone.replace(/\D/g, '')
    const code = await generateOtp(cleanPhone)
    if (code) {
      setPendingPhone(cleanPhone)
      setStep('otp')
      toast({ title: 'Código gerado!', description: `Para testes, utilize o código: ${code}` })
    } else {
      toast({
        title: 'Perfil não encontrado',
        description: 'Verifique se o número foi digitado corretamente.',
        variant: 'destructive',
      })
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const proId = await verifyOtp(pendingPhone, otp)
    if (proId) {
      setCurrentUserId(proId)
      toast({ title: 'Bem-vindo de volta!' })
    } else {
      toast({
        title: 'Código inválido ou expirado',
        description: 'Verifique o código e tente novamente.',
        variant: 'destructive',
      })
    }
  }

  const handleResendOtp = async () => {
    const code = await generateOtp(pendingPhone)
    if (code) {
      toast({ title: 'Código reenviado!', description: `Para testes, utilize o código: ${code}` })
      setOtp('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUserId || !formData) return
    await updateProfessional(currentUserId, {
      name: formData.name,
      phone: formData.phone.replace(/\D/g, ''),
      description: formData.description,
      address: formData.address,
      category_id: formData.categoryId,
      neighborhood_id: formData.neighborhoodId,
    })
    toast({ title: 'Perfil Atualizado!' })
  }

  const handleRequestPremium = async () => {
    if (!currentUserId) return
    await updateProfessional(currentUserId, { plan_id: PLAN_PENDING_ID })
    toast({ title: 'Solicitação Enviada!', description: 'Nossa equipe validará seu pagamento.' })
    window.open(
      `https://wa.me/5566999999999?text=${encodeURIComponent(`Olá, atualizei meus dados e quero me tornar Premium. Meu nome é ${formData?.name}.`)}`,
      '_blank',
    )
  }

  if (!currentUserId) {
    return (
      <div className="container mx-auto px-4 py-20 flex justify-center items-center flex-1 animate-fade-in">
        <div className="max-w-sm w-full bg-white p-8 rounded-[2rem] shadow-xl border space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 bg-[#22c55e]/10 text-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold text-secondary mb-2">Acesso do Prestador</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step === 'phone'
                ? 'Digite seu número de WhatsApp cadastrado para acessar seu dashboard.'
                : 'Digite o código de acesso enviado para seu WhatsApp.'}
            </p>
          </div>
          {step === 'phone' ? (
            <form onSubmit={handleLogin} className="space-y-6 pt-2">
              <div className="space-y-2 text-left">
                <Label className="text-[15px] font-semibold text-secondary">Seu WhatsApp</Label>
                <Input
                  type="tel"
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  required
                  placeholder="66996229975"
                  className="h-14 text-lg bg-slate-50 border-slate-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl shadow-md transition-all hover:-translate-y-0.5"
              >
                Acessar Painel
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6 pt-2">
              <div className="flex justify-center mb-2">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <InputOTPSlot
                        key={index}
                        index={index}
                        className="w-12 h-14 text-xl bg-slate-50 border-slate-200 rounded-lg"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <Button
                type="submit"
                disabled={otp.length < 6}
                className="w-full h-14 text-lg font-semibold bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl shadow-md transition-all"
              >
                Confirmar Código
              </Button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                  Reenviar código
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    )
  }

  if (!formData) return null

  const categoryName = categories.find((c) => c.id === formData.categoryId)?.name || 'sua categoria'
  const isPremiumRequested = formData.planId === PLAN_PENDING_ID
  const isPremium = formData.planId === PLAN_PREMIUM_ID

  const myQuotes = quotes.filter((q) => q.professional_id === currentUserId)
  const completedQuotes = myQuotes.filter((q) => q.status === 'completed')
  const revenue = completedQuotes.reduce((acc, q) => acc + (q.price || 0), 0)

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Dashboard do Prestador</h1>
          <p className="text-muted-foreground">Gerencie seus orçamentos, perfil e assinatura.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(`/profissional/${currentUserId}`)}
          className="bg-white"
        >
          Ver Meu Perfil Público
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 h-auto bg-muted/50 p-1.5 rounded-xl">
          <TabsTrigger
            value="dashboard"
            className="h-10 text-sm md:text-base data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="orcamentos"
            className="h-10 text-sm md:text-base data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            Meus Serviços
          </TabsTrigger>
          <TabsTrigger
            value="dados"
            className="h-10 text-sm md:text-base data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            Meu Perfil
          </TabsTrigger>
          <TabsTrigger
            value="premium"
            className="h-10 text-sm md:text-base text-amber-600 data-[state=active]:text-amber-700 data-[state=active]:bg-amber-100/50 data-[state=active]:shadow-sm rounded-lg"
          >
            Assinatura
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-bold text-secondary">{myQuotes.length}</h4>
              <p className="text-sm font-medium text-muted-foreground mt-1">
                Orçamentos Solicitados
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-bold text-secondary">{completedQuotes.length}</h4>
              <p className="text-sm font-medium text-muted-foreground mt-1">Serviços Concluídos</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                <DollarSign className="w-6 h-6" />
              </div>
              <h4 className="text-3xl font-bold text-secondary">
                R$ {revenue.toFixed(2).replace('.', ',')}
              </h4>
              <p className="text-sm font-medium text-muted-foreground mt-1">Faturamento Estimado</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm mt-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-primary" /> Últimas Solicitações
            </h3>
            {myQuotes.slice(0, 3).map((quote) => {
              const client = clients.find((c) => c.id === quote.client_id)
              return (
                <div
                  key={quote.id}
                  className="py-3 border-b last:border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <p className="font-semibold">{client?.name || 'Cliente'}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {quote.description}
                    </p>
                  </div>
                  <Badge
                    variant={quote.status === 'completed' ? 'default' : 'secondary'}
                    className="w-fit"
                  >
                    {quote.status}
                  </Badge>
                </div>
              )
            })}
            {myQuotes.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                Ainda não há solicitações de orçamento.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="orcamentos" className="space-y-4 animate-fade-in">
          {myQuotes.length > 0 ? (
            myQuotes.map((quote) => {
              const client = clients.find((c) => c.id === quote.client_id)
              return (
                <div
                  key={quote.id}
                  className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col gap-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 border-b pb-4">
                    <div>
                      <h4 className="font-bold text-lg text-secondary">
                        {client?.name || 'Cliente'}
                      </h4>
                      <p className="text-sm font-medium text-muted-foreground">{client?.phone}</p>
                    </div>
                    <Badge
                      variant={quote.status === 'completed' ? 'default' : 'secondary'}
                      className="w-fit h-fit uppercase text-[10px] tracking-wider py-1 px-3"
                    >
                      {quote.status}
                    </Badge>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {quote.description}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-end mt-2">
                    <div className="flex-1 space-y-2">
                      <Label>Atualizar Status</Label>
                      <Select
                        value={quote.status}
                        onValueChange={(v) => updateQuote(quote.id, { status: v as any })}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pendente (Aguardando contato)</SelectItem>
                          <SelectItem value="accepted">Em Andamento (Serviço aceito)</SelectItem>
                          <SelectItem value="completed">Concluído (Finalizado)</SelectItem>
                          <SelectItem value="rejected">Recusado (Cancelado)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Valor Fechado (R$)</Label>
                      <Input
                        type="number"
                        value={quote.price || ''}
                        onChange={(e) =>
                          updateQuote(quote.id, { price: parseFloat(e.target.value) || 0 })
                        }
                        placeholder="0.00"
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border shadow-sm">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Nenhum orçamento ainda</h3>
              <p className="text-muted-foreground">Suas solicitações de serviço aparecerão aqui.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="dados" className="animate-fade-in">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Nome Completo</Label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>WhatsApp</Label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Categoria Principal</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(
                      categories.reduce(
                        (acc, c) => {
                          const group = c.group || 'Outros'
                          if (!acc[group]) acc[group] = []
                          acc[group].push(c)
                          return acc
                        },
                        {} as Record<string, typeof categories>,
                      ),
                    ).map(([groupName, cats]) => (
                      <SelectGroup key={groupName}>
                        <SelectLabel className="font-bold text-primary bg-muted/30">
                          {cats[0].groupEmoji} {groupName}
                        </SelectLabel>
                        {cats.map((c) => (
                          <SelectItem key={c.id} value={c.id} className="ml-2 cursor-pointer">
                            {c.emoji} {c.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Região de Atendimento Principal</Label>
                <Select
                  value={formData.neighborhoodId}
                  onValueChange={(val) => setFormData({ ...formData, neighborhoodId: val })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    {neighborhoods.map((n) => (
                      <SelectItem key={n.id} value={n.id}>
                        {n.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Sobre o Profissional e Descrição</Label>
              <Textarea
                required
                className="h-32"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <Button type="submit" className="w-full shadow-md h-12 text-base">
              Salvar Alterações do Perfil
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="premium" className="animate-fade-in">
          <div className="bg-white border rounded-2xl p-6 md:p-10 shadow-sm relative overflow-hidden">
            {isPremium ? (
              <div className="text-center py-12">
                <Trophy className="w-20 h-20 mx-auto text-amber-500 mb-6 drop-shadow-md" />
                <h3 className="text-3xl font-bold text-secondary mb-3">Você é Premium!</h3>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  Seu perfil está com destaque máximo em nossa plataforma e sendo recomendado para
                  novos clientes.
                </p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 right-0 bg-amber-500 text-white px-5 py-1.5 rounded-bl-xl font-bold text-xs uppercase tracking-wider shadow-md">
                  Recomendado
                </div>
                <div className="text-center mb-10 mt-4">
                  <h2 className="text-3xl font-bold text-secondary mb-3">Torne-se Premium</h2>
                  <p className="text-muted-foreground text-lg">
                    Aumente sua visibilidade, construa autoridade e conquiste muito mais clientes.
                  </p>
                </div>
                <div className="space-y-6 mb-10 max-w-md mx-auto bg-slate-50/50 p-6 rounded-2xl border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 shadow-sm border border-green-200">
                      <Target className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary text-lg">Destaque na Categoria</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Apareça sempre antes dos perfis gratuitos nas buscas.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-sm border border-amber-200">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary text-lg">
                        Selo "Top 1 {categoryName}"
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Destaque visual exclusivo atestando sua qualidade.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-200">
                      <ThumbsUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary text-lg">Selo "Mais Recomendado"</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Transmita confiança imediata para os clientes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center max-w-sm mx-auto">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg h-14 shadow-xl transition-all hover:-translate-y-0.5"
                    onClick={handleRequestPremium}
                    disabled={isPremiumRequested}
                  >
                    {isPremiumRequested ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" /> Solicitação em Análise
                      </>
                    ) : (
                      'Pagar para ser Premium'
                    )}
                  </Button>
                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                    Ao solicitar, você será direcionado ao WhatsApp da nossa equipe para finalizar o
                    processo.
                  </p>
                </div>
              </>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default EditProfilePage
