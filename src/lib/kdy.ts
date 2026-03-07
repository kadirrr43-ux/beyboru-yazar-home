// KDY (Kitapyurdu Doğrudan Yayıncılık) Entegrasyonu

export interface KDYBook {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  fullDescription: string;
  coverImage: string;
  price: number;
  pageCount: number;
  isbn: string;
  publishDate: string;
  kdyLink: string;
  kdyBookId: string;
}

// Beybörü kitapları - KDY'den statik veriler
export const kdyBooks: KDYBook[] = [
  {
    id: 'ergenekod',
    title: 'Ergenekod',
    subtitle: '',
    description: 'ERGENEKOD, Ergenekon Destanı\'nı bildiğinizi sandığınız her şeyden yeniden yazıyor.',
    fullDescription: `ERGENEKOD, Ergenekon Destanı'nı bildiğinizi sandığınız her şeyden yeniden yazıyor.

Akademik bir keşif gibi başlayan yolculuk; kadim teknolojiler, gizli devlet dosyaları ve bin yıldır uykuda bekleyen bir mirasla karanlık bir gerilime dönüşüyor. Göktürk tamgaları, mekanik labirentler ve "Bozkurt" efsanesinin ardındaki gerçek, modern dünyanın tam ortasında yeniden canlanıyor.

Bu roman;
– Tarih ve bilimi,
– Mitoloji ve teknolojiyi,
– İnanç ve güç savaşını
aynı potada eritiyor.

ERGENEKOD, sadece bir macera romanı değil;
"Bilgi kime aittir?" sorusunu okurun vicdanına bırakan güçlü bir anlatı.

Eğer kadim sırların modern dünyayı tehdit ettiği hikâyeleri seviyorsan,
bu kitap seni içine çekecek…
ve kolay kolay bırakmayacak.`,
    coverImage: 'https://img.kitapyurdu.com/v1/getImage/fn:12177399/wi:800/wh:25a239bd7',
    price: 119.00,
    pageCount: 84,
    isbn: '9786258662054',
    publishDate: '2026-02-10',
    kdyLink: 'https://www.kitapyurdu.com/kitap/ergenekod/745980.html',
    kdyBookId: '745980',
  },
  {
    id: 'kudus',
    title: 'Kudüs',
    subtitle: 'Küllerden Doğan Umut',
    description: 'Bu kitap, bir şehrin yıkıntıları arasından yükselen sessiz ama sarsıcı bir direnişin hikâyesidir.',
    fullDescription: `Bu kitap, bir şehrin yıkıntıları arasından yükselen sessiz ama sarsıcı bir direnişin hikâyesidir. 

Kudüs'ün taşlarında biriken acıyı, kayıpların ortasında filizlenen umudu ve insan kalbinin vazgeçmeyen tarafını anlatır. 

Bombaların gölgesinde büyüyen çocuklar, bir lokma ekmeği paylaşan eller, harfleri öğrenirken hayata tutunan küçük yürekler… Her bölümde, savaşın sert yüzüyle birlikte sabrın, merhametin ve imanın direnci yan yana durur. 

Bu satırlar, yalnızca Kudüs'ün değil, insanlığın ortak vicdanına seslenir. Küllerden Doğan Umut, yıkımın ortasında bile umudun nasıl yeşerdiğini, en karanlık gecelerde bile bir ışığın nasıl var olabildiğini hatırlatır. 

Bu kitap; suskun çığlıkları duymak, sabrı anlamak ve umudu yeniden düşünmek isteyen herkes için kaleme alındı. 

Çünkü bazen bir şehir yıkılır, ama umut asla.`,
    coverImage: 'https://img.kitapyurdu.com/v1/getImage/fn:12177398/wi:800/wh:d760b5716',
    price: 159.00,
    pageCount: 148,
    isbn: '9786258662122',
    publishDate: '2026-02-10',
    kdyLink: 'https://www.kitapyurdu.com/kitap/kudus/745979.html',
    kdyBookId: '745979',
  },
  {
    id: 'zincirlerden-gunese',
    title: 'Zincirlerden Güneşe',
    subtitle: 'Kara Güneş Doğuyor',
    description: 'Zincirler kırıldığında, güneş yeniden doğar.',
    fullDescription: `Zincirler kırıldığında, güneş yeniden doğar. 

Yüzyıllar boyunca sömürülen, susturulan ve yok sayılan bir kıta… Ama her karanlığın içinde, mutlaka bir kıvılcım vardır. 

Kara Güneş Doğuyor, Afrika'nın kalbinde filizlenen sessiz bir direnişin, zamanla küresel bir uyanışa dönüşmesini anlatıyor. Farklı halklar, diller ve inançlar; ortak bir kaderde buluşur. 

Zincirlerle kurulan düzen, artık sorgulanmaktadır. Bu roman; yalnızca bir isyan hikâyesi değil, birlik olmanın, bedel ödemenin ve özgürlüğün gerçek anlamını hatırlatan güçlü bir çağrıdır. 

Kara Güneş bir semboldür. Ve bir kez doğdu mu, hiçbir güç onu yeniden karanlığa gömemez.`,
    coverImage: 'https://img.kitapyurdu.com/v1/getImage/fn:12177401/wi:800/wh:1a186d974',
    price: 119.00,
    pageCount: 94,
    isbn: '9786258669992',
    publishDate: '2026-02-10',
    kdyLink: 'https://www.kitapyurdu.com/kitap/zincirlerden-gunese/745982.html',
    kdyBookId: '745982',
  },
];

// KDY'den kitap bilgisi getir
export async function fetchKDYBook(bookId: string): Promise<KDYBook | null> {
  const book = kdyBooks.find(b => b.kdyBookId === bookId || b.id === bookId);
  return book || null;
}

// Tüm KDY kitaplarını getir
export async function fetchAllKDYBooks(): Promise<KDYBook[]> {
  return kdyBooks;
}

// Kitap görseli URL'si oluştur
export function getKDYImageUrl(bookId: string): string {
  const book = kdyBooks.find(b => b.kdyBookId === bookId || b.id === bookId);
  if (book) {
    return book.coverImage;
  }
  return '/placeholder-book.png';
}

// KDY linki oluştur
export function getKDYLink(bookId: string): string {
  const book = kdyBooks.find(b => b.kdyBookId === bookId || b.id === bookId);
  return book?.kdyLink || `https://www.kitapyurdu.com/kitap/${bookId}`;
}
