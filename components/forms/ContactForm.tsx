'use client'

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { GoogleReCaptchaCheckbox } from '@google-recaptcha/react';

import styles from './forms.module.css';

export const ContactForm = () => {


    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrorSubmitted, setFormErrorSubmitted] = useState(false);
    const [recaptchaToken, setRecaptchaToken] = useState('');

    const { handleSubmit, getFieldProps, errors, touched, isSubmitting, isValid } = useFormik({

        initialValues: {
            name: '',
            email: '',
            company: '',
            subject: '',
            message: '',
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            console.log(recaptchaToken);

            // try {

            //     const res = await fetch('https://formcarry.com/s/C95VcZVVvAm', {
            //         method: 'POST',
            //         headers: {
            //             'Accept': 'application/json',
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({
            //             name: values.name,
            //             email: values.email,
            //             company: values.company,
            //             subject: values.subject,
            //             message: values.message,
            //         }),
            //     });

            //     console.log(res);

            //     if (res.ok) {
            //         setFormSubmitted(true);
            //         resetForm();
            //         setTimeout(() => {
            //             setFormSubmitted(false);
            //         }, 8000);
            //     }

            // } catch (error) {
            //     console.log(error);
            //     setSubmitting(false);
            //     setFormErrorSubmitted(true);

            //     setTimeout(() => {
            //         setFormErrorSubmitted(false);
            //     }, 8000);
            // }

        },
        validationSchema: Yup.object({

            name: Yup.string()
                .required('Campo requerido')
                .max(15, 'Debe de tener máximo 15 caracteres')
                .min(2, 'Debe tener mínimo 2 caracteres'),

            email: Yup.string()
                .required('Campo requerido')
                .email('Debe de ser un email valido'),

            subject: Yup.string()
                .required('Campo requerido')
                .max(50, 'Debe de tener máximo 50 caracteres')
                .min(5, 'Debe tener mínimo 2 caracteres'),

            message: Yup.string()
                .required('Campo requerido')
                .max(1000, 'Debe de tener máximo 1000 caracteres')
                .min(5, 'Debe tener mínimo 2 caracteres'),
        })
    }
    );

    return (
        <form
            className="ml-auo space-y-4"
            noValidate
            onSubmit={handleSubmit}>

            <input
                type='text'
                placeholder='Nombre'
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0]"
                {...getFieldProps('name')} />

            {(touched.name && errors.name) && <p className={styles['error-message']}>{errors.name}</p>}

            <input
                type='text'
                placeholder='Empresa (opcional)'
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0]"
                {...getFieldProps('company')} />

            <input
                type='email'
                placeholder='Correo'
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0]"
                {...getFieldProps('email')} />

            {(touched.email && errors.email) && <p className={styles['error-message']}>{errors.email}</p>}

            <input
                type='text'
                placeholder='Asunto'
                className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0]"
                {...getFieldProps('subject')} />

            {(touched.subject && errors.subject) && <p className={styles['error-message']}>{errors.subject}</p>}

            <textarea
                placeholder='Mensaje'
                rows={6}
                className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#7b7db0]"
                {...getFieldProps('message')}></textarea>

            {(touched.message && errors.message) && <p className={styles['error-message']}>{errors.message}</p>}

            
            <div className='flex justify-center'>
                <GoogleReCaptchaCheckbox
                    action='submit'
                    onChange={(token: string) => {
                        console.log('paso por aquí')
                        setRecaptchaToken(token);
                        console.log(recaptchaToken);
                    }}
                />
            </div>

            <button
                disabled={isSubmitting || !isValid}
                type='submit'
                className='btn w-full disabled:bg-gray-400'>Enviar</button>

            {formSubmitted && <p className={styles['success-message']}>Tu mensaje fue envido con éxito</p>}
            {formErrorSubmitted && <p className={`${styles['error-message']} font-bold`}>Tu mensaje no pudo ser envido</p>}
        </form>
    )
}

export default ContactForm;