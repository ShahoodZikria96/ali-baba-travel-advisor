"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, SelectInput, FormSuccess } from "@/components/forms/FormFields";
import { whatsappHref } from "@/data/site";
import { submitLead } from "@/lib/leads";

const schema = z.object({
  from: z.string().min(2, "Enter departure city"),
  to: z.string().min(2, "Enter destination city"),
  departureDate: z.string().min(1, "Select a departure date"),
  returnDate: z.string().optional(),
  passengers: z.string().min(1, "Enter number of passengers"),
  travelClass: z.string().min(1, "Select a travel class"),
  phone: z.string().min(9, "Enter a valid phone number"),
});

type FormValues = z.infer<typeof schema>;

export function FlightEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    const message = [
      "Hi, I'd like a flight quote.",
      `From: ${data.from}`,
      `To: ${data.to}`,
      `Departure: ${data.departureDate}`,
      data.returnDate ? `Return: ${data.returnDate}` : "One-way",
      `Passengers: ${data.passengers}`,
      `Class: ${data.travelClass}`,
      `Phone: ${data.phone}`,
    ]
      .filter(Boolean)
      .join("\n");

    submitLead("flight_enquiry", data);
    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FormSuccess message="Thanks — your flight enquiry has been prepared for WhatsApp. If a new tab didn't open, use the WhatsApp button to send it directly." />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="From" htmlFor="ff-from" error={errors.from?.message}>
          <TextInput id="ff-from" placeholder="e.g. Lahore" error={!!errors.from} {...register("from")} />
        </FieldWrapper>
        <FieldWrapper label="To" htmlFor="ff-to" error={errors.to?.message}>
          <TextInput id="ff-to" placeholder="e.g. London" error={!!errors.to} {...register("to")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Departure" htmlFor="ff-dep" error={errors.departureDate?.message}>
          <TextInput id="ff-dep" type="date" error={!!errors.departureDate} {...register("departureDate")} />
        </FieldWrapper>
        <FieldWrapper label="Return (optional)" htmlFor="ff-ret">
          <TextInput id="ff-ret" type="date" {...register("returnDate")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Passengers" htmlFor="ff-pax" error={errors.passengers?.message}>
          <TextInput id="ff-pax" type="number" min={1} error={!!errors.passengers} {...register("passengers")} />
        </FieldWrapper>
        <FieldWrapper label="Travel Class" htmlFor="ff-class" error={errors.travelClass?.message}>
          <SelectInput id="ff-class" error={!!errors.travelClass} {...register("travelClass")}>
            <option value="">Select class</option>
            <option value="Economy">Economy</option>
            <option value="Premium Economy">Premium Economy</option>
            <option value="Business">Business</option>
          </SelectInput>
        </FieldWrapper>
      </div>
      <FieldWrapper label="Phone" htmlFor="ff-phone" error={errors.phone?.message}>
        <TextInput id="ff-phone" placeholder="03xx xxxxxxx" error={!!errors.phone} {...register("phone")} />
      </FieldWrapper>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        Get Flight Quote
      </Button>
    </form>
  );
}
