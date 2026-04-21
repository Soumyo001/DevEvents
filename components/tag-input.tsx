'use client'
import { 
    Popover,
    PopoverContent,
    PopoverTrigger 
} from "./ui/popover";
import { 
    Command,
    CommandList,
    CommandEmpty ,
    CommandItem
} from "./ui/command";
import { Badge } from "./ui/badge";
import { useRef, useState } from "react";
import { X } from "lucide-react";

type props = {
    placeholder: string;
    suggestions: string[];
    value: string[];
    onChange: (val: string[]) => void
}

const TagInput = ({placeholder, suggestions, value, onChange}: props) => {
    const [open, setOpen] = useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const filter = suggestions.filter(
        (val) => val.toLowerCase().includes(query.toLowerCase())
            && value.every(selectedVal => selectedVal.toLowerCase() !== val.toLowerCase())
    );

    const addItem = (item: string) => {
        const trimmed = item.trim();
        if(trimmed && value.every(val => val.toLowerCase() !== trimmed.toLowerCase())) {
            onChange([...value, trimmed]);
            setOpen(false);
        }
        setQuery("");
        inputRef.current?.focus();
    }

    const removeItem = (item: string) => {
        onChange(value.filter(val => val !== item));
    }

    const handleKeyEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter" && query.trim()) {
            addItem(query);
        }
        else if(e.key === "Backspace" && !query && value.length > 0) {
            removeItem(value[value.length-1]);
        }
        else if(e.key === "Escape") {
            setOpen(false);
        }
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div
                    className="flex flex-wrap items-center w-full min-h-10 bg-muted rounded-md border-2 border-border p-2"
                    onClick={(e) => {
                        setOpen(true);
                        inputRef.current?.focus();
                    }}
                >
                    {value.map((tag) => (
                        <Badge
                            key={tag}
                            variant={"outline"}
                        >
                            {tag}
                            <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeItem(tag);
                                }}
                            />
                        </Badge>
                    ))}
                    <input
                        ref={inputRef} 
                        type="text" 
                        className="flex-1 min-w-24 border-none outline-none bg-transparent"
                        placeholder={value.length > 0? "" : placeholder}
                        value={query}
                        onChange={(e) => {
                            setOpen(true);
                            setQuery(e.target.value);
                        }}
                        onKeyDown={handleKeyEvent}                        
                    />
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandList>
                        <CommandEmpty>
                            {query.trim()
                                ? `Press enter to add "${query}"`
                                : "Start typing to search..."}
                        </CommandEmpty>
                        {filter.map((tag) => (
                            <CommandItem
                                key={tag}
                                onSelect={() => addItem(tag)}
                            >
                                {tag}
                            </CommandItem>
                        ))}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default TagInput