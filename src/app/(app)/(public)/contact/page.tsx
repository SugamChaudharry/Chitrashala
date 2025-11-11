"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted →", form);
    alert("Thanks for reaching out! I'll get back to you soon.");
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Contact</h1>

      <p className="text-muted-foreground leading-relaxed">
        Have a question, suggestion, or want to collaborate?
        Fill out the form below and I’ll get back to you shortly.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-xl border">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <Input
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Message</label>
          <Textarea
            name="message"
            placeholder="Your message..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>

      <section className="space-y-2 pt-6">
        <h2 className="text-xl font-semibold">Other Ways to Reach Me</h2>
        <p className="text-muted-foreground">
          Email: <span className="font-medium">sugam.chaudharry@gmail.com</span>
        </p>
        <p className="text-muted-foreground">
          GitHub: <span className="font-medium">https://github.com/SugamChaudharry</span>
        </p>
      </section>
    </main>
  );
}
