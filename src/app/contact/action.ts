"use server";
import { Resend } from "resend";
import { FormState } from "./types";

const resend = new Resend("re_B4H5Gfri_69zybqhFRAfx9J6ziZg1AWP7");

export async function sendContactEmail(formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string | null;
  const email = formData.get("email") as string | null;
  const subject = formData.get("subject") as string | null;
  const message = formData.get("message") as string | null;

  if (!name || !email || !subject || !message) {
    return { success: false, error: "All fields are required." };
  }

  try {
    const { error } = await resend.emails.send({
      from: "AI Smart Canteen <onboarding@resend.dev>",
      to: ["mutlibbutt209@gmail.com"],
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Message Received from Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error("Server Action Exception:", err);
    return { success: false, error: "Something went wrong on our end. Please try again." };
  }
}