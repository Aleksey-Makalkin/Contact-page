import React, {Component} from 'react'


import AuthorizationForm from '../AuthorizationForm/AuthorizationForm'
import CreateAccount from '../CreateAccount/CreateAccount'
import ContactPage from '../ContactPage/ContactPage'


export default class App extends Component {

    state = {
        isActive: 'AuthorizationForm',
        authorizationForm: {login: '', password: ''},
        createAccount: { login: '', password: '', contacts: [] },
        users: [
            {
                login: 'admin', password: '123', contacts: 
                [
                    {name: 'Алексей', lastName: 'Макалкин', phone: '79779543091', skype: 'live:.cid.b8981e561919a079', id: 1}
                ]
            }
        ],
        targetAccount: {},
        added: {name: '', lastName: '', phone: '', skype: ''},
        search: ''
    }

    inputLogin = (text) => {
        this.setState({
            authorizationForm: {
                login: text, 
                password: this.state.authorizationForm.password
            }
        })
    }

    inputPassword = (text) => {
        this.setState({
            authorizationForm: {
                login: this.state.authorizationForm.login, 
                password: text
            }
        })
    }

    toCome = () => {  
        this.setState(({users, authorizationForm}) => {
            const account = users.filter((el) => {
                if (el.login === authorizationForm.login && el.password === authorizationForm.password)
                    return true
                else return false
            })
            if (account.length !== 0)
                return {
                    isActive: 'ContactPage',
                    targetAccount: account[0]
                }
        })
    }

    urlCreate = () => {
        this.setState({
            isActive: 'CreateAccount'
        })
    }

    createLogin = (text) => {
        this.setState({
            createAccount: {
                login: text, 
                password: this.state.createAccount.password,
                contacts: this.state.createAccount.contacts
            }
        })
    }

    createPassword = (text) => {
        this.setState({
            createAccount: {
                login: this.state.createAccount.login, 
                password: text,
                contacts: this.state.createAccount.contacts
            }
        })
    }

    toCreate = () => {
        if (this.state.createAccount.login !== '' && this.state.createAccount.password !== '')
        this.setState(({users, createAccount}) => {
            return {
                users: [...users, createAccount],
                isActive: 'AuthorizationForm',
                createAccount: { login: '', password: '' }
            }
        })
    }

    inputName = (text) => {
        const newAdded = {...this.state.added}
        newAdded.name = text
        this.setState({
            added: newAdded
        })
    }

    inputLastName = (text) => {
        const newAdded = {...this.state.added}
        newAdded.lastName = text
        this.setState({
            added: newAdded
        })
    }

    inputPhone = (text) => {
        const newAdded = {...this.state.added}
        newAdded.phone = text
        this.setState({
            added: newAdded
        })
    }

    inputSkype = (text) => {
        const newAdded = {...this.state.added}
        newAdded.skype = text
        this.setState({
            added: newAdded
        })
    }

    newId = 100

    toAdd = () => {
        this.setState(({users, targetAccount, added}) => {
            const newUsers = [...users]
            const targetIndex = newUsers.findIndex((el) => el.login === targetAccount.login)
            this.newId++
            const newAdded = {...added}
            newAdded.id = this.newId
            newUsers[targetIndex].contacts.push(newAdded)
            return {
                users: newUsers,
                added: {name: '', lastName: '', phone: '', skype: ''}
            }
        })
    }

    onDel = (id) => {
        let newUsers = [...this.state.users]
        const targetIndex = newUsers.findIndex((el) => el.login === this.state.targetAccount.login)
        const newContacts = newUsers[targetIndex].contacts.filter((el) => el.id !== id)
        newUsers[targetIndex].contacts = newContacts
        this.setState({
            users: newUsers
        })
    }

    onExit = () => {
        this.setState({
            isActive: 'AuthorizationForm'
        })
    }

    onSearch = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    render() {
        const {isActive, added, targetAccount, search} = this.state
        let newTargetAccount = {...targetAccount}

        if (search !== '') {
            newTargetAccount.contacts = newTargetAccount.contacts.filter((el) => {
                if (el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                    return true
                else if (el.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                    return true
                else if (el.phone.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                    return true
                else if (el.skype.toLowerCase().indexOf(search.toLowerCase()) !== -1)
                    return true
                else return false
            })
        }
        
        if (isActive === 'AuthorizationForm')
            return <AuthorizationForm 
            inputLogin = { (text) => this.inputLogin(text.target.value) }
            inputPassword = { (text) => this.inputPassword(text.target.value) }
            toCome = { this.toCome }
            urlCreate = { this.urlCreate } />

        else if (isActive === 'CreateAccount')
            return <CreateAccount
            createLogin = { (text) => this.createLogin(text.target.value) }
            createPassword = { (text) => this.createPassword(text.target.value) }
            toCreate = { this.toCreate } />

        else if (isActive === 'ContactPage')
            return <ContactPage date = { newTargetAccount }
            inputName = { (text) => this.inputName(text.target.value) }
            inputLastName = { (text) => this.inputLastName(text.target.value) }
            inputPhone = { (text) => this.inputPhone(text.target.value) }
            inputSkype = { (text) => this.inputSkype(text.target.value) }
            toAdd = { this.toAdd }
            form = { added }
            onDel = { (id) => this.onDel(id) }
            onExit = { this.onExit }
            onSearch = { this.onSearch } />
    }
}