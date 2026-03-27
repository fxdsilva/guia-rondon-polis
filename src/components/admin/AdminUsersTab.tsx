import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useMainStore from '@/stores/main'

export function AdminUsersTab() {
  const { clients } = useMainStore()

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border">
        <div>
          <h2 className="text-xl font-bold text-secondary">Gestão de Clientes</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Usuários que acessaram e solicitaram orçamentos aos prestadores via plataforma.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold text-secondary">Nome do Cliente</TableHead>
              <TableHead className="font-semibold text-secondary">Telefone / WhatsApp</TableHead>
              <TableHead className="font-semibold text-secondary text-right">
                Data do Primeiro Acesso
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id} className="hover:bg-slate-50/50">
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {format(new Date(client.created_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </TableCell>
              </TableRow>
            ))}
            {clients.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-12 text-muted-foreground">
                  Nenhum cliente cadastrado ainda no banco de dados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
