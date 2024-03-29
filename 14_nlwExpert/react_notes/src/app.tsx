import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import NewNoteCard from './components/NewNoteCard'
import NoteCard from './components/NoteCard'

interface Note {
    id: string
    date: Date,
    content: string
}

export function App() {
    const [search, setSearch] = useState('')
    const [notes, setNotes] = useState<Note[]>(() => {
        const notesOnStorage = localStorage.getItem('notes')
        return notesOnStorage ? JSON.parse(notesOnStorage) : []
    })

    const onNoteCreated = (content: string) => {
        const newNote = {
            id: crypto.randomUUID(),
            date: new Date(),
            content
        }

        const notesArray = [newNote, ...notes]
        setNotes(notesArray)

        localStorage.setItem('notes', JSON.stringify(notesArray))
    }

    const onNoteDeleted = (id: string) => {
        const notesArray = notes.filter(note => {
            return note.id !== id
        })

        setNotes(notesArray)
        localStorage.setItem('notes', JSON.stringify(notesArray))
    }

    const filteredNotes = search !== '' ? notes.filter(note => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

    return (
        <div className='mx-auto max-w-6xl my-12 space-y-6 px-5'>
            <img src={logo} alt="Logo-NLW_Expert" />

            <form className='w-full'>
                <input
                    type="text"
                    placeholder='Busque em suas notas...'
                    className='outline-none w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500'
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                />
            </form>

            <div className='h-px bg-slate-700' />

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-6'>
                
                <NewNoteCard onNoteCreated={onNoteCreated} />
                {filteredNotes.map(note => (
                    <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
                ))}
            </div>
        </div>
    )
}


