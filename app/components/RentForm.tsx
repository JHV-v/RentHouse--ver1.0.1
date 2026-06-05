'use client'

import { useState, useCallback } from 'react'
import type { RentFormData } from '../lib/adapter'
import HeaderSection from './HeaderSection'
import TagSelectGroup from './TagSelectGroup'
import DetailTagGroup from './DetailTagGroup'
import BasicInfoFields from './BasicInfoFields'
import ContractSelectGroup from './ContractSelectGroup'
import CommuteInput from './CommuteInput'

// ============================================================
// 表单选项配置
// ============================================================

const CITY_TYPES = ['一线', '新一线', '二线', '三线及以下']
const HOUSING_TYPES = ['整租一居', '整租二居', '合租主卧', '合租次卧']
const UTILITY_TYPES = ['民水民电', '商水商电']
const SUNLIGHT_OPTIONS = ['阳光大满贯', '中规中矩', '常年小黑屋']
const SUNLIGHT_ICONS = [
  { icon: 'wb_sunny', color: 'text-amber-500' },
  { icon: 'cloud', color: 'text-slate-400' },
  { icon: 'nights_stay', color: 'text-indigo-500' },
]
const NOISE_OPTIONS = ['极其安静', '偶尔噪音', '隔音极差']
const CONVENIENCE_OPTIONS = ['很方便', '一般', '不方便']
const SPACE_OPTIONS = ['拥挤', '偏小', '刚好', '宽敛']
const FLOOR_OPTIONS = ['电梯房', '低层步梯', '高层步梯']
const APPLIANCE_OPTIONS = ['齐全且新', '刚好够用', '破旧老化', '纯毛坯房']
const BATHROOM_OPTIONS = ['独立卫浴', '双人共卫', '多人共卫']
const KITCHEN_OPTIONS = ['不做饭', '偶尔排队', '经常排队', '基本自由使用']
const DETAIL_OPTIONS = [
  '宠物友好', '晾晒方便', '有阳台', '快递方便', '外卖方便', '晚上安静',
  '隔壁不吵', '电梯稳定', '附近便利店多', '适合居家办公', '收纳空间够', '小区安全感好',
]

// ============================================================
// 表单数据初始值
// ============================================================

function createEmptyForm(): RentFormData {
  return {
    salary: '',
    rent: '',
    deposit: '押一',
    agencyFee: '无',
    paymentCycle: '月付',
    contractTerm: '1年',
    activeOptions: {},
    commuteTimes: {},
    commuteOrder: ['骑行', '公共交通', '驾车', '步行'],
  }
}

// ============================================================
// Props
// ============================================================

interface RentFormProps {
  initialData?: RentFormData | null
  onSubmit: (data: RentFormData) => void
}

