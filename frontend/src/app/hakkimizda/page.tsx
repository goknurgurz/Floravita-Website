import Link from 'next/link';
import { FiHeart, FiAward, FiUsers, FiTarget } from 'react-icons/fi';

const values = [
  {
    icon: FiHeart,
    title: 'Sağlığa Bağlılık',
    desc: 'Her üründe en yüksek kalite standartlarını gözetiyoruz. Sağlığınız bizim önceliğimizdir.',
  },
  {
    icon: FiAward,
    title: 'Bilimsel Yaklaşım',
    desc: 'Tüm formüllerimiz bilimsel araştırmalar ve uzman görüşleriyle desteklenmektedir.',
  },
  {
    icon: FiUsers,
    title: 'Müşteri Odaklı',
    desc: '10.000+ mutlu müşterimizin güveni ve memnuniyeti her şeyin önündedir.',
  },
  {
    icon: FiTarget,
    title: 'Şeffaflık',
    desc: 'İçeriklerimizi, üretim süreçlerimizi ve araştırmalarımızı her zaman açıkça paylaşırız.',
  },
];

const team = [
  {
    name: 'Dr. Ayşe Kaya',
    title: 'Kurucu & Baş Beslenme Uzmanı',
    desc: '15 yıllık bağırsak sağlığı deneyimi ile FloraVita\'nın bilimsel altyapısını oluşturdu.',
    emoji: '👩‍⚕️',
  },
  {
    name: 'Dr. Mehmet Demir',
    title: 'Mikrobiyoloji Direktörü',
    desc: 'Probiyotik araştırmalarında uzman, formülasyonlarımızın bilimsel mimarisi.',
    emoji: '👨‍🔬',
  },
  {
    name: 'Zeynep Arslan',
    title: 'Ürün Geliştirme Müdürü',
    desc: 'Doğal ve etkili ürün kombinasyonları için yıllardır çalışmalarını sürdürüyor.',
    emoji: '👩‍💼',
  },
];

const milestones = [
  { year: '2019', event: 'FloraVita\'nın kuruluşu ve ilk probiyotik formülümüz' },
  { year: '2020', event: 'GMP sertifikası alındı, 1.000 mutlu müşteriye ulaşıldı' },
  { year: '2021', event: 'Ürün gamı genişletildi, prebiyotik serisi lansmanı' },
  { year: '2022', event: '5.000 müşteri hedefine ulaşıldı, yeni Ar-Ge merkezi açıldı' },
  { year: '2023', event: '10.000+ müşteri, Türkiye\'nin güvenilir bağırsak sağlığı markası' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-forest-dark to-primary-700 text-white">
        <div className="container-custom py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm font-medium mb-6">
              🌿 Hakkımızda
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
              Sağlıklı Bir Yaşam
              <br />
              <span className="text-primary-200">İçin Buradayız</span>
            </h1>
            <p className="text-primary-100 text-lg leading-relaxed max-w-xl">
              2019 yılından bu yana bağırsak sağlığına odaklanarak, bilimsel araştırmalar
              ile doğal içerikleri bir araya getiriyoruz. Amacımız; herkesin
              sağlıklı bir bağırsak florasına kavuşmasına yardımcı olmak.
            </p>
          </div>
        </div>
      </div>

      <div className="container-custom py-16 space-y-20">

        {/* İstatistikler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10.000+', label: 'Mutlu Müşteri' },
            { value: '6+', label: 'Ürün Çeşidi' },
            { value: '4.8/5', label: 'Müşteri Puanı' },
            { value: '5 Yıl+', label: 'Sektör Deneyimi' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-white rounded-2xl p-6 text-center shadow-soft">
              <div className="text-3xl font-bold text-primary-600 mb-1">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Hikayemiz */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="badge-green mb-4">Hikayemiz</div>
            <h2 className="section-title mb-6">
              Neden <span className="text-gradient">FloraVita?</span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                FloraVita, beslenme uzmanı Dr. Ayşe Kaya&apos;nın kendi bağırsak sağlığı
                problemlerinden yola çıkarak kurduğu bir marka. Yıllarca piyasadaki
                ürünlerin yetersiz kaldığını gördükten sonra, gerçekten işe yarayan
                formüller geliştirmeye karar verdi.
              </p>
              <p>
                Bugün, Türkiye&apos;nin en güvenilir bağırsak sağlığı markaları arasında
                yer alan FloraVita; bilimsel araştırmalar, doğal içerikler ve şeffaf
                üretim süreciyle fark yaratmaktadır.
              </p>
              <p>
                GMP sertifikalı üretim tesisimizde, en yüksek kalite standartlarında
                üretilen ürünlerimiz, 10.000&apos;den fazla mutlu müşterimize ulaşmıştır.
              </p>
            </div>
          </div>
          <div className="bg-primary-50 rounded-3xl p-10 text-center">
            <div className="text-7xl mb-4">🌱</div>
            <blockquote className="text-forest-dark font-serif text-xl font-medium italic">
              &ldquo;Sağlıklı bir bağırsak,
              sağlıklı bir hayatın kapısını açar.&rdquo;
            </blockquote>
            <p className="text-gray-500 text-sm mt-4">— Dr. Ayşe Kaya, Kurucu</p>
          </div>
        </div>

        {/* Değerlerimiz */}
        <div>
          <div className="text-center mb-12">
            <div className="badge-green mb-4">Değerlerimiz</div>
            <h2 className="section-title">
              Bizi Biz Yapan <span className="text-gradient">İlkeler</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-card transition-all">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-bold text-forest-dark mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ekibimiz */}
        <div>
          <div className="text-center mb-12">
            <div className="badge-green mb-4">Ekibimiz</div>
            <h2 className="section-title">
              Uzman <span className="text-gradient">Kadromuz</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map(({ name, title, desc, emoji }) => (
              <div key={name} className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:shadow-card transition-all">
                <div className="w-20 h-20 bg-primary-50 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-4">
                  {emoji}
                </div>
                <h3 className="font-bold text-forest-dark text-lg mb-1">{name}</h3>
                <p className="text-primary-600 text-sm font-medium mb-3">{title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Zaman çizelgesi */}
        <div>
          <div className="text-center mb-12">
            <div className="badge-green mb-4">Yolculuğumuz</div>
            <h2 className="section-title">
              Milestone&apos;larımız
            </h2>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            {milestones.map(({ year, event }, idx) => (
              <div key={year} className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  {idx < milestones.length - 1 && (
                    <div className="w-0.5 h-8 bg-primary-100 mt-1" />
                  )}
                </div>
                <div className="bg-white rounded-2xl p-4 flex-1 shadow-soft -mt-1">
                  <span className="text-primary-600 font-bold text-sm">{year}</span>
                  <p className="text-gray-700 text-sm mt-1">{event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-green rounded-3xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold font-serif mb-4">
            Sağlık Yolculuğunuza Başlayın
          </h2>
          <p className="text-primary-100 mb-8 max-w-md mx-auto">
            FloraVita ailesi sizi bekliyor. Ürünlerimizi keşfedin ve
            bağırsak sağlığınızı doğal yollarla destekleyin.
          </p>
          <Link href="/urunler" className="bg-white text-primary-700 hover:bg-primary-50 font-semibold px-8 py-4 rounded-xl inline-flex items-center gap-2 transition-all hover:shadow-lg">
            Ürünleri Keşfet
          </Link>
        </div>

      </div>
    </div>
  );
}
