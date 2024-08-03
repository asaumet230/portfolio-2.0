'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { IoMdArrowRoundBack, IoMdEye, IoMdEyeOff } from 'react-icons/io';

import { LoadingModal, Spinner } from '@/components';
import { revalidateRecaptcha } from '@/helpers';

import 'animate.css';


export const RegisterForm = () => {

    const [isClient, setIsClient] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
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

            firstName: Yup.string()
                .required('Campo requerido')
                .min(2, 'El nombre debe tener al menos 2 caracteres')
                .max(50, 'El nombre no debe exceder los 50 caracteres'),

            lastName: Yup.string()
                .required('Campo requerido')
                .min(2, 'El apellido debe tener al menos 2 caracteres')
                .max(50, 'El apellido no debe exceder los 50 caracteres'),

            email: Yup.string()
                .required('Campo requerido')
                .email('Debe ser un email válido'),

            password: Yup.string()
                .required('Campo requerido')
                .min(8, 'La contraseña debe tener al menos 8 caracteres')
                .matches(/(?=.*[0-9])/, 'La contraseña debe contener al menos un número')
                .matches(/(?=.*[A-Z])/, 'La contraseña debe contener al menos una letra mayúscula')
                .matches(/(?=.*[!@#$%^&*])/, 'La contraseña debe contener al menos un carácter especial'),

            confirmPassword: Yup.string()
                .required('Campo requerido')
                .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
        }),
    }
    );

    if (!isClient) {
        return <LoadingModal />;
    }


    return (
        <main className='h-screen overflow-y-auto lg:w-5/12 px-8 flex flex-col justify-center max-[640px]:px-6'>

            <div className='bg-white px-10 pt-6 rounded-md border max-[640px]:px-6 dark:bg-[#262f3a]'>
                <h2 className='text-center'>Registro</h2>
                <p className='my-5 ml-1'>Si eres nuevo llena el siguiente formulario para registrarte.</p>

                <form
                    noValidate
                    onSubmit={handleSubmit}
                    autoComplete="off">

                    <div>
                        <input
                            type='text'
                            placeholder='Nombres'
                            className="w-full rounded-md py-2.5 px-4 mt-5 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                            {...getFieldProps('firstName')} />

                        {(touched.firstName && errors.firstName) && <p className='error-message animate__animated animate__fadeIn'>{errors.firstName}</p>}
                    </div>

                    <div>
                        <input
                            type='text'
                            placeholder='Apellidos'
                            className="w-full rounded-md py-2.5 px-4 mt-5 border text-sm outline-[#7b7db0]dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                            {...getFieldProps('lastName')} />

                        {(touched.lastName && errors.lastName) && <p className='error-message animate__animated animate__fadeIn'>{errors.lastName}</p>}
                    </div>

                    <input
                        type='email'
                        placeholder='Correo'
                        className="w-full rounded-md py-2.5 px-4 mt-5 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                        {...getFieldProps('email')} />

                    {(touched.email && errors.email) && <p className='error-message animate__animated animate__fadeIn'>{errors.email}</p>}


                    <div className='relative'>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder='Contraseña'
                            className="w-full rounded-md py-2.5 px-4 mt-5 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                            {...getFieldProps('password')} />

                        {isPasswordVisible ?
                            <IoMdEye
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                size={18}
                                className='absolute right-5 top-8 cursor-pointer animate__animated animate__fadeIn' /> :

                            <IoMdEyeOff
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                size={18}
                                className='absolute right-5 top-8 cursor-pointer animate__animated animate__fadeIn' />
                        }
                    </div>

                    {(touched.password && errors.password) && <p className='error-message animate__animated animate__fadeIn'>{errors.password}</p>}

                    <div className='relative'>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder='Confirmar Contraseña'
                            className="w-full rounded-md py-2.5 px-4 mt-5 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                            {...getFieldProps('confirmPassword')} />

                        {isPasswordVisible ?
                            <IoMdEye
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                size={18}
                                className='absolute right-5 top-8 cursor-pointer animate__animated animate__fadeIn' /> :

                            <IoMdEyeOff
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                size={18}
                                className='absolute right-5 top-8 cursor-pointer animate__animated animate__fadeIn' />
                        }
                    </div>

                    {(touched.confirmPassword && errors.confirmPassword) && <p className='error-message animate__animated animate__fadeIn'>{errors.confirmPassword}</p>}

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

                    <p className='ml-1 my-5 text-center'>Si ya tienes cuenta, inicia sesión <Link href={'/login'} className='text-secondary-color dark:text-indigo-600'>Aquí</Link></p>


                    {formSubmitted && <p className='success-message animate__animated animate__fadeIn mt-6'>Login exitoso</p>}
                    {(formErrorSubmitted || recaptchaError) && <p className='error-message font-bold animate__animated animate__fadeIn'>{errorMessage}</p>}

                    <div className='mt-5 pb-6 pt-14'>
                        <Link
                            href={'/'}
                            className='flex items-center font-ligth hover:text-secondary-color dark:hover:text-indigo-600'>
                            <IoMdArrowRoundBack className='mr-1' />Regresa a Inicio
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default RegisterForm;