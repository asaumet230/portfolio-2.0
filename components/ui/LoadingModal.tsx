import React from 'react'
import Spinner from './Spinner';

export const LoadingModal = () => {
  return (
    <div className='flex flex-col justify-center items-center text-center w-3/12 mx-auto'>
      <span className='text-center mb-3 font-semibold'>Cargando...</span>
      <Spinner 
        width={'40'} 
        height={'40'} 
        color={'#111111'} />
    </div>
  )
}

export default LoadingModal;