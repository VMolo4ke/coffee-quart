import Catalog from '@/components/Catalog';
import Contacts from '@/components/Contacts';
import Hero from '@/components/Hero';
import OrderForm from '@/components/OrderForm';

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background antialiased selection:bg-coffee/20">
      <Hero />
      <Catalog />
      <OrderForm />
      <Contacts />
    </div>
  );
}
