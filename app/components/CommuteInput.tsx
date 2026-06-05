'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface CommuteItem {
  id: string
  label: string
  icon: string
  minutes: string
}

interface CommuteInputProps {
  times: Record<string, string>
  order: string[]
  onTimesChange: (times: Record<string, string>) => void
  onOrderChange: (order: string[]) => void
}

const COMMUTE_ICONS: Record<string, string> = {
  骑行: 'directions_bike',
  公共交通: 'directions_bus',
  驾车: 'directions_car',
  步行: 'directions_walk',
}

const COMMUTE_COMMENTS: Record<number, string> = {
  0: '不考虑此方式',
  15: '晨练刚热身就到了',
  30: '刚好刷完两集短剧',
  45: '闭目养神的好时机',
  60: '可以读完半本书了',
  90: '通勤极限，勇气可嘉',
  120: '这属于跨城旅行吧',
}

function getCommuteComment(minutes: number): string {
  const keys = Object.keys(COMMUTE_COMMENTS)
    .map(Number)
    .sort((a, b) => a - b)
  let closest = keys[0]
  for (const key of keys) {
    if (Math.abs(minutes - key) < Math.abs(minutes - closest)) {
      closest = key
    }
  }
  return COMMUTE_COMMENTS[closest]
}

function SortableItem({
  item,
  onMinutesChange,
}: {
  item: CommuteItem
  onMinutesChange: (id: string, value: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const minutes = parseInt(item.minutes) || 0
  const comment = minutes > 0 ? getCommuteComment(minutes) : ''

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-item flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30 transition-all ${
        isDragging ? 'scale-[1.02]' : ''
      }`}
    >
      <button type="button" className="cursor-grab active:cursor-grabbing text-on-surface-variant" {...attributes} {...listeners}>
        <span className="material-symbols-outlined">drag_indicator</span>
      </button>
      <span className={`material-symbols-outlined text-primary`}>{COMMUTE_ICONS[item.label]}</span>
      <span className="font-label-md text-label-md text-on-surface min-w-[60px]">{item.label}</span>
      <div className="flex-1 flex items-center gap-1">
        <input
          type="number"
          value={item.minutes}
          onChange={(e) => onMinutesChange(item.id, e.target.value)}
          placeholder="0"
          className="w-20 px-3 py-2 rounded-lg border border-outline-variant/50 bg-white text-on-surface text-center font-body-md focus:outline-none"
        />
        <span className="text-on-surface-variant text-sm">min</span>
      </div>
      {comment && (
        <span className="text-xs text-on-surface-variant max-w-[120px] truncate">{comment}</span>
      )}
    </div>
  )
}

export default function CommuteInput({ times, order, onTimesChange, onOrderChange }: CommuteInputProps) {
  const defaultOrder = ['骑行', '公共交通', '驾车', '步行']
  const currentOrder = order.length > 0 ? order : defaultOrder

  const items: CommuteItem[] = currentOrder.map((label) => ({
    id: label,
    label,
    icon: COMMUTE_ICONS[label],
    minutes: times[label] ?? '',
  }))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = currentOrder.indexOf(active.id as string)
    const newIndex = currentOrder.indexOf(over.id as string)
    const newOrder = arrayMove(currentOrder, oldIndex, newIndex)
    onOrderChange(newOrder)
  }

  const handleMinutesChange = (id: string, value: string) => {
    onTimesChange({ ...times, [id]: value })
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="font-label-md text-label-md text-on-surface-variant">
          出行方式偏好（拖拽排序，顶部权重最高，0min默认为不考虑此出行方式）
        </label>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1">
        <span className="material-symbols-outlined text-sm">swap_vert</span>
        长按 ↕ 排序权重
      </div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((item) => (
              <SortableItem key={item.id} item={item} onMinutesChange={handleMinutesChange} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
