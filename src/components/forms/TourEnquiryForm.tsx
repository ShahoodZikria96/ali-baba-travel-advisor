"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, TextArea, FormSuccess } from "@/components/forms/FormFields";
import { whatsappHref } from "@/lib/whatsapp";
import { submitLead } from "@/lib/leads";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().min(9, "Enter a valid phone number"),
  destination: z.string().min(2, "Enter your destination"),
  travelers: z.string().min(1, "Enter number of travelers"),
  travelMonth: z.string().min(2, "Enter preferred travel month"),
  departureCity: z.string().min(2, "Enter your departure city"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function TourEnquiryForm({
  defaultDestination,
  whatsappNumber = "923111666076",
}: {
  defaultDestination?: string;
  whatsappNumber?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { destination: defaultDestination ?? "" },
  });

  const onSubmit = (data: FormValues) => {
    const message = [
      `Hi, I would like details about a tour to ${data.destination}.`,
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Travelers: ${data.travelers}`,
      `Preferred Month: ${data.travelMonth}`,
      `Departure City: ${data.departureCity}`,
      data.message ? `Message: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    submitLead("tour_enquiry", data);
    window.open(whatsappHref(message, whatsappNumber), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FormSuccess message="Thanks — your enquiry has been prepared for WhatsApp. If a new tab didn't open, use the WhatsApp button to send it directly." />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Full Name" htmlFor="tf-fullName" error={errors.fullName?.message}>
          <TextInput id="tf-fullName" error={!!errors.fullName} {...register("fullName")} />
        </FieldWrapper>
        <FieldWrapper label="Phone" htmlFor="tf-phone" error={errors.phone?.message}>
          <TextInput id="tf-phone" placeholder="03xx xxxxxxx" error={!!errors.phone} {...register("phone")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Destination" htmlFor="tf-destination" error={errors.destination?.message}>
          <TextInput id="tf-destination" error={!!errors.destination} {...register("destination")} />
        </FieldWrapper>
        <FieldWrapper label="Number of Travelers" htmlFor="tf-travelers" error={errors.travelers?.message}>
          <TextInput id="tf-travelers" type="number" min={1} error={!!errors.travelers} {...register("travelers")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Preferred Travel Month" htmlFor="tf-month" error={errors.travelMonth?.message}>
          <TextInput id="tf-month" placeholder="e.g. December 2026" error={!!errors.travelMonth} {...register("travelMonth")} />
        </FieldWrapper>
        <FieldWrapper label="Departure City" htmlFor="tf-city" error={errors.departureCity?.message}>
          <TextInput id="tf-city" placeholder="e.g. Lahore" error={!!errors.departureCity} {...register("departureCity")} />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Message (optional)" htmlFor="tf-message">
        <TextArea id="tf-message" {...register("message")} />
      </FieldWrapper>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        Send Enquiry
      </Button>
    </form>
  );
}
