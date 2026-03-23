import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wand2, UploadCloud, X, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { CATEGORY_OPTIONS, NEIGHBORHOOD_OPTIONS } from '@/stores/mockData'
import useMainStore from '@/stores/main'
import { MultiSelect } from '@/components/MultiSelect'
import { ImageCropper } from '@/components/ImageCropper'
import { getAISuggestions } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const EditProfilePage = () => {
  const navigate = useNavigate()
  const { currentUserId, professionals, updateProfessional } = useMainStore()
  const { toast } = useToast()

  const [isGenerating, setIsGenerating] = useState(false)
  const [cropData, setCropData] = useState<{ src: string; type: 'profile' | 'gallery' } | null>(
    null,
  )

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    image: '',
    categories: [] as string[],
    customCategory: '',
    neighborhoods: [] as string[],
    description: '',
    services: '',
    gallery: [] as string[],
  })

  useEffect(() => {
    if (!currentUserId) {
      navigate('/cadastrar')
      return
    }
    const pro = professionals.find((p) => p.id === currentUserId)
    if (pro) {
      setFormData({
        name: pro.name,
        phone: pro.phone,
        image: pro.image,
        categories: pro.categories,
        customCategory: '',
        neighborhoods: pro.neighborhoods,
        description: pro.description,
        services: pro.services.join(', '),
        gallery: pro.gallery,
      })
    }
  }, [currentUserId, professionals, navigate])

  const suggestedServices = useMemo(
    () => getAISuggestions(formData.categories),
    [formData.categories],
  )

  const generateAI = () => {
    if (formData.categories.length === 0) return
    setIsGenerating(true)
    setTimeout(() => {
      const catsText = formData.categories.includes('Outro')
        ? formData.customCategory || 'serviços diversos'
        : formData.categories.join(' e ')

      const regionsText =
        formData.neighborhoods.length > 0
          ? formData.neighborhoods.includes('Todos os bairros')
            ? 'em toda Rondonópolis'
            : `nas regiões de ${formData.neighborhoods.join(', ')}`
          : 'em Rondonópolis'

      setFormData((prev) => ({
        ...prev,
        description: `Sou profissional especializado em ${catsText} com vasta experiência ${regionsText}. Prezo pela excelência, pontualidade e satisfação total dos meus clientes. Entre em contato para um orçamento detalhado e sem compromisso!`,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUserId) return

    let finalCategories = [...formData.categories]
    if (finalCategories.includes('Outro') && formData.customCategory) {
      finalCategories = finalCategories.filter((c) => c !== 'Outro')
      finalCategories.push(formData.customCategory)
    }

    updateProfessional(currentUserId, {
      name: formData.name,
      categories: finalCategories,
      neighborhoods: formData.neighborhoods,
      phone: formData.phone.replace(/\D/g, ''),
      description: formData.description,
      services: formData.services
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      image: formData.image,
      gallery: formData.gallery,
    })

    toast({
      title: 'Perfil Atualizado!',
      description: 'Suas informações foram salvas com sucesso.',
    })
    navigate(`/profissional/${currentUserId}`)
  }

  if (!currentUserId) return null

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl relative">
      <div className="mb-10 text-center animate-fade-in-up">
        <h1 className="text-3xl font-bold text-secondary mb-2">Editar Perfil</h1>
        <p className="text-muted-foreground">Mantenha suas informações sempre atualizadas.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border animate-fade-in space-y-10"
      >
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Informações Pessoais</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> Foto de Perfil
              </span>
            </label>
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
                  className="w-16 h-16 rounded-full object-cover border border-border shadow-sm shrink-0"
                />
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Nome Completo</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="João da Silva"
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
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Área de Atuação</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Categorias (Pode selecionar mais de uma)</label>
            <MultiSelect
              options={CATEGORY_OPTIONS}
              selected={formData.categories}
              onChange={(vals) => setFormData({ ...formData, categories: vals })}
              placeholder="Selecione as categorias..."
            />
          </div>
          {formData.categories.includes('Outro') && (
            <div className="space-y-2 animate-fade-in">
              <label className="text-sm font-medium">Especifique a categoria</label>
              <Input
                required
                value={formData.customCategory}
                onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                placeholder="Ex: Engenheiro Acústico"
              />
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium">Regiões de Atendimento</label>
            <MultiSelect
              options={NEIGHBORHOOD_OPTIONS}
              selected={formData.neighborhoods}
              onChange={(vals) => setFormData({ ...formData, neighborhoods: vals })}
              placeholder="Selecione as regiões..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-2">Detalhes do Serviço</h3>
          <div className="space-y-2 relative">
            <div className="flex justify-between items-end mb-1">
              <label className="text-sm font-medium">Sobre o Profissional</label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={generateAI}
                disabled={formData.categories.length === 0 || isGenerating}
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
            {suggestedServices.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="text-xs text-muted-foreground w-full block mb-1 flex items-center gap-1">
                  <Wand2 className="w-3 h-3 text-primary" /> Sugestões baseadas nas categorias:
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
            <label className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center gap-2">
                <UploadCloud className="w-4 h-4" /> Fotos do Trabalho (Máx 5)
              </span>
              <span className="text-xs text-muted-foreground">{formData.gallery.length}/5</span>
            </label>
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

        <div className="flex justify-end pt-6 border-t">
          <Button type="submit" size="lg" className="w-full sm:w-auto shadow-md gap-2">
            <Save className="w-5 h-5" /> Salvar Alterações
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
    </div>
  )
}

export default EditProfilePage
