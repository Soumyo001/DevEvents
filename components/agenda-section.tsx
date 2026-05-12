'use client'
import { 
    FieldGroup,
    Field,
    FieldLabel,
    FieldError
} from "./ui/field";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { eventSchemaType } from "@/lib/validator/schema_validator/event.schema";
import DateTimePicker from "./date-time-picker";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus, Trash2 } from "lucide-react";


const AgendaSection = () => {
    const form = useFormContext<eventSchemaType>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "agenda"
    });
    const timezone = form.watch("timezone");

    const addAgendaItem = () => {
        append({
            title: "",
            description: "",
            start_datetime: "",
            end_datetime: ""
        });
    }

    return (
        <FieldGroup>
            {fields.length === 0 && 
            <div className="border border-border border-dashed w-full p-8 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-3">
                    No agenda items yet
                </p>
                <Button
                    type="button"
                    variant={"outline"}
                    size={"sm"}
                    onClick={addAgendaItem}
                >
                    <Plus className="h-3 w-3"/>
                    Add first item
                </Button>
            </div>}
            {fields.map((field, index) => (
                <div 
                    key={field.id}
                    className="bg-accent/30 space-y-3 p-4 rounded-lg border border-border"
                >
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                            Item {index+1}
                        </span>
                        <Button
                            type="button"
                            variant={"ghost"}
                            size={"sm"}
                            className="text-destructive hover:text-destructive"
                            onClick={() => remove(index)}
                        >
                            <Trash2 className="h-3 w-3"/>Remove
                        </Button>
                    </div>
                    <Controller
                        control={form.control}
                        name={`agenda.${index}.title`}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={`agenda-${index}-title`}>
                                    Title
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={`agenda-${index}-title`}
                                    type="text"
                                    placeholder="e.g. Opening Keynote"
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}
                    />
                    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
                        <Controller
                            control={form.control}
                            name={`agenda.${index}.start_datetime`}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Start time</FieldLabel>
                                    <DateTimePicker
                                        label="start time"
                                        timezone={timezone}
                                        value={field.value}
                                        onChange={(val: string) => field.onChange(val)}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name={`agenda.${index}.end_datetime`}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>End time</FieldLabel>
                                    <DateTimePicker
                                        label="end time"
                                        timezone={timezone}
                                        value={field.value}
                                        onChange={(val: string) => field.onChange(val)}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                                </Field>
                            )}
                        />
                    </div>
                    <Controller
                        control={form.control}
                        name={`agenda.${index}.description`}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={`agenda-${index}-description`}>
                                    Description
                                    <span className="text-xs text-muted-foreground">
                                        optional
                                    </span>
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={`agenda-${index}-description`}
                                    type="text"
                                    placeholder="Brief session description..."
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                            </Field>
                        )}
                    />
                </div>
            ))}
            {fields.length > 0 && 
            <Button
                type="button"
                variant={"outline"}
                className="w-full border-dashed"
                onClick={addAgendaItem}
            >
                <Plus className="w-4 h-4"/>
                Add agenda item
            </Button> }
        </FieldGroup>
    )
}

export default AgendaSection