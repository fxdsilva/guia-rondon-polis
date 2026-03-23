import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, Trophy, ThumbsUp, DollarSign, Target, CheckCircle2 } from 'lucide-react'
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
      toast({
        title: 'Código gerado!',
        description: `Para testes, utilize o código: ${code}`,
      })
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
      toast({
        title: 'Código reenviado!',
        description: `Para testes, utilize o código: ${code}`,
      })
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
    navigate(`/profissional/${currentUserId}`)
  }

  const handleRequestPremium = async () => {
    if (!currentUserId) return
    await updateProfessional(currentUserId, { plan_id: PLAN_PENDING_ID })
    toast({
      title: 'Solicitação Enviada!',
      description: 'Nossa equipe validará seu pagamento e ativará o modo Premium em breve.',
    })
    window.open(
      `https://wa.me/5566999999999?text=${encodeURIComponent(`Olá, atualizei meus dados e quero me tornar um Profissional Premium. Meu nome é ${formData?.name}.`)}`,
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
            <h1 className="text-2xl font-bold text-secondary mb-2">Atualizar Dados</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step === 'phone'
                ? 'Digite seu número de WhatsApp cadastrado para acessar seu perfil profissional.'
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
                Acessar Perfil
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
                className="w-full h-14 text-lg font-semibold bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-xl shadow-md transition-all disabled:opacity-50 disabled:hover:translate-y-0"
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

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-secondary text-center">Gerenciar Perfil</h1>

      <Tabs defaultValue="dados" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-14 bg-muted/50 p-1 rounded-xl">
          <TabsTrigger
            value="dados"
            className="text-base font-semibold rounded-lg data-[state=active]:shadow-sm"
          >
            Meus Dados
          </TabsTrigger>
          <TabsTrigger
            value="premium"
            className="text-base font-semibold rounded-lg text-amber-600 data-[state=active]:text-amber-700 data-[state=active]:bg-amber-100/50 data-[state=active]:shadow-sm"
          >
            Seja Premium
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dados">
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border"
          >
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
            <div className="space-y-2">
              <Label>Sobre o Profissional</Label>
              <Textarea
                required
                className="h-32"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="pt-4 flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/profissional/${currentUserId}`)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" className="flex-1 shadow-md">
                Salvar Alterações
              </Button>
            </div>
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
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        Apareça sempre antes dos perfis gratuitos nas buscas da sua especialidade.
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
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        Destaque visual exclusivo que atesta sua liderança e qualidade no segmento.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm border border-blue-200">
                      <ThumbsUp className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary text-lg">Selo "Mais Recomendado"</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        Transmita confiança imediata para quem está procurando pelo seu serviço.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 shadow-sm border border-slate-300">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary text-lg">Cobrar mensalidade</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                        Pague uma pequena taxa mensal recorrente para manter todos esses benefícios
                        ativos.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-center max-w-sm mx-auto">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg h-14 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
                    onClick={handleRequestPremium}
                    disabled={isPremiumRequested}
                  >
                    {isPremiumRequested ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Solicitação em Análise
                      </>
                    ) : (
                      'Pagar para ser Premium'
                    )}
                  </Button>
                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                    Ao solicitar, você será direcionado ao WhatsApp da nossa equipe para finalizar o
                    processo de forma rápida e segura.
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
