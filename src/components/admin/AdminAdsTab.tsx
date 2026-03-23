import { useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { MultiSelect } from '@/components/MultiSelect'
import useMainStore from '@/stores/main'

export function AdminAdsTab() {
  const { ads, categories, toggleAdActive, addAd, updateAd, deleteAd } = useMainStore()
  const [isAdSheetOpen, setIsAdSheetOpen] = useState(false)
  const [editingAdId, setEditingAdId] = useState<string | null>(null)
  const [adForm, setAdForm] = useState({
    companyName: '',
    description: '',
    imageUrl: '',
    link: '',
    targetCategories: [] as string[],
  })

  const AD_TARGET_OPTIONS = categories.map((c) => ({
    label: c.name,
    value: c.id,
    group: c.group,
  }))

  const handleAdSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingAdId) {
      updateAd(editingAdId, adForm)
    } else {
      addAd({ id: `ad-${Date.now()}`, ...adForm, active: true })
    }
    setIsAdSheetOpen(false)
    resetAdForm()
  }

  const resetAdForm = () => {
    setEditingAdId(null)
    setAdForm({
      companyName: '',
      description: '',
      imageUrl: '',
      link: '',
      targetCategories: [],
    })
  }

  const handleEditAd = (ad: any) => {
    setEditingAdId(ad.id)
    setAdForm({ ...ad })
    setIsAdSheetOpen(true)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-end">
        <Button onClick={() => setIsAdSheetOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Adicionar Patrocinador
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Empresa</TableHead>
              <TableHead>Categorias Alvo</TableHead>
              <TableHead className="text-center">Ativo</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.map((ad) => (
              <TableRow key={ad.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={ad.imageUrl}
                      alt=""
                      className="w-12 h-8 rounded object-cover border bg-muted"
                    />
                    <span className="font-semibold">{ad.companyName}</span>
                  </div>
                </TableCell>
                <TableCell
                  className="max-w-[250px] truncate"
                  title={ad.targetCategories.join(', ')}
                >
                  {ad.targetCategories.join(', ')}
                </TableCell>
                <TableCell className="text-center">
                  <Switch checked={ad.active} onCheckedChange={() => toggleAdActive(ad.id)} />
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEditAd(ad)}>
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteAd(ad.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {ads.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Nenhum patrocinador cadastrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Sheet
        open={isAdSheetOpen}
        onOpenChange={(val) => {
          setIsAdSheetOpen(val)
          if (!val) resetAdForm()
        }}
      >
        <SheetContent className="overflow-y-auto sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle>{editingAdId ? 'Editar Patrocinador' : 'Novo Patrocinador'}</SheetTitle>
          </SheetHeader>
          <form onSubmit={handleAdSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome da Empresa</label>
              <Input
                required
                value={adForm.companyName}
                onChange={(e) => setAdForm({ ...adForm, companyName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">URL da Imagem / Banner</label>
              <Input
                required
                value={adForm.imageUrl}
                onChange={(e) => setAdForm({ ...adForm, imageUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Link de Destino</label>
              <Input
                required
                value={adForm.link}
                onChange={(e) => setAdForm({ ...adForm, link: e.target.value })}
                placeholder="WhatsApp ou Site"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categorias Alvo</label>
              <MultiSelect
                options={AD_TARGET_OPTIONS}
                selected={adForm.targetCategories}
                onChange={(v) => setAdForm({ ...adForm, targetCategories: v })}
                placeholder="Onde exibir este anúncio?"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Texto do Anúncio</label>
              <Textarea
                required
                value={adForm.description}
                onChange={(e) => setAdForm({ ...adForm, description: e.target.value })}
                className="h-24"
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Salvar
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
