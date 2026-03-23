import React, { useState, useRef } from 'react'
import { Megaphone, TrendingUp, Target, Users, Wand2, ImagePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { MultiSelect } from '@/components/MultiSelect'
import { CATEGORY_OPTIONS, Ad } from '@/stores/mockData'
import { ImageCropper } from '@/components/ImageCropper'
import useMainStore from '@/stores/main'

const Field = ({ label, ...props }: { label: string } & React.ComponentProps<'input'>) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Input {...props} />
  </div>
)

export default function AdvertisePage() {
  const { toast } = useToast()
  const { addAd } = useMainStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)

  const [companyName, setCompanyName] = useState('')
  const [contactName, setContactName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [otherLinks, setOtherLinks] = useState('')
  const [segments, setSegments] = useState<string[]>([])
  const [message, setMessage] = useState('')

  const [photo, setPhoto] = useState<string | null>(null)
  const [rawImage, setRawImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleGenerateAI = () => {
    if (!companyName) {
      return toast({
        title: 'Atenção',
        description: 'Preencha o nome da empresa primeiro.',
        variant: 'destructive',
      })
    }
    setIsGeneratingAI(true)
    setTimeout(() => {
      setMessage(
        `A ${companyName} é referência na região! Oferecemos produtos e serviços de alta qualidade, focados na sua satisfação. Venha conferir nosso atendimento especializado e as melhores condições do mercado.`,
      )
      setIsGeneratingAI(false)
    }, 1000)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setRawImage(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const newAd: Ad = {
      id: `ad_${Date.now()}`,
      companyName,
      description: message || `${companyName} - Atendimento de qualidade em Rondonópolis.`,
      imageUrl: photo || 'https://img.usecurling.com/p/800/400?q=business&color=blue',
      link: `https://wa.me/55${whatsapp.replace(/\D/g, '')}`,
      targetCategories: segments,
      active: true,
      phone,
      website,
      facebook,
      instagram,
      isGeneral: segments.length === 0,
    }

    await addAd(newAd)

    setIsSubmitting(false)
    toast({
      title: 'Solicitação Enviada com Sucesso!',
      description:
        'Sua empresa foi cadastrada no sistema e logo aparecerá na seção de Empresas Parceiras.',
    })

    setCompanyName('')
    setContactName('')
    setWhatsapp('')
    setPhone('')
    setEmail('')
    setWebsite('')
    setFacebook('')
    setInstagram('')
    setOtherLinks('')
    setSegments([])
    setMessage('')
    setPhoto(null)
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <div className="bg-secondary text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://img.usecurling.com/p/1600/600?q=business%20meeting&color=blue')] opacity-10 object-cover mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <Megaphone className="w-12 h-12 mx-auto mb-6 text-primary animate-bounce" />
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Divulgue sua Marca para o Público Certo
          </h1>
          <p className="text-lg md:text-xl text-white/80">
            Anuncie sua empresa no Guia Rondonópolis de forma contextual. Ofereça seus produtos e
            serviços diretamente na página dos profissionais relacionados ao seu negócio.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-4 space-y-8 animate-fade-in-up">
            <div>
              <h2 className="text-2xl font-bold text-secondary mb-3">Por que anunciar conosco?</h2>
              <p className="text-muted-foreground">
                Conectamos prestadores de serviço, clientes finais e fornecedores.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  icon: Target,
                  title: 'Público Segmentado',
                  desc: 'Seu anúncio aparece quando o cliente busca seu nicho.',
                },
                {
                  icon: TrendingUp,
                  title: 'Alta Visibilidade',
                  desc: 'Seja a primeira escolha para fornecimento.',
                },
                {
                  icon: Users,
                  title: 'Conexão Direta',
                  desc: 'Receba leads qualificados diretamente no WhatsApp.',
                },
              ].map((b, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <b.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary">{b.title}</h3>
                    <p className="text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-6 md:p-8 rounded-3xl shadow-xl border animate-fade-in">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-secondary">Fale com nossa equipe</h3>
              <p className="text-muted-foreground">
                Preencha os dados e descubra o plano ideal para o seu negócio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  required
                  label="Nome da Empresa"
                  placeholder="Sua Empresa Ltda"
                  value={companyName}
                  onChange={(e: any) => setCompanyName(e.target.value)}
                />
                <div className="space-y-2">
                  <Label>Segmento de Atuação</Label>
                  <MultiSelect
                    options={CATEGORY_OPTIONS}
                    selected={segments}
                    onChange={setSegments}
                    placeholder="Selecione..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Foto da Empresa</Label>
                <div className="flex items-center gap-4">
                  {photo ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border">
                      <img src={photo} alt="Empresa" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70"
                        onClick={() => setPhoto(null)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="w-24 h-24 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-muted/50 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImagePlus className="w-6 h-6 mb-1" />
                      <span className="text-xs">Upload</span>
                    </button>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {!photo && (
                    <p className="text-sm text-muted-foreground">
                      Adicione a logo ou foto do estabelecimento.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  required
                  label="Seu Nome"
                  placeholder="João Silva"
                  value={contactName}
                  onChange={(e: any) => setContactName(e.target.value)}
                />
                <Field
                  required
                  label="WhatsApp"
                  type="tel"
                  placeholder="(66) 99999-9999"
                  value={whatsapp}
                  onChange={(e: any) => setWhatsapp(e.target.value)}
                />
                <Field
                  label="Telefone Fixo/Outro"
                  type="tel"
                  placeholder="(66) 3421-0000"
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                />
                <Field
                  required
                  label="Email Corporativo"
                  type="email"
                  placeholder="contato@empresa.com.br"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field
                  label="Site"
                  type="url"
                  placeholder="https://www.empresa.com.br"
                  value={website}
                  onChange={(e: any) => setWebsite(e.target.value)}
                />
                <Field
                  label="Facebook"
                  placeholder="Link da página"
                  value={facebook}
                  onChange={(e: any) => setFacebook(e.target.value)}
                />
                <Field
                  label="Instagram"
                  placeholder="@empresa"
                  value={instagram}
                  onChange={(e: any) => setInstagram(e.target.value)}
                />
                <Field
                  label="Outros Links"
                  placeholder="LinkedIn, YouTube..."
                  value={otherLinks}
                  onChange={(e: any) => setOtherLinks(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Mensagem Adicional (Opcional)</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-primary hover:text-primary/80 px-2"
                    onClick={handleGenerateAI}
                    disabled={isGeneratingAI}
                  >
                    <Wand2 className="w-3 h-3 mr-1.5" />
                    {isGeneratingAI ? 'Gerando...' : 'Sugerir com IA'}
                  </Button>
                </div>
                <Textarea
                  placeholder="Como podemos ajudar a crescer seu negócio?"
                  className="h-24"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full text-base h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Solicitar Contato Comercial'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          allowToggle={true}
          onCrop={(cropped) => {
            setPhoto(cropped)
            setRawImage(null)
          }}
          onCancel={() => setRawImage(null)}
        />
      )}
    </div>
  )
}
