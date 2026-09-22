import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-botanical mb-4">
            Privacy Policy
          </h1>
          <div className="space-y-4 text-sm text-charcoal/70 leading-relaxed">
            <p>The Mali respects your privacy. This policy explains what information we collect and how we use it.</p>
            <p><strong className="text-botanical">Information we collect:</strong> Name, contact details, delivery address, and order history when you place an order.</p>
            <p><strong className="text-botanical">How we use it:</strong> To process orders, provide customer support, and occasionally share offers you can opt out of anytime.</p>
            <p><strong className="text-botanical">Data security:</strong> We use industry-standard measures to protect your information. Payment details are never stored on our servers.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}