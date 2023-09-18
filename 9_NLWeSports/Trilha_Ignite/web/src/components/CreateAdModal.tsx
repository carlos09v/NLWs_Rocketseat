import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ArrowDown, Check, GameController } from 'phosphor-react'

import Input from './Form/Input'
import { FormEvent, useState } from 'react'
import { api } from '../lib/axios'

interface Game {
    data: {
        id: string
        title: string
    }[]
}

const CreateAdModal = ({ data }: Game) => {
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    const handleCreateAd = async (ev: FormEvent) => {
        ev.preventDefault()

        const formData = new FormData(ev.target as HTMLFormElement)
        const data = Object.fromEntries(formData)
        
        // Validações
        if(!data.name || !data.hourStart || !data.hourEnd || !data.yearsPlaying || !data.discord) return alert('Insira os campos !')

        try {
            await api.post(`/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })
            
            alert('Anúncio criado com sucesso !')
            window.location.reload() // Reload Page
        } catch (error) {
            console.log(error)
            alert('Erro ao criar anúncio !')
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-3xl font-black'>Publicar anúncio</Dialog.Title>

                <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                        <select defaultValue="" name="game" id="game" className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'>
                            <option disabled value="">Selecione o game que deseja jogar</option>

                            {data.map(game => (
                                <option key={game.id} value={game.id}>{game.title}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu nome (ou nickname)</label>
                        <Input type="text" name="name" id="name" placeholder='Como te chamam dentro do game?' />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                            <Input type="number" name="yearsPlaying" id="yearsPlaying" placeholder='Tudo bem ser ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu Discord?</label>
                            <Input type="text" name="discord" id="discord" placeholder='Usuario#0000' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Quando costuma jogar?</label>

                            <ToggleGroup.Root type='multiple' className='grid grid-cols-4 gap-2' onValueChange={setWeekDays} value={weekDays}>

                                <ToggleGroup.Item
                                    value='0' className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Domingo'>D</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='1' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Segunda'>S</ToggleGroup.Item>                        
                                <ToggleGroup.Item
                                    value='2' className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Terça'>T</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='3' className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quarta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='4' className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Quinta'>Q</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='5' className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sexta'>S</ToggleGroup.Item>
                                <ToggleGroup.Item
                                    value='6' className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title='Sábado'>S</ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hourStart" >Qual horário do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input name='hourStart' type="time" id='hourStart' placeholder='De' />
                                <Input name='hourEnd' type="time" id='hourEnd' placeholder='Até' />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm'>
                        <Checkbox.Root checked={useVoiceChannel} onCheckedChange={(checked) => {
                            checked ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
                        }} className='w-6 h-6 rounded bg-zinc-900 p-1'>
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Costumo me conectar ao chat de voz
                    </label>

                    <footer className='mt-4 flex justify-end gap-4'>
                        <Dialog.Close className='bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold'>Cancelar</Dialog.Close>
                        <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type="submit">
                            <GameController size={24} />
                            Encontrar duo
                        </button>
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default CreateAdModal