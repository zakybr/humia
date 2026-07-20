import Link from "next/link";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

export const metadata = { title: "Donation cancelled | HUMIA" };

export default function DonateCancelledPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-xl flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-3xl sm:text-4xl">No problem at all</h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed">
          Your donation was cancelled and nothing was charged. You are welcome
          to try again whenever it suits you.
        </p>
        <div className="mt-8 flex gap-3">
          <Link href="/donate" className="btn-primary">
            Try again
          </Link>
          <Link href="/" className="btn-secondary">
            Back to the site
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
