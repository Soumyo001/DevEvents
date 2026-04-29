'use client'
import { useFormContext, Controller } from "react-hook-form";
import { eventSchemaType } from "@/lib/validator/schema_validator/event.schema";
import { FieldGroup, Field, FieldLabel, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const OrganizerSection = () => {
    const form = useFormContext<eventSchemaType>();

    return (
      <FieldGroup>
        <Controller
            control={form.control}
            name="organizer.organizer_name"
            render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="organizer-name">Organizer name</FieldLabel>
                    <Input
                        {...field}
                        id="organizer-name"
                        type="text"
                        placeholder="e.g. Github"
                        aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                </Field>
            )}
        />
        <Controller
            control={form.control}
            name="organizer.description"
            render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="organizer-description">
                        Organizer description
                        <span className="text-xs text-muted-foreground">
                            optional
                        </span>
                    </FieldLabel>
                    <Textarea
                        {...field}
                        id="organizer-description"
                        placeholder="Brief description of the organizer..."
                        aria-invalid={fieldState.invalid}
                        className="min-h-24 resize-none"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                </Field>
            )}
        />
      </FieldGroup>
    )
}

export default OrganizerSection