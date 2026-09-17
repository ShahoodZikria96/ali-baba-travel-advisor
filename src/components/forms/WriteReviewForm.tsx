"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { StarRatingInput } from "@/components/ui/StarRatingInput";
import { FieldWrapper, TextInput, TextArea, FormSuccess } from "@/components/forms/FormFields";

const schema = z.object({
  name: z.string().min(2, "Enter your name"),
  location: z.string().min(2, "Enter your city"),
  rating: z.number().min(1, "Select a rating").max(5),
  text: z.string().min(15, "Please write at least 15 characters").max(1000, "Keep it under 1000 characters"),
});

type FormValues = z.infer<typeof schema>;

export function WriteReviewForm({ onDone }: { onDone?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { rating: 0, name: "", location: "", text: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Could not submit your review");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (submitted) {
    return (
      <FormSuccess message="Thank you for your review! It will appear on the site once our team has reviewed and approved it." />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FieldWrapper label="Your Name" htmlFor="wr-name" error={errors.name?.message}>
          <TextInput id="wr-name" error={!!errors.name} {...register("name")} />
        </FieldWrapper>
        <FieldWrapper label="Your City" htmlFor="wr-location" error={errors.location?.message}>
          <TextInput id="wr-location" placeholder="e.g. Lahore" error={!!errors.location} {...register("location")} />
        </FieldWrapper>
      </div>

      <FieldWrapper label="Your Rating" htmlFor="wr-rating" error={errors.rating?.message}>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <StarRatingInput value={field.value} onChange={field.onChange} error={!!errors.rating} />
          )}
        />
      </FieldWrapper>

      <FieldWrapper label="Your Review" htmlFor="wr-text" error={errors.text?.message}>
        <TextArea
          id="wr-text"
          placeholder="Tell us about your experience with Ali Baba Travel Advisor..."
          error={!!errors.text}
          {...register("text")}
        />
      </FieldWrapper>

      {serverError && <p className="text-sm font-medium text-primary">{serverError}</p>}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
        {onDone && (
          <button type="button" onClick={onDone} className="text-sm font-semibold text-text-muted hover:text-charcoal">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
