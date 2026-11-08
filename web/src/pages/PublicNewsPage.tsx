import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Trophy, ArrowRight, Calendar, User, ExternalLink,
    Shield, Globe, Sparkles, Flame
} from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { useThemeStore } from '../store/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

export interface NewsItem {
    id: string;
    titleAr: string;
    titleEn: string;
    excerptAr: string;
    excerptEn: string;
    bodyAr: string;
    bodyEn: string;
    authorAr: string;
    authorEn: string;
    date: string;
    category: 'official' | 'sports' | 'maintenance' | 'community';
    readTimeAr: string;
    readTimeEn: string;
    pinned: boolean;
    featured: boolean;
    image: string;
    sources?: { title: string; url: string }[];
}

export const clubNewsList: NewsItem[] = [
    {
        id: '1',
        titleAr: 'إنجاز تاريخي: تتويج فريق التجمع الأول بطلاً لدوري قطاعات الجمهورية لكرة القدم (مواليد 2009)',
        titleEn: 'Historical Triumph: First Settlement Team Crowned Champions of Republic Sectors League (2009)',
        excerptAr: 'توج فريق مركز التنمية الشبابية بالتجمع الأول (بطل القاهرة) بلقب دوري قطاعات الجمهورية لكرة القدم لمواليد 2009 بعد تغلبه المثير في النهائي على نادي الرواد بطل الشرقية بركلات الترجيح 4/2، وسط إشادة رسمية من الاتحاد المصري لكرة القدم.',
        excerptEn: 'First Settlement Youth Center team (Cairo Regional Champions) was crowned champion of the 2009 Republic Sectors League after defeating Al-Rowad (Sharqia Champions) 4-2 on penalties in a thrilling final.',
        bodyAr: `توج فريق مركز التنمية الشبابية بالتجمع الأول (بطل منطقة القاهرة) بلقب بطولة دوري قطاعات الجمهورية لكرة القدم لمواليد 2009، بعد فوزه المثير والتاريخي في المباراة النهائية على فريق نادي الرواد (بطل محافظة الشرقية).

شهدت المباراة النهائية حماساً وندية بالغة على مدار شوطي اللقاء، حيث انتهى الوقت الأصلي بالتعادل الإيجابي بهدف لكل فريق (1-1)، قبل أن تحتكم المباراة لركلات الترجيح التي حسمها أبطال التجمع الأول ببراعة بنتيجة (4-2).

وأقيمت مراسم التتويج الرسمية بحضور قيادات ومسؤولي الاتحاد المصري لكرة القدم واللجنة المنظمة للبطولة، حيث تسلّم كابتن فريق التجمع الأول كأس البطولة والميداليات الذهبية وسط احتفالات عارمة من أولياء الأمور والجهاز الفني والإداري بالمركز.

وقدمت وزارة الشباب والرياضة ومجلس إدارة المركز خالص التهنئة للجهاز الفني واللاعبين، مؤكدين أن هذا الإنجاز يعكس ثمار خطة تطوير قطاع الناشئين والأكاديميات المعتمدة بالمركز، والعمل المستمر على اكتشاف المواهب الرياضية وتأهيلها للمنتخبات الوطنية.`,
        bodyEn: `The First Settlement Youth Development Center team (Cairo Regional Champions) achieved a historic triumph by winning the Republic Sectors Football League Championship for the 2009 age category, overcoming Al-Rowad Club (Sharqia Champions) in an electrifying final.

The match ended in a 1-1 draw during regular time before the First Settlement heroes sealed the championship in a decisive 4-2 penalty shootout victory.

The official coronation ceremony took place in the presence of Egyptian Football Association (EFA) officials and tournament coordinators. The team captain proudly lifted the championship cup and received gold medals alongside his teammates and coaching staff.

The Ministry of Youth & Sports and club management congratulated the squad, praising the structured youth academy training pipeline dedicated to feeding Egyptian national teams.`,
        authorAr: 'الاتحاد المصري لكرة القدم (EFA)',
        authorEn: 'Egyptian Football Association (EFA)',
        date: '٢٨ مايو ٢٠٢٦',
        category: 'sports',
        readTimeAr: '٣ دقائق قراءة',
        readTimeEn: '3 min read',
        pinned: true,
        featured: false,
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80',
        sources: [
            { title: 'بوابة الاتحاد المصري لكرة القدم (EFA)', url: 'https://www.efa.com.eg' },
            { title: 'تغطية موقع القاهرة 24 الإخباري (Cairo24)', url: 'https://www.cairo24.com' }
        ]
    },
    {
        id: '2',
        titleAr: 'في جولة مفاجئة.. وزير الشباب والرياضة (جوهر نبيل) يتفقد مركز التنمية الشبابية بالتجمع الأول',
        titleEn: 'Surprise Field Inspection: Minister of Youth & Sports (Gohar Nabil) Visits First Settlement Center',
        excerptAr: 'في ضوء المتابعة الميدانية المستمرة، تفقد السيد الوزير جوهر نبيل يرافقه د. مصطفى زمزم مساعد الوزير مرافق المركز بالكامل، ووجه بسرعة الانتهاء من أعمال الصيانة الشاملة والدهانات للمبنى الإداري وتوفير أحدث التجهيزات والأدوات الرياضية.',
        excerptEn: 'As part of ongoing field inspections, Minister of Youth & Sports Gohar Nabil, accompanied by Assistant Minister Dr. Mostafa Zamzam, inspected the center, directing accelerated maintenance and provision of modern equipment.',
        bodyAr: `في إطار المتابعة الميدانية المستمرة والحرص على الارتقاء بجودة الخدمات المقدمة للشباب والأسرة المصرية، أجرى السيد جوهر نبيل، وزير الشباب والرياضة، جولة تفقدية مفاجئة لمركز التنمية الشبابية بالتجمع الأول بمحافظة القاهرة، يرافقه الدكتور مصطفى زمزم، مساعد الوزير لتطوير مراكز الشباب والتنمية المجتمعية.

وشملت الجولة الميدانية الموسعة تفقد مجمع حمامات السباحة الأولمبي لمتابعة كفاءة تشغيل الفلاتر وجودة المياه والمدرجات، وصالة اللياقة البدنية والألعاب الرياضية (الجيم) للوقوف على مستوى الأجهزة والمعدات المتوفرة للأعضاء، بالإضافة إلى المبنى الإداري ومكاتب خدمة الأعضاء والموظفين.

وخلال الجولة، وجّه السيد وزير الشباب والرياضة بسرعة الانتهاء من أعمال الصيانة الشاملة والدهانات للمبنى الإداري وفقاً لأعلى معايير الجودة والسلامة، مع التأكيد على ضرورة الاستغلال الأمثل للموارد المالية المتاحة للمركز بما يضمن تقديم خدمات متطورة ومتميزة تلبي تطلعات رواد وأبناء التجمع الأول والقاهرة الجديدة.

كما شدد السيد الوزير على أهمية توفير كافة الأدوات والتجهيزات الرياضية الحديثة لمختلف الألعاب الفردية والجماعية داخل الأكاديميات، لضمان جاهزية المنشآت ودعم واكتشاف المواهب الشابة لتغذية المنتخبات الوطنية.`,
        bodyEn: `As part of ongoing unannounced field inspections to elevate community services, Minister of Youth & Sports Gohar Nabil conducted a surprise inspection tour of the First Settlement Youth Development Center in New Cairo, accompanied by Dr. Mostafa Zamzam, Assistant Minister for Youth Centers and Community Development.

The tour covered the Olympic swimming pool complex, modern fitness gymnasium, and the administrative headquarters and member service offices.

The Minister directed swift completion of all maintenance and painting works across the administrative facilities to the highest quality standards, while ensuring efficient allocation of available resources to deliver superior community services.

Furthermore, the Minister instructed the immediate provision of state-of-the-art sports gear and equipment across all accredited academies to cultivate emerging athletic talent.`,
        authorAr: 'وزارة الشباب والرياضة ورئاسة مجلس الوزراء',
        authorEn: 'Ministry of Youth & Sports & Egyptian Cabinet',
        date: '٢٥ سبتمبر ٢٠٢٦',
        category: 'official',
        readTimeAr: '٣ دقائق قراءة',
        readTimeEn: '3 min read',
        pinned: true,
        featured: true,
        image: 'https://www.emys.gov.eg/uploads/photos/2026/09/1790364166.jpg',
        sources: [
            { title: 'الهيئة العامة للاستعلامات المصرية (SIS)', url: 'https://www.sis.gov.eg' },
            { title: 'بوابة وزارة الشباب والرياضة الرسمية (الخبر 21600)', url: 'https://www.emys.gov.eg/news/21600/%D9%81%D9%8A-%D8%AC%D9%88%D9%84%D8%A9-%D9%85%D9%81%D8%A7%D8%AC%D8%A6%D8%A9-%D9%88%D8%B2%D9%8A%D8%B1-%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8-%D9%88%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9-%D9%8A%D8%AA%D9%81%D9%82%D8%AF-%D9%85%D8%B1%D9%83%D8%B2-%D8%A7%D9%84%D8%AA%D9%86%D9%85%D9%8A%D8%A9-%D8%A7%D9%84%D8%B4%D8%A8%D8%A7%D8%A8%D9%8A%D8%A9-%D8%A8%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D8%B9-%D8%A7%D9%84%D8%A3%D9%88%D9%84' },
            { title: 'الصفحة الرسمية لرئاسة مجلس الوزراء (Facebook)', url: 'https://www.facebook.com/share/p/18byx4fosi/' },
            { title: 'تغطية جريدة صدى العرب الإخبارية (820789)', url: 'https://www.sada-elarab.com/820789' }
        ]
    },
    {
        id: '3',
        titleAr: 'إنجاز توجيهات الوزير: اكتمال رفع كفاءة مجمع حمامات السباحة وصالات الجيم على مساحة 14 فداناً',
        titleEn: 'Directives Executed: Modernization of Olympic Pool Complex & Fitness Arenas Across 14 Feddans Complete',
        excerptAr: 'أعلنت إدارة التشغيل والمشروعات عن اكتمال أعمال الصيانة الشاملة وتجديد أنظمة التدفئة والفلاتر بمجمع السباحة الأولمبي، واستكمال دهانات المبنى الإداري، وتزويد صالات الجيم بأحدث أجهزة التدريب البدني.',
        excerptEn: 'Facilities teams completed deep maintenance on pool filtration, heating units, administrative building renovations, and supplied cutting-edge gym conditioning machinery.',
        bodyAr: `أعلنت الإدارة الهندسية وقطاع التشغيل بمركز التنمية الشبابية بالتجمع الأول عن اكتمال حزمة أعمال التطوير والصيانة الشاملة، تنفيذاً للتوجيهات الصادرة خلال زيارة السيد وزير الشباب والرياضة.

شملت الإنجازات المحققة داخل مساحة المركز البالغة 14 فداناً:
1. مجمع حمامات السباحة: صيانة كاملة لطلمبات السحب ونظم التنقية والتدفئة للمسبحين الأولمبي والتدريبي، وتجديد غرف خلع الملابس والمدرجات لاستقبال البطولات الرسمية.
2. صالات اللياقة البدنية (الجيم): توريد وتركيب أجهزة قياس الوزن والكتلة العضلية الدقيقة، وأحدث أجهزة المقاومة والأوزان الحرة مع صيانة أرضيات الصالات وتجديد أنظمة التكييف والتهوية.
3. المبنى الإداري: الانتهاء من أعمال الدهانات الخارجية والداخلية، وتجهيز صالات استقبال الأعضاء ومكتب خدمة العملاء الإلكتروني لتقديم تجربة راقية تليق برواد المركز.`,
        bodyEn: `The Engineering & Operations Department announced the full completion of extensive facility upgrades across the center 14-feddan campus, fulfilling directives from the Minister of Youth & Sports inspection tour.

Key milestones achieved include:
1. Olympic Swimming Complex: Overhaul of filtration pumps and water temperature control systems for both Olympic and training pools, along with modernized locker rooms and seating stands.
2. Fitness Gymnasium: Supply and installation of advanced resistance and aerobic machines, body composition biometric monitors, and enhanced ventilation systems.
3. Administrative Headquarters: High-standard interior and exterior paint finishing, alongside dedicated electronic member service counters.`,
        authorAr: 'الإدارة الهندسية والتشغيل',
        authorEn: 'Engineering & Operations Directorate',
        date: '١٥ أكتوبر ٢٠٢٦',
        category: 'maintenance',
        readTimeAr: 'دقيقتان قراءة',
        readTimeEn: '2 min read',
        pinned: true,
        featured: false,
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80',
        sources: [
            { title: 'خريطة المشروعات التنموية بمصر (EGY-Map)', url: 'https://egy-map.com' },
            { title: 'موقع صدى العرب الإخباري', url: 'https://www.sada-elarab.com/820789' }
        ]
    },
    {
        id: '4',
        titleAr: 'المشروع القومي للموهبة: انطلاق اختبارات وانتقاء براعم وناشئي الأكاديميات الرياضية',
        titleEn: 'National Talent Project: Scouting Assessments Kick Off Across Accredited Sports Academies',
        excerptAr: 'بالتنسيق مع الاتحادات الرياضية المصرية، دشن المركز المرحلة الأولى من اختبارات اكتشاف وانتقاء المواهب الرياضية في السباحة، الكاراتيه، كرة القدم، التنس والبادل، وتنس الطاولة بإشراف مدربين دوليين معتمدين.',
        excerptEn: 'In coordination with Egyptian sports federations, the center launched talent assessment trials for youth aged 4 to 16 in swimming, karate, soccer, tennis, and table tennis.',
        bodyAr: `انطلقت بمركز التنمية الشبابية بالتجمع الأول فعاليات المرحلة الأولى من اختبارات المشروع القومي لاكتشاف المواهب الرياضية ورعاية أبطال المستقبل، بالتعاون مع الاتحادات الرياضية الأولمبية.

تستهدف الاختبارات الفئات العمرية من 4 وحتى 16 عاماً، وتشتمل على تقييمات للقدرات البدنية والمهارية والتوافق العضلي العصبي في ألعاب:
- السباحة الأولمبية وسباحة الزعانف
- الكاراتيه (كاتا وكوميتيه تحت إشراف أبطال عالم)
- كرة القدم وتأسيس البراعم
- التنس الأرضي والبادل وتنس الطاولة

ويحصل المتميزون رياضياً على منح رعاية تدريبية متخصصة وإدراجهم ضمن الفرق التنافسية لتمثيل المركز في دوريات الجمهورية وبطولات منطقة القاهرة.`,
        bodyEn: `The First Settlement Youth Development Center launched phase one of the National Talent Discovery and Future Champions Project in collaboration with Egyptian Olympic Federations.

The program welcomes boys and girls aged 4 to 16, conducting standardized biomechanical and kinetic assessments across Olympic swimming, karate (kata & kumite), football, tennis, padel, and table tennis.

High-performing athletes receive specialized scholarship tracks and placement into elite squads representing the center in national and regional championships.`,
        authorAr: 'قطاع النشاط الرياضي والأكاديميات المعتمدة',
        authorEn: 'Athletics & Accredited Academies Sector',
        date: '٢٢ أكتوبر ٢٠٢٦',
        category: 'sports',
        readTimeAr: '٣ دقائق قراءة',
        readTimeEn: '3 min read',
        pinned: false,
        featured: false,
        image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
        sources: [
            { title: 'الاتحاد المصري للسباحة', url: 'https://www.esf.eg' },
            { title: 'الاتحاد المصري للكاراتيه', url: 'https://www.ekf.org.eg' }
        ]
    },
    {
        id: '5',
        titleAr: 'تيسيرات رقمية: فتح باب تجديد العضويات السنوية 2026 وتفعيل بوابات العبور الذكية (QR Pass)',
        titleEn: 'Digital Membership: 2026 Renewals Open with Smart QR Access & Fawry/InstaPay Integration',
        excerptAr: 'أطلقت إدارة المركز منظومة التحصيل والخدمات الرقمية المتكاملة، متيحةً سداد الاشتراكات وتجديد العضويات وحجز الملاعب عبر فوري وإنستاباي مع تفعيل كروت العضوية الذكية عبر بوابات العبور.',
        excerptEn: 'The center rolled out end-to-end digital services, enabling annual renewals, academy registrations, and court bookings via Fawry and InstaPay, supported by dynamic QR access cards.',
        bodyAr: `في إطار استراتيجية التحول الرقمي وحوكمة الإجراءات المالية والإدارية بمركز التنمية الشبابية بالتجمع الأول، أعلنت إدارة المركز عن فتح باب تجديد الاشتراكات السنوية لموسم 2026/2027 عبر المنظومة الإلكترونية الموحدة.

أهم المزايا والخدمات المفعلة:
1. السداد الإلكتروني الفوري: إمكانية دفع رسوم التجديد واشتراكات الأكاديميات وحجوزات الملاعب عبر كود فوري مخصص، أو من خلال شبكة التحويل اللحظي (InstaPay) على الرقم الرسمي 01013010137، والبطاقات الائتمانية.
2. بطاقة العضوية الرقمية (QR Pass): بطاقة إلكترونية ذكية مشفرة على تطبيق الهاتف تتيح المرور الآمن والسريع عبر بوابات المركز دون الحاجة إلى معاملات ورقية.
3. باقات الخصم العائلي: خصومات تصل إلى 25% للأسر المشتركة وأولياء الأمور المسجلين لأكثر من طفل في الأكاديميات الرياضية.`,
        bodyEn: `As part of its comprehensive digital transformation strategy, the First Settlement Youth Development Center launched online services for 2026/2027 membership renewals.

Highlights of the new digital portal:
1. Instant Multi-Channel Payments: Seamless fee settlement for memberships, sports academies, and court reservations via Fawry code, InstaPay network (01013010137), and bank cards.
2. Dynamic QR Pass: Mobile-based encrypted digital ID cards enabling swift, contactless passage through automated club security turnstiles.
3. Family Incentive Tiers: Sibling and family discounts of up to 25% for multiple registrations in athletic academies.`,
        authorAr: 'شؤون العضوية والتحول الرقمي',
        authorEn: 'Membership & Digital Services',
        date: '٢٨ أكتوبر ٢٠٢٦',
        category: 'community',
        readTimeAr: '٣ دقائق قراءة',
        readTimeEn: '3 min read',
        pinned: false,
        featured: false,
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
        sources: [
            { title: 'بوابة الدفع الإلكتروني المعتمدة (فوري)', url: 'https://fawry.com' },
            { title: 'منظومة المدفوعات اللحظية الوطنية (InstaPay)', url: 'https://instapay.eg' }
        ]
    },
    {
        id: '6',
        titleAr: 'ملتقى مجتمعي وثقافي: انطلاق فعاليات نادي المرأة ومعارض الفنون والنشاط الكشفي بالحديقة المركزية',
        titleEn: 'Cultural & Community Hub: Women Club Forum, Art Exhibits & Scouting Camps Launch',
        excerptAr: 'استضافت الحديقة المفتوحة والمجمع الاجتماعي فعاليات ملتقى نادي المرأة لتمكين الفتيات ومعارض الحرف اليدوية، تزامناً مع إطلاق المعسكر الكشفي وورش الفنون والموسيقى للأطفال والشباب.',
        excerptEn: 'The open gardens and social club hosted the Women Club Entrepreneurship Forum and craft bazaars, alongside junior scouting camps and art workshops.',
        bodyAr: `في إطار الدور التنموي والمجتمعي الشامل لمركز التنمية الشبابية بالتجمع الأول، نظمت اللجنة الاجتماعية والثقافية سلسلة من الفعاليات والملتقيات الجماهيرية بالحديقة المفتوحة والمجمع الثقافي بالمركز.

تضمنت الفعاليات:
1. ملتقى نادي المرأة: معرض للحرف اليدوية والمشغولات التراثية وندوات متخصصة في ريادة الأعمال للمرأة والفتيات بالتجمع الأول بالتعاون مع المجلس القومي للمرأة.
2. النشاط الكشفي والإرشادي: معسكر تدريبي بمشاركة أكثر من 200 شبل وزهرة في مضمار الحدائق المفتوحة لتعلم المهارات الكشفية وحب العمل التطوعي.
3. الفنون التشكيلية والموسيقى: ورش رسم وأنشطة تفاعلية للأطفال بالمكتبة الثقافية لإطلاق طاقات الإبداع واكتشاف المواهب الفنية.`,
        bodyEn: `Emphasizing its mission as a civic hub, the First Settlement Youth Development Center hosted a series of community events across its open parks and cultural pavilion.

Event highlights included:
1. Women Club Forum: Handcrafted heritage bazaars and entrepreneurial workshops held in partnership with the National Council for Women.
2. Scouting Rallies: Outdoor teamwork and survival skills camp for over 200 junior scouts in the center green parkways.
3. Fine Arts & Music: Creative workshops hosted at the cultural library fostering artistic self-expression for children and teens.`,
        authorAr: 'اللجنة الاجتماعية ونادي المرأة',
        authorEn: 'Social Affairs & Women Club',
        date: '٤ نوفمبر ٢٠٢٦',
        category: 'community',
        readTimeAr: 'دقيقتان قراءة',
        readTimeEn: '2 min read',
        pinned: false,
        featured: false,
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80',
        sources: [
            { title: 'الهيئة العامة للاستعلامات المصرية (SIS)', url: 'https://www.sis.gov.eg' },
            { title: 'الإدارة المركزية للأنشطة الشبابية والثقافية', url: 'https://www.emys.gov.eg' }
        ]
    },
    {
        id: '7',
        titleAr: 'طرح مناقصة عامة: توريد الملابس والمهمات الرياضية لفرق وأكاديميات المركز للموسم الجديد',
        titleEn: 'Public Tender Announced: Procurement of Athletic Gear & Kits for Club Squads',
        excerptAr: 'أعلنت إدارة المركز عن طرح مناقصة عامة لتوريد الملابس والأدوات الرياضية لفرق كرة القدم والسباحة والكاراتيه وتنس الطاولة، لضمان جاهزية أبطال المركز لتمثيل التجمع الأول في المنافسات الرسمية.',
        excerptEn: 'Club management announced a public tender for the procurement of competition kits, footwear, and training gear across football, swimming, karate, and racquet sports.',
        bodyAr: `أعلنت إدارة المشتريات والتجهيزات بمركز التنمية الشبابية بالتجمع الأول عن طرح مناقصة عامة بين الشركات المتخصصة لتوريد الملابس والمهمات الرياضية والأدوات التدريبية الخاصة بالفرق الرياضية والأكاديميات المعتمدة بالمركز لموسم 2026/2027.

تشمل المناقصة توريد:
- أطقم المباريات الرسمية والتدريب لفرق كرة القدم بقطاع الناشئين ودوري القطاعات.
- مايوهات السباحة التنافسية المعتمدة ونظارات وشنط السباحة للأكاديمية والفرق.
- بدلات الكاراتيه (كيمونو كاتا وكوميتيه) ومهمات الحماية المعتمدة دولياً.
- مضارب وكرات ومعدات تدريب التنس الأرضي والبادل وتنس الطاولة.

تأتي هذه الخطوة تنفيذاً لتوجيهات وزارة الشباب والرياضة بالارتقاء بجودة التجهيزات الرياضية المقدمة للأبطال الواعدين وتوفير كافة متطلبات التميز والريادة الرياضية.`,
        bodyEn: `The Procurement and Equipment Department at First Settlement Youth Development Center announced a public tender for the supply of certified athletic wear and training accessories for the 2026/2027 season.

The tender covers official match and training apparel for youth football squads, competitive FINA-standard swimwear, certified karate kimonos and safety gear, alongside tennis, padel, and table tennis accessories.

This initiative follows Ministry of Youth & Sports guidelines to ensure top-grade equipment for youth athletes competing in official championships.`,
        authorAr: 'إدارة التوريدات والمشتريات الرسمية',
        authorEn: 'Official Procurement & Supplies Directorate',
        date: '٧ نوفمبر ٢٠٢٦',
        category: 'official',
        readTimeAr: 'دقيقتان قراءة',
        readTimeEn: '2 min read',
        pinned: false,
        featured: false,
        image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80',
        sources: [
            { title: 'بوابة التعاقدات والمناقصات الحكومية الرسمية', url: 'https://etenders.gov.eg' },
            { title: 'جريدة الأخبار والمناقصات المصرية', url: 'https://www.akhbarelyom.com' }
        ]
    }
];

