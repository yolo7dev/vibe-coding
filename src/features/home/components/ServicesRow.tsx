import type { ReactNode } from 'react';
import { HeadsetIcon, ShieldIcon, TruckIcon } from '../../../components/icons';

type ServiceCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-ink/10" />
        <span className="absolute inset-2 flex items-center justify-center rounded-full bg-ink text-white">
          {icon}
        </span>
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <p className="text-sm text-ink-mute">{description}</p>
      </div>
    </div>
  );
}

export function ServicesRow() {
  return (
    <section className="mx-auto max-w-screen-2xl px-8 pt-32 pb-24">
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          icon={<TruckIcon className="h-10 w-10" />}
          title="FREE AND FAST DELIVERY"
          description="Free delivery for all orders over $140"
        />
        <ServiceCard
          icon={<HeadsetIcon className="h-10 w-10" />}
          title="24/7 CUSTOMER SERVICE"
          description="Friendly 24/7 customer support"
        />
        <ServiceCard
          icon={<ShieldIcon className="h-10 w-10" />}
          title="MONEY BACK GUARANTEE"
          description="We return money within 30 days"
        />
      </div>
    </section>
  );
}
