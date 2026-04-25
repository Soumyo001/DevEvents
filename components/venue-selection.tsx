'use client'

import { MapPin, Video, Layers } from "lucide-react";
import { FieldGroup, Field, FieldLabel, FieldError } from "./ui/field";
import { useFormContext, Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import { eventSchemaType } from "@/lib/validator/schema_validator/event.schema";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const MODES = [
    {
        value: "In-Person",
        label: "In-Person",
        icon: MapPin,
        description: "Physical location",
    },
    {
        value: "Online",
        label: "Online",
        icon: Video,
        description: "Virtual event",
    },
    {
        value: "Hybrid",
        label: "Hybrid",
        icon: Layers,
        description: "Both formats"
    }
] as const;


const VenueSelection = () => {
    const form = useFormContext<eventSchemaType>();
    const mode = form.watch("venue.mode");
    const showVenueData = mode === "In-Person" || mode === "Hybrid";

    return (
        <FieldGroup>
            <Controller
                name="venue.mode"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel>Mode</FieldLabel>
                        <div className="grid grid-cols-3 gap-3">
                            {MODES.map(({value, label, icon: Icon, description}) => (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => {
                                        field.onChange(value);
                                        if(value === "Online") {
                                            form.setValue("venue.city", "");
                                            form.setValue("venue.country", "");
                                            form.setValue("venue.name", "");
                                            form.setValue("venue.state", "");
                                        }
                                    }}
                                    className={cn(
                                        "flex flex-col justify-center items-center w-full p-4 bg-secondary border rounded-lg text-sm text-muted-foreground transition-colors duration-200 cursor-pointer",
                                        field.value === value
                                            ? "border-primary text-primary bg-accent/70"
                                            : "border-input hover:text-primary hover:bg-accent/70"
                                    )}
                                >
                                    <Icon className="w-5 h-5"/>
                                    <span className="font-semibold">{label}</span>
                                    <span className="text-xs opacity-70">{description}</span>
                                </button>
                            ))}
                        </div>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}
            />
            {showVenueData && 
                <>
                    <Controller
                        control={form.control}
                        name="venue.name"
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="venueName">Venue name</FieldLabel>
                                <Input
                                    {...field}
                                    id="venueName"
                                    type="text"
                                    placeholder="e.g. Yerba Buena Center for the Arts"
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-4">
                        <Controller
                            control={form.control}
                            name="venue.city"
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="venueCity">City</FieldLabel>
                                    <Input
                                        {...field}
                                        id="venueCity"
                                        type="text"
                                        placeholder="San Francisco"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="venue.state"
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="venueState">
                                        State
                                        <span className="text-muted-foreground text-xs">
                                            optional
                                        </span>
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="venueState"
                                        type="text"
                                        placeholder="CA"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="venue.country"
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="venueCountry">Country</FieldLabel>
                                    <Input
                                        {...field}
                                        id="venueCountry"
                                        type="text"
                                        placeholder="USA"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                    </div>
                </>
            }
        </FieldGroup>
    )
}

export default VenueSelection