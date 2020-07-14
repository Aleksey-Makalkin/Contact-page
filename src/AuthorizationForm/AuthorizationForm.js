import React from 'react'


import './AuthorizationForm.css'


const AuthorizationForm = ({inputLogin, inputPassword, toCome, urlCreate, urlRestore}) => {
    return (
        <div className='AuthorizationForm'>
            <h1>Авторизация</h1>
            <form onSubmit = { (event) => {
                event.preventDefault() 
                toCome()
            } }>
                <input placeholder='Логин' onChange = { inputLogin } />
                <input type='password' placeholder='Пароль' onChange = { inputPassword } />
                <input type='submit' value='Войти' />
            </form>
            <input type='button' value='Создать аккаунт' onClick = { urlCreate } />
        </div>        
    )
}


export default AuthorizationForm