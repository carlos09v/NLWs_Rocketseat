import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')

    // Middleware => Interceptar uma requisição
    // Verificar se existe o Cookie redirectTo
    const redirectTo = req.cookies.get('redirectTo')?.value

    // Enviar o code pro back-end e receber o token
    const registerResponse = await api.post('/register', {
        code
    })
    const { token } = registerResponse.data
    console.log(token)

    const redirectURL = redirectTo ?? new URL('/', req.url)
    // Salvar o token nos cookies
    const cookieExpiresInSeconds = 60 * 60 * 24 * 3
    return NextResponse.redirect(redirectURL, {
        headers: {
            'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`
        }
    })

    // Path = Pra aplicação toda (/)
    // max-age = Tempo pra expirar
}