import { Download, TrendingUp } from 'lucide-react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useMainStore from '@/stores/main'

export function AdminReportsTab() {
  const { populatedProfessionals } = useMainStore()

  const handleExport = () => {
    const headers = [
      'Nome do Profissional',
      'Data de Cadastro',
      'Tempo na Plataforma',
      'Total Pago (R$)',
      'Cliques WhatsApp',
      'Status Plano',
    ]

    const rows = populatedProfessionals.map((pro) => {
      const dateObj = new Date(pro.created_at || Date.now())
      const dateStr = format(dateObj, 'dd/MM/yyyy')
      const timeSince = formatDistanceToNow(dateObj, { locale: ptBR })
      const totalPaid = pro.totalPaid ? pro.totalPaid.toFixed(2).replace('.', ',') : '0,00'

      return [
        `"${pro.name}"`,
        `"${dateStr}"`,
        `"${timeSince}"`,
        `"${totalPaid}"`,
        `${pro.whatsapp_clicks || 0}`,
        `"${pro.plan?.name || 'Gratuito'}"`,
      ]
    })

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `relatorio_profissionais_${format(new Date(), 'yyyyMMdd_HHmm')}.csv`
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border">
        <div>
          <h2 className="text-lg font-semibold text-secondary">Exportação de Dados</h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe métricas de engajamento e financeiro dos profissionais cadastrados.
          </p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download className="w-4 h-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead>Profissional</TableHead>
              <TableHead>Data de Cadastro</TableHead>
              <TableHead>Tempo de Conta</TableHead>
              <TableHead className="text-right">Total Pago (R$)</TableHead>
              <TableHead className="text-center">Acessos WhatsApp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {populatedProfessionals.map((pro) => {
              const dateObj = new Date(pro.created_at || Date.now())
              return (
                <TableRow key={pro.id}>
                  <TableCell>
                    <div className="font-medium text-secondary">{pro.name}</div>
                    <div className="text-xs text-muted-foreground">{pro.plan?.name}</div>
                  </TableCell>
                  <TableCell>{format(dateObj, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{formatDistanceToNow(dateObj, { locale: ptBR })}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    R$ {pro.totalPaid ? pro.totalPaid.toFixed(2).replace('.', ',') : '0,00'}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        pro.whatsapp_clicks && pro.whatsapp_clicks > 0 ? 'default' : 'secondary'
                      }
                      className="gap-1"
                    >
                      <TrendingUp className="w-3 h-3" />
                      {pro.whatsapp_clicks || 0}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
            {populatedProfessionals.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  Nenhum dado disponível.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
