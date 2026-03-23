import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
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
import { MOCK_CATEGORIES, MOCK_NEIGHBORHOODS } from '@/stores/mockData'
import useMainStore from '@/stores/main'

const RegisterPage = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const { addProfessional } = useMainStore()

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    category: '',
    neighborhoods: '',
    description: '',
    services: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    // Finish
    addProfessional({
      id: `new-${Date.now()}`,
      name: formData.name,
      category: formData.category as any,
      rating: 5.0,
      reviewsCount: 0,
      neighborhoods: formData.neighborhoods.split(',').map((s) => s.trim()),
      premium: false,
      verified: false,
      phone: formData.phone.replace(/\D/g, ''),
      description: formData.description,
      services: formData.services.split(',').map((s) => s.trim()),
      image: 'https://img.usecurling.com/ppl/medium',
      gallery: [],
      reviews: [],
      workingHours: 'A combinar',
    })
    setStep(4) // Success screen
  }

  if (step === 4) {
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
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-secondary mb-2">Cadastre seus Serviços</h1>
        <p className="text-muted-foreground">
          Preencha os dados abaixo para criar seu perfil profissional no guia.
        </p>
      </div>

      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-muted -z-10" />
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= num ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            {num}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border animate-fade-in"
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
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Bairros Atendidos (separados por vírgula)
              </label>
              <Input
                required
                value={formData.neighborhoods}
                onChange={(e) => setFormData({ ...formData, neighborhoods: e.target.value })}
                placeholder="Centro, Vila Aurora, ..."
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Detalhes do Serviço</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição sobre você</label>
              <Textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Conte um pouco sobre sua experiência..."
                className="h-24"
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
                placeholder="Manutenção, Instalação, ..."
              />
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
          <Button type="submit">{step === 3 ? 'Finalizar Cadastro' : 'Avançar'}</Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
