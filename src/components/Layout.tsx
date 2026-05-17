import type { ReactNode } from 'react';
import { Header } from './Header';
import { ScrollToTop } from './ScrollToTop';
import { SiteFooter } from './SiteFooter';
import { TopBar } from './TopBar';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-ink">
      <TopBar />
      <Header />
      <main>{children}</main>
      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}
