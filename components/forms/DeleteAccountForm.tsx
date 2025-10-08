'use client'

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { LoadingModal, Spinner } from '../ui';
import { revalidateRecaptcha } from '@/helpers';

import 'animate.css';
import styles from './forms.module.css';

interface DeleteAccountFormProps {
    projectName: string;
}

export const DeleteAccountForm = ({ projectName }: DeleteAccountFormProps) => {

    const [isClient, setIsClient] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formErrorSubmitted, setFormErrorSubmitted] = useState(false);
    const [recaptchaError, setRecaptchaError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { executeRecaptcha } = useGoogleReCaptcha();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const { handleSubmit, getFieldProps, errors, touched, isSubmitting, isValid } = useFormik({

        initialValues: {
            name: '',
            email: '',
            reason: '',
            message: '',
        },
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            if (!executeRecaptcha) {

                setRecaptchaError(true);
                setErrorMessage('Recaptcha is not available to execute');

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

                const res = await fetch('https://formcarry.com/s/C95VcZVVvAm', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        company: `${projectName} - DELETE ACCOUNT REQUEST`,
                        subject: `🚨 ACCOUNT DELETION REQUEST - ${projectName}`,
                        message: `🚨🚨🚨 ACCOUNT DELETION REQUEST 🚨🚨🚨

                        Project: ${projectName}
                        User Name: ${values.name}
                        User Email: ${values.email}
                        Reason for Deletion: ${values.reason}
                                            
                        Additional Information:
                        ${values.message || 'No additional information provided'}
                                            
                        ⚠️ ACTION REQUIRED: Please process this account deletion request within 48 hours.`,
                    }),
                });

                const responseData = await res.json();
               
                if (res.ok) {
                    
                    setFormSubmitted(true);
                    resetForm();
                    setTimeout(() => {
                        setFormSubmitted(false);
                    }, 8000);
                } else {
                  
                    setFormErrorSubmitted(true);
                    setErrorMessage(responseData.message || 'Submission failed. Please try again.');
                    setTimeout(() => {
                        setFormErrorSubmitted(false);
                        setErrorMessage('');
                    }, 8000);
                }

            } catch (error) {
                setSubmitting(false);
                setFormErrorSubmitted(true);
                setErrorMessage('Your request could not be submitted. Please try again.');

                setTimeout(() => {
                    setFormErrorSubmitted(false);
                    setErrorMessage('');
                }, 8000);
            }

        },
        validationSchema: Yup.object({

            name: Yup.string()
                .required('Name is required')
                .max(50, 'Must be 50 characters or less')
                .min(2, 'Must be at least 2 characters'),

            email: Yup.string()
                .required('Email is required')
                .email('Must be a valid email address'),

            reason: Yup.string()
                .required('Reason is required')
                .min(5, 'Must be at least 5 characters'),

            message: Yup.string()
                .max(1000, 'Must be 1000 characters or less'),
        })
    }
    );

    if (!isClient) {
        return <LoadingModal />;
    }

    return (
        <main>
            <form
                className="ml-auto space-y-4"
                noValidate
                onSubmit={handleSubmit}>

                <input
                    type='text'
                    placeholder='Full Name'
                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                    {...getFieldProps('name')} />

                {(touched.name && errors.name) && <p className={`${styles['error-message']} animate__animated animate__fadeIn`}>{errors.name}</p>}

                <input
                    type='email'
                    placeholder='Email Address (associated with your account)'
                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                    {...getFieldProps('email')} />

                {(touched.email && errors.email) && <p className={`${styles['error-message']} animate__animated animate__fadeIn`}>{errors.email}</p>}

                <input
                    type='text'
                    placeholder='Reason for deletion (e.g., No longer needed, Privacy concerns)'
                    className="w-full rounded-md py-2.5 px-4 border text-sm outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                    {...getFieldProps('reason')} />

                {(touched.reason && errors.reason) && <p className={`${styles['error-message']} animate__animated animate__fadeIn`}>{errors.reason}</p>}

                <textarea
                    placeholder='Additional information (optional)'
                    rows={6}
                    className="w-full rounded-md px-4 border text-sm pt-2.5 outline-[#7b7db0] dark:bg-slate-200 dark:text-gray-700 dark:placeholder:text-gray-600 dark:outline-indigo-600"
                    {...getFieldProps('message')}></textarea>

                {(touched.message && errors.message) && <p className={`${styles['error-message']} animate__animated animate__fadeIn`}>{errors.message}</p>}

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ By submitting this form, you confirm that you want to permanently delete your account and understand that this action cannot be undone.
                    </p>
                </div>

                <button
                    disabled={isSubmitting || !isValid}
                    type='submit'
                    className='mt-10 btn w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'>{

                        isSubmitting ?
                            <div className='w-full flex items-center justify-center animate__animated animate__fadeIn'>
                                <Spinner
                                    width={'20'}
                                    height={'20'}
                                    color={'#ffffff'} />

                                <p className='ml-2'>Submitting Request...</p>
                            </div> : <p className='animate__animated animate__fadeIn'>Submit Deletion Request</p>

                    }
                </button>

                {formSubmitted && <p className={`${styles['success-message']} animate__animated animate__fadeIn`}>Your account deletion request has been submitted successfully. We will process it within 48 hours.</p>}
                {(formErrorSubmitted || recaptchaError) && <p className={`${styles['error-message']} font-bold animate__animated animate__fadeIn`}>{errorMessage}</p>}
            </form>
        </main>
    )
}

export default DeleteAccountForm;
