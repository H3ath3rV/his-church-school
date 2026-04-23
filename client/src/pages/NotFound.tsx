import { Link } from "wouter";
import Layout from "@/components/Layout";
import { getPageHref } from "@/lib/sitePaths";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <section className="py-32 bg-[#f8f8f8] flex items-center justify-center min-h-[60vh]">
        <div className="max-w-lg mx-auto px-4 text-center">
          <p className="font-display text-[9rem] font-black text-[#051040]/8 leading-none select-none">
            404
          </p>
          <p className="font-label text-xs font-semibold text-[#051040]/62 tracking-[0.12em] uppercase mb-3">
            Page Not Found
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-black text-[#051040] mb-2">
            Oops, this page doesn't exist.
          </h1>
          <div className="w-12 h-0.5 bg-[#C9A84C] mx-auto my-5" />
          <p className="text-[#051040]/60 font-body text-base leading-relaxed mb-10">
            The page you are looking for may have been moved or removed. Head
            back to our home page to find what you need.
          </p>
          <Link
            href={getPageHref("home")}
            className="hcs-btn-primary px-8"
          >
            <Home size={14} />
            Back to Home
          </Link>
        </div>
      </section>
    </Layout>
  );
}
