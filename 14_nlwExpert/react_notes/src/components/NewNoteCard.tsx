import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCardProps {
    onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
    const [IsRecording, setIsRecording] = useState(false)
    const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
    const [content, setContent] = useState('')

    const handleContentChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value)

        if(e.target.value === '') setShouldShowOnboarding(true)
    }

    const handleSaveNote = (e: FormEvent) => {
        e.preventDefault()
        // if(content === '') return
        onNoteCreated(content)

        setContent('')
        setShouldShowOnboarding(true)
        toast.success('Nota salva com sucesso!')
    }

    const handleStartRecording = () => {
        const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
        if(!isSpeechRecognitionAPIAvailable) return alert('Infelizmente seu navegador não suporta a API de gravação!')

        setIsRecording(true)
        setShouldShowOnboarding(true)

        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition
        const speechRecognition = new SpeechRecognitionAPI()
        speechRecognition.lang = 'pt-BR'
        speechRecognition.continuous = true // Não parar ao parar de falar
        speechRecognition.maxAlternatives = 1
        speechRecognition.interimResults = true // Trazer resultados conforme falando
        speechRecognition.onresult = (event) => {
            const transcription = Array.from(event.results).reduce((text, result) => {
                return text.concat(result[0].transcript)
            }, '')

            setContent(transcription)
        }

        speechRecognition.onerror = event => {
            console.error(event)
        }


        speechRecognition.start()
    }

    const handleStopRecording = () => {
        setIsRecording(false)

        if(speechRecognition !== null) speechRecognition.stop()
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger className='rounded-md bg-slate-700 p-5 flex flex-col gap-3 text-left hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none'>
                <span className='text-sm font-medium text-slate-200'>Adicionar nota</span>
                <p className='text-sm leading-6 text-slate-400'>Grave uma nota em áudio que será convertida para texto automaticamente.</p>
            </Dialog.Trigger>


            <Dialog.Portal>
                <Dialog.Overlay className='inset-0 fixed bg-black/50' />
                <Dialog.Content className='overflow-hidden fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none'>
                    <form className='flex-1 flex flex-col'>
                        <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
                            <X className='size-5' />
                        </Dialog.Close>

                        <div className='flex flex-1 flex-col gap-3 p-5'>
                            <span className='text-sm font-medium text-slate-300'>Adicionar nota</span>

                        {shouldShowOnboarding ? (
                            <p className='text-sm leading-6 text-slate-400'>Comece <button type='button' className='font-medium text-lime-400 hover:underline' onClick={handleStartRecording}>gravando uma nota</button> em áudio ou se preferir <button onClick={() => setShouldShowOnboarding(false)} className='font-medium text-lime-400 hover:underline'>utilize apenas texto</button>.</p>
                        ) : (
                            <textarea 
                                autoFocus
                                className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                                onChange={handleContentChanged}
                                value={content}
                            />
                        )}
                        </div>

                        {IsRecording ? (
                            <button type='button' className='w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100' onClick={handleStopRecording}>
                                <div className='size-3 rounded-full bg-red-500 animate-pulse' />
                                Gravando! (clique p/ interromper)
                            </button>
                        ) : (
                            <button disabled={content === ''} type='button' className='w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500 disabled:bg-lime-400/40' onClick={handleSaveNote}>Salvar nota</button>
                        )}
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default NewNoteCard