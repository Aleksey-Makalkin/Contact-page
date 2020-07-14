import React from 'react'


import './ContactPage.css'


const ContactPage = ({date: {contacts}, inputName, inputLastName, inputPhone, inputSkype, toAdd, form, onDel, onExit, onSearch}) => {
    const contacItem = contacts.map((el) => {
        return (
        <li key = { el.id }>
            <span>
                <span>{el.name} {el.lastName}</span><span>Телефон: {el.phone}</span><span>Skype: {el.skype}</span>
            </span>
            <div>
                <div onClick = { () => onDel(el.id) }>DEL</div>
            </div>
        </li>
        )
    })
    return (
        <div className='ContactPage'>
            <p onClick = { onExit }>Выйти</p>
            <h1>Список контактов</h1>
            <input placeholder='Поиск' onChange = { onSearch } />
            <ul>
                {contacItem}
            </ul>
            <form onSubmit = { (event) => {
                event.preventDefault() 
                toAdd()
            } }>
                <input placeholder='Имя' onChange = { inputName } value = { form.name } />
                <input placeholder='Фамилия' onChange = { inputLastName } value = { form.lastName } />
                <input placeholder='Телефон' onChange = { inputPhone } value = { form.phone } />
                <input placeholder='Skype' onChange = { inputSkype } value = { form.skype } />
                <input type='submit' value='Добавить' /> 
            </form>
        </div>
    )
}


export default ContactPage