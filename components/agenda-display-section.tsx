import { AgendaItem } from "@/lib/types/event.type"
import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"

const AgendaDisplaySection = ({agenda, timezone}: {agenda: AgendaItem[], timezone: string}) => {
  return (
    <ul className="space-y-3 tracking-tight list-disc pl-5">
      {agenda.map((item, index) => (
        <li key={index}>{`${format(toZonedTime(item.start_datetime, timezone), "hh:mm a")} - ${format(toZonedTime(item.end_datetime, timezone), "hh:mm a")} | ${item.description || item.title}`}</li>
      ))}
    </ul>
  )
}

export default AgendaDisplaySection