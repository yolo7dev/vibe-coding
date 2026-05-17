import { ArrowRightIcon } from './icons';

const support = ['111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.', 'exclusive@gmail.com', '+88015-88888-9999'];
const account = ['My Account', 'Login / Register', 'Cart', 'Wishlist', 'Shop'];
const quickLink = ['Privacy Policy', 'Terms Of Use', 'FAQ', 'Contact'];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-10 px-8 py-20 sm:grid-cols-2 lg:grid-cols-5">
        <Column title="Exclusive">
          <p className="text-base font-medium">Subscribe</p>
          <p className="text-sm">Get 10% off your first order</p>
          <form className="flex h-12 w-full max-w-[220px] items-center rounded border border-white/80 px-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="h-full flex-1 bg-transparent text-sm outline-none placeholder:text-white/70"
            />
            <button type="submit" aria-label="Subscribe">
              <ArrowRightIcon className="h-6 w-6" />
            </button>
          </form>
        </Column>

        <Column title="Support">
          <ul className="space-y-4 text-sm">
            {support.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Column>

        <Column title="Account">
          <ul className="space-y-4 text-sm">
            {account.map((s) => (
              <li key={s}>
                <a href="#" className="hover:underline">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Quick Link">
          <ul className="space-y-4 text-sm">
            {quickLink.map((s) => (
              <li key={s}>
                <a href="#" className="hover:underline">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </Column>

        <Column title="Download App">
          <p className="text-xs text-white/70">Save $3 with App New User Only</p>
          <div className="flex gap-2">
            <div className="h-20 w-20 rounded bg-white/10" aria-label="QR placeholder" />
            <div className="flex flex-col gap-2">
              <div className="h-9 w-28 rounded bg-white/10" aria-label="Google Play" />
              <div className="h-9 w-28 rounded bg-white/10" aria-label="App Store" />
            </div>
          </div>
          <div className="flex gap-5 pt-2">
            {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((s) => (
              <a key={s} href="#" className="text-sm hover:underline">
                {s[0]}
              </a>
            ))}
          </div>
        </Column>
      </div>

      <div className="border-t border-white/30 py-6 text-center text-sm text-white/40">
        © Copyright Rimel 2022. All right reserved
      </div>
    </footer>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-xl font-medium">{title}</h3>
      {children}
    </div>
  );
}
