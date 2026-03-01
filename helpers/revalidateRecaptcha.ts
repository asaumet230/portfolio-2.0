import { IRecaptchaResponse, IRevalidateRecaptchaResponse } from "@/interfaces";



export const revalidateRecaptcha = async (token: string): Promise<IRevalidateRecaptchaResponse> => {

    // 🔒 RECAPTCHA DESHABILITADO TEMPORALMENTE PARA TESTING
    return {
        success: true,
        message: 'Ok no eres un robot',
    }

    /*
    try {
        const res = await fetch('/api/recaptcha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token,
            }),
        });

        const recaptchaResponse: IRecaptchaResponse = await res.json();
        
        if(recaptchaResponse.success && recaptchaResponse.score > 0.5) {

            return {
                success: true,
                message: 'Ok no eres un robot',
            }
        }

        return {
            success: false,
            message: 'Eres un robot',
        }
                
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: 'No se pudo completar la validación del Recaptcha',
        }
    }
    */
}
