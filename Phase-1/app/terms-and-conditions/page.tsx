import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main>
      <Header />
      <section className="w-full px-4 sm:px-6 lg:px-10 xl:px-14 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-botanical mb-4">
            Terms &amp; Conditions
          </h1>
          <div className="space-y-4 text-sm text-charcoal/70 leading-relaxed">
            <p>By using The Mali website, you agree to the following terms. Please read them carefully before placing an order.</p>
            <p><strong className="text-botanical">Orders:</strong> All orders are subject to availability and delivery-area serviceability confirmed at checkout.</p>
            <p><strong className="text-botanical">Pricing:</strong> Prices are listed in INR and may change without prior notice. Applicable taxes are added at checkout.</p>
            <p><strong className="text-botanical">Delivery:</strong> Delivery timelines are estimates. The Mali is not liable for delays caused by circumstances beyond our control.</p>
            <p><strong className="text-botanical">Account:</strong> You are responsible for maintaining the confidentiality of your account details.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}