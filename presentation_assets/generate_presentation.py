# -*- coding: utf-8 -*-
"""
Script to generate the Arabic Executive Presentation for:
مركز التنمية الشبابية بالتجمع الأول
Tailored for the Board of Directors, showcasing real dark-mode screenshots,
highlighting center efforts and sports activities, full AI capabilities,
and removing all demo credentials.
"""

import os
import subprocess
import shutil

BASE_DIR = r"D:\New folder\Club"
ASSETS_DIR = os.path.join(BASE_DIR, "presentation_assets")
SCREENSHOTS_DIR = os.path.join(ASSETS_DIR, "screenshots")
HTML_PATH = os.path.join(ASSETS_DIR, "executive_presentation.html")
PDF_PATH = os.path.join(BASE_DIR, "ClubHub_Executive_Presentation_AR.pdf")
ASSETS_PDF = os.path.join(ASSETS_DIR, "ClubHub_Executive_Presentation_AR.pdf")

html_content = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>العرض التقديمي لمجلس الإدارة | مركز التنمية الشبابية بالتجمع الأول</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-dark: #070b14;
            --card-bg: rgba(17, 24, 39, 0.85);
            --card-border: rgba(255, 255, 255, 0.1);
            --gold: #f59e0b;
            --emerald: #10b981;
            --blue: #3b82f6;
            --purple: #a855f7;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }

        body {
            font-family: 'Cairo', 'Tajawal', sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            overflow-x: hidden;
            line-height: 1.6;
        }

        .deck-container {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .slide {
            width: 1440px;
            height: 900px;
            margin: 20px auto;
            position: relative;
            background: radial-gradient(circle at top right, #131c31 0%, #080d1a 100%);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 45px 65px 35px 65px;
        }

        .slide-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            padding-bottom: 16px;
            margin-bottom: 20px;
        }

        .slide-header-left {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .slide-header-right {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .slide-badge {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05));
            border: 1px solid rgba(245, 158, 11, 0.4);
            color: var(--gold);
            font-size: 13px;
            font-weight: 700;
            padding: 4px 14px;
            border-radius: 9999px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }

        .slide-title-wrap h2 {
            font-size: 26px;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 2px;
        }

        .slide-title-wrap p {
            font-size: 14px;
            color: var(--text-muted);
        }

        .club-brand {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 800;
            font-size: 14px;
            color: #ffffff;
            background: rgba(255, 255, 255, 0.06);
            padding: 6px 14px;
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .slide-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: relative;
            z-index: 10;
        }

        .slide-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(255, 255, 255, 0.06);
            padding-top: 12px;
            margin-top: 15px;
            font-size: 13px;
            color: var(--text-muted);
        }

        .slide-number {
            font-weight: 700;
            color: var(--gold);
        }

        .glass-card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 12px;
            padding: 20px;
            backdrop-filter: blur(12px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);
        }

        .stat-card {
            background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9));
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 18px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .stat-icon {
            width: 48px;
            height: 48px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
        }

        .stat-val {
            font-size: 26px;
            font-weight: 900;
            color: #ffffff;
            line-height: 1.1;
        }

        .stat-label {
            font-size: 13px;
            color: var(--text-muted);
            margin-top: 2px;
        }

        .stat-trend {
            font-size: 11px;
            font-weight: 700;
            color: var(--emerald);
            display: inline-flex;
            align-items: center;
            gap: 3px;
        }

        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
        }

        .grid-3 {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
        }

        .grid-4 {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 18px;
        }

        .grid-5-7 {
            display: grid;
            grid-template-columns: 5fr 7fr;
            gap: 25px;
        }

        .grid-7-5 {
            display: grid;
            grid-template-columns: 7fr 5fr;
            gap: 25px;
        }

        .mockup-window {
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
        }

        .mockup-bar {
            background: #1e293b;
            padding: 9px 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            flex-shrink: 0;
        }

        .mockup-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }

        .mockup-url {
            background: rgba(0, 0, 0, 0.35);
            border-radius: 4px;
            padding: 2px 12px;
            font-size: 11px;
            color: #94a3b8;
            margin-right: auto;
            direction: ltr;
        }

        .mockup-image-frame {
            width: 100%;
            height: 510px;
            overflow: hidden;
            background: #0b1120;
            display: flex;
            align-items: flex-start;
            justify-content: center;
        }

        .mockup-image-frame img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
            display: block;
        }

        .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 16px;
        }

        .feature-icon-box {
            width: 38px;
            height: 38px;
            border-radius: 8px;
            background: rgba(59, 130, 246, 0.15);
            border: 1px solid rgba(59, 130, 246, 0.3);
            color: #60a5fa;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .feature-title {
            font-weight: 700;
            font-size: 16px;
            color: #ffffff;
            margin-bottom: 3px;
        }

        .feature-desc {
            font-size: 13px;
            color: var(--text-muted);
            line-height: 1.5;
        }

        .glow-gold {
            position: absolute;
            width: 400px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(245, 158, 11, 0.12) 0%, transparent 70%);
            top: -100px;
            right: -100px;
            pointer-events: none;
        }

        .glow-emerald {
            position: absolute;
            width: 450px;
            height: 450px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%);
            bottom: -150px;
            left: -150px;
            pointer-events: none;
        }

        .nav-controls {
            position: fixed;
            bottom: 25px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 9999px;
            padding: 8px 24px;
            display: flex;
            align-items: center;
            gap: 16px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
            z-index: 1000;
            backdrop-filter: blur(16px);
        }

        .nav-btn {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 9999px;
            padding: 8px 16px;
            font-weight: 700;
            cursor: pointer;
            font-family: inherit;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .nav-btn:hover {
            background: var(--gold);
            color: #000;
            border-color: var(--gold);
        }

        .nav-btn.primary {
            background: linear-gradient(135deg, #10b981, #059669);
            border: none;
            color: #fff;
        }

        .nav-counter {
            font-size: 14px;
            font-weight: 700;
            color: var(--gold);
            min-width: 80px;
            text-align: center;
        }

        @media print {
            body {
                background-color: #070b14 !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            .no-print {
                display: none !important;
            }
            .slide {
                width: 297mm !important;
                height: 210mm !important;
                margin: 0 !important;
                border: none !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                page-break-after: always !important;
                page-break-inside: avoid !important;
                padding: 12mm 18mm !important;
                background: radial-gradient(circle at top right, #131c31 0%, #080d1a 100%) !important;
            }
            @page {
                size: A4 landscape;
                margin: 0;
            }
        }
    </style>
</head>
<body>

    <div class="nav-controls no-print">
        <button class="nav-btn" onclick="prevSlide()">◀ الشريحة السابقة</button>
        <span class="nav-counter" id="slideIndicator">1 / 15</span>
        <button class="nav-btn" onclick="nextSlide()">الشريحة التالية ▶</button>
        <button class="nav-btn primary" onclick="window.print()">📥 حفظ كـ PDF / طباعة</button>
        <button class="nav-btn" onclick="togglePresentationMode()">⛶ ملء الشاشة</button>
    </div>

    <div class="deck-container">

        <!-- SLIDE 1: COVER SLIDE -->
        <section class="slide" id="slide-1">
            <div class="glow-gold"></div>
            <div class="glow-emerald"></div>

            <div class="slide-header" style="border: none;">
                <div class="club-brand" style="font-size: 17px; padding: 8px 18px;">
                    <span style="color: var(--gold); font-size: 22px;">🏛️</span>
                    <span>مركز التنمية الشبابية بالتجمع الأول | إدارة التحول الرقمي</span>
                </div>
                <div class="slide-badge" style="font-size: 14px; padding: 6px 16px;">
                    وثيقة استراتيجية سرية لمجلس الإدارة 2026
                </div>
            </div>

            <div class="slide-content" style="align-items: center; text-align: center; justify-content: center; gap: 18px;">
                <div style="background: rgba(245, 158, 11, 0.12); border: 1px solid rgba(245, 158, 11, 0.35); padding: 6px 22px; border-radius: 9999px; color: var(--gold); font-weight: 700; font-size: 15px; display: inline-flex; align-items: center; gap: 8px;">
                    ⚡ التدشين الرسمي للمنظومة الرقمية السحابية المدعومة بالذكاء الاصطناعي
                </div>

                <h1 style="font-size: 46px; font-weight: 900; line-height: 1.25; color: #ffffff; max-width: 1200px;">
                    مشروع التدشين الإلكتروني الموحد: <br>
                    <span style="background: linear-gradient(135deg, #f59e0b, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                        مركز التنمية الشبابية بالتجمع الأول
                    </span>
                </h1>

                <p style="font-size: 19px; color: #cbd5e1; max-width: 950px; line-height: 1.6;">
                    رؤية استراتيجية رائدة <strong>لإبراز أنشطة المركز والمجهودات الضخمة المبذولة به</strong>، وتوظيف حلول <strong>الذكاء الاصطناعي</strong> في تنظيم الأوقات، حل المشكلات التشغيلية، ومضاعفة الإنجاز الإداري والمالي.
                </p>

                <div class="grid-3" style="max-width: 1000px; width: 100%; margin-top: 15px;">
                    <div class="glass-card" style="padding: 16px; border-color: rgba(245, 158, 11, 0.3);">
                        <div style="font-size: 26px; font-weight: 900; color: var(--gold);">إبراز الإنجازات</div>
                        <div style="font-size: 13px; color: #cbd5e1; font-weight: 600;">نافذة إعلامية تعكس مجهودات الإدارة والأنشطة</div>
                    </div>
                    <div class="glass-card" style="padding: 16px; border-color: rgba(16, 185, 129, 0.3);">
                        <div style="font-size: 26px; font-weight: 900; color: var(--emerald);">حوكمة وإنجاز</div>
                        <div style="font-size: 13px; color: #cbd5e1; font-weight: 600;">سداد إلكتروني ومحرك حجز متطور للملاعب</div>
                    </div>
                    <div class="glass-card" style="padding: 16px; border-color: rgba(168, 85, 247, 0.3);">
                        <div style="font-size: 26px; font-weight: 900; color: #c084fc;">ذكاء اصطناعي 24/7</div>
                        <div style="font-size: 13px; color: #cbd5e1; font-weight: 600;">تنظيم الأوقات والرد الفوري واكتشاف المواهب</div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>مُعد للعرض أمام: <strong>السيد رئيس مجلس الإدارة والسادة الأعضاء المحترمين</strong></div>
                <div class="slide-number">الشريحة 01 / 15</div>
            </div>
        </section>

        <!-- SLIDE 2: IMPORTANCE OF SHOWCASING EFFORTS & ACTIVITIES -->
        <section class="slide" id="slide-2">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>أهمية المنظومة الرقمية في إبراز أنشطة المركز والمجهودات المبذولة</h2>
                        <p>تسليط الضوء على الطفرة الإنشائية والرياضية والتنظيمية التي يشهدها مركز التنمية الشبابية بالتجمع الأول</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">الرؤية الإعلامية والتسويقية</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-3" style="gap: 22px;">
                    <div class="glass-card" style="border-top: 4px solid var(--gold);">
                        <div style="font-size: 32px; margin-bottom: 12px;">🌟</div>
                        <h3 style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px;">1. إبراز المجهودات المبذولة أمام الرأي العام والوزارة</h3>
                        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">
                            المركز يشهد طفرة ضخمة في التطوير والصيانة ومتابعة توجيهات معالي وزير الشباب والرياضة؛ فالموقع يوثق هذه المجهودات بالصوت والصورة، ويضعها أمام أهالي التجمع الأول والقيادات الرياضية على مدار الساعة.
                        </p>
                    </div>

                    <div class="glass-card" style="border-top: 4px solid var(--emerald);">
                        <div style="font-size: 32px; margin-bottom: 12px;">🏆</div>
                        <h3 style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px;">2. تسويق قطاع الأنشطة والأكاديميات الرياضية</h3>
                        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">
                            عرض شامل لكافة ألعاب المركز (14 رياضة معتمدة: السباحة الأولمبية، كرة القدم، التنس، البادل، الكاراتيه، والجمباز)، وجذب آلاف الرياضيين والناشئين للاشتراك في الأكاديميات ومضاعفة الموارد الذاتية للمركز.
                        </p>
                    </div>

                    <div class="glass-card" style="border-top: 4px solid var(--blue);">
                        <div style="font-size: 32px; margin-bottom: 12px;">🤝</div>
                        <h3 style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 8px;">3. تعزيز ثقة العضو وبناء هوية مؤسسية مشرفة</h3>
                        <p style="font-size: 13px; color: var(--text-muted); line-height: 1.6;">
                            نقل المركز من الأسلوب الإداري التقليدي إلى مصاف المؤسسات الرياضية الكبرى؛ مما يُشعر العضو بالفخر والتقدير لحجم العمل الدؤوب الذي يبذله مجلس الإدارة وإدارة المركز يومياً لخدمة المجتمع.
                        </p>
                    </div>
                </div>

                <div class="glass-card" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.25); margin-top: 20px; padding: 16px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 14px;">
                        <span style="font-size: 26px;">🎯</span>
                        <div style="font-size: 14px; font-weight: 700; color: #fff;">
                            الموقع ليس مجرد نظام إداري داخلي، بل هو <strong>الواجهة الرقمية الرسمية والنافذة الإعلامية الكبرى</strong> للمركز التي تعكس ريادته المجتمعية والرياضية في القاهرة الجديدة.
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>إبراز هوية ومجهودات مركز التنمية الشبابية بالتجمع الأول</div>
                <div class="slide-number">الشريحة 02 / 15</div>
            </div>
        </section>

        <!-- SLIDE 3: CURRENT REALITY VS DIGITAL FUTURE -->
        <section class="slide" id="slide-3">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>الدافع الاستراتيجي: لماذا نحتاج التدشين الفوري؟</h2>
                        <p>مقارنة مباشرة بين التحديات التشغيلية الراهنة وثمار التحول الرقمي الشامل للمركز</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">الجدوى التشغيلية</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-2">
                    <div class="glass-card" style="background: rgba(239, 68, 68, 0.05); border-color: rgba(239, 68, 68, 0.25);">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
                            <div style="background: rgba(239, 68, 68, 0.2); color: #f87171; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px;">⚠️</div>
                            <h3 style="color: #fca5a5; font-size: 20px; font-weight: 800;">الوضع التقليدي الراهن (التحديات)</h3>
                        </div>

                        <div class="feature-item">
                            <div class="feature-icon-box" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: #f87171;">⏳</div>
                            <div>
                                <div class="feature-title" style="color: #fecaca;">طوابير التجديد والازدحام الموسمي</div>
                                <div class="feature-desc">معاناة الأعضاء وأسرهم في تجديد الاشتراكات واستلام الكارنيهات الورقية يدوياً.</div>
                            </div>
                        </div>

                        <div class="feature-item">
                            <div class="feature-icon-box" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: #f87171;">📉</div>
                            <div>
                                <div class="feature-title" style="color: #fecaca;">تسرب إيرادات الملاعب والحجز الدفتري</div>
                                <div class="feature-desc">أخطاء التكرار في حجز ملاعب البادل والتنس، وعدم وجود تحصيل إلكتروني مسبق.</div>
                            </div>
                        </div>

                        <div class="feature-item">
                            <div class="feature-icon-box" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.2); color: #f87171;">❓</div>
                            <div>
                                <div class="feature-title" style="color: #fecaca;">تراكم الاستفسارات والشكاوى</div>
                                <div class="feature-desc">صعوبة الرد على مئات الاتصالات اليومية حول المواعيد والأسعار والاشتراكات.</div>
                            </div>
                        </div>
                    </div>

                    <div class="glass-card" style="background: rgba(16, 185, 129, 0.05); border-color: rgba(16, 185, 129, 0.3);">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px;">
                            <div style="background: rgba(16, 185, 129, 0.2); color: #34d399; width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px;">✨</div>
                            <h3 style="color: #6ee7b7; font-size: 20px; font-weight: 800;">بعد تدشين المنظومة الرقمية</h3>
                        </div>

                        <div class="feature-item">
                            <div class="feature-icon-box" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); color: #34d399;">💳</div>
                            <div>
                                <div class="feature-title" style="color: #a7f3d0;">تجديد ودفع إلكتروني لحظي بالثواني</div>
                                <div class="feature-desc">سداد الرسوم عبر فوري، فيزا، ماستركارد، وميزة، مع إصدار فوري للفواتير المعتمدة.</div>
                            </div>
                        </div>

                        <div class="feature-item">
                            <div class="feature-icon-box" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); color: #34d399;">🎾</div>
                            <div>
                                <div class="feature-title" style="color: #a7f3d0;">حجز ملاعب ذكي 24/7 مع سداد مسبق</div>
                                <div class="feature-desc">جدول مواعيد دقيق، تسعير ديناميكي لساعات الذروة، ومنع تام للحجوزات المزدوجة.</div>
                            </div>
                        </div>

                        <div class="feature-item">
                            <div class="feature-icon-box" style="background: rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.2); color: #34d399;">🤖</div>
                            <div>
                                <div class="feature-title" style="color: #a7f3d0;">ذكاء اصطناعي يرد فورياً وينظم الأوقات</div>
                                <div class="feature-desc">إجابة لحظية 24/7 عن أي سؤال، تقليل المشاكل، وزيادة الإنجاز الإداري.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>تحليل أثر التحول الرقمي المؤسسي</div>
                <div class="slide-number">الشريحة 03 / 15</div>
            </div>
        </section>

        <!-- SLIDE 4: REAL HOMEPAGE (SCREENSHOT) -->
        <section class="slide" id="slide-4">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>بوابة المركز العامة: الواجهة الرقمية الرسمية (Homepage)</h2>
                        <p>لقطة حية للبوابة الرسمية: تصميم عصري بالوضع الليلي يعكس هوية المركز ومنشآته الأولمبية وتوجيهات الوزارة</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">لقطة حقيقية من الموقع الحي</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-7-5">
                    <div class="mockup-window">
                        <div class="mockup-bar">
                            <div class="mockup-dot" style="background: #ef4444;"></div>
                            <div class="mockup-dot" style="background: #f59e0b;"></div>
                            <div class="mockup-dot" style="background: #10b981;"></div>
                            <div class="mockup-url">https://firstsettlement-ydc.eg/</div>
                        </div>
                        <div class="mockup-image-frame">
                            <img src="screenshots/real_homepage.png" alt="Real Homepage Screenshot">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center; gap: 14px;">
                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">🏛️ واجهة سيادية تليق بالمركز</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                تصميم ملكي جذاب يستعرض مجمع حمام السباحة الأولمبي، ملاعب كرة القدم المعتمدة، وصالات الألعاب والأنشطة الاجتماعية.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 6px;">📢 إبراز التوجيهات والزيارات الرسمية</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                توثيق فوري لزيارات معالي وزير الشباب والرياضة ومتابعة أعمال التطوير والصيانة الدورية لتعزيز الشفافية مع الأعضاء.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: #60a5fa; margin-bottom: 6px;">⚡ بوابات وصول سريعة للأعضاء</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                أزرار سريعة تتيح للعضو تجديد العضوية، حجز الملاعب، أو الاشتراك في الأكاديميات الرياضية بنقرة واحدة.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>لقطة الشاشة الحقيقية للبوابة العامة للمركز</div>
                <div class="slide-number">الشريحة 04 / 15</div>
            </div>
        </section>

        <!-- SLIDE 5: REAL SPORTS ACTIVITIES (SCREENSHOT) -->
        <section class="slide" id="slide-5">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>قطاع الأنشطة والأكاديميات الرياضية المعتمدة (Sports Programs)</h2>
                        <p>لقطة حقيقية: استعراض شامل للألعاب والبرامج الرياضية (14 رياضة) لجذب الأعضاء والناشئين</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">لقطة حقيقية من الموقع الحي</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-7-5">
                    <div class="mockup-window">
                        <div class="mockup-bar">
                            <div class="mockup-dot" style="background: #ef4444;"></div>
                            <div class="mockup-dot" style="background: #f59e0b;"></div>
                            <div class="mockup-dot" style="background: #10b981;"></div>
                            <div class="mockup-url">https://firstsettlement-ydc.eg/#academies</div>
                        </div>
                        <div class="mockup-image-frame">
                            <img src="screenshots/real_sports.png" alt="Real Sports Activities Screenshot">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center; gap: 14px;">
                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">🏊‍♂️ تنوع وتكامل الألعاب المعتمدة</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                أكاديمية السباحة الأولمبية، كرة القدم، التنس الأرضي والبادل، الكاراتيه والدفاع عن النفس، تنس الطاولة، وصالات الجمباز واللياقة.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 6px;">📋 تفاصيل شفافة وجداول واضحة</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                كل لعبة موثقة بالفئات العمرية المستهدفة، قيمة الاشتراك الشهري، طاقم التدريب المعتمد، ومواعيد الحصص الأسبوعية.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: #60a5fa; margin-bottom: 6px;">⚡ حجز فوري للموسم التجريبي</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                تمكين ولي الأمر من تسجيل الطفل وحجز الحصة التجريبية ودفع الرسوم فوراً بالهاتف دون الحاجة للانتظار بمكاتب الإدارة.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>لقطة الشاشة الحقيقية لدليل الأنشطة والأكاديميات الرياضية</div>
                <div class="slide-number">الشريحة 05 / 15</div>
            </div>
        </section>

        <!-- SLIDE 6: REAL DASHBOARD (SCREENSHOT) -->
        <section class="slide" id="slide-6">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>لوحة تحكم القيادة ومؤشرات الأداء اللحظية (Executive Dashboard)</h2>
                        <p>لقطة حقيقية بالوضع الليلي: متابعة الإيرادات بالملايين، نسب إشغال الملاعب، وأحدث الاشتراكات</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">لقطة حقيقية من الموقع الحي</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-7-5">
                    <div class="mockup-window">
                        <div class="mockup-bar">
                            <div class="mockup-dot" style="background: #ef4444;"></div>
                            <div class="mockup-dot" style="background: #f59e0b;"></div>
                            <div class="mockup-dot" style="background: #10b981;"></div>
                            <div class="mockup-url">https://firstsettlement-ydc.eg/dashboard</div>
                        </div>
                        <div class="mockup-image-frame">
                            <img src="screenshots/real_dashboard.png" alt="Real Dashboard Screenshot">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center; gap: 14px;">
                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">📈 رسوم بيانية ومؤشرات بالجنيه المصري</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                استعراض إيرادات المركز الشهرية (5.9 مليون ج.م في فبراير 2026) مع رسم بياني متكامل ومتابعة نمو الاشتراكات بنسبة +18.3%.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 6px;">👥 حصر لحظي لأعضاء المركز</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                رصد فوري لـ 3,850 رياضياً وعضواً فاعلاً، ونسبة تجديد واستمرارية قياسية بلغت 96.8% مع التنبيه الآلي على الاشتراكات.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: #60a5fa; margin-bottom: 6px;">⚡ نشاط الحجوزات الأسبوعي</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                مراقبة حركة الملاعب يومياً على مدار الأسبوع (السبت إلى الجمعة) لتحقيق أقصى استغلال للملاعب والمسابح بدون فترات شاغرة.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>لقطة الشاشة الحقيقية للوحة التحكم التنفيذية لمجلس الإدارة</div>
                <div class="slide-number">الشريحة 06 / 15</div>
            </div>
        </section>

        <!-- SLIDE 7: AI SUITE IN DEPTH (REAL SCREENSHOTS) -->
        <section class="slide" id="slide-7">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>دور الذكاء الاصطناعي في المنظومة: كفاءة أعلى وإنجاز مضاعف</h2>
                        <p>تنظيم الأوقات، حل المشاكل والنزاعات، مضاعفة الإنجاز الإداري، والرد الفوري 24/7</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge" style="background: rgba(168, 85, 247, 0.2); color: #c084fc; border-color: rgba(168, 85, 247, 0.4);">
                        🤖 ذكاء اصطناعي حقيقي بالمنظومة
                    </span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-2" style="gap: 20px; margin-bottom: 16px;">
                    <!-- AI Assistant Screenshot -->
                    <div class="mockup-window">
                        <div class="mockup-bar">
                            <span style="font-size: 12px; font-weight: 800; color: #c084fc;">🤖 المساعد الذكي للمركز (AI Assistant)</span>
                            <span style="font-size: 10px; color: #94a3b8; margin-right: auto;">ردود فورية تفاعلية 24/7</span>
                        </div>
                        <div style="height: 380px; overflow: hidden; background: #0b1120;">
                            <img src="screenshots/real_ai_assistant.png" style="width: 100%; height: 100%; object-fit: contain; background: #070c18;" alt="Real AI Assistant">
                        </div>
                    </div>

                    <!-- AI Matcher Screenshot -->
                    <div class="mockup-window">
                        <div class="mockup-bar">
                            <span style="font-size: 12px; font-weight: 800; color: #60a5fa;">⚡ المطابق الرياضي الذكي (AI Sport Matcher)</span>
                            <span style="font-size: 10px; color: #94a3b8; margin-right: auto;">اكتشاف وتوجيه المواهب</span>
                        </div>
                        <div style="height: 380px; overflow: hidden; background: #0b1120;">
                            <img src="screenshots/real_ai_matcher.png" style="width: 100%; height: 100%; object-fit: contain; background: #070c18;" alt="Real AI Sport Matcher">
                        </div>
                    </div>
                </div>

                <!-- Comprehensive AI Value Grid -->
                <div class="grid-4" style="gap: 14px;">
                    <div class="glass-card" style="padding: 12px 14px;">
                        <div style="font-size: 14px; font-weight: 800; color: var(--gold); margin-bottom: 3px;">⏰ تنظيم الأوقات والمواعيد</div>
                        <div style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">جدولة دقيقة بالثواني تمنع تضارب الحصص التدريبية وتنسق أوقات المباريات.</div>
                    </div>
                    <div class="glass-card" style="padding: 12px 14px;">
                        <div style="font-size: 14px; font-weight: 800; color: var(--emerald); margin-bottom: 3px;">🚫 تقليل المشاكل والنزاعات</div>
                        <div style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">القضاء على أخطاء الحجز اليدوي والشكاوى المتكررة بنسبة 100% بحيادية تامة.</div>
                    </div>
                    <div class="glass-card" style="padding: 12px 14px;">
                        <div style="font-size: 14px; font-weight: 800; color: #60a5fa; margin-bottom: 3px;">⚡ زيادة الإنجاز الإداري</div>
                        <div style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">أتمتة الفواتير وحصر الحضور؛ مما يفرغ الموظفين لخدمة الأعضاء والأنشطة.</div>
                    </div>
                    <div class="glass-card" style="padding: 12px 14px;">
                        <div style="font-size: 14px; font-weight: 800; color: #c084fc; margin-bottom: 3px;">💬 الرد الفوري على مدار 24 ساعة</div>
                        <div style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">إجابة فورية ذكية باللغة العربية على أي استفسار للأعضاء دون أي انتظار.</div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>منظومة الذكاء الاصطناعي ومهامها المتكاملة في المركز</div>
                <div class="slide-number">الشريحة 07 / 15</div>
            </div>
        </section>

        <!-- SLIDE 8: REAL COURT & FACILITY BOOKING (SCREENSHOT) -->
        <section class="slide" id="slide-8">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>محرك حجز الملاعب والمرافق الرياضية (Smart Booking Engine)</h2>
                        <p>لقطة حقيقية: جدول تفاعلي لملاعب البادل والتنس ومجمع السباحة الأولمبي مع الدفع الفوري</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">لقطة حقيقية من الموقع الحي</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-7-5">
                    <div class="mockup-window">
                        <div class="mockup-bar">
                            <div class="mockup-dot" style="background: #ef4444;"></div>
                            <div class="mockup-dot" style="background: #f59e0b;"></div>
                            <div class="mockup-dot" style="background: #10b981;"></div>
                            <div class="mockup-url">https://firstsettlement-ydc.eg/bookings</div>
                        </div>
                        <div class="mockup-image-frame">
                            <img src="screenshots/real_bookings.png" alt="Real Bookings Screenshot">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center; gap: 14px;">
                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">🎾 حجز فوري 24/7 دون وسيط</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                يستعرض العضو كافة الفترات الشاغرة لملاعب البادل، التنس، والصالات المغطاة ويختار الساعة المناسبة ويسدد فوراً.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 6px;">🚫 منع الحجز المزدوج والنزاعات</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                حجز الساعة يُقفل برمجياً بمجرد إتمام السداد؛ لا مجال للتعارض في المواعيد أو المشادات اليدوية السابقة.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: #60a5fa; margin-bottom: 6px;">💰 تعظيم إيرادات الساعات الصباحية</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                تطبيق تخفيضات تشجيعية في الساعات الصباحية وتسعير خاص لساعات الذروة المسائية لمضاعفة العائد الاستثماري.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>لقطة الشاشة الحقيقية لنظام حجز الملاعب</div>
                <div class="slide-number">الشريحة 08 / 15</div>
            </div>
        </section>

        <!-- SLIDE 9: REAL MEMBERS DIRECTORY & CRM (SCREENSHOT) -->
        <section class="slide" id="slide-9">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>إدارة شؤون الأعضاء والعضويات الذكية (Members Directory & CRM)</h2>
                        <p>لقطة حقيقية: قاعدة بيانات مركزية للأعضاء وفئات الاشتراك (VIP ماسية، أولمبية، أكاديميات)</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">لقطة حقيقية من الموقع الحي</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-7-5">
                    <div class="mockup-window">
                        <div class="mockup-bar">
                            <div class="mockup-dot" style="background: #ef4444;"></div>
                            <div class="mockup-dot" style="background: #f59e0b;"></div>
                            <div class="mockup-dot" style="background: #10b981;"></div>
                            <div class="mockup-url">https://firstsettlement-ydc.eg/members</div>
                        </div>
                        <div class="mockup-image-frame">
                            <img src="screenshots/real_members.png" alt="Real Members Screenshot">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center; gap: 14px;">
                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">👤 سجل رقمي شامل لكل عضو</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                أرشفة إلكترونية للرقم القومي، بيانات الاتصال، تاريخ بدء العضوية، وصلاحية الاشتراك مع تفاصيل أفراد الأسرة التابعين.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 6px;">🔔 تتبع حالة السداد والتجديد</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                تمييز فوري بين العضو النشط المسدد والعضو المنتهي اشتراكه لإرسال روابط التجديد الإلكتروني السريع.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: #60a5fa; margin-bottom: 6px;">🔍 بحث وفلترة فائقة السرعة</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                إمكانية البحث بالاسم، رقم العضوية، أو الرياضة المشترك بها وتصدير الكشوفات بنقرة زر واحدة.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>لقطة الشاشة الحقيقية لدليل الأعضاء والاشتراكات</div>
                <div class="slide-number">الشريحة 09 / 15</div>
            </div>
        </section>

        <!-- SLIDE 10: REAL BI & REPORTS (SCREENSHOT) -->
        <section class="slide" id="slide-10">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>مركز تقارير ذكاء الأعمال ودعم القرار (BI & Analytics)</h2>
                        <p>لقطة حقيقية: رسوم بيانية حية ومكتملة للتدفقات النقدية، نسب الإشغال، والتقارير المعتمدة لمجلس الإدارة</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">لقطة حقيقية من الموقع الحي</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-7-5">
                    <div class="mockup-window">
                        <div class="mockup-bar">
                            <div class="mockup-dot" style="background: #ef4444;"></div>
                            <div class="mockup-dot" style="background: #f59e0b;"></div>
                            <div class="mockup-dot" style="background: #10b981;"></div>
                            <div class="mockup-url">https://firstsettlement-ydc.eg/reports</div>
                        </div>
                        <div class="mockup-image-frame">
                            <img src="screenshots/real_reports.png" alt="Real Reports Screenshot">
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center; gap: 14px;">
                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">📊 بيانات بيانية مكتملة بالأرقام</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                منحنى نمو الإيرادات لـ 12 شهراً، رسم أعمدة نمو قاعدة الأعضاء (2,450 إلى 3,850 عضواً)، ومخطط توزيع الإقبال الرياضي.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 6px;">📑 تصدير بصيغتي PDF و Excel</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                طباعة التقارير المعتمدة وإرفاقها بمحاضر جلسات مجلس الإدارة ومراقبي الحسابات فوراً ودون تأخير.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: #60a5fa; margin-bottom: 6px;">💡 توجيه الاستثمارات وتطوير المنشآت</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                تحديد الرياضات الأعلى إشغالاً (مجمع السباحة 94%، وملاعب كرة القدم 91%) لضخ استثمارات إضافية مدروسة.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>لقطة الشاشة الحقيقية لمركز التقارير وذكاء الأعمال</div>
                <div class="slide-number">الشريحة 10 / 15</div>
            </div>
        </section>

        <!-- SLIDE 11: FINANCIAL GATEWAY & PAYMENTS -->
        <section class="slide" id="slide-11">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>البوابة المالية الموحدة والتحصيل الرقمي الآمن</h2>
                        <p>ربط مباشر مع شبكات المدفوعات المصرية وحوكمة مالية خالية من الأخطاء البشرية</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">الحوكمة المالية</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-7-5">
                    <div class="glass-card" style="padding: 24px;">
                        <h3 style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 16px;">💳 قنوات التحصيل الإلكتروني المعتمدة بالمنظومة:</h3>
                        
                        <div style="display: flex; flex-direction: column; gap: 12px;">
                            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 700; color: #6ee7b7; font-size: 14px;">بطاقات ميزة الوطنية (Meeza) والبطاقات البنكية</div>
                                    <div style="font-size: 12px; color: #94a3b8;">سداد فوري باقتطاع آمن وتحويل مباشر لحساب المركز البنكي الرسمي.</div>
                                </div>
                                <span style="background: #10b981; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 4px;">معتمد</span>
                            </div>

                            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 700; color: #fbbf24; font-size: 14px;">شبكة فوري ومنافذ التحصيل (Fawry Pay)</div>
                                    <div style="font-size: 12px; color: #94a3b8;">إصدار كود سداد رقمي يدفع به العضو في أكثر من 300,000 منفذ معتمد.</div>
                                </div>
                                <span style="background: #f59e0b; color: #000; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 4px;">معتمد</span>
                            </div>

                            <div style="background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); padding: 12px 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-weight: 700; color: #93c5fd; font-size: 14px;">المحافظ الإلكترونية وإنستاباي (InstaPay / Wallets)</div>
                                    <div style="font-size: 12px; color: #94a3b8;">سداد فوري عبر فودافون كاش، أورنج، إي آند كاش، وتطبيقات البنوك.</div>
                                </div>
                                <span style="background: #3b82f6; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 4px;">معتمد</span>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center; gap: 14px;">
                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">🏦 إيداع بنكي مباشر وتسوية آلية</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                تحويل كافة الإيرادات مباشرة إلى الحساب البنكي الرسمي للمركز مع مطابقة آلية يومية خالية من أخطاء الجرد اليدوي.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 6px;">🧾 فاتورة إلكترونية معتمدة فورية</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                إرسال إيصال السداد المعتمد فوراً إلى هاتف العضو متضمناً كود التحقق الرقمي لمنع أي تلاعب.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: #60a5fa; margin-bottom: 6px;">🛡️ حماية كاملة للمال العام</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                سجل مالي غير قابل للتعديل يوثق كل معاملة، رقم المرجع البنكي، والوقت الدقيق بالثانية لدعم المراجعة المالية.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>البوابة المالية والتحصيل الإلكتروني الموحد</div>
                <div class="slide-number">الشريحة 11 / 15</div>
            </div>
        </section>

        <!-- SLIDE 12: SMART GATE PASS & QR ACCESS -->
        <section class="slide" id="slide-12">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>منظومة البوابات الذكية وبطاقة العضوية الرقمية (QR Pass)</h2>
                        <p>أمان المنشآت وضبط دخول الملاعب والمسابح بالرمز الرقمي المشفر اللحظي</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">الأمان وبوابات الدخول</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-7-5">
                    <div class="mockup-window" style="background: #080e1a; padding: 24px;">
                        <div style="display: flex; gap: 20px; align-items: center; justify-content: center;">
                            <div style="width: 280px; height: 180px; background: linear-gradient(135deg, #1e293b, #0f172a); border: 2px solid var(--gold); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 25px rgba(245,158,11,0.2); position: relative; overflow: hidden;">
                                <div style="position: absolute; right: -20px; bottom: -20px; font-size: 80px; opacity: 0.05; color: var(--gold);">🏛️</div>
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <span style="font-weight: 800; font-size: 11px; color: var(--gold);">مركز التنمية الشبابية | VIP PASS</span>
                                    <span style="font-size: 14px;">👑</span>
                                </div>
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div style="width: 42px; height: 42px; border-radius: 50%; background: #334155; border: 1px solid var(--gold); display: flex; align-items: center; justify-content: center; font-size: 18px;">👤</div>
                                    <div>
                                        <div style="font-weight: 800; font-size: 12px; color: #fff;">المستشار محمود الفقي</div>
                                        <div style="font-size: 10px; color: #94a3b8; font-family: monospace;">VIP #2026-00192</div>
                                    </div>
                                </div>
                                <div style="display: flex; justify-content: space-between; align-items: flex-end; font-size: 9px; color: #cbd5e1;">
                                    <div>صالح حتى: <strong style="color: #34d399;">2027/01</strong></div>
                                    <div style="background: rgba(16,185,129,0.2); color: #34d399; padding: 2px 6px; border-radius: 4px; font-weight: 700;">عضوية سارية</div>
                                </div>
                            </div>

                            <div style="width: 220px; background: #0f172a; border: 1px solid rgba(255,255,255,0.15); border-radius: 16px; padding: 12px; text-align: center;">
                                <div style="font-size: 11px; font-weight: 700; color: #fff; margin-bottom: 8px;">بوابة المركز الرئيسية #01</div>
                                <div style="background: #ffffff; padding: 10px; border-radius: 8px; display: inline-block; margin-bottom: 8px;">
                                    <div style="width: 100px; height: 100px; background: #000; display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; padding: 4px;">
                                        <div style="background: #fff;"></div><div style="background: #000;"></div><div style="background: #fff;"></div><div style="background: #fff;"></div><div style="background: #fff;"></div>
                                        <div style="background: #fff;"></div><div style="background: #fff;"></div><div style="background: #000;"></div><div style="background: #000;"></div><div style="background: #fff;"></div>
                                        <div style="background: #000;"></div><div style="background: #000;"></div><div style="background: #fff;"></div><div style="background: #fff;"></div><div style="background: #000;"></div>
                                        <div style="background: #fff;"></div><div style="background: #000;"></div><div style="background: #000;"></div><div style="background: #fff;"></div><div style="background: #fff;"></div>
                                        <div style="background: #fff;"></div><div style="background: #fff;"></div><div style="background: #fff;"></div><div style="background: #000;"></div><div style="background: #fff;"></div>
                                    </div>
                                </div>
                                <div style="background: rgba(16,185,129,0.2); color: #34d399; font-size: 10px; font-weight: 700; padding: 4px; border-radius: 4px;">
                                    ✓ تم التحقق: مصرح بالدخول
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="display: flex; flex-direction: column; justify-content: center; gap: 14px;">
                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--gold); margin-bottom: 6px;">📱 بطاقة مشفرة لا يمكن تزويرها</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                رمز الـ QR يتغير دورياً لحماية الهوية ومنع مشاركة لقطة الشاشة مع أشخاص غير مخولين بالدخول.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: var(--emerald); margin-bottom: 6px;">🛑 إيقاف فوري لغير المسددين</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                بوابات الدخول ترتبط مباشرة بقاعدة البيانات؛ العضو غير المسدد للاشتراك يظهر لدى موظف الأمن باللون الأحمر تلقائياً.
                            </p>
                        </div>

                        <div class="glass-card" style="padding: 16px;">
                            <h4 style="font-size: 16px; font-weight: 800; color: #60a5fa; margin-bottom: 6px;">📊 حصر السعة الاستيعابية لحظياً</h4>
                            <p style="font-size: 13px; color: var(--text-muted); line-height: 1.5;">
                                معرفة العدد الفعلي للأعضاء المتواجدين داخل مرافق المركز في أي لحظة لضمان السلامة وإدارة الحشود.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>منظومة البوابات والأمن الرقمي الذكي</div>
                <div class="slide-number">الشريحة 12 / 15</div>
            </div>
        </section>

        <!-- SLIDE 13: FINANCIAL IMPACT & ROI -->
        <section class="slide" id="slide-13">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>الأثر المالي المتوقع والعائد على الاستثمار (ROI)</h2>
                        <p>تقديرات مالية واقعية للعائد المباشر والوفورات التشغيلية خلال السنة الأولى من التدشين</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">الجدوى الاقتصادية</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-4" style="margin-bottom: 24px;">
                    <div class="stat-card" style="border-color: rgba(16, 185, 129, 0.3);">
                        <div class="stat-icon" style="background: rgba(16, 185, 129, 0.2); color: #34d399;">💰</div>
                        <div>
                            <div class="stat-val">+38%</div>
                            <div class="stat-label">نمو إيرادات الملاعب</div>
                            <div class="stat-trend">▲ 24/7 حجز ذاتي بالهاتف</div>
                        </div>
                    </div>

                    <div class="stat-card" style="border-color: rgba(245, 158, 11, 0.3);">
                        <div class="stat-icon" style="background: rgba(245, 158, 11, 0.2); color: var(--gold);">⚡</div>
                        <div>
                            <div class="stat-val">+45%</div>
                            <div class="stat-label">تسريع تحصيل الاشتراكات</div>
                            <div class="stat-trend">▲ قنوات دفع رقمية ميسرة</div>
                        </div>
                    </div>

                    <div class="stat-card" style="border-color: rgba(239, 68, 68, 0.3);">
                        <div class="stat-icon" style="background: rgba(239, 68, 68, 0.2); color: #f87171;">📉</div>
                        <div>
                            <div class="stat-val">-85%</div>
                            <div class="stat-label">خفض تكاليف الطباعة والأوراق</div>
                            <div class="stat-trend" style="color: #f87171;">▼ توفير مئات الآلاف سنوياً</div>
                        </div>
                    </div>

                    <div class="stat-card" style="border-color: rgba(59, 130, 246, 0.3);">
                        <div class="stat-icon" style="background: rgba(59, 130, 246, 0.2); color: #60a5fa;">⭐</div>
                        <div>
                            <div class="stat-val">96.8%</div>
                            <div class="stat-label">معدل رضا واستمرارية الأعضاء</div>
                            <div class="stat-trend">▲ تجربة عصرية مريحة</div>
                        </div>
                    </div>
                </div>

                <div class="glass-card" style="padding: 22px;">
                    <h3 style="font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 12px;">📊 المقارنة المالية السنوية لإيرادات المركز (بالمليون جنيه مصري):</h3>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px; font-size: 13px;">
                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.03); border-radius: 8px;">
                            <span>إجمالي المتحصلات السنوية (اشتراكات + ملاعب + أكاديميات):</span>
                            <div style="display: flex; gap: 20px; align-items: center;">
                                <span style="color: #94a3b8; text-decoration: line-through;">السابق: 48.5 مليون ج.م</span>
                                <strong style="color: #34d399; font-size: 16px;">المتوقع بالمنظومة: 65.4 مليون ج.م (+35%)</strong>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.03); border-radius: 8px;">
                            <span>الهدر المالي والمتأخرات غير المحصلة:</span>
                            <div style="display: flex; gap: 20px; align-items: center;">
                                <span style="color: #f87171; text-decoration: line-through;">السابق: ~4.2 مليون ج.م سنوياً</span>
                                <strong style="color: #34d399; font-size: 16px;">المتوقع: صفر تقريباً (دفع إلكتروني فوري)</strong>
                            </div>
                        </div>

                        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255,255,255,0.03); border-radius: 8px;">
                            <span>فترة استرداد الاستثمار (Payback Period):</span>
                            <div>
                                <strong style="color: var(--gold); font-size: 16px;">أقل من 3 أشهر من تاريخ التدشين الرسمي</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>تحليل العائد الاستثماري والأثر المالي المباشر للمركز</div>
                <div class="slide-number">الشريحة 13 / 15</div>
            </div>
        </section>

        <!-- SLIDE 14: LAUNCH ROADMAP -->
        <section class="slide" id="slide-14">
            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>خطة التدشين والجاهزية الفنية (Launch Roadmap)</h2>
                        <p>جدول زمني تنفيذي محكم على 4 مراحل مدروسة لضمان انتقال سلس وبلا انقطاع للخدمات</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">الجدول الزمني للتدشين</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-4" style="gap: 16px; margin-bottom: 20px;">
                    <div class="glass-card" style="border-top: 4px solid #3b82f6;">
                        <div style="background: rgba(59, 130, 246, 0.2); color: #60a5fa; font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 9999px; display: inline-block; margin-bottom: 10px;">
                            المرحلة 1: الأسبوع الأول
                        </div>
                        <h4 style="font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 8px;">تهيئة المنظومة والتدريب</h4>
                        <ul style="font-size: 12px; color: var(--text-muted); line-height: 1.6; padding-right: 18px;">
                            <li>استيراد قاعدة بيانات أعضاء المركز.</li>
                            <li>تدريب موظفي الخزينة والاشتراكات.</li>
                            <li>تدريب مسؤولي الملاعب والأمن.</li>
                        </ul>
                    </div>

                    <div class="glass-card" style="border-top: 4px solid var(--gold);">
                        <div style="background: rgba(245, 158, 11, 0.2); color: var(--gold); font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 9999px; display: inline-block; margin-bottom: 10px;">
                            المرحلة 2: الأسبوع الثاني
                        </div>
                        <h4 style="font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 8px;">الإطلاق التجريبي (Beta)</h4>
                        <ul style="font-size: 12px; color: var(--text-muted); line-height: 1.6; padding-right: 18px;">
                            <li>تفعيل النظام لـ 200 عضو VIP مختارين.</li>
                            <li>تجربة حجز ملاعب البادل والتنس.</li>
                            <li>اختبار بوابات الدفع الإلكتروني بنجاح.</li>
                        </ul>
                    </div>

                    <div class="glass-card" style="border-top: 4px solid var(--emerald);">
                        <div style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 9999px; display: inline-block; margin-bottom: 10px;">
                            المرحلة 3: الأسبوع الثالث
                        </div>
                        <h4 style="font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 8px;">التدشين الرسمي العام</h4>
                        <ul style="font-size: 12px; color: var(--text-muted); line-height: 1.6; padding-right: 18px;">
                            <li>فتح البوابة لكافة أعضاء المركز وأهالي التجمع.</li>
                            <li>حملة إعلامية وتوعوية بكيفية الدخول.</li>
                            <li>تفعيل المساعد الذكي للإجابة عن الأسئلة.</li>
                        </ul>
                    </div>

                    <div class="glass-card" style="border-top: 4px solid #a855f7;">
                        <div style="background: rgba(168, 85, 247, 0.2); color: #c084fc; font-weight: 800; font-size: 12px; padding: 4px 10px; border-radius: 9999px; display: inline-block; margin-bottom: 10px;">
                            المرحلة 4: الأسبوع الرابع
                        </div>
                        <h4 style="font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 8px;">البوابات والتكامل الكامل</h4>
                        <ul style="font-size: 12px; color: var(--text-muted); line-height: 1.6; padding-right: 18px;">
                            <li>تفعيل قراءة الـ QR عبر ماسحات البوابات.</li>
                            <li>إطلاق تقارير الـ BI لمجلس الإدارة.</li>
                            <li>التقييم الدوري وقياس رضا الأعضاء.</li>
                        </ul>
                    </div>
                </div>

                <div class="glass-card" style="background: rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.25); padding: 16px; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <span style="font-size: 26px;">🚀</span>
                        <span style="font-size: 14px; font-weight: 700; color: #fff;">المنظومة البرمجية مكتملة ومختبرة بنسبة 100% وجاهزة لبدء المرحلة الأولى فور اعتماد المجلس الموقر.</span>
                    </div>
                    <div class="slide-badge" style="background: #10b981; color: #fff; border: none; font-size: 12px;">جاهزية تشغيلية كاملة</div>
                </div>
            </div>

            <div class="slide-footer">
                <div>خطة الإطلاق والجدول الزمني التنفيذي</div>
                <div class="slide-number">الشريحة 14 / 15</div>
            </div>
        </section>

        <!-- SLIDE 15: BOARD DECISION & CALL TO ACTION (NO DEMO CREDENTIALS) -->
        <section class="slide" id="slide-15">
            <div class="glow-gold"></div>
            <div class="glow-emerald"></div>

            <div class="slide-header">
                <div class="slide-header-left">
                    <div class="slide-title-wrap">
                        <h2>القرار والتوصية المرفوعة لمجلس الإدارة الموقر</h2>
                        <p>الخطوات التنفيذية لاعتماد التدشين وتتويج مسيرة التحول الرقمي بمركز التنمية الشبابية بالتجمع الأول</p>
                    </div>
                </div>
                <div class="slide-header-right">
                    <span class="slide-badge">مشروع القرار التنفيذي</span>
                    <div class="club-brand">مركز التنمية الشبابية</div>
                </div>
            </div>

            <div class="slide-content">
                <div class="grid-2" style="gap: 25px;">
                    <!-- Project Resolution Draft -->
                    <div class="glass-card" style="border-color: rgba(245, 158, 11, 0.4); padding: 26px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                                <span style="font-size: 28px;">✍️</span>
                                <h3 style="font-size: 20px; font-weight: 900; color: var(--gold);">مشروع قرار مجلس الإدارة:</h3>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 14px; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
                                <div style="display: flex; gap: 10px;">
                                    <strong style="color: var(--gold);">أولاً:</strong>
                                    <span>الموافقة على التدشين الرسمي للمنظومة الرقمية السحابية لمركز التنمية الشبابية بالتجمع الأول كنظام إداري ومالي موحد.</span>
                                </div>
                                <div style="display: flex; gap: 10px;">
                                    <strong style="color: var(--gold);">ثانياً:</strong>
                                    <span>اعتماد المنظومة كنافذة إعلامية رسمية لإبراز أنشطة المركز ومجهودات مجلس الإدارة، وتفعيل أدوات الذكاء الاصطناعي لخدمة الأعضاء والرواد.</span>
                                </div>
                                <div style="display: flex; gap: 10px;">
                                    <strong style="color: var(--gold);">ثالثاً:</strong>
                                    <span>اعتماد خطة الإطلاق التنفيذية وتكليف الإدارة التنفيذية بالبدء فوراً في تدريب الأطقم المعنية وإطلاق الحملة الإعلامية لأهالي التجمع الأول.</span>
                                </div>
                            </div>
                        </div>

                        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 13px; color: #94a3b8;">تاريخ رفع المذكرة: سبتمبر 2026</span>
                            <div class="slide-badge" style="background: var(--gold); color: #000; font-size: 13px; font-weight: 800; padding: 6px 14px;">معتمد برعاية مجلس الإدارة 🏛️</div>
                        </div>
                    </div>

                    <!-- Strategic Outcomes & Value Added -->
                    <div class="glass-card" style="padding: 26px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 16px;">
                                <span style="font-size: 26px;">🌟</span>
                                <h3 style="font-size: 18px; font-weight: 800; color: #fff;">المكاسب الاستراتيجية المتحققة بالتدشين:</h3>
                            </div>

                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); padding: 12px 14px; border-radius: 8px;">
                                    <div style="font-weight: 700; color: #6ee7b7; font-size: 13px; margin-bottom: 2px;">✓ طفرة في الشفافية وإبراز المجهودات</div>
                                    <div style="font-size: 11px; color: #94a3b8;">إيصال حجم التطوير والإنجاز في مجمع السباحة والملاعب الأولمبية لكافة الجهات والأعضاء.</div>
                                </div>

                                <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.25); padding: 12px 14px; border-radius: 8px;">
                                    <div style="font-weight: 700; color: #fbbf24; font-size: 13px; margin-bottom: 2px;">✓ مضاعفة الإيرادات وحماية المال العام</div>
                                    <div style="font-size: 11px; color: #94a3b8;">تحصيل رقمي فوري 100% يمنع التسرب المالي ويرفع إيرادات الأكاديميات والملاعب بنسبة +35%.</div>
                                </div>

                                <div style="background: rgba(168, 85, 247, 0.1); border: 1px solid rgba(168, 85, 247, 0.25); padding: 12px 14px; border-radius: 8px;">
                                    <div style="font-weight: 700; color: #c084fc; font-size: 13px; margin-bottom: 2px;">✓ خدمة رقمية متطورة بالذكاء الاصطناعي</div>
                                    <div style="font-size: 11px; color: #94a3b8;">تنظيم دقيق للأوقات، منع المشاكل والازدحام، ورد فوري 24 ساعة يضمن رضا 96.8% من الأعضاء.</div>
                                </div>
                            </div>
                        </div>

                        <div style="margin-top: 15px; padding: 10px; background: rgba(59,130,246,0.1); border-radius: 8px; font-size: 12px; color: #93c5fd; text-align: center;">
                            🏛️ <strong>مركز التنمية الشبابية بالتجمع الأول</strong> — الصرح الرياضي الذكي الأول في القاهرة الجديدة
                        </div>
                    </div>
                </div>
            </div>

            <div class="slide-footer">
                <div>مشروع القرار والتوصية الختامية لمجلس الإدارة الموقر</div>
                <div class="slide-number">الشريحة 15 / 15</div>
            </div>
        </section>

    </div>

    <script>
        let currentSlide = 1;
        const totalSlides = 15;

        function updateIndicator() {
            document.getElementById('slideIndicator').innerText = currentSlide + ' / ' + totalSlides;
        }

        function scrollToSlide(num) {
            const slideEl = document.getElementById('slide-' + num);
            if (slideEl) {
                slideEl.scrollIntoView({ behavior: 'smooth' });
                currentSlide = num;
                updateIndicator();
            }
        }

        function nextSlide() {
            if (currentSlide < totalSlides) {
                currentSlide++;
                scrollToSlide(currentSlide);
            }
        }

        function prevSlide() {
            if (currentSlide > 1) {
                currentSlide--;
                scrollToSlide(currentSlide);
            }
        }

        function togglePresentationMode() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
            }
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'PageUp') {
                prevSlide();
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    const num = parseInt(id.replace('slide-', ''));
                    if (num) {
                        currentSlide = num;
                        updateIndicator();
                    }
                }
            });
        }, { threshold: 0.5 });

        for (let i = 1; i <= totalSlides; i++) {
            const el = document.getElementById('slide-' + i);
            if (el) observer.observe(el);
        }
    </script>
