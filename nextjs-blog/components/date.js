import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default function DateParser({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</time>
}
