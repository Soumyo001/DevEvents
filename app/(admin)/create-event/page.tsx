"use client"

import React, { useState } from "react"
import { format } from "date-fns"
import {
  CalendarIcon,
  Clock,
  MapPin,
  Image as ImageIcon,
  Users,
  Globe,
  Lock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { eventSchema, eventSchemaType } from "@/lib/validator/schema_validator/event.schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldDescription } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import DateTimePicker from "@/components/date-time-picker"
import TimezonePicker from "@/components/timezone-picker"
import TagInput from "@/components/tag-input"

export default function CreateEventPage() {
  const [isPublic, setIsPublic] = useState(true)
  const [cover, setCover] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    watch,
    setValue
  } = useForm<eventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      image: undefined,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      capacity: null,
      agenda: [],
      audience: [],
      tags: [],
      is_published: false
    }
  });

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <form id="eventform">
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
            <label 
            htmlFor="cover"
            className={cn(
              "flex h-52 cursor-pointer justify-center items-center bg-linear-to-br from-primary/8 via-muted to-primary/10 transition-colors hover:bg-muted/30",
              cover && "bg-cover bg-center"
            )}
            style={cover ? {backgroundImage: `url(${cover})`} : undefined}
            >
              {!cover && 
              <div className="flex flex-col justify-center items-center text-muted-foreground">
                <ImageIcon className="mb-2 h-6 w-6"/>
                <span className="text-sm font-medium">Upload cover image</span>
                <span className="text-xs">PNG or JPG upto 5MB</span>
              </div>}
              <input 
                id="cover"
                type="file"
                className="hidden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if(file) setCover(URL.createObjectURL(file));
                }}
              />
            </label>
          </Card>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Event details</CardTitle>
              <CardDescription>Name, description</CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="event_name">Event name</FieldLabel>
                  <Input
                    id="event_name"
                    placeholder="Summer Product Launch"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    placeholder="Tell people what this event is about..."
                    className="min-h-28 resize-none"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="tags">Tags</FieldLabel>
                  <TagInput
                    placeholder="Search or add tags..."
                    suggestions={["Hackathon", "Conference", "Meetup", "Workshop","Webinar", "Bootcamp", "Summit", "Open Source"]}
                    value={watch("tags")}
                    onChange={(val: string[]) => setValue("tags", val)}
                  />
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
                <Field>
                  <FieldLabel>Timezone</FieldLabel>
                  <TimezonePicker
                    value={watch("timezone")}
                    onChange={(val: string) => setValue("timezone", val)}
                  />
                </Field>
                <FieldGroup className="flex flex-row justify-between items-center max-sm:flex-col">
                  <Field>
                    <FieldLabel>Start Date & Time</FieldLabel>
                    <DateTimePicker
                      label="Start Date & Time"
                      timezone={watch("timezone")}
                      value={watch("start_datetime")}
                      onChange={(val: string) => setValue("start_datetime", val)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel>End Date & Time</FieldLabel>
                    <DateTimePicker
                      label="End Date & Time"
                      timezone={watch("timezone")}
                      value={watch("end_datetime")}
                      onChange={(val: string) => setValue("end_datetime", val)}
                    />
                  </Field>
                </FieldGroup>
                <Field>
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
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}