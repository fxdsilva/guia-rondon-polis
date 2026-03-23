import React, { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'

interface CropperProps {
  imageSrc: string
  circular?: boolean
  allowToggle?: boolean
  onCrop: (croppedBase64: string) => void
  onCancel: () => void
}

export function ImageCropper({
  imageSrc,
  circular: initialCircular = false,
  allowToggle = false,
  onCrop,
  onCancel,
}: CropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [circular, setCircular] = useState(initialCircular)
  const [fullImage, setFullImage] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageSrc
    img.onload = () => {
      imgRef.current = img
      draw()
    }
  }, [imageSrc])

  useEffect(() => {
    draw()
  }, [scale, position, circular, fullImage])

  const draw = () => {
    const canvas = canvasRef.current
    const img = imgRef.current
    if (!canvas || !img) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 300
    canvas.width = size
    canvas.height = size

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (circular && !fullImage) {
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.clip()
    }

    if (fullImage) {
      const minScale = Math.min(size / img.width, size / img.height)
      const scaledWidth = img.width * minScale
      const scaledHeight = img.height * minScale
      const x = (size - scaledWidth) / 2
      const y = (size - scaledHeight) / 2
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
    } else {
      const minScale = Math.max(size / img.width, size / img.height)
      const currentScale = minScale * scale
      const scaledWidth = img.width * currentScale
      const scaledHeight = img.height * currentScale
      const x = (size - scaledWidth) / 2 + position.x
      const y = (size - scaledHeight) / 2 + position.y
      ctx.drawImage(img, x, y, scaledWidth, scaledHeight)
    }
  }

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (fullImage) return
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setDragStart({ x: clientX - position.x, y: clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || fullImage) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    setPosition({ x: clientX - dragStart.x, y: clientY - dragStart.y })
  }

  const handleMouseUp = () => setIsDragging(false)

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Ajustar Imagem</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <div
            className={`relative w-[300px] h-[300px] overflow-hidden bg-muted ${!fullImage ? 'cursor-move' : ''} ${circular && !fullImage ? 'rounded-full' : 'rounded-md'} border shadow-inner`}
            style={{ touchAction: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
          >
            <canvas ref={canvasRef} className="pointer-events-none" />
          </div>

          {allowToggle && (
            <div className="w-full flex items-center justify-between bg-muted/50 p-3 rounded-lg border">
              <span className="text-sm font-medium">Usar imagem inteira</span>
              <Switch checked={fullImage} onCheckedChange={setFullImage} />
            </div>
          )}

          {!fullImage && (
            <div className="w-full space-y-2">
              <div className="flex justify-between">
                <p className="text-sm font-medium">Zoom</p>
                <p className="text-xs text-muted-foreground">{Math.round(scale * 100)}%</p>
              </div>
              <Slider
                value={[scale]}
                min={1}
                max={3}
                step={0.05}
                onValueChange={([val]) => setScale(val)}
              />
            </div>
          )}
        </div>
        <DialogFooter className="flex-row sm:justify-end gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none" onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            className="flex-1 sm:flex-none"
            onClick={() => onCrop(canvasRef.current!.toDataURL('image/png'))}
          >
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
