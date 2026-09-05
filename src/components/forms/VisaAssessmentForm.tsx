"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { FieldWrapper, TextInput, SelectInput, TextArea, FormSuccess } from "@/components/forms/FormFields";
import { whatsappHref } from "@/data/site";
import { popularDestinations } from "@/data/countries";
import { offices } from "@/data/offices";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  phone: z.string().min(9, "Enter a valid phone / WhatsApp number"),
  city: z.string().min(2, "Enter your city"),
  country: z.string().min(1, "Select a country"),
  visaType: z.string().min(1, "Select a visa type"),
  previousRefusal: z.enum(["yes", "no"]),
  office: z.string().min(1, "Select a preferred office"),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function VisaAssessmentForm({ defaultCountry }: { defaultCountry?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { country: defaultCountry ?? "", previousRefusal: "no" },
  });

  const onSubmit = (data: FormValues) => {
    const message = [
      "Hi Ali Baba Travel Advisor, I'd like a visa assessment.",
      `Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `City: ${data.city}`,
      `Country: ${data.country}`,
      `Visa Type: ${data.visaType}`,
      `Previous Refusal: ${data.previousRefusal}`,
      `Preferred Office: ${data.office}`,
      data.message ? `Message: ${data.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <FormSuccess message="Thanks — your details have been prepared for WhatsApp. If a new tab didn't open, use the WhatsApp button in the header to send your message directly to our team." />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Full Name" htmlFor="fullName" error={errors.fullName?.message}>
          <TextInput id="fullName" placeholder="Your full name" error={!!errors.fullName} {...register("fullName")} />
        </FieldWrapper>
        <FieldWrapper label="Phone / WhatsApp" htmlFor="phone" error={errors.phone?.message}>
          <TextInput id="phone" placeholder="03xx xxxxxxx" error={!!errors.phone} {...register("phone")} />
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="City" htmlFor="city" error={errors.city?.message}>
          <TextInput id="city" placeholder="e.g. Lahore" error={!!errors.city} {...register("city")} />
        </FieldWrapper>
        <FieldWrapper label="Country Interested In" htmlFor="country" error={errors.country?.message}>
          <SelectInput id="country" error={!!errors.country} {...register("country")}>
            <option value="">Select country</option>
            {popularDestinations.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Visa Type" htmlFor="visaType" error={errors.visaType?.message}>
          <SelectInput id="visaType" error={!!errors.visaType} {...register("visaType")}>
            <option value="">Select visa type</option>
            <option value="Visit Visa">Visit Visa</option>
            <option value="Business Visa">Business Visa</option>
            <option value="Family Visit Visa">Family Visit Visa</option>
            <option value="Study Visa">Study Visa</option>
          </SelectInput>
        </FieldWrapper>
        <FieldWrapper label="Preferred Office" htmlFor="office" error={errors.office?.message}>
          <SelectInput id="office" error={!!errors.office} {...register("office")}>
            <option value="">Select office</option>
            {offices.map((o) => (
              <option key={o.slug} value={o.city}>
                {o.city}
              </option>
            ))}
          </SelectInput>
        </FieldWrapper>
      </div>

      <FieldWrapper label="Previous Visa Refusal?" htmlFor="previousRefusal">
        <div className="flex gap-5 pt-1">
          <label className="flex items-center gap-2 text-sm text-text">
            <input type="radio" value="no" {...register("previousRefusal")} defaultChecked /> No
          </label>
          <label className="flex items-center gap-2 text-sm text-text">
            <input type="radio" value="yes" {...register("previousRefusal")} /> Yes
          </label>
        </div>
      </FieldWrapper>

      <FieldWrapper label="Message (optional)" htmlFor="message">
        <TextArea id="message" placeholder="Tell us a bit about your travel plan" {...register("message")} />
      </FieldWrapper>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        Request Assessment
      </Button>
    </form>
  );
}
