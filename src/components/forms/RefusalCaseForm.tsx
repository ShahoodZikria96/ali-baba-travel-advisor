"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, SelectInput, TextArea, FormSuccess } from "@/components/forms/FormFields";
import { whatsappHref } from "@/lib/whatsapp";
import { submitLead } from "@/lib/leads";

const schema = z.object({
  applicantName: z.string().min(2, "Enter the applicant's name"),
  phone: z.string().min(9, "Enter a valid phone number"),
  country: z.string().min(1, "Select a country"),
  visaCategory: z.string().min(2, "Enter the visa category"),
  refusalDate: z.string().optional(),
  refusalCount: z.string().min(1, "Enter number of previous refusals"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function RefusalCaseForm({
  defaultCountry,
  whatsappNumber = "923111666076",
}: {
  defaultCountry?: string;
  whatsappNumber?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { country: defaultCountry ?? "" },
  });

  const onSubmit = (data: FormValues) => {
    const message = [
      "Hi Ali Baba Travel Advisor, I would like to discuss a visa refusal case.",
      `Applicant Name: ${data.applicantName}`,
      `Phone: ${data.phone}`,
      `Country: ${data.country}`,
      `Visa Category: ${data.visaCategory}`,
      data.refusalDate ? `Refusal Date: ${data.refusalDate}` : "",
      `Previous Refusals: ${data.refusalCount}`,
      data.message ? `Message: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    submitLead("refusal_case", data);
    window.open(whatsappHref(message, whatsappNumber), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FormSuccess message="Thanks — your case summary has been prepared for WhatsApp. If a new tab didn't open, use the WhatsApp button to send it directly." />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Applicant Name" htmlFor="rf-name" error={errors.applicantName?.message}>
          <TextInput id="rf-name" error={!!errors.applicantName} {...register("applicantName")} />
        </FieldWrapper>
        <FieldWrapper label="Phone" htmlFor="rf-phone" error={errors.phone?.message}>
          <TextInput id="rf-phone" placeholder="03xx xxxxxxx" error={!!errors.phone} {...register("phone")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Country" htmlFor="rf-country" error={errors.country?.message}>
          <SelectInput id="rf-country" error={!!errors.country} {...register("country")}>
            <option value="">Select country</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
            <option value="Schengen">Schengen</option>
            <option value="Australia">Australia</option>
            <option value="USA">USA</option>
          </SelectInput>
        </FieldWrapper>
        <FieldWrapper label="Visa Category" htmlFor="rf-category" error={errors.visaCategory?.message}>
          <TextInput id="rf-category" placeholder="e.g. Visit Visa" error={!!errors.visaCategory} {...register("visaCategory")} />
        </FieldWrapper>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Refusal Date (optional)" htmlFor="rf-date">
          <TextInput id="rf-date" type="date" {...register("refusalDate")} />
        </FieldWrapper>
        <FieldWrapper label="Previous Refusals Count" htmlFor="rf-count" error={errors.refusalCount?.message}>
          <TextInput id="rf-count" type="number" min={1} error={!!errors.refusalCount} {...register("refusalCount")} />
        </FieldWrapper>
      </div>
      <FieldWrapper label="Message (optional)" htmlFor="rf-message">
        <TextArea id="rf-message" placeholder="Briefly describe the refusal reason if known" {...register("message")} />
      </FieldWrapper>
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        Discuss My Case
      </Button>
    </form>
  );
}
