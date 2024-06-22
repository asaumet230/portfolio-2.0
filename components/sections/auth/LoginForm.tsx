'use client'

import { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { IoMdArrowRoundBack, IoMdEye, IoMdEyeOff } from 'react-icons/io';


import { Spinner } from '@/components';
import { revalidateRecaptcha } from '@/helpers';

import 'animate.css';


export const LoginForm = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrorSubmitted, setFormErrorSubmitted] = useState(false);
    const [recaptchaError, setRecaptchaError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();

    const { handleSubmit, getFieldProps, errors, touched, isSubmitting, isValid } = useFormik({

        initialValues: {
            email: '',
            password: '',
        },

        onSubmit: async (values, { setSubmitting, resetForm }) => {

            if (!executeRecaptcha) {

                setRecaptchaError(true);
                setErrorMessage('No se puede ejecutar recaptcha');

                setTimeout(() => {

                    setRecaptchaError(false);
                    setErrorMessage('');

                }, 6000);

                return;
            }

            const recaptchaToken = await executeRecaptcha('submit');
            const recaptchaResponse = await revalidateRecaptcha(recaptchaToken);

            if (!recaptchaResponse.success) {

                setRecaptchaError(true);
                setErrorMessage(recaptchaResponse.message);

                setTimeout(() => {

                    setRecaptchaError(false);
                    setErrorMessage('');

                }, 8000);

                return;
            }

            try {


                const res = await fetch('', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.password
                    }),
                });

                console.log(`ESTA ES LA RESPUESTA: ${res}`);

                if (res.ok) {
                    setFormSubmitted(true);
                    resetForm();
                    setTimeout(() => {
                        setFormSubmitted(false);
                    }, 8000);
                }

            } catch (error) {
                console.log(error);
                setSubmitting(false);
                setFormErrorSubmitted(true);
                setErrorMessage('Tu mensaje no pudo ser envido');

                setTimeout(() => {
                    setFormErrorSubmitted(false);
                    setErrorMessage('');
                }, 8000);
            }

        },
        validationSchema: Yup.object({

            email: Yup.string()
                .required('Campo requerido')
                .email('Debe de ser un email valido'),

            password: Yup.string()
                .required('Campo requerido')
                .min(6, 'La contraseña debe de tener mínimo 6 caracteres')
        }),
    }
    );

    return (
        <main className='w-full lg:w-5/12 px-8 flex flex-col justify-center'>

            <div className='bg-white px-10 pt-6 rounded-md border'>
                <h1 className='text-center'>Login</h1>
                <p className='my-5 ml-1'>Inicia sesión con usuario y contraseña.</p>

                <form
                    noValidate
                    onSubmit={handleSubmit} 
                    autoComplete="off">

                    <input
                        type='email'
                        placeholder='Correo'
                        className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0]"
                        {...getFieldProps('email')} />

                    {(touched.email && errors.email) && <p className='error-message animate__animated animate__fadeIn'>{errors.email}</p>}
                    

                    <div className='relative'>
                        <input
                            type={ isPasswordVisible ? 'text' : 'password' }
                            placeholder='Contraseña'
                            className="w-full rounded-md py-2.5 px-4 mt-5 border text-sm outline-[#7b7db0]"
                            {...getFieldProps('password')} />

                        {isPasswordVisible ?
                            <IoMdEye
                                onClick={() => setIsPasswordVisible(!isPasswordVisible) }
                                size={18}
                                className='absolute right-5 top-8 cursor-pointer animate__animated animate__fadeIn' /> :

                            <IoMdEyeOff
                                onClick={() => setIsPasswordVisible(!isPasswordVisible) }
                                size={18}
                                className='absolute right-5 top-8 cursor-pointer animate__animated animate__fadeIn' />
                        }
                    </div>

                    {(touched.password && errors.password) && <p className='error-message animate__animated animate__fadeIn'>{errors.password}</p>}

                    <button
                        disabled={isSubmitting || !isValid}
                        type='submit'
                        className='mt-10 btn w-full'>{

                            isSubmitting ?
                                <div className='w-full flex items-center justify-center animate__animated animate__fadeIn'>
                                    <Spinner />
                                    <p className='ml-2'>Enviando</p>
                                </div> : <p className='animate__animated animate__fadeIn'>Enviar</p>

                        }</button>

                    <p className='ml-1 my-5 text-center'>Si no tienes cuenta, registrate <Link href={'/registrarse'} className='text-secondary-color'>Aquí</Link></p>


                    {formSubmitted && <p className='success-message animate__animated animate__fadeIn mt-6'>Login exitoso</p>}
                    {(formErrorSubmitted || recaptchaError) && <p className='error-message font-bold animate__animated animate__fadeIn'>{errorMessage}</p>}

                    <div className='mt-5 pb-6 pt-14'>
                        <Link
                            href={'/'}
                            className='flex items-center font-ligth hover:text-secondary-color'>
                            <IoMdArrowRoundBack className='mr-1' />Regresa a Inicio
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default LoginForm;