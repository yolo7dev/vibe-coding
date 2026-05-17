import type { ReactNode } from 'react';
import { ShieldIcon, TruckIcon } from '../../../components/icons';

type RowProps = {
  icon: ReactNode;
  title: string;
  description: ReactNode;
};

function Row({ icon, title, description }: RowProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-6">
      <span className="text-ink">{icon}</span>
      <div className="space-y-2">
        <p className="font-medium">{title}</p>
        <p className="text-xs text-ink">{description}</p>
      </div>
    </div>
  );
}

export function DeliveryInfo() {
  return (
    <div className="rounded border border-ink/40">
      <Row
        icon={<TruckIcon className="h-10 w-10" />}
        title="Free Delivery"
        description={
          <a href="#postal" className="underline underline-offset-2">
            Enter your postal code for Delivery Availability
          </a>
        }
      />
      <div className="h-px bg-ink/40" />
      <Row
        icon={<ShieldIcon className="h-10 w-10" />}
        title="Return Delivery"
        description={
          <>
            Free 30 Days Delivery Returns.{' '}
            <a href="#return-details" className="underline underline-offset-2">
              Details
            </a>
          </>
        }
      />
    </div>
  );
}
