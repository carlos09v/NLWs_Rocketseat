'use client'  // Uso de JavaScript
import { ChangeEvent, useState } from "react"

const MediaPicker = () => {
    const [preview, setPreview] = useState<string | null>(null)

    const onFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target

      if(!files) return

      const previewUrl = URL.createObjectURL(files[0])
      setPreview(previewUrl)
    }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file" 
        id="media"
        name="coverUrl"
        accept="image/*"
        className='invisible h-0 w-0' 
      />

      {preview && <img src={preview} alt="" className="w-full aspect-video rounded-lg object-cover" />}
    </>
  )
}

export default MediaPicker