import "server-only";
import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";
import type { Lead } from "@prisma/client";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.EMAIL_SERVER_HOST;
  const port = Number(process.env.EMAIL_SERVER_PORT || 587);
  const user = process.env.EMAIL_SERVER_USER;
  const pass = process.env.EMAIL_SERVER_PASSWORD;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

function requirementLabel(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(" ");
}

export async function sendLeadNotificationEmail(lead: Lead) {
  const t = getTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL;
  if (!t || !adminEmail) {
    console.warn("[email] SMTP not configured — skipping admin notification email");
    return;
  }

  const html = `
    <h2>New Website Enquiry — ${lead.name}</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      <tr><td><strong>Enquiry ID</strong></td><td>${lead.enquiryCode}</td></tr>
      <tr><td><strong>Name</strong></td><td>${lead.name}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${lead.phone}</td></tr>
      <tr><td><strong>Email</strong></td><td>${lead.email ?? "-"}</td></tr>
      <tr><td><strong>Location</strong></td><td>${lead.area ? lead.area + ", " : ""}${lead.city}</td></tr>
      <tr><td><strong>Requirement</strong></td><td>${requirementLabel(lead.requirementType)}</td></tr>
      <tr><td><strong>Property Type</strong></td><td>${lead.propertyType ?? "-"}</td></tr>
      <tr><td><strong>Network</strong></td><td>${lead.networkProvider ?? "-"}</td></tr>
      <tr><td><strong>Message</strong></td><td>${lead.message ?? "-"}</td></tr>
    </table>
  `;

  try {
    await t.sendMail({
      from: `"${siteConfig.businessName} Website" <${adminEmail}>`,
      to: adminEmail,
      subject: `New Website Enquiry — ${lead.name}`,
      html,
    });
  } catch (err) {
    console.error("[email] Failed to send admin notification", err);
  }
}

export async function sendLeadConfirmationEmail(lead: Lead) {
  const t = getTransporter();
  if (!t || !lead.email) return;

  const html = `
    <p>Hi ${lead.name},</p>
    <p>Thank you for contacting ${siteConfig.businessName}. Your enquiry has been received and our team will get in touch shortly.</p>
    <p><strong>Your enquiry ID:</strong> ${lead.enquiryCode}</p>
    <p>If you need immediate assistance, call us at ${siteConfig.phoneDisplay} or message us on WhatsApp.</p>
    <p>— ${siteConfig.businessName}</p>
  `;

  try {
    await t.sendMail({
      from: `"${siteConfig.businessName}" <${process.env.ADMIN_EMAIL}>`,
      to: lead.email,
      subject: `Thank you for contacting ${siteConfig.businessName}`,
      html,
    });
  } catch (err) {
    console.error("[email] Failed to send customer confirmation", err);
  }
}
