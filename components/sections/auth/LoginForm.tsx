'use client'

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { IoMdArrowRoundBack, IoMdEye, IoMdEyeOff } from 'react-icons/io';

import { LoadingModal, Spinner } from '@/components';
import { revalidateRecaptcha } from '@/helpers';

import 'animate.css';

export const LoginForm = () => {

    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [formErrorSubmitted, setFormErrorSubmitted] = useState(false);
    const [recaptchaError, setRecaptchaError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        setIsClient(true);
    }, []);

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
                setIsAuthenticating(true);
                
                const result = await signIn('credentials', {
                    email: values.email,
                    password: values.password,
                    redirect: false,
                });

                if (result?.error) {
                    setIsAuthenticating(false);
                    setFormErrorSubmitted(true);
                    setErrorMessage(result.error || 'Login failed');
                    setSubmitting(false);

                    setTimeout(() => {
                        setFormErrorSubmitted(false);
                        setErrorMessage('');
                    }, 8000);
                } else if (result?.ok) {
                    // Mantener loading mientras se redirecciona
                    resetForm();
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 800);
                }

            } catch (error) {
                console.log(error);
                setIsAuthenticating(false);
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

    if (!isClient) {
        return <LoadingModal />;
    }

    // Mostrar loading fullscreen mientras se autentica
    if (isAuthenticating) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
                <div className="bg-white dark:bg-[#262f3a] rounded-lg p-8 flex flex-col items-center gap-4">
                    <Spinner width="40" height="40" color="#7b7db0" />
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        Autenticando...
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Redirigiendo al dashboard
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className='w-full lg:w-5/12 px-8 flex flex-col justify-center max-[640px]:px-6'>

            <div className='bg-white px-10 pt-6 rounded-md border max-[640px]:px-6 dark:bg-[#262f3a]'>
                <h2 className='text-center'>Login</h2>
                <p className='my-5 ml-1'>Inicia sesión con usuario y contraseña.</p>

                <form
                    noValidate
                    onSubmit={handleSubmit} 
                    autoComplete="off">

                    <input
                        type='email'
                        placeholder='Correo'
                        className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                        {...getFieldProps('email')} />

                    {(touched.email && errors.email) && <p className='error-message animate__animated animate__fadeIn'>{errors.email}</p>}
                    

                    <div className='relative'>
                        <input
                            type={ isPasswordVisible ? 'text' : 'password' }
                            placeholder='Contraseña'
                            className="w-full rounded-md py-2.5 px-4 mt-5 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
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
                                    <Spinner 
                                        width={'20'} 
                                        height={'20'} 
                                        color={'#ffffff'} />
                                        
                                    <p className='ml-2'>Enviando</p>
                                </div> : <p className='animate__animated animate__fadeIn'>Enviar</p>

                        }</button>

                    <p className='ml-1 my-5 text-center'>Si no tienes cuenta, registrate <a href={'/registro'} className='text-secondary-color dark:text-indigo-600'>Aquí</a></p>

                    {(formErrorSubmitted || recaptchaError) && <p className='error-message font-bold animate__animated animate__fadeIn'>{errorMessage}</p>}

                    <div className='mt-5 pb-6 pt-14'>
                        <a
                            href={'/'}
                            className='flex items-center font-ligth hover:text-secondary-color dark:hover:text-indigo-600'>
                            <IoMdArrowRoundBack className='mr-1' />Regresa a Inicio
                        </a>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default LoginForm;
