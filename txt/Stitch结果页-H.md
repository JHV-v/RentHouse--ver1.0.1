<!DOCTYPE html>

<html class="light" lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>RentScore AI - 梦想之家报告</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "tertiary-fixed-dim": "#ffb786",
                    "surface-variant": "#f1f5f9",
                    "surface-container-high": "#f8fafc",
                    "surface": "#f8f9ff",
                    "on-surface-variant": "#64748b",
                    "inverse-surface": "#0f172a",
                    "inverse-on-surface": "#f8fafc",
                    "on-tertiary-container": "#431407",
                    "on-primary-container": "#f8fafc",
                    "secondary-fixed": "#e2e8f0",
                    "primary-fixed": "#dbeafe",
                    "tertiary-fixed": "#ffedd5",
                    "surface-dim": "#e2e8f0",
                    "background": "#f8f9ff",
                    "surface-container-lowest": "#ffffff",
                    "on-surface": "#1e293b",
                    "error": "#ef4444",
                    "primary-fixed-dim": "#bfdbfe",
                    "primary-container": "#0058be",
                    "tertiary-container": "#f97316",
                    "outline-variant": "#e2e8f0",
                    "surface-container": "#f1f5f9",
                    "on-secondary": "#ffffff",
                    "surface-bright": "#ffffff",
                    "on-secondary-fixed": "#1e293b",
                    "on-tertiary": "#ffffff",
                    "on-tertiary-fixed-variant": "#9a3412",
                    "error-container": "#fee2e2",
                    "surface-container-low": "#f8fafc",
                    "on-primary": "#ffffff",
                    "on-error": "#ffffff",
                    "secondary-container": "#f1f5f9",
                    "on-tertiary-fixed": "#431407",
                    "on-secondary-container": "#475569",
                    "secondary": "#64748b",
                    "on-background": "#0f172a",
                    "surface-tint": "#0058be",
                    "surface-container-highest": "#e2e8f0",
                    "inverse-primary": "#93c5fd",
                    "secondary-fixed-dim": "#94a3b8",
                    "primary": "#0058be",
                    "on-secondary-fixed-variant": "#475569",
                    "on-error-container": "#7f1d1d",
                    "tertiary": "#ea580c",
                    "outline": "#cbd5e1",
                    "on-primary-fixed-variant": "#1e40af",
                    "on-primary-fixed": "#1e3a8a"
            },
            "borderRadius": {
                    "DEFAULT": "0.5rem",
                    "lg": "0.75rem",
                    "xl": "1rem",
                    "3xl": "32px",
                    "full": "9999px"
            },
            "spacing": {
                    "stack-md": "16px",
                    "margin-mobile": "16px",
                    "base": "8px",
                    "margin-desktop": "40px",
                    "stack-sm": "8px",
                    "gutter": "24px",
                    "container-max": "1280px",
                    "stack-lg": "32px"
            },
            "fontFamily": {
                    "headline-md": ["Inter"],
                    "headline-lg": ["Inter"],
                    "body-sm": ["Inter"],
                    "body-lg": ["Inter"],
                    "headline-sm": ["Inter"],
                    "display-lg": ["Inter"],
                    "label-sm": ["Inter"],
                    "label-md": ["Inter"],
                    "headline-lg-mobile": ["Inter"],
                    "body-md": ["Inter"]
            },
            "fontSize": {
                    "headline-md": ["24px", {"lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                    "headline-lg": ["32px", {"lineHeight": "40px", "letterSpacing": "-0.02em", "fontWeight": "600"}],
                    "body-sm": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
                    "body-lg": ["18px", {"lineHeight": "28px", "fontWeight": "400"}],
                    "headline-sm": ["20px", {"lineHeight": "28px", "fontWeight": "600"}],
                    "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                    "label-sm": ["12px", {"lineHeight": "16px", "letterSpacing": "0.02em", "fontWeight": "500"}],
                    "label-md": ["14px", {"lineHeight": "20px", "fontWeight": "500"}],
                    "headline-lg-mobile": ["28px", {"lineHeight": "36px", "fontWeight": "600"}],
                    "body-md": ["16px", {"lineHeight": "24px", "fontWeight": "400"}]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .report-gradient { background: linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%); }
        .soft-shadow { box-shadow: 0 4px 24px -2px rgba(0, 0, 0, 0.04), 0 2px 8px -1px rgba(0, 0, 0, 0.02); }
        .hero-gradient { background: linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%); }
        .premium-btn { background: #0058be; transition: all 0.2s ease; }
        .premium-btn:hover { background: #004395; transform: translateY(-1px); }
        .progress-bar-glow { box-shadow: 0 0 10px rgba(0, 88, 190, 0.1); }
    </style>
</head>
<body class="bg-background text-on-surface min-h-screen selection:bg-primary-fixed-dim">
<!-- Top Navigation Anchor (Shared Component) -->
<header class="bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 fixed w-full top-0 z-50">
<div class="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
<div class="text-headline-sm font-bold text-primary tracking-tight">RentScore AI</div>
<div class="flex gap-4">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full">help</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full">settings</button>
</div>
</div>
</header>
<main class="report-gradient pb-stack-lg pt-16">
<div class="max-w-[800px] mx-auto px-margin-mobile md:px-0 pt-stack-lg space-y-gutter">
<!-- 1. Top Persona Hero -->
<section class="relative overflow-hidden rounded-3xl bg-white border border-outline-variant/50 p-stack-lg text-on-surface soft-shadow hero-gradient">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
<div class="absolute bottom-0 left-0 w-48 h-48 bg-tertiary-fixed/30 rounded-full -ml-24 -mb-24 blur-[60px]"></div>
<div class="flex flex-col md:flex-row items-center gap-stack-lg relative z-10">
<div class="bg-white rounded-3xl p-stack-md flex flex-col items-center justify-center min-w-[140px] aspect-square shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-outline-variant/30">
<span class="font-display-lg text-display-lg text-primary tracking-tighter">98</span>
<span class="font-label-sm text-label-sm font-bold tracking-[0.1em] text-on-surface-variant uppercase">顶级评分</span>
</div>
<div class="flex-1 text-center md:text-left">
<h1 class="font-headline-lg text-headline-lg text-on-surface tracking-tight flex items-center justify-center md:justify-start gap-2">
                        租房食物链顶端 <span class="text-3xl">👑</span>
</h1>
<p class="font-headline-sm text-headline-sm mt-1 text-on-surface-variant/80 font-medium">这种分数，建议直接去买房，别来折磨我们普通人。</p>
<p class="font-body-md text-body-md mt-stack-md leading-relaxed text-on-surface-variant">
                        其实我对钱没有兴趣，我只是单纯喜欢这片江景。在这里，生活不仅仅是居住，更是一种高定的艺术。
                    </p>
</div>
</div>
</section>
<!-- 2. Comprehensive Evaluation Card & 3. User Percentile -->
<section class="bg-white rounded-3xl p-stack-lg border border-outline-variant/40 soft-shadow space-y-stack-lg">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<h2 class="font-headline-md text-headline-md text-on-surface tracking-tight">多维度深度测评</h2>
<div class="bg-primary/5 rounded-full px-5 py-1.5 flex items-center gap-2 border border-primary/10">
<span class="material-symbols-outlined text-primary text-[18px] fill-1">stars</span>
<span class="font-label-md text-label-md text-primary font-bold">你已经击败了 99.8% 的租房选择</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-stack-lg">
<!-- Progress bars -->
<div class="space-y-6">
<div class="space-y-2">
<div class="flex justify-between items-center">
<span class="font-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-tertiary text-[18px]">payments</span> 性价比</span>
<span class="font-label-md font-bold text-on-surface">95%</span>
</div>
<div class="h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-tertiary/60 to-tertiary transition-all duration-1000 w-[95%]"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-center">
<span class="font-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">commute</span> 通勤效率</span>
<span class="font-label-md font-bold text-on-surface">90%</span>
</div>
<div class="h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-[#10b981]/60 to-[#10b981] transition-all duration-1000 w-[90%]"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-center">
<span class="font-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-[#8b5cf6] text-[18px]">king_bed</span> 居住舒适度</span>
<span class="font-label-md font-bold text-on-surface">100%</span>
</div>
<div class="h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-[#8b5cf6]/60 to-[#8b5cf6] transition-all duration-1000 w-[100%]"></div>
</div>
</div>
</div>
<div class="space-y-6">
<div class="space-y-2">
<div class="flex justify-between items-center">
<span class="font-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-tertiary text-[18px]">restaurant</span> 生活便利度</span>
<span class="font-label-md font-bold text-on-surface">92%</span>
</div>
<div class="h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-tertiary/60 to-tertiary transition-all duration-1000 w-[92%]"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-center">
<span class="font-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-primary text-[18px]">self_improvement</span> 压力指数</span>
<span class="font-label-md font-bold text-on-surface">极低 (10%)</span>
</div>
<div class="h-1.5 bg-surface-container rounded-full overflow-hidden">
<div class="h-full bg-primary transition-all duration-1000 w-[10%]"></div>
</div>
</div>
<div class="p-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl flex items-start gap-4">
<span class="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">verified</span>
<div class="font-body-sm text-on-surface-variant leading-relaxed">
                            恭喜！你的租房选择堪称“人生赢家”。不仅在物质层面达到了顶峰，在精神解压和生活质感上也做到了极致的平衡。
                        </div>
</div>
</div>
</div>
</section>
<!-- 4. Pros & Cons Module -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div class="bg-white border border-outline-variant/40 rounded-3xl p-stack-lg soft-shadow">
<h3 class="font-label-md text-on-surface mb-stack-md flex items-center gap-2 uppercase tracking-widest font-bold">
<span class="material-symbols-outlined text-[#10b981] fill-1 text-[20px]">recommend</span>
                    居住优势
                </h3>
<div class="flex flex-wrap gap-2">
<span class="bg-[#10b981]/5 text-[#059669] px-4 py-2 rounded-full text-body-sm font-semibold border border-[#10b981]/10">🏙️ 江景无敌</span>
<span class="bg-[#10b981]/5 text-[#059669] px-4 py-2 rounded-full text-body-sm font-semibold border border-[#10b981]/10">🌲 静谧如林</span>
<span class="bg-[#10b981]/5 text-[#059669] px-4 py-2 rounded-full text-body-sm font-semibold border border-[#10b981]/10">✨ 高定装修</span>
<span class="bg-[#10b981]/5 text-[#059669] px-4 py-2 rounded-full text-body-sm font-semibold border border-[#10b981]/10">🤵 管家服务</span>
</div>
</div>
<div class="bg-white border border-outline-variant/40 rounded-3xl p-stack-lg soft-shadow">
<h3 class="font-label-md text-on-surface mb-stack-md flex items-center gap-2 uppercase tracking-widest font-bold">
<span class="material-symbols-outlined text-tertiary text-[20px]">sentiment_satisfied</span>
                    微小的烦恼
                </h3>
<div class="flex flex-wrap gap-2">
<span class="bg-tertiary/5 text-tertiary px-4 py-2 rounded-full text-body-sm font-semibold border border-tertiary/10">💰 邻居太有钱</span>
<span class="bg-tertiary/5 text-tertiary px-4 py-2 rounded-full text-body-sm font-semibold border border-tertiary/10">🛋️ 装修太好不想出门</span>
<span class="bg-tertiary/5 text-tertiary px-4 py-2 rounded-full text-body-sm font-semibold border border-tertiary/10">🥂 阳台缺个调酒师</span>
</div>
</div>
</div>
<!-- 5. AI Roast Module -->
<section class="bg-white rounded-3xl p-stack-lg border border-outline-variant/40 soft-shadow relative overflow-hidden">
<div class="flex flex-col gap-6">
<div class="flex items-center justify-between border-b border-outline-variant/30 pb-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
<span class="material-symbols-outlined text-[20px]">smart_toy</span>
</div>
<span class="font-headline-sm text-on-surface tracking-tight">AI 辣评</span>
</div>
<span class="bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">Premium Insight</span>
</div>
<div class="relative">
<span class="absolute -top-4 -left-2 text-6xl text-primary/10 font-serif">“</span>
<div class="pl-6 font-body-lg text-on-surface leading-relaxed italic">
                        这房子已经不是居住容器了，而是你的社交名片。这种级别的配置，我们 AI 看了都想投奔。建议直接在阳台开香槟庆祝，顺便帮我们给代码库打个赏。这种“人生巅峰”的选址，真的很难不让人羡慕嫉妒。
                    </div>
<span class="absolute -bottom-8 -right-2 text-6xl text-primary/10 font-serif rotate-180">“</span>
</div>
</div>
</section>
<!-- 6. Recommendations -->
<section class="bg-white rounded-3xl p-stack-lg border border-outline-variant/40 soft-shadow">
<h3 class="font-label-md text-on-surface mb-stack-md flex items-center gap-2 uppercase tracking-widest font-bold">
<span class="material-symbols-outlined text-primary text-[20px]">verified_user</span>
                专家共识
            </h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<div class="flex items-center gap-3 p-4 bg-surface-container rounded-2xl border border-outline-variant/20">
<span class="material-symbols-outlined text-[#10b981] fill-1">check_circle</span>
<span class="font-label-md text-on-surface font-semibold">适合长期居住</span>
</div>
<div class="flex items-center gap-3 p-4 bg-surface-container rounded-2xl border border-outline-variant/20">
<span class="material-symbols-outlined text-[#10b981] fill-1">check_circle</span>
<span class="font-label-md text-on-surface font-semibold">极致办公体验</span>
</div>
<div class="flex items-center gap-3 p-4 bg-surface-container rounded-2xl border border-outline-variant/20">
<span class="material-symbols-outlined text-[#10b981] fill-1">check_circle</span>
<span class="font-label-md text-on-surface font-semibold">人生赢家配置</span>
</div>
</div>
</section>
<!-- 7. Share CTA -->
<div class="space-y-4 pt-4">
<button class="w-full premium-btn py-5 rounded-full text-white font-headline-sm flex items-center justify-center gap-3 active:scale-[0.98]">
<span class="material-symbols-outlined text-[20px] fill-1">workspace_premium</span>
                生成我的租房身份证
            </button>
<div class="grid grid-cols-2 gap-4">
<button class="flex items-center justify-center gap-2 bg-white border border-outline-variant py-4 rounded-full text-on-surface font-label-md hover:bg-surface-container transition-all active:scale-[0.98]">
<span class="material-symbols-outlined text-primary text-[20px]">share</span>
                    分享到小红书
                </button>
<button class="flex items-center justify-center gap-2 bg-white border border-outline-variant py-4 rounded-full text-on-surface font-label-md hover:bg-surface-container transition-all active:scale-[0.98]">
<span class="material-symbols-outlined text-primary text-[20px]">send</span>
                    发给朋友看看
                </button>
</div>
</div>
</div>
</main>
<!-- Footer (Shared Component) -->
<footer class="bg-white border-t border-outline-variant/20 py-12">
<div class="flex flex-col md:flex-row justify-between items-center px-margin-desktop w-full max-w-container-max mx-auto gap-8">
<div class="text-headline-sm font-bold text-primary tracking-tight">RentScore AI</div>
<div class="text-body-sm text-on-surface-variant text-center md:text-left font-medium">
            © 2024 RentScore AI. Professional Apartment Valuation Tool.
        </div>
<div class="flex gap-6">
<a class="text-on-surface-variant hover:text-primary text-body-sm font-medium transition-colors" href="#">Privacy Policy</a>
<a class="text-on-surface-variant hover:text-primary text-body-sm font-medium transition-colors" href="#">Terms</a>
<a class="text-on-surface-variant hover:text-primary text-body-sm font-medium transition-colors" href="#">Methodology</a>
</div>
</div>
</footer>
<script>
    // Subtle hover effect for cards
    document.querySelectorAll('section, div.rounded-3xl').forEach(card => {
        card.addEventListener('mouseenter', () => {
            if(!card.classList.contains('bg-white')) return;
            card.style.transform = 'translateY(-2px)';
            card.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        card.addEventListener('mouseleave', () => {
            if(!card.classList.contains('bg-white')) return;
            card.style.transform = 'translateY(0)';
        });
    });

    const shareBtn = document.querySelector('button.premium-btn');
    shareBtn.addEventListener('click', () => {
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> 正在生成梦想清单...';
        shareBtn.disabled = true;
        setTimeout(() => {
            shareBtn.innerHTML = originalText;
            shareBtn.disabled = false;
            alert('您的租房身份证已生成！这可能是有史以来评分最高的报告。');
        }, 1200);
    });
</script>
</body></html>