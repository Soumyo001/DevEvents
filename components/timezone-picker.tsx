"use client";

import { useState, useMemo } from "react";
import {
    Command,
    CommandInput,
    CommandItem,
    CommandList,
    CommandEmpty,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { formatTimezone } from "@/lib/helpers/formatter";

type Props = {
    value:    string;
    onChange: (val: string) => void;
}

export default function TimezoneSelect({ value, onChange }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const timezones = useMemo(() => Intl.supportedValuesOf("timeZone"), []);
    const filter = useMemo(
        () => 
            timezones.filter((val: string) => val.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 50),
        [query, timezones]
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    role="combobox"
                    className="w-full justify-between font-normal"
                >
                    {value ? formatTimezone(value): "Select timezone..."}
                    <ChevronsUpDown className="h-4 w-4 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-100 p-0">
                <Command className="gap-2">
                    <CommandInput
                        placeholder="Select timezone..."
                        value={query}
                        onValueChange={setQuery}
                    />
                    <CommandList className="max-h-64 overflow-y-auto">
                        <CommandEmpty>No Timezone found.</CommandEmpty>
                        {filter.map((tz) => (
                            <CommandItem
                                key={tz}
                                value={tz}
                                onSelect={()=>{
                                    onChange(tz);
                                    setOpen(false);
                                    setQuery("");
                                }}
                            >
                                {formatTimezone(tz)}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}