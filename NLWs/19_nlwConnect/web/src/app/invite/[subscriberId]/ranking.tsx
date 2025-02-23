import Image from 'next/image'

// import { getRanking } from '@/http/api'
import medalCooper from '../../../assets/medal-cooper.svg'
import medalGold from '../../../assets/medal-gold.svg'
import medalSilver from '../../../assets/medal-silver.svg'

export async function Ranking() {
  // Obs: Endpoint da trilha Node
  // const { ranking } = await getRanking()

  return (
    <div className="w-full max-w-[440px] space-y-5">
      <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
        Ranking de indicações
      </h2>

      <div className="space-y-4">
        <div className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3">
          <span className="text-sm text-gray-300 leading-none">
            <span className="font-semibold">1&ordm;</span> | Diego Fernandes
          </span>
          <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
            1030
          </span>

          <Image src={medalGold} alt="" className="absolute top-0 right-8" />
        </div>

        <div className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3">
          <span className="text-sm text-gray-300 leading-none">
            <span className="font-semibold">2&ordm;</span> | Diego Fernandes
          </span>
          <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
            1030
          </span>

          <Image src={medalSilver} alt="" className="absolute top-0 right-8" />
        </div>

        <div className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3">
          <span className="text-sm text-gray-300 leading-none">
            <span className="font-semibold">3&ordm;</span> | Diego Fernandes
          </span>
          <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
            1030
          </span>

          <Image src={medalCooper} alt="" className="absolute top-0 right-8" />
        </div>

        {/* <div className="space-y-4">
        {ranking.map((rank, index) => {
          const rankingPosition = index + 1

          return (
            <div
              key={rank.id}
              className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3"
            >
              <span className="text-sm text-gray-300 leading-none">
                <span className="font-semibold">{rankingPosition}&ordm;</span> |{' '}
                {rank.name}
              </span>

              <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
                {rank.score}
              </span>

              {rankingPosition === 1 && (
                <Image src={gold} alt="" className="absolute top-0 right-8" />
              )}

              {rankingPosition === 2 && (
                <Image src={silver} alt="" className="absolute top-0 right-8" />
              )}

              {rankingPosition === 3 && (
                <Image src={cooper} alt="" className="absolute top-0 right-8" />
              )}
            </div>
          )
        })}

        {ranking.length === 0 && (
          <p className="text-gray-300">Nenhuma indicação registrada</p>
        )}
      </div> */}
      </div>
    </div>
  )
}