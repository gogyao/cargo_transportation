import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { Button, ButtonToolbar, Form, Modal, Checkbox, Message, toaster } from 'rsuite'
import ShowSideNav from '../components/ShowSideNav'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showTerms, setShowTerms] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { store } = useContext(Context)
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogin = async () => {
    const response = await store.login(email, password)
    if (store.isAuth) {
      navigate('/auth/personalaccount')
    }
  }

  const handleRegistration = async () => {
    if (!termsAccepted) {
      toaster.push(
        <Message type="error" closable>
          {t('loginPage.errorMessage')}
        </Message>,
        { placement: 'topEnd' }
      )
    } else {
      const response = await store.registration(email, password)
      if (localStorage.getItem('token')) {
        await handleLogin()
      }
    }
  }

  return (
    <div className="loginDiv" style={{ backgroundImage: 'url(/images/PAbackground.png)' }}>
      <ShowSideNav />
      <Form>
        <Form.Group controlId="email">
          <Form.ControlLabel>Email</Form.ControlLabel>
          <Form.Control name="email" type="text" onChange={value => setEmail(value)} value={email} />
          <Form.HelpText tooltip>{t('loginPage.emailRequired')}</Form.HelpText>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.ControlLabel>Password</Form.ControlLabel>
          <Form.Control name="password" type="password" autoComplete="off" onChange={value => setPassword(value)} value={password} />
        </Form.Group>
        <Form.Group style={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            checked={termsAccepted}
            onChange={(_, checked) => setTermsAccepted(checked)}
            style={{ marginRight: '4px', fontSize: '14px', color: '#333' }}
          >
            <span style={{ fontSize: '14px', color: '#333' }}>{t('loginPage.iAccept')}</span>
          </Checkbox>
          <Button
            appearance="link"
            onClick={() => setShowTerms(true)}
            style={{
              fontSize: '14px',
              color: '#333',
              textDecoration: 'none',
              padding: 0,
              marginTop: 2
            }}
          >
            {t('loginPage.conditionsCaps')}
          </Button>
        </Form.Group>
        <Form.Group>
          <ButtonToolbar className='loginButton'>
            <Button appearance="primary" onClick={handleLogin}>{t('loginPage.login')}</Button>
            <Button appearance="default" onClick={handleRegistration}>{t('loginPage.registration')}</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
      <Modal open={showTerms} onClose={() => setShowTerms(false)} size="sm">
        <div className="CompanyPolicy" >
          <Modal.Header>
            <Modal.Title>{t('loginPage.conditions')}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='companyPolicyText' >
            <h1>{t('privacyPolicy.title')}</h1>
            <p>{t('privacyPolicy.introduction.line1')}<br />
            {t('privacyPolicy.introduction.line2')}<br />
            {t('privacyPolicy.introduction.line3')}<br />
            </p>
            <p>
            {t('privacyPolicy.dataCollection.title')}<br />
            {t('privacyPolicy.dataCollection.line1')}<br />
            {t('privacyPolicy.dataCollection.line2')}<br />
            {t('privacyPolicy.dataCollection.line3')}<br />
            {t('privacyPolicy.dataCollection.line4')}<br />
            {t('privacyPolicy.dataCollection.line5')}<br />
            {t('privacyPolicy.dataCollection.line6')}<br />
            {t('privacyPolicy.dataCollection.line7')}<br />
            {t('privacyPolicy.dataCollection.line8')}<br />
            {t('privacyPolicy.dataCollection.line9')}<br />
            </p>
            <p>
            {t('privacyPolicy.dataUsage.title')}<br />
            {t('privacyPolicy.dataUsage.line1')}<br />
            {t('privacyPolicy.dataUsage.line2')}<br />
            {t('privacyPolicy.dataUsage.line3')}<br />
            {t('privacyPolicy.dataUsage.line4')}<br />
            {t('privacyPolicy.dataUsage.line5')}<br />
            {t('privacyPolicy.dataUsage.line6')}<br />
            {t('privacyPolicy.dataUsage.line7')}<br />
            </p>
            <p>
            {t('privacyPolicy.dataSharing.title')}<br />
            {t('privacyPolicy.dataSharing.line1')}<br />
            {t('privacyPolicy.dataSharing.line2')}<br />
            {t('privacyPolicy.dataSharing.line3')}<br />
            {t('privacyPolicy.dataSharing.line4')}<br />
            {t('privacyPolicy.dataSharing.line5')}<br />
            </p>
            <p>
            {t('privacyPolicy.dataSecurity.title')}<br />
            {t('privacyPolicy.dataSecurity.line1')}<br />
            {t('privacyPolicy.dataSecurity.line2')}<br />
            {t('privacyPolicy.dataSecurity.line3')}<br />
            {t('privacyPolicy.dataSecurity.line4')}<br />
            {t('privacyPolicy.dataSecurity.line5')}<br />
            </p>
            <p>
            {t('privacyPolicy.userRights.title')}<br />
            {t('privacyPolicy.userRights.line1')}<br />
            {t('privacyPolicy.userRights.line2')}<br />
            {t('privacyPolicy.userRights.line3')}<br />
            {t('privacyPolicy.userRights.line4')}<br />
            {t('privacyPolicy.userRights.line5')}<br />
            {t('privacyPolicy.userRights.line6')}<br />
            {t('privacyPolicy.userRights.line7')}<br />
            </p>
            <p>
            {t('privacyPolicy.cookies.title')}<br />
            {t('privacyPolicy.cookies.line1')}<br />
            {t('privacyPolicy.cookies.line2')}<br />
            {t('privacyPolicy.cookies.line3')}<br />
            {t('privacyPolicy.cookies.line4')}<br />
            {t('privacyPolicy.cookies.line5')}<br />
            </p>
            <p>
            {t('privacyPolicy.dataRetention.title')}<br />
            {t('privacyPolicy.dataRetention.line1')}<br />
            </p>
            <p>
            {t('privacyPolicy.policyUpdates.title')}<br />
            {t('privacyPolicy.policyUpdates.line1')}<br />
            </p>
            <p>
            {t('privacyPolicy.contact.title')} <br />
            {t('privacyPolicy.contact.line1')}<br />
            {t('privacyPolicy.contact.line2')}<br />
            {t('privacyPolicy.contact.line3')}<br />
            {t('privacyPolicy.contact.line4')} <br />
            {t('privacyPolicy.contact.line5')}<br />
            {t('privacyPolicy.contact.line6')}
            </p>
          </Modal.Body>
          <Modal.Footer style={{ margin: 10 }}>
            <Button onClick={() => { setTermsAccepted(true); setShowTerms(false) }} appearance="primary">
            {t('loginPage.accept')}
            </Button>
            <Button onClick={() => { setTermsAccepted(false); setShowTerms(false) }} appearance="subtle">
            {t('loginPage.cancel')}
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  )
}

export default observer(LoginForm)
