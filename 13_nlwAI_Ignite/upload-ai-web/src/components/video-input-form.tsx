import { FileVideo, Upload } from 'lucide-react'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from 'react'
import { getFFmepg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { api } from '@/lib/axios'

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'success'
const statusMessages = {
    converting: 'Convertendo...',
    uploading: 'Carregando...',
    generating: 'Transcrevendo...',
    success: 'Sucesso!'
}

interface VideoInputForm {
    onVideoUploaded: (id: string) => void
}

const VideoInputForm = ({ onVideoUploaded }: VideoInputForm) => {
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [status, setStatus] = useState<Status>('waiting')
    const promptInputRef = useRef<HTMLTextAreaElement>(null)

    const handleFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.currentTarget

        // Se ñ existir arquivo
        if (!files) return

        const selectedFile = files[0]

        setVideoFile(selectedFile)
    }

    const convertVideoToAudio = async (video: File) => {
        console.log('Convert Started.')
        const ffmpeg = await getFFmepg()
        await ffmpeg.writeFile('input.mp4', await fetchFile(video))

        // Verificar Erro
        // ffmpeg.on('log', log => console.log(log))

        ffmpeg.on('progress', progress => {
            console.log('Convert progress: ' + Math.round(progress.progress * 100))
        })

        await ffmpeg.exec([
            '-i',
            'input.mp4',
            '-map',
            '0:a',
            '-b:a',
            '20k', // bitrate
            '-acodec',
            'libmp3lame',
            'output.mp3'
        ])

        // Ler o arquivo .mp3 convertido
        const data = await ffmpeg.readFile('output.mp3')
        const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
        const audioFile = new File([audioFileBlob], 'audio.mp3', {
            type: 'audio/mpeg'
        })

        console.log('Convert Finished.')
        return audioFile
    }

    const handleUploadVideo = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const prompt = promptInputRef.current?.value

        if (!videoFile) return

        setStatus('converting')
        // converter o video em audio (no browser)
        const audioFile = await convertVideoToAudio(videoFile)

        const data = new FormData()
        data.append('file', audioFile)

        setStatus('uploading')
        const res = await api.post('/videos', data)
        const videoId = res.data.video.id

        setStatus('generating')
        await api.post(`/videos/${videoId}/transcription`, {
            prompt
        })

        setStatus('success')
        onVideoUploaded(videoId)
    }

    // Criar uma pre-view de um arquivo
    const previewURL = useMemo(() => {
        if (!videoFile) return null

        return URL.createObjectURL(videoFile)
    }, [videoFile])

    return (
        <form onSubmit={handleUploadVideo} className='space-y-6'>
            <label
                htmlFor="video"
                className='relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5'
            >
                {previewURL ? (
                    <video src={previewURL} controls={false} className='pointer-events-none absolute inset-0' />
                ) : (
                    <>
                        <FileVideo className='w-4 h-4' />
                        Selecione um video
                    </>
                )}
            </label>

            <input type="file" name="video" id="video" accept='video/mp4' className='sr-only' onChange={handleFileSelected} />

            <Separator />

            <div className='space-y-2'>
                <Label htmlFor='transcription_prompt'>Prompt de transcrição</Label>
                <Textarea
                    ref={promptInputRef}
                    disabled={status !== 'waiting'}
                    id='transcription_prompt'
                    className='h-20 leading-relaxed resize-none'
                    placeholder='Inclua palavras-chave mencionadas no video separadas por vírgula (,)'
                />
            </div>

            <Button
                data-success={status === 'success'}
                disabled={status !== 'waiting'}
                type='submit'
                className='w-full data-[success=true]:bg-emerald-400'
            >
                {status === 'waiting' ? (
                    <>
                        Carregar Video
                        <Upload className='h-4 w-4 ml-2' />
                    </>
                ) : statusMessages[status]}
            </Button>
        </form>
    )
}

export default VideoInputForm