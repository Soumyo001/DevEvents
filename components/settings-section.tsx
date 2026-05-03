'use client'
import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "./ui/switch";
import { FieldGroup, Field, FieldLabel, FieldError } from "./ui/field";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { eventSchemaType } from "@/lib/validator/schema_validator/event.schema";

const SettingSection = () => {
    const form = useFormContext<eventSchemaType>();

    return (
      <FieldGroup>
            <Controller
                control={form.control}
                name="capacity"
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="capacity">
                            Capacity
                            <span className="text-xs text-muted-foreground">
                                optional
                            </span>
                        </FieldLabel>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <Input
                                id="capacity"
                                type="number"
                                placeholder="e.g. 500"
                                min={1}
                                value={field.value ?? ""}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    field.onChange(val === ""? null : Number(val));
                                }}
                                className="max-w-40"
                                aria-invalid={fieldState.invalid}
                            />
                            <Badge variant={"outline"}>
                                empty = unlimited
                            </Badge>
                        </div>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="is_published"
                render={({field, fieldState}) => (
                    <Field 
                        orientation={"horizontal"}
                        data-invalid={fieldState.invalid}
                        className="border p-4 rounded-lg"
                    >
                        <div className="flex-1">
                            <FieldLabel htmlFor="publish-event">Publish event</FieldLabel>
                            <span className="text-xs text-muted-foreground block mt-1">
                                Event will be visible to users once published
                            </span>
                        </div>
                        <Switch
                            id="publish-event"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="is_featured"
                render={({field, fieldState}) => (
                    <Field
                        orientation={"horizontal"}
                        data-invalid={fieldState.invalid}
                        className="border p-4 rounded-lg"
                    >
                        <div className="flex-1">
                            <FieldLabel htmlFor="feature-event">Feature this event</FieldLabel>
                            <span className="text-xs text-muted-foreground block mt-1">
                                Featured events appear on the homepage
                            </span>
                        </div>
                        <Switch
                            id="feature-event"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]}/>}
                    </Field>
                )}
            />
      </FieldGroup>
    )
}

export default SettingSection