export default function RentForm({ initialData, onSubmit }: RentFormProps) {
  const [form, setForm] = useState<RentFormData>(initialData ?? createEmptyForm)

  const updateOption = useCallback((label: string, value: string | string[]) => {
    setForm((prev) => ({
      ...prev,
      activeOptions: { ...prev.activeOptions, [label]: Array.isArray(value) ? value : [value] },
    }))
  }, [])

  const updateContract = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = () => {
    onSubmit(form)
  }

  // 当前租赁类型，用于判断合租专属字段显示
  const housingType = form.activeOptions['租赁类型']?.[0]
  const isShared = housingType?.startsWith('合租')

  return (
    <main className="max-w-xl mx-auto px-4 py-12 space-y-8">
      <HeaderSection />

      <div className="bg-white rounded-3xl border border-outline-variant/30 shadow-sm overflow-hidden">
        {/* 基础开销 */}
        <section className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">payments</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">基础开销</h2>
          </div>

          <TagSelectGroup
            label="城市类型"
            options={CITY_TYPES}
            value={form.activeOptions['城市类型']?.[0]}
            onChange={(v) => updateOption('城市类型', v)}
            variant="segmented"
          />

          <TagSelectGroup
            label="租赁类型"
            options={HOUSING_TYPES}
            value={form.activeOptions['租赁类型']?.[0]}
            onChange={(v) => updateOption('租赁类型', v)}
            variant="segmented"
          />

          <BasicInfoFields
            salary={form.salary}
            rent={form.rent}
            housingType={housingType}
            onSalaryChange={(v) => setForm((prev) => ({ ...prev, salary: v }))}
            onRentChange={(v) => setForm((prev) => ({ ...prev, rent: v }))}
          />

          <ContractSelectGroup
            deposit={form.deposit}
            agencyFee={form.agencyFee}
            paymentCycle={form.paymentCycle}
            contractTerm={form.contractTerm}
            onChange={updateContract}
          />

          <TagSelectGroup
            label="水电收费"
            options={UTILITY_TYPES}
            value={form.activeOptions['水电收费']?.[0]}
            onChange={(v) => updateOption('水电收费', v)}
            variant="segmented"
          />
        </section>

        <div className="h-px bg-stone-100" />

        {/* 通勤出行 */}
        <section className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">commute</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">通勤出行</h2>
          </div>

          <CommuteInput
            times={form.commuteTimes}
            order={form.commuteOrder}
            onTimesChange={(times) => setForm((prev) => ({ ...prev, commuteTimes: times }))}
            onOrderChange={(order) => setForm((prev) => ({ ...prev, commuteOrder: order }))}
          />
        </section>

        <div className="h-px bg-stone-100" />

        {/* 居住体验 */}
        <section className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">home_work</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">居住体验</h2>
          </div>

          <TagSelectGroup
            label="采光通风"
            options={SUNLIGHT_OPTIONS}
            value={form.activeOptions['采光通风']?.[0]}
            onChange={(v) => updateOption('采光通风', v)}
            variant="grid"
            icons={SUNLIGHT_ICONS}
          />

          <TagSelectGroup
            label="隔音水平"
            options={NOISE_OPTIONS}
            value={form.activeOptions['隔音水平']?.[0]}
            onChange={(v) => updateOption('隔音水平', v)}
          />

          <TagSelectGroup
            label="周边便利度"
            options={CONVENIENCE_OPTIONS}
            value={form.activeOptions['周边便利度']?.[0]}
            onChange={(v) => updateOption('周边便利度', v)}
          />

          <TagSelectGroup
            label="空间感觉"
            options={SPACE_OPTIONS}
            value={form.activeOptions['空间感觉']?.[0]}
            onChange={(v) => updateOption('空间感觉', v)}
            variant="segmented"
          />

          <TagSelectGroup
            label="楼层类型"
            options={FLOOR_OPTIONS}
            value={form.activeOptions['楼层类型']?.[0]}
            onChange={(v) => updateOption('楼层类型', v)}
          />

          <TagSelectGroup
            label="家电配置"
            options={APPLIANCE_OPTIONS}
            value={form.activeOptions['家电配置']?.[0]}
            onChange={(v) => updateOption('家电配置', v)}
          />

          {isShared && (
            <>
              <TagSelectGroup
                label="卫浴体验 (合租)"
                options={BATHROOM_OPTIONS}
                value={form.activeOptions['卫浴体验 (合租)']?.[0]}
                onChange={(v) => updateOption('卫浴体验 (合租)', v)}
              />
              <TagSelectGroup
                label="厨房体验 (合租)"
                options={KITCHEN_OPTIONS}
                value={form.activeOptions['厨房体验 (合租)']?.[0]}
                onChange={(v) => updateOption('厨房体验 (合租)', v)}
              />
            </>
          )}
        </section>

        <div className="h-px bg-stone-100" />

        {/* 生活小细节 */}
        <section className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">tips_and_updates</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">生活小细节</h2>
          </div>

          <DetailTagGroup
            label="生活小细节"
            options={DETAIL_OPTIONS}
            values={form.activeOptions['生活小细节'] ?? []}
            onChange={(v) => updateOption('生活小细节', v)}
          />
        </section>

        <div className="h-px bg-stone-100" />

        {/* 提交按钮 */}
        <div className="p-6 bg-stone-50/80">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full premium-btn py-4 rounded-2xl text-white font-headline-sm shadow-lg shadow-primary/30 btn-hover-effect flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined fill-1">search</span>
            查看我的租房性价比报告
          </button>
        </div>
      </div>
    </main>
  )
}
