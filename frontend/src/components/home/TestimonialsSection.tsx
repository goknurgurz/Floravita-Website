import { FiStar } from 'react-icons/fi';
import { mockTestimonials } from '@/lib/data';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FiStar
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        {/* Başlık */}
        <div className="text-center mb-14">
          <div className="badge-green mb-4">Müşteri Yorumları</div>
          <h2 className="section-title">
            Müşterilerimiz
            <br />
            <span className="text-gradient">Ne Diyor?</span>
          </h2>
          <p className="section-subtitle mt-4 mx-auto text-gray-500">
            10.000&apos;den fazla mutlu müşterimizin gerçek deneyimleri
          </p>

          {/* Özet istatistikler */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-forest-dark">4.8</span>
            <span className="text-gray-500 text-sm">/ 10.000+ değerlendirme</span>
          </div>
        </div>

        {/* Yorumlar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-cream-50 border border-gray-100 rounded-2xl p-6 hover:shadow-card transition-all duration-300"
            >
              {/* Üst: Puan + Doğrulanmış */}
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={testimonial.rating} />
                {testimonial.verified && (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                    ✓ Doğrulanmış
                  </span>
                )}
              </div>

              {/* Yorum */}
              <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">
                &ldquo;{testimonial.comment}&rdquo;
              </p>

              {/* Alt: Kullanıcı bilgisi */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-forest-dark">{testimonial.name}</p>
                    {testimonial.location && (
                      <p className="text-xs text-gray-400">{testimonial.location}</p>
                    )}
                  </div>
                </div>
                {testimonial.product && (
                  <span className="text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded-lg max-w-28 text-right line-clamp-2">
                    {testimonial.product.replace('FloraVita ', '')}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Alt CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Siz de FloraVita ailesine katılın ve farkı hissedin.
          </p>
        </div>
      </div>
    </section>
  );
}
