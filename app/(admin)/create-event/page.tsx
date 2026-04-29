'use client'
import { eventSchema, eventSchemaType } from "@/lib/validator/schema_validator/event.schema"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import DateTimePicker from "@/components/date-time-picker"
import TimezonePicker from "@/components/timezone-picker"
import TagInput from "@/components/tag-input"
import VenueSection from "@/components/venue-section"
import OrganizerSection from "@/components/organizer-section"
import AgendaSection from "@/components/agenda-section"
import SettingSection from "@/components/settings-section"
import TitleDescriptionSection from "@/components/title-description-section"
import ImageUpload from "@/components/image-upload-section"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useEffect, useState } from "react"

export default function CreateEventPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [audiences, setAudiences] = useState<string[]>([]);
  useEffect(() => {
    fetch('/api/taxonomies?type=tag')
    .then(res => res.json())
    .then(body => setTags(body));
    
    fetch('/api/taxonomies?type=audience')
    .then(res => res.json())
    .then(body => setAudiences(body));

  }, []);

  const form = useForm<eventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      image: undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      capacity: null,
      agenda: [],
      audience: [],
      tags: [],
      title: "",
      description: "",
      start_datetime: "",
      end_datetime: "",
      registration_deadline: "",
      venue: { 
        mode: "In-Person", 
        name: "", 
        city: "", 
        state: "", 
        country: "",
      },
      organizer: { organizer_name: "", description: "" },
      is_published: false
    }
  });

  const { 
    handleSubmit,
    formState: {errors},
    watch,
    setValue
  } = form;

  const onSubmit = async (data: eventSchemaType) => {
    await toast.promise(
      fetch("/api/events", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      }).then(async res => {
        const body = await res.json();
        if(!res.ok) throw new Error(body.message || "Failed to create event");
        return body.message;
      }),
      {
        loading: `${data.is_published? "Publishing":"Uploading"} event`,
        success: data => data,
        error: (err: Error) => err.message
      }
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 rounded-md">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <FormProvider {...form}>
          <form id="eventform" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8 flex flex-row justify-start items-center">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Create event
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in the details below to publish your event
                </p>
              </div>
            </div>
            <Card className="mb-6 border-dashed">
              <ImageUpload
                value={watch("image")}
                onChange={(val: string) => setValue("image", val)}
              />
              <CardDescription>
                {errors.image && <p className="text-sm text-destructive">
                  {errors.image.message}
                </p>}
              </CardDescription>
            </Card>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Event details</CardTitle>
                <CardDescription>Name, description</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <TitleDescriptionSection/>
                  <Field data-invalid={errors.tags? true:false}>
                    <FieldLabel>Tags</FieldLabel>
                    <TagInput
                      placeholder="Search or add tags..."
                      suggestions={tags}
                      value={watch("tags")}
                      onChange={(val: string[]) => setValue("tags", val)}
                    />
                    {errors.tags && 
                    <p className="text-sm text-destructive">
                      {errors.tags.message}
                    </p>}
                  </Field>
                  <Field data-invalid={errors.audience? true:false}>
                    <FieldLabel>Audience</FieldLabel>
                    <TagInput
                      placeholder="Search or add audience..."
                      suggestions={audiences}
                      value={watch("audience")}
                      onChange={(val: string[]) => setValue("audience", val)}
                    />
                    {errors.audience && 
                    <p className="text-sm text-destructive">
                      {errors.audience.message}
                    </p>}
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Date & Time</CardTitle>
                <CardDescription>Schedule & Description</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field data-invalid={errors.timezone? true:false}>
                    <FieldLabel>Timezone</FieldLabel>
                    <TimezonePicker
                      value={watch("timezone")}
                      onChange={(val: string) => setValue("timezone", val)}
                    />
                    {errors.timezone && <p className="text-sm text-destructive">
                      {errors.timezone.message}
                    </p>}
                  </Field>
                  <FieldGroup className="flex flex-row justify-between items-center max-sm:flex-col">
                    <Field data-invalid={errors.start_datetime? true:false}>
                      <FieldLabel>Start Date & Time</FieldLabel>
                      <DateTimePicker
                        label="Start Date & Time"
                        timezone={watch("timezone")}
                        value={watch("start_datetime")}
                        onChange={(val: string) => setValue("start_datetime", val)}
                      />
                      {errors.start_datetime && <p className="text-sm text-destructive">
                        {errors.start_datetime.message}
                      </p>}
                    </Field>
                    <Field data-invalid={errors.end_datetime? true:false}>
                      <FieldLabel>End Date & Time</FieldLabel>
                      <DateTimePicker
                        label="End Date & Time"
                        timezone={watch("timezone")}
                        value={watch("end_datetime")}
                        onChange={(val: string) => setValue("end_datetime", val)}
                      />
                      {errors.end_datetime && <p className="text-sm text-destructive">
                        {errors.end_datetime.message}
                      </p>}
                    </Field>
                  </FieldGroup>
                  <Field data-invalid={errors.registration_deadline? true:false}>
                    <FieldLabel>Registration Deadline</FieldLabel>
                    <DateTimePicker
                      label="Registration Deadline"
                      timezone={watch("timezone")}
                      value={watch("registration_deadline")}
                      onChange={(val) => setValue("registration_deadline", val)}
                    />
                    <FieldDescription className="text-xs text-muted-foreground text-left">
                      Users cannot book after this date
                    </FieldDescription>
                    {errors.registration_deadline && <p className="text-sm text-destructive">
                      {errors.registration_deadline.message}
                    </p>}
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Venue</CardTitle>
                <CardDescription>Where the event will happen?</CardDescription>
              </CardHeader>
              <CardContent>
                <VenueSection/>
              </CardContent>
            </Card>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Organizer</CardTitle>
                <CardDescription>Tell something about the organizer</CardDescription>
              </CardHeader>
              <CardContent>
                  <OrganizerSection/>
              </CardContent>
            </Card>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  Agenda{" "}
                  <span className="text-muted-foreground text-xs">
                    optional
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AgendaSection/>
              </CardContent>
            </Card>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent>
                  <SettingSection/>
              </CardContent>
            </Card>
            <div className="text-right">
              <Button
                type="submit"
                form="eventform"
                variant={"outline"}
              >
                {form.watch("is_published") ? "Publish event" : "Save event"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}