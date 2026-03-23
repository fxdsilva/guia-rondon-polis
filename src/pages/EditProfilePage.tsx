import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import useMainStore from '@/stores/main'
import { useToast } from '@/hooks/use-toast'

const EditProfilePage = () => {
  const { currentUserId, populatedProfessionals, updateProfessional, categories, neighborhoods } =
    useMainStore()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [formData, setFormData] = useState<any>(null)

  useEffect(() => {
    const pro = populatedProfessionals.find((p) => p.id === currentUserId)
    if (pro) {
      setFormData({
        name: pro.name,
        phone: pro.phone,
        description: pro.description,
        address: pro.address || '',
        categoryId: pro.category_id,
        neighborhoodId: pro.neighborhood_id,
      })
    } else {
      navigate('/')
    }
  }, [currentUserId, populatedProfessionals, navigate])

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

  if (!formData) return null

  return (
    <div className="container mx-auto px-4 py-12 max-w-xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-secondary">Editar Perfil</h1>
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
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
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
          <Button type="submit" className="flex-1">
            Salvar Alterações
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditProfilePage
