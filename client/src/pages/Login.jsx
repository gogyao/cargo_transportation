import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { Button, ButtonToolbar, Form } from 'rsuite'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { store } = useContext(Context)

  return (
        <div className='loginDiv' style={{ backgroundImage: 'url(/images/PAbackground.png)' }}>
            <Form>
                <Form.Group controlId="email">
                    <Form.ControlLabel>Email</Form.ControlLabel>
                    <Form.Control name="email" type="text" onChange={value => setEmail(value)} value={email} />
                    <Form.HelpText tooltip>Email is required</Form.HelpText>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.ControlLabel>Password</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" onChange={value => setPassword(value)} value={password} />
                </Form.Group>
                <Form.Group>
                    <ButtonToolbar>
                        <Button appearance="primary" onClick={() => store.login(email, password)}>Логин</Button>
                        <Button appearance="default" onClick={() => store.registration(email, password)}>Регистрация</Button>
                    </ButtonToolbar>
                </Form.Group>
            </Form>
        </div>
  )
}

export default observer(LoginForm)
