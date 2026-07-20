import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export const metadata = { title: "Thank you | HUMIA" };

export default function DonateSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-sky text-navy">
          <CheckCircle2 size={30} />
        </div>
        <h1 className="mt-6 text-3xl sm:text-4xl">Jazakallahu khairan</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed">
          Your donation was received. Thank you for supporting the community,
          it genuinely makes a difference.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to the site
        </Link>
      </main>
      <Footer />
    </>
  );
}
