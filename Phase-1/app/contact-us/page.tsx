import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactUsPage() {
  return (
    <main>
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-botanical mb-4">
            Contact Us
          </h1>
          <p className="text-charcoal/70 mb-8">
            Have a question about an order, a bulk gifting need, or just want to say hello? We&apos;d love to hear from you.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-blush rounded-2xl p-5">
              <h3 className="font-semibold text-botanical mb-1">Call Us</h3>
              <p className="text-sm text-charcoal/70">+91 98765 43210</p>
              <p className="text-xs text-charcoal/50 mt-1">Mon–Sun, 9 AM – 9 PM</p>
            </div>
            <div className="bg-blush rounded-2xl p-5">
              <h3 className="font-semibold text-botanical mb-1">Email Us</h3>
              <p className="text-sm text-charcoal/70">support@themali.com</p>
              <p className="text-xs text-charcoal/50 mt-1">We reply within 24 hours</p>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-botanical block mb-1">Name</label>
              <input type="text" className="w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-rose" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-semibold text-botanical block mb-1">Email</label>
              <input type="email" className="w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-rose" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-sm font-semibold text-botanical block mb-1">Message</label>
              <textarea rows={4} className="w-full rounded-xl border border-charcoal/15 px-4 py-2.5 text-sm outline-none focus:border-rose" placeholder="How can we help?" />
            </div>
            <button type="button" className="bg-rose hover:bg-rose-dark text-ivory font-semibold px-6 py-2.5 rounded-full transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}