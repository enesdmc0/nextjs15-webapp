import { QuestionsType } from "@/types";

interface CategoriesType {
    [key: string]: string;
}

export const categories: CategoriesType = {
    "my": "Benim Yazılarım",
    "spor": "Spor",
    "siyaset": "Siyaset",
    "ekonomi": "Ekonomi",
    "sanat": "Sanat",
    "bilim": "Bilim",
    "teknoloji": "Teknoloji",
    "tarih": "Tarih",
    "edebiyat": "Edebiyat",
    "müzik": "Müzik",
    "sinema": "Sinema",
}

export const QUESTIONS_MOCK_DATA: QuestionsType[] = [
    {
        "text": "Günde kaç saat spor yapıyorsunuz?",
        "option1": "1 saatten az",
        "option2": "1 saatten fazla",
        "category": "spor"
    },
    {
        "text": "Futbol mu basketbol mu daha ilginizi çeker?",
        "option1": "Futbol",
        "option2": "Basketbol",
        "category": "spor"
    },
    {
        "text": "Haftada kaç kez spor salonuna gidiyorsunuz?",
        "option1": "2 kez veya daha az",
        "option2": "3 kez veya daha fazla",
        "category": "spor"
    },
    {
        "text": "Kardiyo mu ağırlık çalışması mı tercih edersiniz?",
        "option1": "Kardiyo",
        "option2": "Ağırlık çalışması",
        "category": "spor"
    },
    {
        "text": "Takım sporları mı bireysel sporlar mı?",
        "option1": "Takım sporları",
        "option2": "Bireysel sporlar",
        "category": "spor"
    },
    {
        "text": "Hangi siyasi sistem daha iyi çalışır?",
        "option1": "Demokrasi",
        "option2": "Otokrasi",
        "category": "siyaset"
    },
    {
        "text": "Yerel yönetimler daha fazla yetki sahibi olmalı mı?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "siyaset"
    },
    {
        "text": "Seçim sisteminde reform gerekli mi?",
        "option1": "Evet, gerekli",
        "option2": "Hayır, mevcut sistem iyi",
        "category": "siyaset"
    },
    {
        "text": "Hükümetin ekonomide daha fazla müdahalesi olmalı mı?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "siyaset"
    },
    {
        "text": "Uluslararası ittifaklar önemli mi?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "siyaset"
    },
    {
        "text": "Ekonomiyi canlandırmanın en iyi yolu nedir?",
        "option1": "Yatırımların artırılması",
        "option2": "Vergilerin düşürülmesi",
        "category": "ekonomi"
    },
    {
        "text": "Enflasyonla mücadelede ne daha etkili?",
        "option1": "Faiz artırımı",
        "option2": "Piyasaya para arzı",
        "category": "ekonomi"
    },
    {
        "text": "Hangi sektör daha fazla desteklenmeli?",
        "option1": "Tarım",
        "option2": "Sanayi",
        "category": "ekonomi"
    },
    {
        "text": "Döviz kurlarını kontrol etmek mümkün mü?",
        "option1": "Evet, mümkün",
        "option2": "Hayır, piyasa belirler",
        "category": "ekonomi"
    },
    {
        "text": "Kamu harcamaları azaltılmalı mı?",
        "option1": "Evet, azaltılmalı",
        "option2": "Hayır, artırılmalı",
        "category": "ekonomi"
    },
    {
        "text": "Hangi sanat dalı daha çok ilginizi çeker?",
        "option1": "Resim",
        "option2": "Heykel",
        "category": "sanat"
    },
    {
        "text": "Modern sanat mı klasik sanat mı?",
        "option1": "Modern sanat",
        "option2": "Klasik sanat",
        "category": "sanat"
    },
    {
        "text": "Sanat toplumun gelişimine katkıda bulunur mu?",
        "option1": "Evet, bulunur",
        "option2": "Hayır, etkisi sınırlı",
        "category": "sanat"
    },
    {
        "text": "Sanatçıya devlet desteği olmalı mı?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "sanat"
    },
    {
        "text": "Sanat eğitimi zorunlu olmalı mı?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "sanat"
    },
    {
        "text": "Yapay zeka insan zekasını geçer mi?",
        "option1": "Evet, geçer",
        "option2": "Hayır, insan zekası üstün",
        "category": "bilim"
    },
    {
        "text": "Uzay araştırmalarına daha fazla yatırım yapılmalı mı?",
        "option1": "Evet, yapılmalı",
        "option2": "Hayır, gereksiz",
        "category": "bilim"
    },
    {
        "text": "İklim değişikliği bilimin en büyük sorunu mu?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "bilim"
    },
    {
        "text": "Bilim insanlarının bağımsız çalışmaları desteklenmeli mi?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "bilim"
    },
    {
        "text": "Genetik mühendisliği etik mi?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "bilim"
    },
    {
        "text": "Hangi teknoloji geleceğimizi daha çok etkileyecek?",
        "option1": "Yapay zeka",
        "option2": "Blockchain",
        "category": "teknoloji"
    },
    {
        "text": "Otonom araçlar hayatı kolaylaştırır mı?",
        "option1": "Evet, kolaylaştırır",
        "option2": "Hayır, riskler içerir",
        "category": "teknoloji"
    },
    {
        "text": "Sosyal medya bağımlılık yapar mı?",
        "option1": "Evet, yapar",
        "option2": "Hayır, kontrol edilebilir",
        "category": "teknoloji"
    },
    {
        "text": "Robotlar insan iş gücünü tamamen değiştirecek mi?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "teknoloji"
    },
    {
        "text": "Veri gizliliği en büyük sorunlardan biri mi?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "teknoloji"
    },
    {
        "text": "Tarihte hangi olay sizi daha çok etkiledi?",
        "option1": "Birinci Dünya Savaşı",
        "option2": "İkinci Dünya Savaşı",
        "category": "tarih"
    },
    {
        "text": "Osmanlı İmparatorluğu'nun en önemli dönemi hangisiydi?",
        "option1": "Kuruluş Dönemi",
        "option2": "Yükselme Dönemi",
        "category": "tarih"
    },
    {
        "text": "Rönesans mı Aydınlanma mı daha önemliydi?",
        "option1": "Rönesans",
        "option2": "Aydınlanma",
        "category": "tarih"
    },
    {
        "text": "Tarihte hangi lider daha etkiliydi?",
        "option1": "Mustafa Kemal Atatürk",
        "option2": "Napolyon Bonapart",
        "category": "tarih"
    },
    {
        "text": "Tarihte en büyük keşif hangisiydi?",
        "option1": "Amerika'nın keşfi",
        "option2": "Tekerleğin icadı",
        "category": "tarih"
    },
    {
        "text": "En sevdiğiniz edebiyat türü nedir?",
        "option1": "Roman",
        "option2": "Şiir",
        "category": "edebiyat"
    },
    {
        "text": "Hangi yazarın eserlerini daha çok seversiniz?",
        "option1": "Orhan Pamuk",
        "option2": "Ahmet Hamdi Tanpınar",
        "category": "edebiyat"
    },
    {
        "text": "Modern edebiyat mı klasik edebiyat mı?",
        "option1": "Modern",
        "option2": "Klasik",
        "category": "edebiyat"
    },
    {
        "text": "E-kitap mı basılı kitap mı tercih edersiniz?",
        "option1": "E-kitap",
        "option2": "Basılı kitap",
        "category": "edebiyat"
    },
    {
        "text": "Hangi edebi dönem daha ilgi çekici?",
        "option1": "Tanzimat Dönemi",
        "option2": "Servet-i Fünun",
        "category": "edebiyat"
    },
    {
        "text": "Müziğin hangi türü sizi daha çok etkiler?",
        "option1": "Klasik müzik",
        "option2": "Pop müzik",
        "category": "müzik"
    },
    {
        "text": "Canlı müzik mi kayıt müzik mi tercih edersiniz?",
        "option1": "Canlı müzik",
        "option2": "Kayıt müzik",
        "category": "müzik"
    },
    {
        "text": "Müziği öğrenmek zor mu?",
        "option1": "Evet, zor",
        "option2": "Hayır, öğrenilebilir",
        "category": "müzik"
    },
    {
        "text": "Müzik insan ruhunu iyileştirir mi?",
        "option1": "Evet",
        "option2": "Hayır",
        "category": "müzik"
    },
    {
        "text": "Hangi müzik enstrümanı daha büyüleyici?",
        "option1": "Piyano",
        "option2": "Gitar",
        "category": "müzik"
    },
    {
        "text": "Hangi sinema türünü tercih edersiniz?",
        "option1": "Aksiyon",
        "option2": "Dram",
        "category": "sinema"
    },
    {
        "text": "3D filmler mi normal filmler mi daha iyi?",
        "option1": "3D filmler",
        "option2": "Normal filmler",
        "category": "sinema"
    },
    {
        "text": "Sinema mı televizyon dizileri mi?",
        "option1": "Sinema",
        "option2": "Televizyon dizileri",
        "category": "sinema"
    },
    {
        "text": "En iyi film yönetmeni kim?",
        "option1": "Christopher Nolan",
        "option2": "Quentin Tarantino",
        "category": "sinema"
    },
    {
        "text": "Hangi film türü sizi daha çok heyecanlandırır?",
        "option1": "Bilim kurgu",
        "option2": "Korku",
        "category": "sinema"
    }
]