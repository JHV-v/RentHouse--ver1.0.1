<!DOCTYPE html>

<html class="light" lang="zh-CN" style=""><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0, viewport-fit=cover" name="viewport"/>
<title>这房租得值不值 · 测算版</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "primary-container": "#2170e4",
                    "on-primary-container": "#fefcff",
                    "inverse-on-surface": "#eaf1ff",
                    "tertiary": "#924700",
                    "on-error-container": "#93000a",
                    "surface-container": "#e5eeff",
                    "surface": "#f8f9ff",
                    "on-tertiary-container": "#fffbff",
                    "error": "#ba1a1a",
                    "secondary": "#5c5f61",
                    "on-primary-fixed": "#001a42",
                    "on-secondary-container": "#626567",
                    "surface-bright": "#f8f9ff",
                    "on-tertiary-fixed": "#311400",
                    "on-surface-variant": "#424754",
                    "on-primary": "#ffffff",
                    "secondary-container": "#e0e3e5",
                    "on-secondary-fixed-variant": "#444749",
                    "primary-fixed": "#d8e2ff",
                    "on-error": "#ffffff",
                    "primary-fixed-dim": "#adc6ff",
                    "inverse-primary": "#adc6ff",
                    "secondary-fixed": "#e0e3e5",
                    "inverse-surface": "#213145",
                    "tertiary-fixed": "#ffdcc6",
                    "tertiary-container": "#b75b00",
                    "on-surface": "#0b1c30",
                    "surface-container-highest": "#d3e4fe",
                    "surface-container-low": "#eff4ff",
                    "outline-variant": "#c2c6d6",
                    "on-tertiary": "#ffffff",
                    "surface-container-lowest": "#ffffff",
                    "outline": "#727785",
                    "error-container": "#ffdad6",
                    "on-secondary-fixed": "#191c1e",
                    "on-background": "#0b1c30",
                    "primary": "#0058be",
                    "secondary-fixed-dim": "#c4c7c9",
                    "surface-dim": "#cbdbf5",
                    "on-primary-fixed-variant": "#004395",
                    "tertiary-fixed-dim": "#ffb786",
                    "on-secondary": "#ffffff",
                    "background": "#f8f9ff",
                    "surface-container-high": "#dce9ff",
                    "surface-tint": "#005ac2",
                    "on-tertiary-fixed-variant": "#723600",
                    "surface-variant": "#d3e4fe"
            },
            "borderRadius": {
                    "DEFAULT": "0.25rem",
                    "lg": "0.5rem",
                    "xl": "0.75rem",
                    "2xl": "1rem",
                    "3xl": "1.5rem",
                    "full": "9999px"
            },
            "spacing": {
                    "stack-lg": "32px",
                    "stack-md": "16px",
                    "gutter": "24px",
                    "stack-sm": "8px",
                    "margin-mobile": "16px",
                    "margin-desktop": "40px",
                    "container-max": "1280px",
                    "base": "8px"
            }
          },
        },
      }
    </script>
