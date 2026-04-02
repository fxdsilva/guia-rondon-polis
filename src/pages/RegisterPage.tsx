import { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Wand2, UploadCloud, Edit3, X, Check, Copy, Instagram } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import useMainStore from '@/stores/main'
import { ImageCropper } from '@/components/ImageCropper'
import { getAISuggestions } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'
import { PLAN_FREE_ID } from '@/stores/mockData'

const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { categories, neighborhoods, addProfessional, setCurrentUserId } = useMainStore()
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [cropData, setCropData] = useState<{ src: string; type: 'profile' | 'gallery' } | null>(
    null,
  )

  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [createdProId, setCreatedProId] = useState('')
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    image: '',
    categoryId: '',
    neighborhoodId: '',
    description: '',
    services: '',
    gallery: [] as string[],
    hasAddress: false,
    address: '',
  })

  const suggestedServices = useMemo(() => {
    const cat = categories.find((c) => c.id === formData.categoryId)
    return cat ? getAISuggestions([cat.name]) : []
  }, [formData.categoryId, categories])

  const instagramTemplate = useMemo(() => {
    const catName = categories.find((c) => c.id === formData.categoryId)?.name || 'serviços'
    return `Novidade por aqui! 🚀 Agora você me encontra oficialmente no @GuiaRondonopolis.\n\nSou especialista em ${catName} e estou pronto para atender toda a nossa cidade com qualidade e confiança. Acesse o guia e confira meu perfil completo!\n\n📍 Valorize os profissionais da nossa terra.\n#GuiaRondonopolis #Rondonopolis #ServiçosLocais`
  }, [formData.categoryId, categories])

  const generateAI = () => {
    if (!formData.categoryId) return
    setIsGenerating(true)
    setTimeout(() => {
      const catName =
        categories.find((c) => c.id === formData.categoryId)?.name || 'serviços diversos'
      const nbName =
        neighborhoods.find((n) => n.id === formData.neighborhoodId)?.name || 'Rondonópolis'
      const regionsText =
        nbName === 'Todos os bairros' ? 'em toda Rondonópolis' : `na região de ${nbName}`

      setFormData((prev) => ({
        ...prev,
        description: `Sou profissional especializado em ${catName} com vasta experiência ${regionsText}. Prezo pela excelência, pontualidade e satisfação total dos meus clientes. Entre em contato para um orçamento detalhado e sem compromisso!`,
      }))
      setIsGenerating(false)
    }, 1200)
  }

  const handleAddService = (srv: string) => {
    const current = formData.services
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    if (!current.includes(srv)) {
      setFormData({ ...formData, services: [...current, srv].join(', ') })
    }
  }

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'gallery',
  ) => {
    if (e.target.files && e.target.files[0]) {
      const src = URL.createObjectURL(e.target.files[0])
      setCropData({ src, type })
      e.target.value = ''
    }
  }

  const handleCropComplete = (croppedBase64: string) => {
    if (cropData?.type === 'profile') {
      setFormData({ ...formData, image: croppedBase64 })
    } else if (cropData?.type === 'gallery') {
      setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, croppedBase64].slice(0, 5) }))
    }
    setCropData(null)
  }

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
      return
    }

    const servicesList = formData.services
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const newId = await addProfessional(
      {
        name: formData.name,
        phone: formData.phone.replace(/\D/g, ''),
        description: formData.description,
        address: formData.hasAddress ? formData.address : '',
        category_id: formData.categoryId,
        neighborhood_id: formData.neighborhoodId,
        plan_id: PLAN_FREE_ID,
        verified: false,
        image: formData.image || 'https://img.usecurling.com/ppl/medium',
        gallery: formData.gallery,
        working_hours: 'A combinar',
      },
      servicesList,
    )

    if (newId) {
      setCurrentUserId(newId)
      setCreatedProId(newId)
      setSuccessModalOpen(true)
    } else {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao salvar seu perfil. Tente novamente.',
        variant: 'destructive',
      })
    }
  }

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(instagramTemplate)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const handleGoToProfile = () => {
    setSuccessModalOpen(false)
    if (createdProId) {
      navigate(`/profissional/${createdProId}`)
    }
  }

  const getMapQuery = (address: string) => {
    const suffix = address.toLowerCase().includes('rondon') ? '' : ', Rondonópolis, MT'
    return encodeURIComponent(address + suffix)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl relative">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-secondary mb-2">Anuncie seus Serviços</h1>
        <p className="text-muted-foreground mb-6">
          Preencha os dados abaixo para criar seu perfil profissional no guia.
        </p>
        <Link
          to="/editar-perfil"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'shadow-sm font-semibold border-primary/20 text-primary hover:bg-primary/5',
          )}
        >
          Já tem um cadastro? Atualize seus dados
        </Link>
      </div>

      <div className="flex items-center justify-between mb-8 relative px-4">
        <div className="absolute left-8 right-8 top-1/2 h-1 bg-muted -z-10" />
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground'}`}
          >
            {num}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border animate-fade-in"
      >
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Informações Pessoais</h3>
            <div className="space-y-2">
              <Label>Nome Completo</Label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="João da Silva"
              />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(66) 99999-9999"
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" /> Foto de Perfil
                </span>
              </Label>
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageSelect(e, 'profile')}
                    className="cursor-pointer"
                  />
                </div>
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border border-border shadow-sm shrink-0"
                  />
                )}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Atendimento no Local</Label>
                  <p className="text-sm text-muted-foreground">
                    Possuo um endereço físico para receber clientes.
                  </p>
                </div>
                <Switch
                  checked={formData.hasAddress}
                  onCheckedChange={(checked) => setFormData({ ...formData, hasAddress: checked })}
                />
              </div>
              {formData.hasAddress && (
                <div className="space-y-4 animate-fade-in-up">
                  <div className="space-y-2">
                    <Label>Endereço Físico</Label>
                    <Input
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Ex: Rua Exemplo, 123, Centro"
                    />
                  </div>
                  {formData.address && formData.address.length > 5 && (
                    <div className="w-full h-[200px] md:h-[250px] rounded-md overflow-hidden border shadow-inner relative bg-muted">
                      <iframe
                        src={`https://maps.google.com/maps?q=${getMapQuery(formData.address)}&z=15&output=embed`}
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Área de Atuação</h3>
            <div className="space-y-2">
              <Label>Categoria Principal</Label>
              <Select
                value={formData.categoryId}
                onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione sua especialidade..." />
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
                  <SelectValue placeholder="Selecione a região..." />
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
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Detalhes do Serviço</h3>
            <div className="space-y-2 relative">
              <div className="flex justify-between items-end mb-1">
                <Label>Sobre o Profissional</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAI}
                  disabled={!formData.categoryId || isGenerating}
                  className="h-7 text-xs gap-1"
                >
                  <Wand2 className="w-3 h-3" /> {isGenerating ? 'Gerando...' : 'Sugerir com IA'}
                </Button>
              </div>
              <Textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Conte um pouco sobre sua experiência..."
                className="h-28"
              />
            </div>
            <div className="space-y-2">
              <Label>Serviços Oferecidos (separados por vírgula)</Label>
              <Textarea
                required
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="Ex: Manutenção, Instalação, Limpeza..."
                className="min-h-[80px] resize-y"
              />
              {suggestedServices.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-xs text-muted-foreground w-full block mb-1 flex items-center gap-1">
                    <Wand2 className="w-3 h-3 text-primary" /> Sugestões baseadas na categoria:
                  </span>
                  {suggestedServices.map((srv) => (
                    <Badge
                      key={srv}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/20 transition-colors text-xs py-1 px-2.5 font-normal border shadow-sm"
                      onClick={() => handleAddService(srv)}
                    >
                      + {srv}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4" /> Fotos do Trabalho (Máx 5)
                </span>
                <span className="text-xs text-muted-foreground">{formData.gallery.length}/5</span>
              </Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageSelect(e, 'gallery')}
                className="cursor-pointer"
                disabled={formData.gallery.length >= 5}
              />
              {formData.gallery.length > 0 && (
                <div className="flex gap-3 mt-4 flex-wrap">
                  {formData.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="relative group animate-fade-in-up"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-16 h-16 rounded-md object-cover border shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(i)}
                        className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h3 className="text-xl font-semibold">Revisar Perfil</h3>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setStep(1)}
                className="gap-2"
              >
                <Edit3 className="w-4 h-4" /> Editar
              </Button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-4 bg-muted/20 p-4 rounded-xl border">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Perfil"
                    className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center border-2 border-white shadow-sm">
                    <span className="text-muted-foreground text-xs">Sem foto</span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-lg">{formData.name}</p>
                  <p className="text-muted-foreground">{formData.phone}</p>
                </div>
              </div>

              {formData.hasAddress && formData.address && (
                <div className="bg-muted/30 p-3 rounded-lg border">
                  <p className="font-medium text-muted-foreground text-xs uppercase mb-1">
                    Endereço Físico
                  </p>
                  <p className="font-medium">{formData.address}</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-muted/30 p-3 rounded-lg border border-transparent hover:border-border transition-colors">
                  <p className="font-medium text-muted-foreground text-xs uppercase mb-1">
                    Categoria Principal
                  </p>
                  <p className="font-medium">
                    {categories.find((c) => c.id === formData.categoryId)?.emoji}{' '}
                    {categories.find((c) => c.id === formData.categoryId)?.name || '-'}
                  </p>
                </div>
                <div className="bg-muted/30 p-3 rounded-lg border border-transparent hover:border-border transition-colors">
                  <p className="font-medium text-muted-foreground text-xs uppercase mb-1">Região</p>
                  <p className="font-medium">
                    {neighborhoods.find((n) => n.id === formData.neighborhoodId)?.name || '-'}
                  </p>
                </div>
              </div>
              <div>
                <p className="font-medium text-muted-foreground mb-1">Sobre o Profissional</p>
                <p className="bg-muted/30 p-3 rounded-lg leading-relaxed">{formData.description}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground mb-2">Serviços Específicos</p>
                <div className="flex flex-wrap gap-2">
                  {formData.services.split(',').map(
                    (s, i) =>
                      s.trim() && (
                        <span
                          key={i}
                          className="bg-primary/10 text-primary px-2.5 py-1 rounded-md text-xs font-medium border border-primary/20"
                        >
                          {s.trim()}
                        </span>
                      ),
                  )}
                </div>
              </div>
              {formData.gallery.length > 0 && (
                <div>
                  <p className="font-medium text-muted-foreground mb-2">Galeria</p>
                  <div className="flex gap-2 flex-wrap">
                    {formData.gallery.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-14 h-14 rounded-md object-cover border shadow-sm"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
            className="w-32"
          >
            Voltar
          </Button>
          <Button
            type="submit"
            className="w-40 shadow-md"
            disabled={step === 2 && (!formData.categoryId || !formData.neighborhoodId)}
          >
            {step === 4 ? 'Confirmar' : 'Avançar'}
          </Button>
        </div>
      </form>

      {cropData && (
        <ImageCropper
          imageSrc={cropData.src}
          circular={cropData.type === 'profile'}
          allowToggle={cropData.type === 'gallery'}
          onCrop={handleCropComplete}
          onCancel={() => setCropData(null)}
        />
      )}

      <Dialog
        open={successModalOpen}
        onOpenChange={(open) => {
          if (!open) handleGoToProfile()
        }}
      >
        <DialogContent className="sm:max-w-md text-center border-none shadow-2xl">
          <DialogHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <Check className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-800">
              Cadastro Concluído!
            </DialogTitle>
            <DialogDescription className="text-base text-slate-600 pt-2">
              Seu perfil já está no ar. Que tal avisar seus clientes no Instagram e aumentar sua
              visibilidade?
            </DialogDescription>
          </DialogHeader>

          <div className="bg-slate-50 p-5 rounded-xl text-left my-4 relative group border border-slate-100 shadow-sm">
            <p className="text-sm whitespace-pre-wrap text-slate-700 leading-relaxed font-medium">
              {instagramTemplate}
            </p>
            <Button
              size="icon"
              variant="outline"
              className="absolute top-3 right-3 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm"
              onClick={handleCopy}
              title="Copiar texto"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-slate-600" />
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              className="w-full h-14 text-base font-bold gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 hover:from-purple-700 hover:via-pink-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all"
              onClick={() => {
                handleCopy()
                window.open('https://instagram.com', '_blank')
              }}
            >
              <Instagram className="w-6 h-6" />
              Copiar e Abrir Instagram
            </Button>
            <Button
              variant="ghost"
              className="w-full h-12 text-slate-600 font-semibold hover:bg-slate-100"
              onClick={handleGoToProfile}
            >
              Pular e ir para o Perfil
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RegisterPage
