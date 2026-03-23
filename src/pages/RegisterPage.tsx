import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Wand2, UploadCloud, Edit3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CATEGORY_GROUPS, NEIGHBORHOOD_GROUPS } from '@/stores/mockData'
import useMainStore from '@/stores/main'

const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { addProfessional } = useMainStore()
  const [isGenerating, setIsGenerating] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    image: '',
    category: '',
    customCategory: '',
    neighborhoods: '',
    description: '',
    services: '',
    gallery: [] as string[],
  })

  const generateAI = () => {
    if (!formData.category) return
    setIsGenerating(true)
    setTimeout(() => {
      const catName = formData.category === 'Outro' ? formData.customCategory : formData.category
      setFormData((prev) => ({
        ...prev,
        description: `Sou profissional especializado em ${catName} com vasta experiência em Rondonópolis. Prezo pela excelência, pontualidade e satisfação total dos meus clientes. Entre em contato para um orçamento detalhado e sem compromisso!`,
      }))
      setIsGenerating(false)
    }, 1200)
  }

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'image' | 'gallery',
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      if (field === 'image') {
        setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) })
      } else {
        const newImgs = Array.from(e.target.files).map((f) => URL.createObjectURL(f))
        setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...newImgs].slice(0, 5) }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
      return
    }
    const finalCat = formData.category === 'Outro' ? formData.customCategory : formData.category
    addProfessional({
      id: `new-${Date.now()}`,
      name: formData.name,
      category: finalCat,
      rating: 5.0,
      reviewsCount: 0,
      neighborhoods: [formData.neighborhoods],
      premium: false,
      verified: false,
      phone: formData.phone.replace(/\D/g, ''),
      description: formData.description,
      services: formData.services.split(',').map((s) => s.trim()),
      image: formData.image || 'https://img.usecurling.com/ppl/medium',
      gallery: formData.gallery,
      reviews: [],
      workingHours: 'A combinar',
    })
    setStep(5)
  }

  if (step === 5)
    return (
      <div className="container mx-auto px-4 py-20 max-w-lg text-center animate-fade-in-up">
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Cadastro Enviado!</h2>
        <p className="text-muted-foreground mb-8">
          Seu perfil foi criado e está em análise. Em breve você estará visível para milhares de
          clientes em Rondonópolis.
        </p>
        <Button size="lg" onClick={() => navigate('/')} className="w-full">
          Voltar para o Início
        </Button>
      </div>
    )

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-secondary mb-2">Cadastre seus Serviços</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para criar seu perfil profissional no guia.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8 relative px-4">
        <div className="absolute left-8 right-8 top-1/2 h-1 bg-muted -z-10" />
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
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
              <label className="text-sm font-medium">Nome Completo ou Empresa</label>
              <Input
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="João da Silva Serviços"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">WhatsApp</label>
              <Input
                required
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(66) 99999-9999"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> Foto de Perfil
              </label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'image')}
                className="cursor-pointer"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover mt-2 border"
                />
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Área de Atuação</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria Principal</label>
              <Select
                required
                value={formData.category}
                onValueChange={(val) =>
                  setFormData({ ...formData, category: val, customCategory: '' })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_GROUPS).map(([group, cats]) => (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {cats.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                  <SelectItem value="Outro" className="font-semibold text-primary">
                    Outro (Especificar)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.category === 'Outro' && (
              <div className="space-y-2 animate-fade-in">
                <label className="text-sm font-medium">Qual a sua categoria?</label>
                <Input
                  required
                  value={formData.customCategory}
                  onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                  placeholder="Ex: Engenheiro Acústico"
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm font-medium">Região Principal de Atendimento</label>
              <Select
                required
                value={formData.neighborhoods}
                onValueChange={(val) => setFormData({ ...formData, neighborhoods: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma região" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos os bairros">Atendo toda a cidade</SelectItem>
                  {Object.keys(NEIGHBORHOOD_GROUPS).map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
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
                <label className="text-sm font-medium">Descrição sobre você</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateAI}
                  disabled={!formData.category || isGenerating}
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
              <label className="text-sm font-medium">
                Serviços Específicos (separados por vírgula)
              </label>
              <Input
                required
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="Manutenção, Instalação, Limpeza..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> Fotos do Trabalho (Máx 5)
              </label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleImageUpload(e, 'gallery')}
                className="cursor-pointer"
              />
              {formData.gallery.length > 0 && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  {formData.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="w-16 h-16 rounded-md object-cover border"
                    />
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
              <div className="flex items-center gap-4">
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Perfil"
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                )}
                <div>
                  <p className="font-bold text-lg">{formData.name}</p>
                  <p className="text-muted-foreground">{formData.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 bg-muted/30 p-4 rounded-xl">
                <div>
                  <p className="font-medium text-muted-foreground">Categoria</p>
                  <p>
                    {formData.category === 'Outro' ? formData.customCategory : formData.category}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground">Região</p>
                  <p>{formData.neighborhoods}</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-muted-foreground mb-1">Sobre</p>
                <p className="bg-muted/30 p-3 rounded-lg">{formData.description}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground mb-1">Serviços</p>
                <div className="flex flex-wrap gap-2">
                  {formData.services.split(',').map((s, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs"
                    >
                      {s.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep(step - 1)}
            disabled={step === 1}
          >
            Voltar
          </Button>
          <Button type="submit">{step === 4 ? 'Confirmar e Enviar' : 'Avançar'}</Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
