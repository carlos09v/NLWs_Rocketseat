import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const redirectURL = new URL('/', req.url)
    // Remover o token dos cookies
    return NextResponse.redirect(redirectURL, {
        headers: {
            'Set-Cookie': "token=; Path=/; max-age=0;"
        }
    })

    // Path = Pra aplicação toda (/)
    // max-age = Tempo pra expirar
}