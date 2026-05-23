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
                    "surface-variant": "#d3e4fe",
                    "surface-container-high": "#dce9ff",
                    "surface": "#f8f9ff",
                    "on-surface-variant": "#424754",
                    "inverse-surface": "#213145",
                    "inverse-on-surface": "#eaf1ff",
                    "on-tertiary-container": "#fffbff",
                    "on-primary-container": "#fefcff",
                    "secondary-fixed": "#e0e3e5",
                    "primary-fixed": "#d8e2ff",
                    "tertiary-fixed": "#ffdcc6",
                    "surface-dim": "#cbdbf5",
                    "background": "#f8f9ff",
                    "surface-container-lowest": "#ffffff",
                    "on-surface": "#0b1c30",
                    "error": "#ba1a1a",
                    "primary-fixed-dim": "#adc6ff",
                    "primary-container": "#2170e4",
                    "tertiary-container": "#b75b00",
                    "outline-variant": "#c2c6d6",
                    "surface-container": "#e5eeff",
                    "on-secondary": "#ffffff",
                    "surface-bright": "#f8f9ff",
                    "on-secondary-fixed": "#191c1e",
                    "on-tertiary": "#ffffff",
                    "on-tertiary-fixed-variant": "#723600",
                    "error-container": "#ffdad6",
                    "surface-container-low": "#eff4ff",
                    "on-primary": "#ffffff",
                    "on-error": "#ffffff",
                    "secondary-container": "#e0e3e5",
                    "on-tertiary-fixed": "#311400",
                    "on-secondary-container": "#626567",
                    "secondary": "#5c5f61",
                    "on-background": "#0b1c30",
                    "surface-tint": "#005ac2",
                    "surface-container-highest": "#d3e4fe",
                    "inverse-primary": "#adc6ff",
                    "secondary-fixed-dim": "#c4c7c9",
                    "primary": "#0058be",
                    "on-secondary-fixed-variant": "#444749",
                    "on-error-container": "#93000a",
                    "tertiary": "#924700",
                    "outline": "#727785",
                    "on-primary-fixed-variant": "#004395",
                    "on-primary-fixed": "#001a42"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
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
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .report-gradient { background: linear-gradient(180deg, #f0f4ff 0%, #f8f9ff 100%); }
        .soft-shadow { box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05); }
        .premium-btn { background: #0058be; transition: all 0.2s ease-out; }
        .premium-btn:hover { background: #004395; transform: translateY(-1px); }
        .diffusion-bg { background: radial-gradient(circle at 80% 20%, rgba(173, 198, 255, 0.15) 0%, transparent 50%); }
    </style>
</head>
<body class="bg-surface text-on-surface min-h-screen selection:bg-primary-fixed-dim">
<!-- Top Navigation Anchor (Shared Component) -->
<header class="bg-white/70 backdrop-blur-xl border-b border-outline-variant/30 fixed w-full top-0 z-50">
<div class="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
<div class="text-headline-md font-headline-md font-bold text-primary tracking-tight">RentScore AI</div>
<div class="flex gap-stack-md">
<button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full">help</button>
<button class="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors p-2 rounded-full">settings</button>
</div>
</div>
</header>
<main class="report-gradient pb-stack-lg pt-16">
<div class="max-w-[800px] mx-auto px-margin-mobile md:px-0 pt-stack-lg space-y-gutter">
<!-- 1. Top Persona Hero -->
<section class="relative overflow-hidden rounded-3xl bg-white border border-outline-variant/30 p-stack-lg text-on-surface soft-shadow diffusion-bg">
<div class="flex flex-col md:flex-row items-center gap-stack-lg relative z-10">
<div class="bg-primary/5 rounded-3xl p-stack-md flex flex-col items-center justify-center min-w-[140px] aspect-square">
<span class="font-display-lg text-display-lg text-primary tracking-tighter">68</span>
<span class="font-label-md text-label-md font-bold text-primary/60 tracking-widest">中等偏上</span>
</div>
<div class="flex-1 text-center md:text-left">
<h1 class="font-headline-lg text-headline-lg text-on-surface flex items-center justify-center md:justify-start gap-2">住得还行，心态稳住 🌿</h1>
<p class="font-headline-sm text-headline-sm mt-1 text-on-surface/70 font-medium">虽然不是梦中情房，但至少下班回来不会崩溃。</p>
<p class="font-body-md text-body-md mt-stack-md leading-relaxed text-on-surface-variant">你属于：生活感捕捉专家。懂得在预管内找平衡，不为虚荣买单，只为自在买心安。</p>
</div>
</div>
</section>
<!-- 2. Comprehensive Evaluation Card & 3. User Percentile -->
<section class="bg-white rounded-3xl p-stack-lg border border-outline-variant/30 soft-shadow space-y-stack-lg">
<div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
<h2 class="font-headline-md text-headline-md text-on-surface tracking-tight">多维度深度测评</h2>
<div class="bg-primary/5 rounded-full px-5 py-2.5 flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-[20px] fill-1">stars</span>
<span class="font-label-md text-label-md text-primary font-semibold">你已经击败了 62% 的租房打工人</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
<!-- Progress bars -->
<div class="space-y-stack-md">
<div class="space-y-2">
<div class="flex justify-between items-center px-1">
<span class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-tertiary-container/70 text-[18px]">payments</span> 房租占收入</span>
<span class="font-label-md text-label-md font-bold text-on-surface">28%</span>
</div>
<div class="h-2 bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-tertiary-container/40 to-tertiary-container rounded-full transition-all duration-1000" style="width: 28%"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-center px-1">
<span class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-primary/70 text-[18px]">commute</span> 通勤效率</span>
<span class="font-label-md text-label-md font-bold text-on-surface">70%</span>
</div>
<div class="h-2 bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-primary/40 to-primary rounded-full transition-all duration-1000" style="width: 70%"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-center px-1">
<span class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-emerald-600/70 text-[18px]">king_bed</span> 居住舒适度</span>
<span class="font-label-md text-label-md font-bold text-on-surface">75%</span>
</div>
<div class="h-2 bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-emerald-500/40 to-emerald-500 rounded-full transition-all duration-1000" style="width: 75%"></div>
</div>
</div>
</div>
<div class="space-y-stack-md">
<div class="space-y-2">
<div class="flex justify-between items-center px-1">
<span class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-orange-500/70 text-[18px]">restaurant</span> 生活便利度</span>
<span class="font-label-md text-label-md font-bold text-on-surface">65%</span>
</div>
<div class="h-2 bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-orange-500/40 to-orange-500 rounded-full transition-all duration-1000" style="width: 65%"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-center px-1">
<span class="font-label-md text-label-md text-on-surface-variant flex items-center gap-2"><span class="material-symbols-outlined text-purple-600/70 text-[18px]">self_improvement</span> 压力指数</span>
<span class="font-label-md text-label-md font-bold text-on-surface">中等 (40%)</span>
</div>
<div class="h-2 bg-surface-container-low rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-purple-500/40 to-purple-500 rounded-full transition-all duration-1000" style="width: 40%"></div>
</div>
</div>
<div class="p-stack-md bg-surface-container-lowest border border-outline-variant/30 rounded-2xl flex items-center gap-stack-md">
<span class="material-symbols-outlined text-primary/40 text-[28px] fill-1">verified</span>
<div class="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">你的租房选择基本在掌控之中。采光、安静表现均衡，是下班回家的避风港。</div>
</div>
</div>
</div>
</section>
<!-- 4. Pros & Cons Module -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div class="bg-white border border-outline-variant/30 rounded-3xl p-stack-lg soft-shadow">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-stack-md flex items-center gap-2">
<span class="material-symbols-outlined text-emerald-600 fill-1">recommend</span>
                        居住优势
                    </h3>
<div class="flex flex-wrap gap-2"><span class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-body-sm font-semibold">☀️ 阳光还算足</span><span class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-body-sm font-semibold">🚇 离地铁不远</span><span class="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-body-sm font-semibold">🏪 楼下有便利店</span></div>
</div>
<div class="bg-white border border-outline-variant/30 rounded-3xl p-stack-lg soft-shadow">
<h3 class="font-headline-sm text-headline-sm text-on-surface mb-stack-md flex items-center gap-2">
<span class="material-symbols-outlined text-orange-600">sentiment_satisfied</span>
                        微小的烦恼
                    </h3>
<div class="flex flex-wrap gap-2"><span class="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-body-sm font-semibold">🚫 隔音一般般</span><span class="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-body-sm font-semibold">🙵 外卖不算多</span><span class="bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-body-sm font-semibold">🪑 装修稍显老旧</span></div>
</div>
</div>
<!-- 5. AI Roast Module -->
<section class="bg-white rounded-3xl p-stack-lg border border-outline-variant/30 soft-shadow">
<div class="flex items-start gap-stack-md">
<div class="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
<span class="material-symbols-outlined text-primary">smart_toy</span>
</div>
<div class="space-y-stack-sm flex-1">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="font-headline-sm text-headline-sm text-on-surface tracking-tight">AI 辣评</span>
<span class="bg-primary/10 text-primary text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">Premium Insight</span>
</div>
</div>
<div class="mt-4 p-stack-lg bg-[#fafafa] rounded-2xl italic border-l-4 border-primary/20 text-body-md text-on-surface-variant leading-relaxed font-medium">
    “这房子属于典型的‘避风港’，虽然偶尔会被隔音折磨，但看在租金的份上，还是能愉快地刷手机。”
</div>
</div>
</div>
</section>
<!-- 6. Recommendations -->
<section class="bg-white rounded-3xl p-stack-lg border border-outline-variant/30 soft-shadow">
<h3 class="font-headline-sm text-headline-sm mb-stack-md flex items-center gap-2">
<span class="material-symbols-outlined text-primary">verified_user</span>
                    专家共识
                </h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<div class="flex items-center gap-stack-md p-stack-md bg-surface-container-low rounded-2xl">
<span class="material-symbols-outlined text-emerald-600 fill-1">check_circle</span>
<span class="font-body-md text-body-md text-on-surface font-medium">适合长期居住</span>
</div>
<div class="flex items-center gap-stack-md p-stack-md bg-surface-container-low rounded-2xl">
<span class="material-symbols-outlined text-emerald-600 fill-1">check_circle</span>
<span class="font-body-md text-body-md text-on-surface font-medium">极致办公体验</span>
</div>
<div class="flex items-center gap-stack-md p-stack-md bg-surface-container-low rounded-2xl">
<span class="material-symbols-outlined text-emerald-600 fill-1">check_circle</span>
<span class="font-body-md text-body-md text-on-surface font-medium">人生赢家配置</span>
</div>
</div>
</section>
<!-- 7. Share CTA -->
<div class="space-y-stack-md pt-stack-md pb-stack-lg">
<button class="w-full premium-btn py-5 rounded-full text-white font-headline-sm shadow-md active:scale-[0.98] flex items-center justify-center gap-stack-md">
<span class="material-symbols-outlined fill-1">workspace_premium</span>
                    生成我的租房身份证
                </button>
<div class="grid grid-cols-2 gap-4">
<button class="flex items-center justify-center gap-2 bg-white border border-outline-variant/30 py-4 rounded-full text-on-surface font-label-md hover:bg-surface-container-low transition-all soft-shadow">
<span class="material-symbols-outlined text-primary">share</span>
                        分享到小红书
                    </button>
<button class="flex items-center justify-center gap-2 bg-white border border-outline-variant/30 py-4 rounded-full text-on-surface font-label-md hover:bg-surface-container-low transition-all soft-shadow">
<span class="material-symbols-outlined text-primary">send</span>
                        发给朋友看看
                    </button>
</div>
</div>
</div>
</main>
<!-- Footer (Shared Component) -->
<footer class="bg-white border-t border-outline-variant/20">
<div class="flex flex-col md:flex-row justify-between items-center py-stack-lg px-margin-desktop w-full max-w-container-max mx-auto gap-stack-md">
<div class="text-label-md font-headline-sm text-on-surface font-bold tracking-tight">RentScore AI</div>
<div class="text-body-sm text-on-surface-variant text-center md:text-left">
                © 2024 RentScore AI. Professional Apartment Valuation Tool.
            </div>
<div class="flex gap-stack-md">
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="#">Privacy Policy</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="#">Terms of Service</a>
<a class="text-on-surface-variant hover:text-primary transition-colors font-label-sm" href="#">Methodology</a>
</div>
</div>
</footer>
<script>
        // Micro-interactions for cards
        document.querySelectorAll('section, div.rounded-3xl').forEach(card => {
            card.addEventListener('mouseenter', () => {
                if(!card.classList.contains('bg-gradient-to-br')) {
                    card.style.transform = 'translateY(-2px)';
                    card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                }
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });

        const shareBtn = document.querySelector('button.premium-btn');
        shareBtn.addEventListener('click', () => {
            const originalText = shareBtn.innerHTML;
            shareBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> 正在生成梦想清单...';
            setTimeout(() => {
                shareBtn.innerHTML = originalText;
                alert('您的租房身份证已生成！这可能是有史以来评分最高的报告。');
            }, 1200);
        });
    </script>
</body></html>