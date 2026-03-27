import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FileText, CheckCircle2, XCircle, Clock } from 'lucide-react'
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

export function AdminQuotesTab() {
  const { quotes, clients, populatedProfessionals } = useMainStore()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 gap-1">
            <CheckCircle2 className="w-3 h-3" /> Concluído
          </Badge>
        )
      case 'accepted':
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 gap-1">
            <Clock className="w-3 h-3" /> Em Andamento
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="w-3 h-3" /> Cancelado
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="gap-1">
            <Clock className="w-3 h-3" /> Pendente
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground mb-1">Total de Orçamentos</p>
          <h4 className="text-3xl font-bold text-secondary">{quotes.length}</h4>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground mb-1">Serviços Concluídos</p>
          <h4 className="text-3xl font-bold text-green-600">
            {quotes.filter((q) => q.status === 'completed').length}
          </h4>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground mb-1">Volume Financeiro (R$)</p>
          <h4 className="text-3xl font-bold text-secondary">
            R${' '}
            {quotes
              .filter((q) => q.status === 'completed')
              .reduce((acc, q) => acc + (q.price || 0), 0)
              .toFixed(2)
              .replace('.', ',')}
          </h4>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold text-secondary">Data</TableHead>
              <TableHead className="font-semibold text-secondary">Cliente</TableHead>
              <TableHead className="font-semibold text-secondary">Prestador Solicitado</TableHead>
              <TableHead className="font-semibold text-secondary">Descrição</TableHead>
              <TableHead className="font-semibold text-secondary text-right">
                Valor Negociado
              </TableHead>
              <TableHead className="font-semibold text-secondary text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.map((quote) => {
              const client = clients.find((c) => c.id === quote.client_id)
              const pro = populatedProfessionals.find((p) => p.id === quote.professional_id)

              return (
                <TableRow key={quote.id} className="hover:bg-slate-50/50">
                  <TableCell className="text-sm whitespace-nowrap">
                    {format(new Date(quote.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{client?.name || 'Desconhecido'}</div>
                    <div className="text-xs text-muted-foreground">{client?.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{pro?.name || 'Desconhecido'}</div>
                    <div className="text-xs text-muted-foreground">{pro?.category?.name}</div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate" title={quote.description}>
                    <span className="text-sm text-slate-600">{quote.description}</span>
                  </TableCell>
                  <TableCell className="text-right font-medium text-slate-700 whitespace-nowrap">
                    {quote.price ? `R$ ${quote.price.toFixed(2).replace('.', ',')}` : '-'}
                  </TableCell>
                  <TableCell className="text-center">{getStatusBadge(quote.status)}</TableCell>
                </TableRow>
              )
            })}
            {quotes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <FileText className="w-8 h-8 text-muted-foreground mx-auto mb-3 opacity-20" />
                  <p className="text-muted-foreground">
                    Nenhuma solicitação de orçamento registrada até o momento.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