export default function PublicNewsPage() {
    const navigate = useNavigate();
    const { language, toggleLanguage, isRTL } = useLanguageStore();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [activeModalItem, setActiveModalItem] = useState<NewsItem | null>(null);

    const categories = [
        { id: 'all', labelAr: 'جميع الأخبار والبيانات', labelEn: 'All Press Updates' },
        { id: 'official', labelAr: 'بيانات وقرارات رسمية', labelEn: 'Official Statements' },
        { id: 'sports', labelAr: 'أنشطة وبطولات المركز', labelEn: 'Sports & Tournaments' },
        { id: 'maintenance', labelAr: 'تطوير وصيانة المنشآت', labelEn: 'Facilities Upgrades' },
        { id: 'community', labelAr: 'الأنشطة المجتمعية ونادي المرأة', labelEn: 'Community & Culture' },
    ];

    const filtered = selectedCategory === 'all'
        ? clubNewsList
        : clubNewsList.filter((n) => n.category === selectedCategory);

    const featuredArticle = filtered.find((n) => n.featured) || filtered[0];
    const regularArticles = filtered.filter((n) => n.id !== featuredArticle?.id);

    return (
        <div className={`landing ${isRTL ? 'rtl-direction' : 'ltr-direction'}`} style={{ minHeight: '100vh', background: 'var(--color-bg-primary)', color: 'var(--color-text-primary)' }}>
            {/* Top Official Banner */}
            <div style={{ background: '#0f172a', color: '#94a3b8', padding: '8px 24px', fontSize: '0.8rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ maxWidth: 1250, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ color: '#ef4444', fontWeight: 800 }}>🇪🇬 جمهورية مصر العربية</span>
                        <span>•</span>
                        <span style={{ color: '#e2e8f0', fontWeight: 700 }}>وزارة الشباب والرياضة</span>
                        <span>•</span>
                        <span>المركز الإعلامي المعتمد (١٤ فداناً)</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <span>📞 الخط الساخن: 01013010137</span>
                        <button onClick={toggleLanguage} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 700 }}>
                            {language === 'ar' ? 'English' : 'العربية'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Header */}
            <header style={{ position: 'sticky', top: 0, zIndex: 900, backdropFilter: 'blur(20px)', background: 'rgba(10, 10, 26, 0.92)', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ maxWidth: 1250, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--color-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Trophy size={22} />
                        </div>
                        <div>
                            <span style={{ fontSize: '1.15rem', fontWeight: 900, display: 'block', lineHeight: 1.2 }}>
                                {language === 'ar' ? 'مركز التنمية الشبابية بالتجمع الأول' : 'First Settlement Youth Center'}
                            </span>
                            <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                                {language === 'ar' ? 'البوابة الإعلامية والبيانات المعتمدة' : 'Official Press & Media Center'}
                            </span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button className="btn btn-secondary" onClick={() => navigate('/')} style={{ gap: 8, fontSize: '0.88rem' }}>
                            <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Club'}
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate('/login')} style={{ fontSize: '0.88rem' }}>
                            {language === 'ar' ? 'دخول الأعضاء' : 'Sign In'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main style={{ maxWidth: 1250, margin: '0 auto', padding: '40px 24px 80px' }}>
                {/* Page Title */}
                <div style={{ marginBottom: 36, textAlign: isRTL ? 'right' : 'left' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', fontSize: '0.82rem', fontWeight: 800, marginBottom: 12 }}>
                        <Flame size={14} />
                        {language === 'ar' ? 'التغطية الحية والبيانات المعتمدة من الإنترنت' : 'Live Verified Press Feed'}
                    </div>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 900, margin: '0 0 10px', color: 'var(--color-text-primary)' }}>
                        {language === 'ar' ? 'أخبار المركز والبيانات الرسمية' : 'Official News & Statements'}
                    </h1>
                    <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', maxWidth: 750, margin: 0, lineHeight: 1.7 }}>
                        {language === 'ar'
                            ? 'المصدر الرسمي لقرارات وزارة الشباب والرياضة، جولات القيادات الميدانية، بطولات قطاعات الجمهورية، والأنشطة الرياضية والمجتمعية بمركز التنمية الشبابية بالتجمع الأول (١٤ فداناً).'
                            : 'The authoritative source for Ministry directives, leadership inspection visits, Republic championships, and community initiatives at First Settlement Youth Center (14 Feddans).'}
                    </p>
                </div>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '16px',
                                border: `1.5px solid ${selectedCategory === cat.id ? 'var(--color-accent-1)' : 'var(--color-border)'}`,
                                background: selectedCategory === cat.id ? 'var(--color-gradient)' : 'var(--color-bg-card)',
                                color: selectedCategory === cat.id ? 'white' : 'var(--color-text-secondary)',
                                fontWeight: 700,
                                fontSize: '0.88rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {language === 'ar' ? cat.labelAr : cat.labelEn}
                        </button>
                    ))}
                </div>

                {/* Featured Headline Article */}
                {featuredArticle && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: 'var(--color-bg-card)',
                            borderRadius: '28px',
                            border: '1px solid var(--color-border)',
                            overflow: 'hidden',
                            marginBottom: 44,
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))' }}>
                            <div style={{ position: 'relative', minHeight: 340 }}>
                                <img
                                    src={featuredArticle.image}
                                    alt={language === 'ar' ? featuredArticle.titleAr : featuredArticle.titleEn}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                                    }}
                                />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)' }} />
                                <span style={{ position: 'absolute', top: 18, [isRTL ? 'right' : 'left']: 18, background: '#ef4444', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                    <Shield size={14} />
                                    {language === 'ar' ? 'تغطية رسمية استثنائية' : 'Official Coverage'}
                                </span>
                            </div>

                            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: 14 }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                            <Calendar size={14} />
                                            {featuredArticle.date}
                                        </span>
                                        <span>•</span>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                                            <User size={14} />
                                            {language === 'ar' ? featuredArticle.authorAr : featuredArticle.authorEn}
                                        </span>
                                    </div>

                                    <h2 style={{ fontSize: 'clamp(1.35rem, 2.1vw, 1.8rem)', fontWeight: 900, lineHeight: 1.35, color: 'var(--color-text-primary)', marginBottom: 16 }}>
                                        {language === 'ar' ? featuredArticle.titleAr : featuredArticle.titleEn}
                                    </h2>

                                    <p style={{ fontSize: '0.96rem', color: 'var(--color-text-secondary)', lineHeight: 1.75, marginBottom: 20 }}>
                                        {language === 'ar' ? featuredArticle.excerptAr : featuredArticle.excerptEn}
                                    </p>

                                    {/* Sources */}
                                    {featuredArticle.sources && (
                                        <div style={{ background: 'var(--color-bg-primary)', padding: '14px', borderRadius: '16px', border: '1px solid var(--color-border)', marginBottom: 24 }}>
                                            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700, display: 'block', marginBottom: 8 }}>
                                                {language === 'ar' ? 'المصادر الرسمية المعتمدة للتوثيق:' : 'Verified Official Sources:'}
                                            </span>
                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                {featuredArticle.sources.map((s, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={s.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{ fontSize: '0.76rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '4px 10px', borderRadius: '10px', display: 'inline-flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}
                                                    >
                                                        <Globe size={12} />
                                                        {s.title}
                                                        <ExternalLink size={10} />
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setActiveModalItem(featuredArticle)}
                                        style={{ padding: '12px 24px', fontSize: '0.92rem', gap: 8 }}
                                    >
                                        {language === 'ar' ? 'قراءة البيان والتفاصيل الكاملة' : 'Read Full Coverage'}
                                        <ArrowRight size={16} style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Regular News Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 26 }}>
                    {regularArticles.map((article) => (
                        <motion.div
                            key={article.id}
                            whileHover={{ y: -6 }}
                            style={{
                                background: 'var(--color-bg-card)',
                                borderRadius: '22px',
                                border: '1px solid var(--color-border)',
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                boxShadow: 'var(--shadow-md)'
                            }}
                        >
                            <div style={{ position: 'relative', height: 210 }}>
                                <img
                                    src={article.image}
                                    alt={language === 'ar' ? article.titleAr : article.titleEn}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                                <span style={{ position: 'absolute', top: 12, [isRTL ? 'right' : 'left']: 12, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', color: 'white', padding: '4px 12px', borderRadius: '14px', fontSize: '0.75rem', fontWeight: 700 }}>
                                    {article.date}
                                </span>
                                {article.pinned && (
                                    <span style={{ position: 'absolute', top: 12, [isRTL ? 'left' : 'right']: 12, background: '#f59e0b', color: '#1e1b4b', padding: '4px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800 }}>
                                        ★ {language === 'ar' ? 'مميز' : 'Pinned'}
                                    </span>
                                )}
                            </div>

                            <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-accent-3)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                                        {language === 'ar' ? article.authorAr : article.authorEn}
                                    </span>
                                    <h3 style={{ fontSize: '1.12rem', fontWeight: 800, lineHeight: 1.4, color: 'var(--color-text-primary)', marginBottom: 12 }}>
                                        {language === 'ar' ? article.titleAr : article.titleEn}
                                    </h3>
                                    <p style={{ fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
                                        {language === 'ar' ? article.excerptAr : article.excerptEn}
                                    </p>
                                </div>

                                <div style={{ paddingTop: 18, borderTop: '1px solid var(--color-border)', marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                        {language === 'ar' ? article.readTimeAr : article.readTimeEn}
                                    </span>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={() => setActiveModalItem(article)}
                                        style={{ padding: '6px 14px', fontSize: '0.82rem' }}
                                    >
                                        {language === 'ar' ? 'التفاصيل والمصادر' : 'Details & Sources'}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Article Detail Modal */}
            <AnimatePresence>
                {activeModalItem && (
                    <div
                        className="modal-backdrop"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: 'rgba(0, 0, 0, 0.8)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 1100,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px'
                        }}
                        onClick={() => setActiveModalItem(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: '780px',
                                maxHeight: '90vh',
                                overflowY: 'auto',
                                background: 'var(--color-bg-secondary)',
                                borderRadius: '24px',
                                border: '1px solid var(--color-border)',
                                padding: '32px'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                                <span style={{ background: '#ef4444', color: 'white', padding: '4px 14px', borderRadius: '16px', fontSize: '0.76rem', fontWeight: 800 }}>
                                    {language === 'ar' ? 'بيان وتغطية رسمية معتمدة' : 'Official Press Statement'}
                                </span>
                                <button
                                    onClick={() => setActiveModalItem(null)}
                                    style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
                                >
                                    ✕
                                </button>
                            </div>

                            <h2 style={{ fontSize: '1.45rem', fontWeight: 900, lineHeight: 1.35, marginBottom: 12, color: 'var(--color-text-primary)' }}>
                                {language === 'ar' ? activeModalItem.titleAr : activeModalItem.titleEn}
                            </h2>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--color-text-muted)', fontSize: '0.82rem', marginBottom: 20, flexWrap: 'wrap' }}>
                                <span>📅 {activeModalItem.date}</span>
                                <span>•</span>
                                <span>✍️ {language === 'ar' ? activeModalItem.authorAr : activeModalItem.authorEn}</span>
                                <span>•</span>
                                <span>⏱️ {language === 'ar' ? activeModalItem.readTimeAr : activeModalItem.readTimeEn}</span>
                            </div>

                            <div style={{ borderRadius: '18px', overflow: 'hidden', marginBottom: 22, maxHeight: '360px' }}>
                                <img
                                    src={activeModalItem.image}
                                    alt={language === 'ar' ? activeModalItem.titleAr : activeModalItem.titleEn}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80';
                                    }}
                                />
                            </div>

                            <div style={{ fontSize: '0.98rem', color: 'var(--color-text-secondary)', lineHeight: 1.85, whiteSpace: 'pre-line', marginBottom: 26 }}>
                                {language === 'ar' ? activeModalItem.bodyAr : activeModalItem.bodyEn}
                            </div>

                            {activeModalItem.sources && (
                                <div style={{ background: 'var(--color-bg-primary)', padding: '16px', borderRadius: '14px', border: '1px solid var(--color-border)', marginBottom: 24 }}>
                                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-primary)', display: 'block', marginBottom: 8 }}>
                                        {language === 'ar' ? 'الروابط والمصادر الرسمية للخبر عبر الإنترنت:' : 'Official Citations & Verified Web Sources:'}
                                    </span>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {activeModalItem.sources.map((s, idx) => (
                                            <a
                                                key={idx}
                                                href={s.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                style={{ color: '#38bdf8', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                                            >
                                                <Globe size={14} />
                                                {s.title}
                                                <ExternalLink size={12} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <button className="btn btn-secondary" onClick={() => setActiveModalItem(null)} style={{ width: '100%' }}>
                                    {language === 'ar' ? 'إغلاق النافذة' : 'Close Window'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', padding: '36px 24px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                © 2026 {language === 'ar' ? 'مركز التنمية الشبابية بالتجمع الأول (١٤ فداناً) • وزارة الشباب والرياضة المصرية. جميع الحقوق محفوظة.' : 'First Settlement Youth Center (14 Feddans) • Ministry of Youth & Sports. All rights reserved.'}
            </footer>
        </div>
    );
}
