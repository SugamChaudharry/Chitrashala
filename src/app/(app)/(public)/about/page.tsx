export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">About Chitrashala</h1>

      <p className="text-muted-foreground leading-relaxed">
        Chitrashala is a modern platform built to make managing and showcasing
        creative work effortless. Designed with simplicity and speed in mind, it
        provides a clean experience for exploring, uploading, and organizing
        visual content.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Our Vision</h2>
        <p className="text-muted-foreground leading-relaxed">
          The project aims to offer a minimal and aesthetic environment where
          images, videos, and creative assets can be managed without clutter.
          Chitrashala focuses on usability and developer-friendly foundations,
          ensuring the system stays fast, scalable, and easy to extend.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <p className="text-muted-foreground leading-relaxed">
          Users can authenticate securely, browse their library, upload media,
          and organize content with smooth UI interactions. The application uses
          modern tools like Next.js, Tailwind CSS, PostgreSQL, and Better Auth
          to deliver a consistent and reliable workflow.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Why This Project Exists</h2>
        <p className="text-muted-foreground leading-relaxed">
          Chitrashala was created to demonstrate clean architecture, optimized
          backend workflows, and a scalable full-stack structure. It also serves
          as a practical project to explore new technologies and improve
          real-world development skills.
        </p>
      </section>

      <p className="text-sm text-muted-foreground pt-4">
        Built with care by Sugam. Always improving, always learning.
      </p>
    </main>
  );
}
