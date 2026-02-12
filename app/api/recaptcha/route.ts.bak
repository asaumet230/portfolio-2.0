import { NextResponse } from 'next/server';

import { IRecaptchaResponse } from '@/interfaces';


export async function POST(req: Request, _: Response) {

    const { token = '' } = await req.json();

    const secretKey: string | undefined = process.env.RECAPTCHA_SITE_KEY ?? 'NOT SECRET RECAPTCHA SITE KEY';
    const formData = `secret=${secretKey}&response=${token}`;

    try {

        const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        });

        const data:IRecaptchaResponse = await resp.json();

        return NextResponse.json(data);

    } catch (error) {
        console.log(error);
        return NextResponse.json({ 
            success: false,
            challenge_ts: '',
            hostname: '',
            score: 0.0,
            action: '',
        });
    }

}