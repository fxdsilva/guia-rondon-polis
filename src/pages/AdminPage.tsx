import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'

const AdminPage = () => {
  const { professionals, togglePremium, toggleVerified } = useMainStore()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 border-b pb-6">
        <h1 className="text-3xl font-bold text-secondary">Painel Administrativo</h1>
        <p className="text-muted-foreground">Gerencie os profissionais cadastrados no guia.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Profissional</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Premium</TableHead>
              <TableHead className="text-center">Verificado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {professionals.map((pro) => (
              <TableRow key={pro.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={pro.image}
                      alt={pro.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold">{pro.name}</p>
                      <p className="text-xs text-muted-foreground">{pro.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{pro.category}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Ativo
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Switch checked={pro.premium} onCheckedChange={() => togglePremium(pro.id)} />
                </TableCell>
                <TableCell className="text-center">
                  <Switch checked={pro.verified} onCheckedChange={() => toggleVerified(pro.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AdminPage