</body>
</html>
'''

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Updated HTML presentation written to: {HTML_PATH}")

# Export to PDF using Microsoft Edge
print("Exporting updated presentation to PDF using Edge...")
edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

file_url = "file:///" + HTML_PATH.replace("\\", "/")

cmd = [
    edge_exe,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={PDF_PATH}",
    file_url
]

res = subprocess.run(cmd, capture_output=True, text=True)
print("Edge PDF export return code:", res.returncode)

if os.path.exists(PDF_PATH):
    size = os.path.getsize(PDF_PATH)
    print(f"PDF exported successfully! File: {PDF_PATH} ({size} bytes)")
    shutil.copyfile(PDF_PATH, ASSETS_PDF)
else:
    print("Warning: PDF was not generated. Stderr:", res.stderr)

# Capture individual slide screenshots for the slide deck viewer
print("Capturing individual slide screenshots (1 to 15)...")
for i in range(1, 16):
    slide_id = f"slide-{i}"
    custom_css = f'''
    <style>
        .nav-controls {{ display: none !important; }}
        .slide {{ display: none !important; }}
        #{slide_id} {{ display: flex !important; margin: 0 !important; width: 1440px !important; height: 900px !important; border-radius: 0 !important; border: none !important; }}
    </style>
    '''
    temp_html = html_content.replace('</head>', f'{custom_css}</head>')
    temp_file = os.path.join(ASSETS_DIR, f"temp_slide_{i}.html")
    with open(temp_file, "w", encoding="utf-8") as tf:
        tf.write(temp_html)
    
    out_img = os.path.join(SCREENSHOTS_DIR, f"slide_{i:02d}.png")
    temp_url = "file:///" + temp_file.replace("\\", "/")
    subprocess.run([edge_exe, "--headless", "--disable-gpu", "--window-size=1440,900", f"--screenshot={out_img}", temp_url], capture_output=True)
    if os.path.exists(temp_file):
        os.remove(temp_file)
    print(f"Slide {i} captured -> slide_{i:02d}.png")

print("All tasks finished successfully!")
