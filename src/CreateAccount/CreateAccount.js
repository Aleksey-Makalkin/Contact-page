import React from 'react'


import './CreateAccount.css'


const CreateAccount = ({createLogin, createPassword, createColor, toCreate}) => {
    return (
        <form className='CreateAccount' onSubmit = { (event) => {
            event.preventDefault() 
            toCreate()
        } }>
            <h1>Создать аккаунт</h1>
            <input placeholder='Логин' onChange = { createLogin } />
            <input type='password' placeholder='Пароль' onChange = { createPassword } />
            <input type='submit' value='Создать' />
        </form>
    )
}


export default CreateAccount