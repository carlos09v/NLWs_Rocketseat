import { FFmpeg } from '@ffmpeg/ffmpeg'

import coreURL from '../ffmpeg/ffmpeg-core.js?url'
import wasmURL from '../ffmpeg/ffmpeg-core.wasm?url'
import workerURL from '../ffmpeg/ffmpeg-worker.js?url'

let ffmpeg: FFmpeg | null

export const getFFmepg =  async () => {
    // Ver se ele ja esta carregado, pois é pesado
    if(ffmpeg) return ffmpeg

    ffmpeg = new FFmpeg()
    // Esperar ele Carregar
    if(!ffmpeg.loaded) {
        await ffmpeg.load({
            coreURL,
            wasmURL,
            workerURL
        })
    }

    return ffmpeg
}