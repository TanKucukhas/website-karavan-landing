"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

export default function NewsroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("newsroom.tabs");
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale as string;

  const tabs = [
    { href: "/newsroom", label: t("overview") },
    { href: "/newsroom/news", label: t("news") },
    // { href: "/newsroom/stories", label: t("stories") }, // Hidden for now
    { href: "/newsroom/about", label: t("about") },
  ];

  // Helper to check if tab is active
  const isActive = (href: string) => {
    const pathnameWithoutLocale = pathname?.replace(`/${locale}`, "") || "";

    if (href === "/newsroom") {
      return pathnameWithoutLocale === "/newsroom";
    }
    return pathnameWithoutLocale.startsWith(href);
  };

  // Helper to build localized href
  const localizedHref = (href: string) => {
    return `/${locale}${href}`;
  };

  return (
    <div className="relative -mt-16">
      {/* White background overlay to hide global background */}
      <div className="fixed inset-0 bg-white z-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col pt-16">
        {/* Newsroom Sub-Header - Stripe Style */}
        <div className="bg-white sticky top-16 z-40 mt-8">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="flex items-center py-3">
              {/* Tab Navigation */}
              <nav className="flex items-center gap-8">
                {tabs.map((tab) => {
                  const active = isActive(tab.href);
                  return (
                    <Link
                      key={tab.href}
                      href={localizedHref(tab.href)}
                      className={`
                        text-sm font-semibold transition-colors pb-3 relative
                        ${
                          active
                            ? "text-brand-600"
                            : "text-gray-600 hover:text-ink"
                        }
                      `}
                    >
                      {tab.label}
                      {active && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600"></div>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
