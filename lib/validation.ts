import { z } from "zod";

const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile numbers
const nameRegex = /^[a-zA-Z\s.'-]{2,80}$/;

export const requirementTypeValues = [
  "HOME",
  "OFFICE",
  "FACTORY",
  "WAREHOUSE",
  "HOTEL",
  "HOSPITAL",
  "COMMERCIAL_BUILDING",
  "BASEMENT",
  "OTHER",
] as const;

export const networkProviderValues = ["JIO", "AIRTEL", "VI", "BSNL", "OTHER"] as const;

export const propertyTypeValues = [
  "RESIDENTIAL",
  "OFFICE",
  "RETAIL",
  "INDUSTRIAL",
  "HOSPITALITY",
  "HEALTHCARE",
  "INSTITUTIONAL",
  "OTHER",
] as const;

export const leadSourceValues = [
  "WEBSITE_CONTACT_FORM",
  "WEBSITE_HERO_FORM",
  "WEBSITE_LOCATION_PAGE",
  "WEBSITE_SERVICE_PAGE",
  "PHONE_CALL",
  "WHATSAPP",
  "REFERRAL",
  "OTHER",
] as const;

export const leadStatusValues = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "SITE_VISIT",
  "QUOTATION_SENT",
  "WON",
  "LOST",
] as const;

export const leadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long")
    .regex(nameRegex, "Please enter a valid name"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  company: z.string().trim().max(120).optional().or(z.literal("")).transform((v) => v || undefined),
  city: z.string().trim().min(2, "City is required").max(80),
  area: z.string().trim().max(120).optional().or(z.literal("")).transform((v) => v || undefined),
  requirementType: z.enum(requirementTypeValues).default("OTHER"),
  networkProvider: z.enum(networkProviderValues).optional(),
  propertyType: z.enum(propertyTypeValues).optional(),
  propertySize: z.string().trim().max(60).optional().or(z.literal("")).transform((v) => v || undefined),
  message: z.string().trim().max(2000).optional().or(z.literal("")).transform((v) => v || undefined),
  source: z.enum(leadSourceValues).default("WEBSITE_CONTACT_FORM"),
  // Honeypot field — must stay empty. Bots that fill every field trip this.
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type LeadFormInput = z.infer<typeof leadFormSchema>;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(80).regex(nameRegex, "Please enter a valid name"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "Please enter a valid 10-digit Indian mobile number")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  subject: z.string().trim().max(150).optional().or(z.literal("")).transform((v) => v || undefined),
  message: z.string().trim().min(10, "Please add a few more details").max(2000),
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export const leadUpdateSchema = z.object({
  status: z.enum(leadStatusValues).optional(),
  assignedToId: z.string().nullable().optional(),
  name: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().email().nullable().optional(),
  phone: z.string().trim().regex(phoneRegex).optional(),
  company: z.string().trim().max(120).nullable().optional(),
  city: z.string().trim().min(2).max(80).optional(),
  area: z.string().trim().max(120).nullable().optional(),
  requirementType: z.enum(requirementTypeValues).optional(),
  networkProvider: z.enum(networkProviderValues).nullable().optional(),
  propertyType: z.enum(propertyTypeValues).nullable().optional(),
  propertySize: z.string().trim().max(60).nullable().optional(),
  message: z.string().trim().max(2000).nullable().optional(),
});

export const leadNoteSchema = z.object({
  body: z.string().trim().min(1, "Note cannot be empty").max(2000),
});
