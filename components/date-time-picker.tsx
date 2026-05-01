'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { cn } from "../lib/utils";

type props = {
    label: string;
    timezone: string;
    value: string;
    onChange: (val: string) => void
}

const DateTimePicker = ({label, timezone, value, onChange}: props) => {
    const [time, setTime] = useState<string>(
        value ? format(new Date(value), "HH:mm") : "09:00"
    );
    const [date, setDate] = useState<Date|undefined>(
        value? new Date(value) : undefined
    );
    
    const handleDateChange = (date: Date|undefined) => {
        if(!date) return;
        setDate(date);
        commit(date, time);
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = e.target.value;
        setTime(newTime);
        if(date) commit(date, newTime);
    }

    const commit = (dateStr: Date, timeStr: string) => {
        const formattedDate = format(dateStr, "yyyy-MM-dd");
        const combined = `${formattedDate}T${timeStr}:00`;
        const utc = fromZonedTime(combined, timezone);
        onChange(utc.toISOString());
    }

    return (
      <Popover>
          <PopoverTrigger asChild>
              <Button variant="outline" className={cn(
                "flex flex-row justify-start items-center",
                date? "text-white/90" : "text-muted-foreground"
              )}>
                <CalendarIcon className="mr-2 h-4 w-4"/>
                {date && time
                    ?`${format(date, "MMM dd, yyyy")} ${time}`
                    :`Pick ${label.toLowerCase()}`}
              </Button>
          </PopoverTrigger>
          <PopoverContent className="gap-2" align="start">
            <div className="w-auto flex flex-col items-center border border-border rounded-md">
                <span className="font-bold text-lg p-2 text-muted-foreground">Time</span>
                <Separator/>
                <input 
                    type="time"
                    value={time}
                    onChange={handleTimeChange}
                    className="flex-1 px-2 py-1 text-white/80"
                    autoFocus
                />
            </div>
            <div className="w-auto flex flex-col items-center border border-border rounded-md">
                <span className="text-lg font-bold p-2 text-muted-foreground">Date</span>
                <Separator/>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    className="text-white/80 flex-1"
                />
            </div>
          </PopoverContent>
      </Popover>
    )
}

export default DateTimePicker