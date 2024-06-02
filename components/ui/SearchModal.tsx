"use client"

import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './ui.module.css';

interface ISearchForm {
  term: string;
}

export const SearchModal = () => {

  const [ searchForm, setSearchForm ] = useState<ISearchForm>({
    term: '',
  });


  const handleSearchTerm = (e:ChangeEvent<HTMLInputElement>) => {

    setSearchForm({
      ...searchForm,
      [e.target.name]:e.target.value,
    });
  }

  const resetForm = () => {
    setSearchForm({
      term:''
    });
  }


  const onSubmitForm = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if(searchForm.term.trim().length <= 0) return; 
      console.log(searchForm.term);
      resetForm();
  }


  return (
    <div className={styles['search-modal']}>

      <div className='section'>

        <div>
          <p className='text-right text-white font-bold mb-14 cursor-pointer max-[640px]:text-sm'>Cerrar X</p>
        </div>
        <h2 className="text-white text-center text-2xl font-bold max-[640px]:text-lg">Estas buscando algo?</h2>

        <div className='w-8/12 mx-auto max-[920px]:w-11/12'>
          <form className='flex justify-between mt-10 max-[640px]:flex-col' onSubmit={onSubmitForm}>
            <input
              className='bg-transparent outline-none text-white text-xl tracking-wide flex-1 pl-3 border-b-2 transition-all ease-in-out focus:border-b-2 focus:border-b-secondary-color max-[640px]:text-sm max-[640px]:pl-1 max-[640px]:pb-2'
              type="text"
              name='term'
              value={searchForm.term}
              onChange={handleSearchTerm}
              placeholder='Escribe los que deseas buscar....' />
            <button

              type='submit'
              className={`border-none text-xl ml-2 py-2 px-6 text-white font-bold transition-all ease-in-out max-[640px]:mt-4 max-[640px]:ml-0 max-[640px]:text-lg ${styles['search-modal-button']}`}>Buscar</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default SearchModal;
;