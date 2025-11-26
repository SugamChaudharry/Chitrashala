import Link from "next/link";
import { Grid } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-md transition-transform group-hover:scale-110">
              <Grid className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
              Chitrshala
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link
              href="/privacy"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200 dark:border-gray-800" />

        {/* Bottom Text */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Chitrshala — Crafted with ❤️ for creativity.
        </p>
      </div>
    </footer>
  );
}
