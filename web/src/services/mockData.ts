import { User } from '../store/authStore';

export interface SportProgram {
    id: string;
    category: 'aquatics' | 'racquet' | 'ball' | 'combat' | 'fitness';
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: string;
    image: string;
    agesAr: string;
    agesEn: string;
    scheduleAr: string;
    scheduleEn: string;
    coachAr: string;
    coachEn: string;
    feeMonthlyEgp: number;
    color: string;
    achievementsAr: string;
    achievementsEn: string;
}

export const sportsPrograms: SportProgram[] = [
    {
        id: 'swim',
        category: 'aquatics',
        titleAr: 'أكاديمية السباحة الأولمبية',
        titleEn: 'Olympic Swimming Academy',
        descAr: 'مسبح أولمبي مغطى ومدفأ مع نخبة من أبطال الجمهورية، برامج لتعليم السباحة للمبتدئين وتدريب فرق البطولات.',
        descEn: 'Olympic heated pool with top national coaches. Programs ranging from basic water safety to competitive championship training.',
        icon: '🏊‍♂️',
        image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&fit=crop',
        agesAr: 'من ٤ سنوات حتى الكبار',
        agesEn: 'Ages 4 to Adults',
        scheduleAr: 'السبت والإثنين والأربعاء (٤م - ٨م)',
        scheduleEn: 'Sat, Mon & Wed (4 PM - 8 PM)',
        coachAr: 'ك/ شريف الشافعي (مدرب منتخب سابق)',
        coachEn: 'Coach Sherif El Shafei (Ex-National Coach)',
        feeMonthlyEgp: 650,
        color: '#0ea5e9',
        achievementsAr: '٨ ميداليات ذهبية في بطولة القاهرة الشتوية ٢٠٢٥',
        achievementsEn: '8 Gold Medals in Cairo Winter Championship 2025'
    },
    {
        id: 'table-tennis',
        category: 'racquet',
        titleAr: 'أكاديمية تنس الطاولة',
        titleEn: 'Table Tennis Academy',
        descAr: 'صالات مكيفة مجهزة بأحدث الطاولات الدولية وأجهزة إطلاق الكرات الآلية لتطوير التكنيك وسرعة رد الفعل.',
        descEn: 'Climate-controlled arena with international standard tables and automated ball-feeders for precision training.',
        icon: '🏓',
        image: 'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&fit=crop',
        agesAr: 'من ٦ سنوات حتى الكبار ورواد النادي',
        agesEn: 'Ages 6 to Adults & Veterans',
        scheduleAr: 'الأحد والثلاثاء والخميس (٥م - ٩م)',
        scheduleEn: 'Sun, Tue & Thu (5 PM - 9 PM)',
        coachAr: 'ك/ عماد حمدي (بطل دوري الدرجة الأولى)',
        coachEn: 'Coach Emad Hamdy (Division 1 Champion)',
        feeMonthlyEgp: 450,
        color: '#ec4899',
        achievementsAr: 'المركز الأول في دوري أندية التجمع ٢٠٢٥',
        achievementsEn: '1st Place in New Cairo Club League 2025'
    },
    {
        id: 'karate',
        category: 'combat',
        titleAr: 'مدرسة الكاراتيه والدفاع عن النفس',
        titleEn: 'Karate & Self-Defense School',
        descAr: 'تدريب رسمي معتمد من الاتحاد المصري للكاراتيه للحصول على الأحزمة والمشاركة في بطولات الجمهورية مع تعزيز الانضباط.',
        descEn: 'Federation-accredited karate program teaching kata and kumite, developing confidence, discipline, and medalists.',
        icon: '🥋',
        image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&fit=crop',
        agesAr: 'من ٥ سنوات حتى الشباب',
        agesEn: 'Ages 5 to 21',
        scheduleAr: 'السبت والثلاثاء والخميس (٤م - ٧م)',
        scheduleEn: 'Sat, Tue & Thu (4 PM - 7 PM)',
        coachAr: 'ك/ محمود بدوي (حزام أسود دان ٥)',
        coachEn: 'Coach Mahmoud Badawy (5th Dan Black Belt)',
        feeMonthlyEgp: 500,
        color: '#ef4444',
        achievementsAr: 'درع بطولة الجمهورية للأحزمة الملونة ٢٠٢٦',
        achievementsEn: 'Republic Championship Shield 2026'
    },
    {
        id: 'football',
        category: 'ball',
        titleAr: 'أكاديمية كرة القدم للناشئين',
        titleEn: 'Youth Football Academy',
        descAr: 'ملاعب نجيل صناعي معتمدة من الفيفا مع إضاءة ليلية، تدريب فني وبدني وبرامج تسويق للمواهب بالتعاون مع الأندية الكبرى.',
        descEn: 'FIFA-grade floodlit turf pitches. Comprehensive tactical, technical, and fitness drills with scouting opportunities.',
        icon: '⚽',
        image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&fit=crop',
        agesAr: 'من ٥ إلى ١٨ سنة (مجموعات متدرجة)',
        agesEn: 'Ages 5 to 18 (Graded age brackets)',
        scheduleAr: 'الجمعة والسبت والإثنين (٣:٣٠م - ٧م)',
        scheduleEn: 'Fri, Sat & Mon (3:30 PM - 7 PM)',
        coachAr: 'ك/ إبراهيم حلمي (لاعب نادي المقاولون سابقاً)',
        coachEn: 'Coach Ibrahim Helmy (Ex-Arab Contractors)',
        feeMonthlyEgp: 700,
        color: '#22c55e',
        achievementsAr: 'كأس منطقة القاهرة للبراعم تحت ١٢ سنة',
        achievementsEn: 'Cairo District Cup U-12 Champions'
    },
    {
        id: 'tennis',
        category: 'racquet',
        titleAr: 'أكاديمية التنس الأرضي والبادل',
        titleEn: 'Tennis & Padel Club',
        descAr: 'ملاعب ترابية وصلبة معتمدة مع ملاعب بادل زجاجية حديثة، برامج تأسيس للأطفال وتأجير ملاعب بالساعة للأعضاء.',
        descEn: 'Championship clay and hard courts plus modern panoramic padel courts with private and group coaching.',
        icon: '🎾',
        image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&fit=crop',
        agesAr: 'كافة الأعمار والعائلات',
        agesEn: 'All Ages & Family packages',
        scheduleAr: 'يومياً (٨ صباحاً حتى ١١ مساءً)',
        scheduleEn: 'Daily (8 AM - 11 PM)',
        coachAr: 'ك/ كريم عثمان (مدرب دولي معتمد)',
        coachEn: 'Coach Karim Osman (ITF Certified)',
        feeMonthlyEgp: 850,
        color: '#f59e0b',
        achievementsAr: 'استضافة بطولة بادل التجمع السنوية ٢٠٢٥',
        achievementsEn: 'Host of Annual New Cairo Padel Cup'
    },
    {
        id: 'gym',
        category: 'fitness',
        titleAr: 'صالة اللياقة البدنية والجمباز',
        titleEn: 'Fitness Center & Gymnastics',
        descAr: 'صالة جيم متكاملة بأحدث الأجهزة الرياضية مع مدربين شخصيين، وقاعة مخصصة لجمباز الأطفال والأيروبيكس للسيدات.',
        descEn: 'Fully equipped modern gym with personal trainers, plus dedicated kids gymnastics and ladies fitness studios.',
        icon: '🏋️‍♀️',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&fit=crop',
        agesAr: 'الجمباز من ٤ سنوات، الجيم من ١٥ سنة',
        agesEn: 'Gymnastics from 4 yrs, Gym from 15 yrs',
        scheduleAr: 'يومياً على فترتين (رجال وسيدات)',
        scheduleEn: 'Daily (Dedicated Men & Women hours)',
        coachAr: 'د/ ريم فاروق (أخصائية تأهيل رياضي)',
        coachEn: 'Dr. Reem Farouk (Sports Rehab Specialist)',
        feeMonthlyEgp: 550,
        color: '#8b5cf6',
        achievementsAr: 'المركز الثاني ببطولة الجمهورية للجمباز الإيقاعي',
        achievementsEn: '2nd Place National Rhythmic Gymnastics'
    }
];

