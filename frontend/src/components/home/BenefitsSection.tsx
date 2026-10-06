import { FiActivity, FiHeart, FiZap, FiSmile, FiShield, FiSun } from 'react-icons/fi';

const benefits = [
  {
    icon: FiActivity,
    title: 'Sindirim Rahatlığı',
    description: 'Şişkinlik, gaz ve hazımsızlık problemlerini azaltır. Bağırsak hareketlerini düzenler.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: FiShield,
    title: 'Güçlü Bağışıklık',
    description: 'Bağırsak floranızı güçlendirerek vücudunuzun savunma sistemini destekler.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: FiZap,
    title: 'Enerji Artışı',
    description: 'Besinlerin daha iyi emilmesiyle gün boyunca daha enerjik ve canlı hissedersiniz.',
    color: 'bg-yellow-50 text-yellow-600',
  },
  {
    icon: FiSmile,
    title: 'Ruh Hali Dengesi',
    description: 'Serotoninin %90\'ı bağırsakta üretilir. Sağlıklı bağırsak = mutlu zihin.',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    icon: FiHeart,
    title: 'Kalp Sağlığı',
    description: 'Kolesterol dengesi ve kan şekeri kontrolüne katkıda bulunur.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: FiSun,
    title: 'Deri Parlaklığı',
    description: 'Bağırsak-cilt bağlantısı ile cilt sorunlarının azalmasına yardımcı olur.',
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Başlık */}
        <div className="text-center mb-14">
          <div className="badge-green mb-4">Neden FloraVita?</div>
          <h2 className="section-title">
            Sağlıklı Bağırsak,
            <br />
            <span className="text-gradient">Sağlıklı Yaşam</span>
          </h2>
          <p className="section-subtitle mt-4 mx-auto text-gray-500">
            Bağırsaklarınız sadece sindirimden sorumlu değil — bağışıklık, ruh hali, enerji ve
            daha fazlası bağırsak sağlığınızla doğrudan bağlantılıdır.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, description, color }) => (
            <div
              key={title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-card transition-all duration-300 bg-white"
            >
              <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-forest-dark mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* Alt bilgi */}
        <div className="mt-14 bg-gradient-green rounded-2xl p-8 text-white text-center">
          <p className="text-xl font-semibold mb-2">
            Bağırsak Sağlığına Yatırım Yapın
          </p>
          <p className="text-primary-100 text-sm max-w-xl mx-auto">
            Dünya Sağlık Örgütü verilerine göre, yetişkinlerin %70&apos;inden fazlası 
            sindirim sistemi sorunları yaşamaktadır. FloraVita ile bu istatistiğin 
            dışında kalın.
          </p>
        </div>
      </div>
    </section>
  );
}
