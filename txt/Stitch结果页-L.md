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
                "primary": "#0058be",
                "background": "#f8f9ff",
                "surface": "#ffffff",
                "on-surface": "#0b1c30",
                "on-surface-variant": "#4b5563",
                "outline-variant": "#e2e8f0",
                "accent-commute": "#06b6d4",
                "accent-living": "#f97316",
                "accent-life": "#a855f7",
                "accent-success": "#10b981",
                "accent-error": "#ef4444"
            },
            "borderRadius": {
                "3xl": "32px",
                "full": "9999px"
            },
            "spacing": {
                "stack-lg": "48px",
                "stack-md": "24px",
                "gutter": "32px",
                "margin-desktop": "40px",
                "margin-mobile": "16px",
                "container-max": "800px"
            },
            "fontFamily": {
                "sans": ["Inter", "system-ui", "-apple-system", "sans-serif"]
            }
          },
        },
      }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; background-color: #f8f9ff; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .premium-card { background: white; border-radius: 32px; box-shadow: 0 4px 24px rgba(0, 88, 190, 0.04); border: 1px solid rgba(0, 0, 0, 0.02); }
        .score-gradient { background: linear-gradient(135deg, #e0f2fe 0%, #ffffff 100%); }
        .progress-bar-bg { height: 6px; background: #f1f5f9; border-radius: 100px; }
        .progress-bar-fill { height: 100%; border-radius: 100px; }
        .quote-font { font-family: serif; font-style: italic; }
    </style>
</head>
<body class="text-on-surface selection:bg-primary/10">
<header class="bg-white/70 backdrop-blur-xl fixed w-full top-0 z-50 border-b border-black/5">
<div class="flex justify-between items-center px-margin-desktop h-16 w-full max-w-container-max mx-auto">
<div class="text-xl font-bold tracking-tight text-primary">RentScore AI</div>
<div class="flex gap-4">
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">help</button>
<button class="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">settings</button>
</div>
</div>
</header>
<main class="pt-24 pb-stack-lg">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-0 space-y-gutter">
<!-- 1. Top Persona Hero -->
<section class="premium-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-10">
<div class="relative flex items-center justify-center shrink-0">
<div class="w-32 h-32 md:w-40 md:h-40 rounded-full score-gradient border-[6px] border-white shadow-inner flex flex-col items-center justify-center">
<span class="text-4xl md:text-5xl font-bold text-primary tracking-tighter">18</span>
<span class="text-[10px] font-bold uppercase tracking-widest text-primary/50 mt-1">Rent Score</span>
</div>
</div>
<div class="flex-1 text-center md:text-left space-y-2">
<div class="flex flex-col md:flex-row items-center md:items-baseline gap-2">
<h1 class="text-2xl md:text-3xl font-bold tracking-tight">【荒野求生志愿者】</h1>
<span class="px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-bold uppercase tracking-wide border border-red-100">⚠️ 极限生存</span>
</div>
<p class="text-lg font-medium text-on-surface-variant">虽然不是在生活，但至少能在城市留下来。</p>
<p class="text-sm text-on-surface-variant/70 leading-relaxed max-w-lg">你属于：极限通勤特种兵。在现实与梦想的夹缝中寻找落脚点，每天都在挑战生存意志的极限。</p>
</div>
</section>
<!-- 2. Comprehensive Evaluation Card -->
<section class="premium-card p-8 md:p-10 space-y-10">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<h2 class="text-xl font-bold">多维度深度测评</h2>
<div class="bg-primary/5 text-primary px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
<span class="material-symbols-outlined text-sm">auto_graph</span>
                    你仅击败了 8% 的打工人租房选择
                </div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
<!-- Column 1 -->
<div class="space-y-6">
<div class="space-y-2">
<div class="flex justify-between items-end">
<span class="text-sm font-semibold flex items-center gap-2"><span class="material-symbols-outlined text-accent-commute text-lg">payments</span> 性价比</span>
<span class="text-xs font-bold text-accent-commute">15%</span>
</div>
<div class="progress-bar-bg">
<div class="progress-bar-fill bg-accent-commute" style="width: 15%"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-end">
<span class="text-sm font-semibold flex items-center gap-2"><span class="material-symbols-outlined text-accent-commute text-lg">commute</span> 通勤效率</span>
<span class="text-xs font-bold text-accent-commute">12%</span>
</div>
<div class="progress-bar-bg">
<div class="progress-bar-fill bg-accent-commute" style="width: 12%"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-end">
<span class="text-sm font-semibold flex items-center gap-2"><span class="material-symbols-outlined text-on-surface-variant text-lg">king_bed</span> 居住舒适度</span>
<span class="text-xs font-bold text-on-surface-variant">20%</span>
</div>
<div class="progress-bar-bg">
<div class="progress-bar-fill bg-slate-400" style="width: 20%"></div>
</div>
</div>
</div>
<!-- Column 2 -->
<div class="space-y-6">
<div class="space-y-2">
<div class="flex justify-between items-end">
<span class="text-sm font-semibold flex items-center gap-2"><span class="material-symbols-outlined text-accent-living text-lg">restaurant</span> 生活便利度</span>
<span class="text-xs font-bold text-accent-living">35%</span>
</div>
<div class="progress-bar-bg">
<div class="progress-bar-fill bg-accent-living" style="width: 35%"></div>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-end">
<span class="text-sm font-semibold flex items-center gap-2"><span class="material-symbols-outlined text-accent-error text-lg">error</span> 压力指数</span>
<span class="text-xs font-bold text-accent-error">极高 (85%)</span>
</div>
<div class="progress-bar-bg">
<div class="progress-bar-fill bg-accent-error" style="width: 85%"></div>
</div>
</div>
<div class="p-4 bg-red-50/50 rounded-2xl border border-red-100 flex items-start gap-3">
<span class="material-symbols-outlined text-red-500 text-lg">info</span>
<p class="text-xs text-on-surface-variant leading-relaxed">生存模式已开启。当前居住环境可能对心理健康产生负面影响，建议尽快寻找替代方案。</p>
</div>
</div>
</div>
</section>
<!-- 4. Pros & Cons Module -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div class="premium-card p-8">
<h3 class="text-sm font-bold text-accent-success uppercase tracking-wider mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-lg">verified</span> 居住优势
                </h3>
<div class="flex flex-wrap gap-2">
<span class="bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-xs font-semibold border border-slate-100">勉强能住</span>
<span class="bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-xs font-semibold border border-slate-100">离地铁还行</span>
<span class="bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-xs font-semibold border border-slate-100">外卖能送达</span>
</div>
</div>
<div class="premium-card p-8">
<h3 class="text-sm font-bold text-accent-error uppercase tracking-wider mb-6 flex items-center gap-2">
<span class="material-symbols-outlined text-lg">sentiment_very_dissatisfied</span> 微小的烦恼
                </h3>
<div class="flex flex-wrap gap-2">
<span class="bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-semibold border border-red-100">握手楼没阳光</span>
<span class="bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-semibold border border-red-100">隔音基本靠吼</span>
<span class="bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-semibold border border-red-100">房东随时涨价</span>
<span class="bg-red-50 text-red-600 px-4 py-2 rounded-full text-xs font-semibold border border-red-100">空间极度压抑</span>
</div>
</div>
</div>
<!-- 5. AI Roast Module -->
<section class="premium-card overflow-hidden">
<div class="p-8 md:p-12 relative">
<div class="flex flex-col md:flex-row gap-8 items-start relative z-10">
<div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
<span class="material-symbols-outlined text-white text-3xl">smart_toy</span>
</div>
<div class="space-y-4">
<div class="flex items-center gap-3">
<span class="text-sm font-bold uppercase tracking-[0.2em] text-primary">AI 辣评</span>
<span class="w-8 h-px bg-primary/20"></span>
<span class="text-[10px] font-bold text-slate-400 uppercase">Premium Insight</span>
</div>
<div class="relative">
<span class="absolute -top-4 -left-6 text-6xl text-primary/10 quote-font font-serif">“</span>
<blockquote class="text-xl md:text-2xl font-medium leading-relaxed tracking-tight text-on-surface">
                                这房子已经不是居住容器了，更像是你在这座城市最后的战壕。租金确实便宜，但代价是每天都在挑战人类的意志力极限。
                            </blockquote>
<span class="absolute -bottom-10 -right-2 text-6xl text-primary/10 quote-font font-serif rotate-180">“</span>
</div>
</div>
</div>
</div>
</section>
<!-- 6. Recommendations -->
<section class="premium-card p-8 md:p-10">
<h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
<span class="material-symbols-outlined text-lg">verified_user</span> 专家共识
            </h3>
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
<div class="flex items-center gap-4 p-5 bg-stone-50 rounded-2xl border border-black/5">
<span class="material-symbols-outlined text-red-500 bg-white p-2 rounded-xl shadow-sm">report</span>
<span class="text-sm font-bold text-slate-700">建议尽快换房</span>
</div>
<div class="flex items-center gap-4 p-5 bg-stone-50 rounded-2xl border border-black/5">
<span class="material-symbols-outlined text-orange-500 bg-white p-2 rounded-xl shadow-sm">pending</span>
<span class="text-sm font-bold text-slate-700">仅适合作为过渡</span>
</div>
<div class="flex items-center gap-4 p-5 bg-stone-50 rounded-2xl border border-black/5">
<span class="material-symbols-outlined text-indigo-500 bg-white p-2 rounded-xl shadow-sm">psychology</span>
<span class="text-sm font-bold text-slate-700">注意心理健康</span>
</div>
</div>
</section>
<!-- 7. Share CTA -->
<div class="space-y-4">
<button class="w-full bg-primary text-white py-5 rounded-3xl font-bold text-lg shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
<span class="material-symbols-outlined">badge</span>
                生成我的租房身份证
            </button>
<div class="grid grid-cols-2 gap-4">
<button class="flex items-center justify-center gap-2 bg-white border border-black/5 py-4 rounded-3xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
<span class="material-symbols-outlined text-primary text-lg">share</span>
                    分享到小红书
                </button>
<button class="flex items-center justify-center gap-2 bg-white border border-black/5 py-4 rounded-3xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
<span class="material-symbols-outlined text-primary text-lg">send</span>
                    发给朋友看看
                </button>
</div>
</div>
</div>
</main>
<footer class="bg-white border-t border-black/5 py-12">
<div class="max-w-container-max mx-auto px-margin-mobile md:px-0 flex flex-col md:flex-row justify-between items-center gap-8">
<div class="text-xl font-bold text-primary">RentScore AI</div>
<div class="text-xs text-on-surface-variant/60 text-center md:text-left">
            © 2024 RentScore AI. Professional Apartment Valuation Tool.
        </div>
<div class="flex gap-6">
<a class="text-xs font-bold text-on-surface-variant/60 hover:text-primary transition-colors" href="#">Privacy</a>
<a class="text-xs font-bold text-on-surface-variant/60 hover:text-primary transition-colors" href="#">Terms</a>
<a class="text-xs font-bold text-on-surface-variant/60 hover:text-primary transition-colors" href="#">Methodology</a>
</div>
</div>
</footer>
<script>
    // Simple micro-interactions
    document.querySelectorAll('.premium-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.boxShadow = '0 12px 32px rgba(0, 88, 190, 0.08)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 24px rgba(0, 88, 190, 0.04)';
        });
    });
</script>
</body></html>