// Mock Data Store
export const mockData = {
    user: {
        id: 'demo-001',
        email: 'admin@clubhub.demo',
        firstName: 'Alex',
        lastName: 'Rivera',
        roles: [{ clubId: 'club-001', clubName: 'مركز التنمية الشبابية بالتجمع الأول', role: 'super_admin' }],
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    } as User,

    dashboardStats: {
        stats: [
            { label: 'Total Members', value: 3820, change: '+14%', trend: 'up' },
            { label: 'Active Bookings', value: 68, change: '+9%', trend: 'up' },
            { label: 'Revenue (Monthly)', value: 'EGP 340,000', change: '+12%', trend: 'up' },
            { label: 'Facility Usage', value: '84%', change: '+4%', trend: 'up' },
        ],
        recentActivity: [
            { id: 1, user: 'عماد حمدي', action: 'registered', target: 'أكاديمية تنس الطاولة', time: 'منذ دقيقتين' },
            { id: 2, user: 'سارة إبراهيم', action: 'booked', target: 'ملعب التنس 1', time: 'منذ ١٠ دقائق' },
            { id: 3, user: 'أحمد محمود', action: 'renewed', target: 'تجديد العضوية السنوية', time: 'منذ نصف ساعة' },
        ]
    },

    bookings: [
        { id: 'b-1', facilityName: 'ملعب التنس الرئيسي', startTime: '2026-09-28T16:00:00', endTime: '2026-09-28T17:30:00', user_name: 'سارة إبراهيم', status: 'confirmed' },
        { id: 'b-2', facilityName: 'حارة المسبح الأولمبي 3', startTime: '2026-09-28T18:00:00', endTime: '2026-09-28T19:00:00', user_name: 'عمر شريف', status: 'pending' },
        { id: 'b-3', facilityName: 'ملعب كرة القدم الخماسي A', startTime: '2026-09-29T20:00:00', endTime: '2026-09-29T21:30:00', user_name: 'محمد علي', status: 'confirmed' },
    ],

    facilities: [
        { id: 'f-1', name: 'ملعب كرة القدم القانوني', type: 'court', status: 'available' },
        { id: 'f-2', name: 'المسبح الأولمبي المغطى', type: 'pool', status: 'available' },
        { id: 'f-3', name: 'ملاعب التنس الأرضي والبادل', type: 'court', status: 'occupied' },
        { id: 'f-4', name: 'صالة اللياقة البدنية والجمباز', type: 'indoor', status: 'available' },
        { id: 'f-5', name: 'صالة تنس الطاولة المكيفة', type: 'indoor', status: 'available' },
    ],

    members: [
        { id: 'm-1', firstName: 'عماد', lastName: 'حمدي', email: 'emad@example.com', status: 'active', info: 'عضوية عاملة - 01013010137' },
        { id: 'm-2', firstName: 'سارة', lastName: 'إبراهيم', email: 'sarah@example.com', status: 'active', info: 'عضوية عائلية كاملة' },
        { id: 'm-3', firstName: 'محمود', lastName: 'خالد', email: 'mahmoud@example.com', status: 'pending', info: 'بانتظار سداد رسوم التجديد' },
    ],

    payments: [
        { id: 'p-1', amount: 2400.00, date: '2026-09-20', status: 'paid', description: 'تجديد العضوية السنوية ٢٠٢٦' },
        { id: 'p-2', amount: 650.00, date: '2026-09-22', status: 'paid', description: 'اشتراك شهري بأكاديمية السباحة' },
        { id: 'p-3', amount: 450.00, date: '2026-09-25', status: 'pending', description: 'اشتراك أكاديمية تنس الطاولة' },
    ],

    news: [
        {
            id: 'n-1',
            title: 'في جولة مفاجئة.. وزير الشباب والرياضة يتفقد مركز التنمية الشبابية بالتجمع الأول',
            date: '2026-09-25',
            content: 'في ضوء الزيارات الميدانية المفاجئة، تفقد جوهر نبيل، وزير الشباب والرياضة، يرافقه الدكتور مصطفى زمزم مساعد الوزير، مركز التنمية الشبابية بالتجمع الأول. شملت الجولة حمام السباحة وصالة الألعاب الرياضية والمبنى الإداري، ووجه الوزير بسرعة الانتهاء من أعمال الصيانة والدهانات وتوفير أحدث التجهيزات الرياضية لكافة الألعاب لخدمة أسر وشباب المنطقة.',
            sourceName: 'وزارة الشباب والرياضة / رئاسة مجلس الوزراء / صدى العرب',
            sourceUrl: 'https://www.emys.gov.eg/news/21600',
            imageUrl: 'https://www.emys.gov.eg/uploads/photos/2026/09/1790364166.jpg'
        },
        {
            id: 'n-2',
            title: 'بدء تنفيذ توجيهات الوزير: رفع كفاءة مجمع حمام السباحة والصالة الرياضية',
            date: '2026-09-26',
            content: 'انطلقت أعمال التطوير والدهانات الشاملة وفقاً لتوجيهات وزير الشباب والرياضة جوهر نبيل، مع تعزيز جاهزية المنشأة وتزويد الأكاديميات بالأدوات والمعدات الفنية الحديثة.',
            sourceName: 'إدارة مركز التنمية الشبابية بالتجمع الأول',
            sourceUrl: 'https://www.sada-elarab.com/820789'
        },
        {
            id: 'n-3',
            title: 'فتح باب تجديد العضويات السنوية لعام 2026 وسداد رسوم الأكاديميات عبر فوري والمنظومة الإلكترونية',
            date: '2026-09-20',
            content: 'تعلن إدارة المركز عن استمرار تجديد الاشتراكات السنوية وسداد اشتراكات الأكاديميات بتيسيرات جديدة تشمل الخصم العائلي وخيارات السداد عبر فوري والمحافظ الإلكترونية.',
            sourceName: 'خدمة الأعضاء والاشتراكات'
        },
        {
            id: 'n-4',
            title: 'انطلاق برنامج اكتشاف المواهب الرياضية الواعدة بالمركز',
            date: '2026-09-18',
            content: 'برعاية وزارة الشباب والرياضة، تنطلق تجارب الأداء الرياضية للأطفال والناشئين في رياضات السباحة، الكاراتيه، وتنس الطاولة وكرة القدم لاختيار المواهب ورعايتها.',
            sourceName: 'قطاع النشاط الرياضي'
        }
    ],

    events: [
        { id: 'e-1', title: 'البطولة الودية المفتوحة للبادل وتنس الطاولة', date: '2026-10-02', time: '05:00 PM', location: 'الملاعب المركزية' },
        { id: 'e-2', title: 'المهرجان الرياضي الأسري ويوم المرح للأطفال', date: '2026-10-09', time: '09:00 AM', location: 'الحديقة المفتوحة ومضمار الجري' },
    ]
};
