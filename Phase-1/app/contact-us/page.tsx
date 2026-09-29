import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

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

          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}