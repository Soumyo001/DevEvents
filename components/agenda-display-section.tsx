import { AgendaItem } from "@/lib/types/event.type"
import { format } from "date-fns"

const AgendaDisplaySection = ({agenda}: {agenda: AgendaItem[]}) => {
  return (
    <ul className="space-y-3 tracking-tight list-disc pl-5">
      {agenda.map((item, index) => (
        <li key={index}>{`${format(new Date(item.start_datetime), "hh:mm a")} - ${format(new Date(item.end_datetime), "hh:mm a")} | ${item.description ? item.description:""}`}</li>
      ))}
    </ul>
  )
}

export default AgendaDisplaySection