import { useFormContext, Controller } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { eventSchemaType } from "@/lib/validator/schema_validator/event.schema";
import { FieldGroup, Field, FieldLabel, FieldError } from "./ui/field";

const TitleDescriptionSection = () => {
    const form = useFormContext<eventSchemaType>();
    
    return (
        <FieldGroup>
            <Controller
                control={form.control}
                name="title"
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="event_name">Event name</FieldLabel>
                      <Input
                        {...field}
                        id="event_name"
                        type="text"
                        placeholder="Summer Product Launch"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="description"
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Tell people what this event is about..."
                        aria-invalid={fieldState.invalid}
                        className="min-h-28 resize-none"
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}
            />
        </FieldGroup>
    )
}

export default TitleDescriptionSection