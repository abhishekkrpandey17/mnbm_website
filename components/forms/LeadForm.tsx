"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { leadFormSchema, type LeadFormInput } from "@/lib/validation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  requirementTypeOptions,
  networkProviderOptions,
  propertyTypeOptions,
} from "./form-options";
import { trackEvent } from "@/components/seo/AnalyticsScripts";

interface LeadFormProps {
  source?: LeadFormInput["source"];
  defaultCity?: string;
  defaultRequirementType?: LeadFormInput["requirementType"];
  compact?: boolean;
}

export function LeadForm({
  source = "WEBSITE_CONTACT_FORM",
  defaultCity = "Mumbai",
  defaultRequirementType = "OTHER",
  compact = false,
}: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [enquiryCode, setEnquiryCode] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LeadFormInput>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      city: defaultCity,
      requirementType: defaultRequirementType,
      source,
    },
  });

  const onSubmit = async (data: LeadFormInput) => {
    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source }),
      });
      const json = await res.json();

      if (!res.ok) {
        setServerError(json.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      trackEvent("form_submit", { form: "lead_form", source });
      setEnquiryCode(json.enquiryCode);
      setStatus("success");
      reset();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-success/20 bg-success/5 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-success" />
        <h3 className="font-display text-lg font-bold text-navy">
          Thank you. Your enquiry has been received.
        </h3>
        <p className="text-sm text-muted-foreground">
          Our team will contact you shortly. Your reference ID is
        </p>
        <p className="font-mono text-base font-bold text-primary-700">{enquiryCode}</p>
        <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot — hidden from real users, catches simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" placeholder="Your full name" hasError={!!errors.name} {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            placeholder="10-digit mobile number"
            inputMode="numeric"
            hasError={!!errors.phone}
            {...register("phone")}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Optional" {...register("company")} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="city">City *</Label>
          <Input id="city" placeholder="e.g. Mumbai" hasError={!!errors.city} {...register("city")} />
          {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="area">Area</Label>
          <Input id="area" placeholder="e.g. Andheri East" {...register("area")} />
        </div>
      </div>

      <div className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-3"}>
        <div className="space-y-1.5">
          <Label>Requirement</Label>
          <Controller
            control={control}
            name="requirementType"
            defaultValue={defaultRequirementType}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {requirementTypeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Network Provider</Label>
          <Controller
            control={control}
            name="networkProvider"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="Select network" /></SelectTrigger>
                <SelectContent>
                  {networkProviderOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        {!compact && (
          <div className="space-y-1.5">
            <Label>Property Type</Label>
            <Controller
              control={control}
              name="propertyType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {propertyTypeOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}
      </div>

      {!compact && (
        <div className="space-y-1.5">
          <Label htmlFor="propertySize">Approximate Property Size</Label>
          <Input id="propertySize" placeholder="e.g. 1200 sq ft" {...register("propertySize")} />
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about the signal issue you're facing"
          rows={compact ? 3 : 4}
          {...register("message")}
        />
      </div>

      {serverError && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {serverError}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
        Request Free Consultation
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        By submitting, you agree to be contacted about your enquiry. We do not share your
        information with third parties.
      </p>
    </form>
  );
}
