import Link from 'next/link';
import { FiFeather, FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from 'react-icons/fi';

const productLinks = [
  { href: '/urunler/floravita-probiyotik-plus', label: 'Probiyotik Plus' },
  { href: '/urunler/floravita-prebiyotik-lif', label: 'Prebiyotik Lif' },
  { href: '/urunler/floravita-sindirim-enzimi', label: 'Sindirim Enzimi' },
  { href: '/urunler/floravita-gut-reset-paketi', label: 'Gut Reset Paketi' },
];

const companyLinks = [
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/blog', label: 'Blog' },
  { href: '/urunler', label: 'Ürünler' },
];

const legalLinks = [
  { href: '/gizlilik-politikasi', label: 'Gizlilik Politikası' },
  { href: '/kullanim-kosullari', label: 'Kullanım Koşulları' },
  { href: '/iade-politikasi', label: 'İade Politikası' },
  { href: '/kvkk', label: 'KVKK' },
];

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-white">
      {/* Main footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
                <FiFeather className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold font-serif">
                Flora<span className="text-primary-300">Vita</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Doğal içeriklerle formüle edilmiş bağırsak sağlığı ürünleri. 
              Bilimsel araştırmalar ile desteklenen güvenilir formüller.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: FiInstagram, href: '#', label: 'Instagram' },
                { icon: FiTwitter, href: '#', label: 'Twitter' },
                { icon: FiFacebook, href: '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Ürünlerimiz
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-300 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Kurumsal
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-300 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold text-white mb-4 mt-6 text-sm uppercase tracking-wider">
              Yasal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-300 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              İletişim
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMail className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <a href="mailto:info@floravita.com.tr" className="hover:text-primary-300 transition-colors">
                  info@floravita.com.tr
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiPhone className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <a href="tel:+902121234567" className="hover:text-primary-300 transition-colors">
                  0212 123 45 67
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <FiMapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>

            {/* Güven Rozetleri */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <span className="text-green-400 text-lg">🔒</span>
                <span className="text-xs text-gray-400">256-bit SSL Güvenli Ödeme</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <span className="text-lg">🚚</span>
                <span className="text-xs text-gray-400">150₺ Üzeri Ücretsiz Kargo</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <span className="text-lg">↩️</span>
                <span className="text-xs text-gray-400">14 Gün İade Garantisi</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} FloraVita. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-2">
              <span>Güvenli ödeme:</span>
              <span className="bg-white/10 rounded px-2 py-1 text-xs font-semibold text-white">PayTR</span>
              <span className="bg-white/10 rounded px-2 py-1 text-xs font-semibold text-white">VISA</span>
              <span className="bg-white/10 rounded px-2 py-1 text-xs font-semibold text-white">Mastercard</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