<style class="">
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .tag-active {
            @apply bg-primary text-on-primary shadow-lg shadow-primary/30 ring-1 ring-primary/20 scale-[0.98] transition-all duration-300 font-semibold;
        }
        .tag-inactive {
            @apply bg-stone-100/50 text-stone-500 border-transparent hover:bg-stone-200/50 hover:text-stone-700 transition-all duration-300;
        }
        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        /* Tooltip Arrow */
        .tooltip-arrow::after {
            content: "";
            position: absolute;
            bottom: -6px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 6px 6px 0 6px;
            border-style: solid;
            border-color: #0058be transparent transparent transparent;
        }
        
        .draggable-item {
            cursor: grab;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .draggable-item:active {
            cursor: grabbing;
        }
        .dragging {
            opacity: 0.5;
            transform: scale(1.02);
        }
        .drag-over {
            @apply border-primary/40 bg-primary/5;
        }

        /* Detail Tag Styles - Refined for Rounded Chips */
        .detail-tag-inactive {
            @apply bg-white text-stone-500 border border-stone-200/60 rounded-full px-4 py-2 hover:bg-stone-50 hover:border-stone-300 transition-all duration-300 cursor-pointer text-sm font-medium shadow-sm;
        }
        .detail-tag-active {
            @apply bg-primary text-on-primary border-primary rounded-full px-4 py-2 shadow-md shadow-primary/25 transition-all duration-300 scale-[0.96] text-sm font-medium;
        }

        /* Enhanced Input States */
        input[type="number"], select {
            @apply shadow-inner shadow-stone-100/50 transition-all duration-300;
        }
        input[type="number"]:focus, select:focus {
            @apply ring-4 ring-primary/10 border-primary/20 shadow-none;
        }

        /* Button Micro-interactions */
        .btn-hover-effect {
            @apply transition-all duration-300 hover:brightness-105 active:scale-[0.97];
        }
    </style></head>
<body class="min-h-screen bg-gradient-to-b from-stone-50 to-orange-50/20 text-on-surface">
<main class="max-w-xl mx-auto px-4 py-12 space-y-8">
<!-- Header Section -->
<section class="text-center space-y-3 mb-10">
<h1 class="text-4xl font-extrabold text-on-surface tracking-tighter sm:text-5xl">租房性价比精细测算</h1>
<p class="text-lg font-medium text-primary opacity-90">输入房屋数据，让我们从专业维度分析你的房屋是否合理</p>
<div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-stone-400 font-medium">
<span class="bg-stone-100 px-2 py-0.5 rounded-md">v1.0.1</span>
<div class="flex items-center gap-3">
<a class="hover:text-primary transition-colors flex items-center gap-0.5" href="#">
<span class="material-symbols-outlined text-sm">code</span> GitHub
            </a>
<a class="hover:text-primary transition-colors flex items-center gap-0.5" href="#">
<span class="material-symbols-outlined text-sm">explore</span> 小红书
            </a>
<a class="hover:text-primary transition-colors flex items-center gap-0.5" href="#">
<span class="material-symbols-outlined text-sm">play_circle</span> 抖音
            </a>
<a class="hover:text-primary transition-colors flex items-center gap-0.5" href="#">
<span class="material-symbols-outlined text-sm">movie</span> bilibili
            </a>
</div>
</div>
<div class="flex items-center justify-center gap-4 pt-2">
<div class="flex items-center gap-1.5 text-xs text-on-surface-variant/70">
<span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
<span class="">今日访问: <span class="font-semibold text-on-surface">1,284</span></span>
</div>
<div class="w-px h-3 bg-stone-200"></div>
<div class="flex items-center gap-1.5 text-xs text-on-surface-variant/70">
<span class="material-symbols-outlined text-[14px]">group</span>
<span class="">总访问: <span class="font-semibold text-on-surface">42,591</span></span>
</div>
</div>
</section>
<!-- Main Consolidate Card -->
<div class="bg-white rounded-3xl border border-stone-100/60 overflow-hidden transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.05),0_1px_4px_rgba(0,0,0,0.02)]">
<div class="p-8 space-y-10">
<!-- Group 1: 基础开销 -->
<section class="space-y-6">
<div class="flex items-center gap-2 pb-2 border-b border-stone-50">
<span class="material-symbols-outlined text-primary" data-icon="payments">payments</span>
<h2 class="text-lg font-semibold text-on-surface">基础开销</h2>
</div>
<div class="space-y-6">
<!-- 城市类型选择 -->
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">城市类型</label>
<div class="flex flex-wrap p-1 bg-stone-100 rounded-2xl w-full hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 min-w-[60px] py-2 rounded-xl text-[13px] font-medium transition-all tag-active" onclick="toggleSegmented(this)">一线</button>
<button class="flex-1 min-w-[60px] py-2 rounded-xl text-[13px] font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">新一线</button>
<button class="flex-1 min-w-[60px] py-2 rounded-xl text-[13px] font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">二线</button>
<button class="flex-1 min-w-[60px] py-2 rounded-xl text-[13px] font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">三线</button>
<button class="flex-1 min-w-[60px] py-2 rounded-xl text-[13px] font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">四线</button>
<button class="flex-1 min-w-[60px] py-2 rounded-xl text-[13px] font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">县城</button>
<button class="flex-1 min-w-[60px] py-2 rounded-xl text-[13px] font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">乡镇</button>
</div>
</div><div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">租赁类型</label>
<div class="flex p-1 bg-stone-100 rounded-2xl w-full hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">整租一居</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">整租二居</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">合租主卧</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSegmented(this)">合租次卧</button>
</div>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">月薪资</label>
<div class="relative flex items-center">
<span class="absolute left-4 text-on-surface-variant font-medium">￥</span>
<input class="w-full pl-10 pr-4 py-3.5 rounded-2xl border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-primary bg-stone-50/50 focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200" placeholder="请输入金额" type="number"/>
</div>
</div>
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">月租金</label>
<div class="relative flex items-center">
<span class="absolute left-4 text-on-surface-variant font-medium">￥</span>
<input class="w-full pl-10 pr-4 py-3.5 rounded-2xl border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-primary bg-stone-50/50 focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200" placeholder="请输入金额" type="number"/>
</div>
</div>
</div><div class="grid grid-cols-2 gap-4 mt-6">
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">押金</label>
<select class="w-full px-4 py-3.5 rounded-2xl border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-primary bg-stone-50/50 text-sm focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200">
<option>押一</option>
<option>押二</option>
</select>
</div>
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">中介费</label>
<select class="w-full px-4 py-3.5 rounded-2xl border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-primary bg-stone-50/50 text-sm focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200">
<option>无</option>
<option>半个月</option>
<option>一个月</option>
</select>
</div>
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">付款周期</label>
<select class="w-full px-4 py-3.5 rounded-2xl border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-primary bg-stone-50/50 text-sm focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200">
<option>月付</option>
<option>季付</option>
<option>半年付</option>
<option>年付</option>
</select>
</div>
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">合同期限</label>
<select class="w-full px-4 py-3.5 rounded-2xl border-none ring-1 ring-stone-200 focus:ring-2 focus:ring-primary bg-stone-50/50 text-sm focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200">
<option>半年</option>
<option>1年</option>
<option>2年+</option>
</select>
</div>
</div>
<!-- 房屋面积输入 -->
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">水电收费</label>
<div class="flex p-1 bg-stone-100 rounded-2xl w-full hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSegmented(this)">民水民电</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">商水商电</button>
</div>
</div>
</div>
</section>
<div class="h-px bg-stone-100"></div>
<!-- Group 2: 通勤出行 -->
<section class="space-y-6">
<div class="flex items-center justify-between">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary" data-icon="commute">commute</span>
<h2 class="text-lg font-semibold text-on-surface">通勤出行</h2>
</div>
<div class="text-[10px] font-bold text-stone-400 bg-stone-100 px-2 py-0.5 rounded uppercase tracking-wider">长按 ↕ 排序权重</div>
</div>
<div class="space-y-4">
<div class="relative pb-8">
<label class="text-sm font-semibold text-on-surface-variant">出行方式偏好（拖拽排序，顶部权重最高，0min默认为不考虑此出行方式）</label>
<div class="space-y-3" id="commute-list"><!-- Cycling -->
<div class="draggable-item flex items-center gap-3 p-3 bg-stone-50/50 rounded-2xl ring-1 ring-stone-200 focus-within:ring-2 focus-within:ring-primary transition-all border border-transparent" draggable="true">
<span class="material-symbols-outlined text-stone-400 cursor-grab active:cursor-grabbing select-none">drag_indicator</span>
<div class="flex items-center gap-2 min-w-[80px]">
<span class="material-symbols-outlined text-primary text-xl">directions_bike</span>
<span class="text-sm font-medium">骑行</span>
</div>
<div class="flex-1 relative flex items-center">
<input class="w-full pl-3 pr-12 py-2 bg-white rounded-xl border-none ring-1 ring-stone-200 focus:ring-1 focus:ring-primary text-sm commute-input focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200" onfocus="updateActiveBubble(this)" oninput="updateActiveBubble(this)" placeholder="0" type="number"/>
<span class="absolute right-4 text-xs text-stone-400">min</span>
</div>
</div>
<!-- Public Transit -->
<div class="draggable-item flex items-center gap-3 p-3 bg-stone-50/50 rounded-2xl ring-1 ring-stone-200 focus-within:ring-2 focus-within:ring-primary transition-all border border-transparent" draggable="true">
<span class="material-symbols-outlined text-stone-400 cursor-grab active:cursor-grabbing select-none">drag_indicator</span>
<div class="flex items-center gap-2 min-w-[80px]">
<span class="material-symbols-outlined text-primary text-xl">directions_bus</span>
<span class="text-sm font-medium">公共交通</span>
</div>
<div class="flex-1 relative flex items-center">
<input class="w-full pl-3 pr-12 py-2 bg-white rounded-xl border-none ring-1 ring-stone-200 focus:ring-1 focus:ring-primary text-sm commute-input focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200" onfocus="updateActiveBubble(this)" oninput="updateActiveBubble(this)" placeholder="0" type="number"/>
<span class="absolute right-4 text-xs text-stone-400">min</span>
</div>
</div>
<!-- Driving -->
<div class="draggable-item flex items-center gap-3 p-3 bg-stone-50/50 rounded-2xl ring-1 ring-stone-200 focus-within:ring-2 focus-within:ring-primary transition-all border border-transparent" draggable="true">
<span class="material-symbols-outlined text-stone-400 cursor-grab active:cursor-grabbing select-none">drag_indicator</span>
<div class="flex items-center gap-2 min-w-[80px]">
<span class="material-symbols-outlined text-primary text-xl">directions_car</span>
<span class="text-sm font-medium">驾车</span>
</div>
<div class="flex-1 relative flex items-center">
<input class="w-full pl-3 pr-12 py-2 bg-white rounded-xl border-none ring-1 ring-stone-200 focus:ring-1 focus:ring-primary text-sm commute-input focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200" onfocus="updateActiveBubble(this)" oninput="updateActiveBubble(this)" placeholder="0" type="number"/>
<span class="absolute right-4 text-xs text-stone-400">min</span>
</div>
</div>
<!-- Walking -->
<div class="draggable-item flex items-center gap-3 p-3 bg-stone-50/50 rounded-2xl ring-1 ring-stone-200 focus-within:ring-2 focus-within:ring-primary transition-all border border-transparent" draggable="true">
<span class="material-symbols-outlined text-stone-400 cursor-grab active:cursor-grabbing select-none">drag_indicator</span>
<div class="flex items-center gap-2 min-w-[80px]">
<span class="material-symbols-outlined text-primary text-xl">directions_walk</span>
<span class="text-sm font-medium">步行</span>
</div>
<div class="flex-1 relative flex items-center">
<input class="w-full pl-3 pr-12 py-2 bg-white rounded-xl border-none ring-1 ring-stone-200 focus:ring-1 focus:ring-primary text-sm commute-input focus:ring-offset-2 focus:ring-primary/20 transition-all duration-200" onfocus="updateActiveBubble(this)" oninput="updateActiveBubble(this)" placeholder="0" type="number"/>
<span class="absolute right-4 text-xs text-stone-400">min</span>
</div>
</div></div>
<!-- Adaptive Bubble Tooltip -->
<div class="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-2xl text-center shadow-lg pointer-events-none transition-all duration-300 opacity-0 transform translate-y-2 scale-95" id="active-bubble">
<div class="text-xs font-bold leading-none" id="bubble-time">0min</div>
<div class="text-[10px] opacity-90 mt-1 whitespace-nowrap" id="bubble-comment">待输入</div>
<!-- Arrow on Top -->
<div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-primary"></div>
</div>
</div>
</div>
</section>
<div class="h-px bg-stone-100"></div>
<!-- Group 3: 居住体验 -->
<section class="space-y-6">
<div class="flex items-center gap-2 pb-2 border-b border-stone-50">
<span class="material-symbols-outlined text-primary" data-icon="home_work">home_work</span>
<h2 class="text-lg font-semibold text-on-surface">居住体验</h2>
</div>
<div class="space-y-6">
<div class="space-y-3">
<label class="text-sm font-semibold text-on-surface-variant">采光通风</label>
<!-- 三宫格微卡片排列 -->
<div class="grid grid-cols-3 gap-3">
<button class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-transparent transition-all tag-active" onclick="toggleSingleGrid(this)">
<span class="material-symbols-outlined text-3xl text-amber-500" data-icon="wb_sunny">wb_sunny</span>
<span class="text-xs font-medium">阳光大满贯</span>
</button>
<button class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-transparent transition-all tag-inactive" onclick="toggleSingleGrid(this)">
<span class="material-symbols-outlined text-3xl text-slate-400" data-icon="cloud">cloud</span>
<span class="text-xs font-medium">中规中矩</span>
</button>
<button class="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-transparent transition-all tag-inactive" onclick="toggleSingleGrid(this)">
<span class="material-symbols-outlined text-3xl text-indigo-500" data-icon="nights_stay">nights_stay</span>
<span class="text-xs font-medium">常年小黑屋</span>
</button>
</div>
</div>
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">隔音水平</label>
<div class="flex p-1 bg-stone-100 rounded-2xl hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">极其安静</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSingle(this)">偶尔噪音</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">隔音极差</button>
</div>
</div><div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">周边便利度</label>
<div class="flex p-1 bg-stone-100 rounded-2xl hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSingle(this)">很方便</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">一般</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">不方便</button>
</div>
</div>
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">空间感觉</label>
<div class="flex p-1 bg-stone-100 rounded-2xl w-full hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">拥挤</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">偏小</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSegmented(this)">刚好</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSegmented(this)">宽敛</button>
</div>
</div><div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">楼层类型</label>
<div class="flex p-1 bg-stone-100 rounded-2xl hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSingle(this)">电梯房</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">低层步梯</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">高层步梯</button>
</div>
</div>
<div class="space-y-2">
<label class="text-sm font-semibold text-on-surface-variant">家电配置</label>
<div class="flex p-1 bg-stone-100 rounded-2xl hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSingle(this)">齐全且新</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">刚好够用</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">破旧老化</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">纯毛坯房</button>
</div>
</div>
<!-- Bathroom Experience -->
<div class="space-y-2">
<div class="flex items-center gap-1.5 mb-1">
<span class="material-symbols-outlined text-primary text-lg" data-icon="bathtub">bathtub</span>
<label class="text-sm font-semibold text-on-surface-variant">卫浴体验 (合租)</label>
</div>
<div class="flex p-1 bg-stone-100 rounded-2xl hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSingle(this)">独立卫浴</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">双人共卫</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">多人共卫</button>
</div>
</div>
<!-- Cooking Experience -->
<div class="space-y-2">
<div class="flex items-center gap-1.5 mb-1">
<span class="material-symbols-outlined text-primary text-lg" data-icon="restaurant">restaurant</span>
<label class="text-sm font-semibold text-on-surface-variant">厨房体验 (合租)</label>
</div>
<div class="flex p-1 bg-stone-100 rounded-2xl hover:bg-stone-200/50 transition-colors duration-300 border border-stone-200/40">
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">不做饭</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-active" onclick="toggleSingle(this)">偶尔排队</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">经常排队</button>
<button class="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all tag-inactive" onclick="toggleSingle(this)">基本自由使用</button>
</div>
</div>
</div>
</section>
<div class="h-px bg-stone-100"></div>
<!-- Group 4: 生活小细节 (Updated) -->
<section class="space-y-6">
<div class="flex items-center gap-2 pb-2 border-b border-stone-50">
<span class="material-symbols-outlined text-primary" data-icon="tips_and_updates">tips_and_updates</span>
<h2 class="text-lg font-semibold text-on-surface">生活小细节</h2>
</div>
<div class="space-y-6">
<!-- Lifestyle Details - Updated Tag Style -->
<div class="space-y-3 pt-2">
<div class="flex flex-wrap gap-3"><button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">宠物友好</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">晾晒方便</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">有阳台</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">快递方便</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">外卖方便</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">晚上安静</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">隔壁不吵</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">电梯稳定</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">附近便利店多</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">适合居家办公</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">收纳空间够</button>
<button class="bg-stone-50 border border-stone-100 rounded-full px-4 py-2 text-stone-600 text-sm font-medium hover:bg-stone-100 transition-all cursor-pointer" onclick="toggleDetailTag(this)">小区安全感好</button></div>
</div>
</div>
</section>
</div>
<!-- Integrated Summary & CTA -->
<div class="bg-stone-50/80 border-t border-stone-100 p-8 space-y-6">
<div class="flex justify-between items-center gap-4">
<div class="flex-1 text-center">
<div class="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">日均房租</div>
<div class="text-lg font-bold text-primary">￥0.00</div>
</div>
<div class="w-px h-10 bg-stone-200"></div>
<div class="flex-1 text-center">
<div class="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">月通勤</div>
<div class="text-lg font-bold text-primary">0h</div>
</div>
<div class="w-px h-10 bg-stone-200"></div>
<div class="flex-1 text-center">
<div class="text-[10px] uppercase tracking-wider text-stone-400 font-bold mb-1">性价比</div>
<div class="text-lg font-bold text-error">0.00</div>
</div>
</div>
<button class="w-full py-4.5 bg-primary text-on-primary rounded-2xl font-semibold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all active:scale-95 hover:shadow-xl hover:shadow-primary/30 btn-hover-effect">
<span class="material-symbols-outlined text-xl" data-icon="search">search</span>
                查看我的租房性价比报告
            </button>
</div>
</div>
</main>
<script>
    function toggleSegmented(btn) {
        const siblings = btn.parentElement.children;
        for (let sib of siblings) {
            sib.classList.remove('tag-active');
            sib.classList.add('tag-inactive');
        }
        btn.classList.remove('tag-inactive');
        btn.classList.add('tag-active');
    }

    function toggleSingle(btn) {
        const container = btn.closest('.flex') || btn.parentElement;
        const items = container.querySelectorAll('button');
        items.forEach(i => {
            i.classList.remove('tag-active');
            i.classList.add('tag-inactive');
        });
        btn.classList.remove('tag-inactive');
        btn.classList.add('tag-active');
    }

    function toggleSingleGrid(btn) {
        const container = btn.parentElement;
        const items = container.querySelectorAll('button');
        items.forEach(i => {
            i.classList.remove('tag-active');
            i.classList.add('tag-inactive');
        });
        btn.classList.remove('tag-inactive');
        btn.classList.add('tag-active');
    }

    function toggleMulti(btn) {
        if (btn.classList.contains('bg-primary')) {
            btn.classList.remove('bg-primary', 'text-on-primary', 'border-primary', 'shadow-sm');
            btn.classList.add('bg-white', 'text-on-surface', 'border-stone-200');
        } else {
            btn.classList.add('bg-primary', 'text-on-primary', 'border-primary', 'shadow-sm');
            btn.classList.remove('bg-white', 'text-on-surface', 'border-stone-200');
        }
    }

    function toggleDetailTag(btn) {
        if (btn.classList.contains('detail-tag-active')) {
            btn.classList.remove('detail-tag-active');
            btn.classList.add('detail-tag-inactive');
        } else {
            btn.classList.remove('detail-tag-inactive');
            btn.classList.add('detail-tag-active');
        }
    }

    // Commute Reordering Logic
    const list = document.getElementById('commute-list');
    let draggedItem = null;

    list.addEventListener('dragstart', (e) => {
        draggedItem = e.target;
        e.target.classList.add('dragging');
    });

    list.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        draggedItem = null;
    });

    list.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(list, e.clientY);
        const currentDraggable = document.querySelector('.dragging');
        if (afterElement == null) {
            list.appendChild(currentDraggable);
        } else {
            list.insertBefore(currentDraggable, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.draggable-item:not(.dragging)')];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // Adaptive Bubble Logic
    const bubble = document.getElementById('active-bubble');
    const bubbleTime = document.getElementById('bubble-time');
    const bubbleComment = document.getElementById('bubble-comment');

    const commuteComments = {
        0: "不考虑此方式",
        15: "晨练刚热身就到了",
        30: "刚好刷完两集短剧",
        45: "闭目养神的好时机",
        60: "可以读完半本书了",
        90: "通勤极限，勇气可嘉",
        120: "这属于跨城旅行吧"
    };

    function updateActiveBubble(input) {
        const val = parseInt(input.value) || 0;
        
        // Show bubble
        bubble.classList.remove('opacity-0', 'translate-y-2', 'scale-95');
        bubble.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        
        bubbleTime.innerText = `${val}min`;
        
        // Find nearest comment
        let closest = 0;
        let minDiff = Infinity;
        for (let key in commuteComments) {
            let diff = Math.abs(val - key);
            if (diff < minDiff) {
                minDiff = diff;
                closest = key;
            }
        }
        bubbleComment.innerText = commuteComments[closest];

        // Hide bubble after 2 seconds of inactivity on input
        clearTimeout(input.bubbleTimeout);
        input.bubbleTimeout = setTimeout(() => {
            bubble.classList.add('opacity-0', 'translate-y-2', 'scale-95');
            bubble.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        }, 2000);
    }
</script>
</body></html>