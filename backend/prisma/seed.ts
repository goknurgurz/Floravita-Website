import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Veritabani seed baslıyor...');

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.newsletter.deleteMany();

  // Urunler
  await prisma.product.createMany({
    data: [
      {
        name: 'FloraVita Probiyotik Plus',
        slug: 'floravita-probiyotik-plus',
        description: '10 farklı probiyotik sus iceren guclu bagirsak destegi',
        longDesc: 'FloraVita Probiyotik Plus, 10 milyar CFU ile bagirsak floranizi dengeler. Sindirim sisteminizi guclendirir, bagisiklarinizi destekler.',
        price: 299.90,
        oldPrice: 399.90,
        images: ['/images/product-1.jpg'],
        category: 'Probiyotik',
        stock: 50,
        featured: true,
        rating: 4.8,
        reviewCount: 124,
        ingredients: ['Lactobacillus acidophilus', 'Bifidobacterium longum', 'Lactobacillus rhamnosus', 'Inulin'],
        benefits: ['Sindirim sagligi', 'Bagisiklik gucLendirme', 'Siskinlik azaltma'],
      },
      {
        name: 'FloraVita Prebiyotik Lif',
        slug: 'floravita-prebiyotik-lif',
        description: 'Bagirsak bakterilerinizi besleyen dogal prebiyotik lif formulü',
        longDesc: 'Akasya lifi, inulin ve psyllium husk karisimından olusan prebiyotik formulumuz, iyi bakterilerinizi besler.',
        price: 189.90,
        oldPrice: 229.90,
        images: ['/images/product-2.jpg'],
        category: 'Prebiyotik',
        stock: 35,
        featured: true,
        rating: 4.6,
        reviewCount: 89,
        ingredients: ['Akasya Lifi', 'Inulin', 'Psyllium Husk', 'Fenikscicegi Ozü'],
        benefits: ['Duzenli bagirsak hareketi', 'Kolesterol destegi', 'Kan sekeri dengesi'],
      },
      {
        name: 'FloraVita Sindirim Enzimi',
        slug: 'floravita-sindirim-enzimi',
        description: 'Yemek sonrasi siskinlik ve gaz problemlerine dogal cozum',
        longDesc: 'Bitkisel kaynakli sindirim enzimleri protein, yag ve karbonhidratlarin sindirimini kolaylastirir.',
        price: 249.90,
        images: ['/images/product-3.jpg'],
        category: 'Sindirim',
        stock: 45,
        featured: true,
        rating: 4.7,
        reviewCount: 67,
        ingredients: ['Amilaz', 'Lipaz', 'Protaz', 'Bromelain', 'Papain'],
        benefits: ['Hizli sindirim', 'Gaz ve siskinlik azaltma', 'Besin emilimini artirma'],
      },
      {
        name: 'FloraVita Gut Reset Paketi',
        slug: 'floravita-gut-reset-paketi',
        description: '30 gunluk bagirsak sifirlama programi - 3 urun bir arada',
        longDesc: 'Probiyotik Plus, Prebiyotik Lif ve Sindirim Enzimini bir arada sunan 30 gunluk Gut Reset Paketi.',
        price: 649.90,
        oldPrice: 839.70,
        images: ['/images/product-4.jpg'],
        category: 'Paket',
        stock: 20,
        featured: true,
        rating: 4.9,
        reviewCount: 203,
        ingredients: ['Probiyotik Plus', 'Prebiyotik Lif', 'Sindirim Enzimi'],
        benefits: ['Tam bagirsak destegi', '%20 tasarruf', '30 gunluk program'],
      },
      {
        name: 'FloraVita Aloe Vera Jel',
        slug: 'floravita-aloe-vera-jel',
        description: 'Ic bagirsak duvarini onaran ve yatistiran saf aloe vera',
        longDesc: 'Organik aloe vera jeli, bagirsak mukoza tabakasini korur ve yeniler.',
        price: 159.90,
        images: ['/images/product-5.jpg'],
        category: 'Bitkisel',
        stock: 60,
        featured: false,
        rating: 4.5,
        reviewCount: 41,
        ingredients: ['Organik Aloe Vera', 'Vitamin C', 'Vitamin E'],
        benefits: ['Bagirsak duvari onarimi', 'Anti-inflamatuar', 'Detoks destegi'],
      },
      {
        name: 'FloraVita Zencefil & Zerdecal Kapsul',
        slug: 'floravita-zencefil-zerdecal-kapsul',
        description: 'Anti-inflamatuar guc ikilisi - bagirsak iltihabina karsi',
        longDesc: 'Zencefil ve zerdecalin birlesmesi bagirsak iltihabi azaltir.',
        price: 219.90,
        oldPrice: 259.90,
        images: ['/images/product-6.jpg'],
        category: 'Bitkisel',
        stock: 40,
        featured: false,
        rating: 4.6,
        reviewCount: 55,
        ingredients: ['Zencefil Ozü', 'Zerdecal (Kurkumin)', 'Biyoperin', 'Zeytinyagi'],
        benefits: ['Anti-inflamatuar', 'Sindirim rahatligi', 'Bagisiklik destegi'],
      },
    ],
  });

  // Blog Yazilari
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Bagirsak Sagligi Neden Bu Kadar Onemli?',
        slug: 'bagirsak-sagligi-neden-onemli',
        excerpt: 'Bagirsaklarimiz "ikinci beyin" olarak anilir. Peki bu ne anlama geliyor?',
        content: `# Bagirsak Sagligi Neden Bu Kadar Onemli?

Bagirsak sagligi, genel sagligimizin temel tasini olusturur. Son yillarda yapilan arastirmalar, bagirsak mikrobiyotasinin sadece sindirim sistemimizi degil, beyin sagligimizi, bagisiklik sistemimizi ve hatta ruh halimizi etkiledigini gostermistir.

## Bagirsak-Beyin Baglantisi

Bagirsagimizda yaklasik 100 milyon sinir hucresi bulunmaktadir. Bu nedenle bagirsaklarimiz "ikinci beyin" olarak adlandirilir. Serotonin hormonunun %90'i bagirsaklarda uretilir.

## Saglikli Bagirsak Florasinin Faydalar

- **Guclu Bagisiklik:** Bagisiklik hucrelerimizin %70'i bagirsak duvari yakininda bulunur
- **Daha Iyi Sindirim:** Besinlerin dogru sekilde parcalanmasi ve emilmesi
- **Ruh Hali Dengesi:** Serotonin uretimi ile mutluluk hormonu dengesi
- **Enerji Artisi:** Besin emiliminin artmasi ile daha fazla enerji
- **Kilo Kontrolu:** Metabolizma hizlanmasi

## Bagirsak Sagligi Nasil Korunur?

1. Probiyotik ve prebiyotik zengini gidalari tuketin
2. Lifli gidalara agirlik verin
3. Fermente gidalari diyet programiniza ekleyin
4. Stres yonetimini ihmal etmeyin
5. Yeterli su icin`,
        coverImage: '/images/blog-1.jpg',
        category: 'Saglik',
        tags: ['bagirsak sagligi', 'mikrobiyota', 'saglik'],
        author: 'FloraVita Uzmanlar Ekibi',
        readTime: 5,
        published: true,
      },
      {
        title: 'Probiyotik mi, Prebiyotik mi? Fark Nedir?',
        slug: 'probiyotik-prebiyotik-fark',
        excerpt: 'Probiyotik ve prebiyotik kavramlari cok karistirilir. Gercekte ne anlama gelirler?',
        content: `# Probiyotik mi, Prebiyotik mi?

Probiyotik ve prebiyotik terimleri sik sik karisitirilir. Ancak bunlar birbirini tamamlayan, farkli islevleri olan iki ayri kavramdir.

## Probiyotikler Nedir?

Probiyotikler, canli mikroorganizmalardir. Yeterli miktarda alindiginda sagliga fayda saglarlar. Yogurt, kefir, kimchi gibi fermente gidalarda bulunurlar.

**Populer Probiyotik Suslar:**
- Lactobacillus acidophilus
- Bifidobacterium longum  
- Lactobacillus rhamnosus

## Prebiyotikler Nedir?

Prebiyotikler ise probiyotiklerin besinidir. Vucudumuz tarafindan sindirilemeyen, ancak yararli bakterilerin beslenmesini saglayan lif turüdür.

**Prebiyotik Kaynaklar:**
- Sogan ve sarimsak
- Muz
- Enginar
- Yulaf

## Sinerji: Sinbiyotikler

Probiyotik ve prebiyotiklerin birlikte kullanilmasi "sinbiyotik" etkisi yaratir. FloraVita Gut Reset Paketi tam da bu sinerjiyi saglar.`,
        coverImage: '/images/blog-2.jpg',
        category: 'Bilgi',
        tags: ['probiyotik', 'prebiyotik', 'saglik', 'takviye'],
        author: 'FloraVita Uzmanlar Ekibi',
        readTime: 4,
        published: true,
      },
      {
        title: '7 Gunde Bagirsak Sagligi Programi',
        slug: '7-gunde-bagirsak-sagligi-programi',
        excerpt: 'Haftada bir hafta gibi kisa surede bagirsaklarinizi nasil sifirlayabilirsiniz?',
        content: `# 7 Gunluk Bagirsak Sagligi Programi

Bu program ile bagirsaklarinizi 7 gunde sifirlamaya baslayin. Bilimsel olarak kanıtlanmis yontemler.

## Gun 1-2: Temizlik Asamasi

Islenmis gidalari, seker ve alkolu azaltin. Bol su icin ve lifli gidalara agirlik verin.

## Gun 3-4: Besleme Asamasi

Fermente gidalar ekleyin: yoğurt, kefir, tursu. Probiyotik takviyelere baslayin.

## Gun 5-7: Guclendir me Asamasi

Prebiyotik lifler ekleyin. Stres azaltma teknikleri uygulayın.`,
        coverImage: '/images/blog-3.jpg',
        category: 'Program',
        tags: ['detoks', 'program', 'bagirsak', 'saglik'],
        author: 'FloraVita Uzmanlar Ekibi',
        readTime: 6,
        published: true,
      },
      {
        title: 'Siskinlik ve Gaz Problemlerinin 5 Temel Nedeni',
        slug: 'siskinlik-gaz-problemleri-nedenleri',
        excerpt: 'Yemekten sonra karniniz siksik sisiyor mu? Iste gizli nedenleri...',
        content: `# Siskinlik ve Gaz Problemlerinin 5 Temel Nedeni

Karin siskinligi ve gaz, bagirsak sagliginin en sık sikayet edilen semptomlaridir.

## 1. Sindirim Enzimi Eksikligi

Vucudunuz yeterli sindirim enzimi uretmediginde besinler tam olarak parcanlanamaz. Bu durum gaz ve siskinliga yol acar.

## 2. Disbiyozis (Mikrobiyota Dengesizligi)

Zararli bakterilerin yararli bakterilerden fazla olmasi.

## 3. Hizli Yemek Yemek

Besinleri yeterince catlamadan yutmak.

## 4. FODMAP Intoleransi

Bazi karbonhidrat turlerine hassasiyet.

## 5. Stres

Bagirsak-beyin ekseni araciligiyla stres direkt sindirim sisteminizi etkiler.`,
        coverImage: '/images/blog-4.jpg',
        category: 'Saglik',
        tags: ['siskinlik', 'gaz', 'sindirim', 'bagirsak'],
        author: 'FloraVita Uzmanlar Ekibi',
        readTime: 5,
        published: true,
      },
      {
        title: 'Fermente Gidalarin Bagirsak Saglıgina Etkileri',
        slug: 'fermente-gidalarin-bagirsak-sagligina-etkileri',
        excerpt: 'Kefir, yoğurt, kimchi... Fermente gidalar neden bu kadar guclu?',
        content: `# Fermente Gidalarin Gucü

Fermente gidalar, tarih boyunca saglıgın korumak icin kullanilmistir. Bilim artik bu geleneksel bilgeligi dogruluyor.

## Kefir

Kefir, yogurtan daha fazla probiyotik sus icerir. Laktoz intoleransi olan bireyler bile genellikle tüketebilir.

## Kimchi ve Tursu

Fermente sebzeler, hem probiyotik hem de prebiyotik ozellikleri olan nadir gidalardir.

## Miso ve Tempeh

Soya bazli fermente urunler, degerli amino asitler ve probiyotikler icerir.`,
        coverImage: '/images/blog-5.jpg',
        category: 'Beslenme',
        tags: ['fermente', 'kefir', 'yogurt', 'probiyotik'],
        author: 'FloraVita Uzmanlar Ekibi',
        readTime: 4,
        published: true,
      },
      {
        title: 'Stres ve Bagirsak Sagligi Arasindaki Gizli Baglanti',
        slug: 'stres-bagirsak-baglantisi',
        excerpt: 'Stresli oldugunuzda mideniz neden bozuluyor? Bilim yanıtlıyor.',
        content: `# Stres ve Bagirsak: Gizli Baglanti

Bagirsak-beyin eksenini anlarsaniz, neden stresli donemde sindirim sorunlari yasadiginizi anlarsıniz.

## Bagirsak-Beyin Ekseni

200 milyon sinir hucresiyle dolu enterik sinir sistemi, beyninizle surekli iletisim halindedir.

## Kortizolun Etkisi

Stres hormonu kortizol, bagirsak gecirgenligini artirabilir. Bu "sizinti bagirsak" sendromuna yol acabalir.

## Cozüm Yollari

- Meditasyon ve derin nefes
- Duzenli egzersiz
- Yeterli uyku
- Probiyotik takviyesi`,
        coverImage: '/images/blog-6.jpg',
        category: 'Saglik',
        tags: ['stres', 'bagirsak', 'beyin', 'saglik'],
        author: 'FloraVita Uzmanlar Ekibi',
        readTime: 5,
        published: true,
      },
    ],
  });

  // Musteri Yorumlari
  await prisma.testimonial.createMany({
    data: [
      {
        name: 'Ayse K.',
        location: 'Istanbul',
        rating: 5,
        comment: '3 aydir FloraVita Probiyotik Plus kullaniyorum. Siskinlik sorunum tamamen geçti, enerjim artti. Kesinlikle tavsiye ederim!',
        product: 'FloraVita Probiyotik Plus',
        verified: true,
      },
      {
        name: 'Mehmet T.',
        location: 'Ankara',
        rating: 5,
        comment: 'Gut Reset Paketi hayatimi degistirdi. 2 haftada farki hissettim. Uyku duzenimi de duzeltti.',
        product: 'FloraVita Gut Reset Paketi',
        verified: true,
      },
      {
        name: 'Fatma S.',
        location: 'Izmir',
        rating: 5,
        comment: 'Uzun sure IBS sorunum vardi. Doktorumun da oneriyle FloraVita kullanimaya basladim. Cok memnunum.',
        product: 'FloraVita Sindirim Enzimi',
        verified: true,
      },
      {
        name: 'Ali R.',
        location: 'Bursa',
        rating: 4,
        comment: 'Prebiyotik Lif gerekci cok etkili. Ilk hafta biraz gaz yapti ama sonra harika hissettim.',
        product: 'FloraVita Prebiyotik Lif',
        verified: true,
      },
      {
        name: 'Zeynep A.',
        location: 'Antalya',
        rating: 5,
        comment: 'Kargo cok hizli geldi, urun kaliteli ambalajda. Aloe Vera Jeli cok begeniyorum, hafif ve etkili.',
        product: 'FloraVita Aloe Vera Jel',
        verified: true,
      },
      {
        name: 'Burak D.',
        location: 'Adana',
        rating: 5,
        comment: 'Yillardir devam eden reflü problemim ciddi anlamda azaldi. FloraVita ekibine tesekkürler!',
        product: 'FloraVita Gut Reset Paketi',
        verified: true,
      },
    ],
  });

  console.log('Seed tamamlandi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
