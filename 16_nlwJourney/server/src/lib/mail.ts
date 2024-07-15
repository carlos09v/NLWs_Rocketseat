import nodemailer from 'nodemailer'

export const getMailClient = async () => {
    // cria conta teste 
    const account = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email', // ethereal = fake smtp
        port: 587,
        secure: false,
        auth: {
            user: account.user,
            pass: account.pass
        }
    })

    return transporter
}