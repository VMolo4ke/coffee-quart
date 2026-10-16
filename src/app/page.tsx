import Catalog from '@/components/Catalog';
import Contacts from '@/components/Contacts';
import Hero from '@/components/Hero'
import OrderForm from '@/components/OredrForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-background antialiased selection:bg-coffee/20">
      <Hero />
      <Catalog />
      <OrderForm />
      <Contacts />
    </div>
  );
}
