"use server";

import { z } from "zod";
import sgMail from "@sendgrid/mail";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error("SENDGRID_API_KEY is not set.");
    return {
        success: false,
        message: "Server configuration error. Could not send email.",
    };
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { name, email, subject, message } = parsed.data;

  const msg = {
    to: "kavindusachinthe@outlook.com", 
    from: "kavindusachinthe@outlook.com", // This needs to be a verified sender in SendGrid
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <p>You have a new contact form submission:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Subject:</strong> ${subject}</li>
      </ul>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return {
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    };
  } catch (error) {
    console.error('SendGrid Error:', error);
    return {
      success: false,
      message: "There was an error sending your message. Please try again later.",
    };
  }
}
