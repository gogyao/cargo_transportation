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
          <Form.HelpText tooltip>Email is required</Form.HelpText>
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
            {t('loginPage.conditions')}
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
            <Modal.Title>Условия пользования</Modal.Title>
          </Modal.Header>
          <Modal.Body className='companyPolicyText' >
            <h1>Политика конфиденциальности</h1>
            <p>Введение<br />
              Настоящая Политика конфиденциальности (далее – Политика) описывает, как компания CargoTransportatioN (далее – Компания, мы, наш или нас) собирает, использует, передает и защищает ваши персональные данные, предоставленные через наш сайт грузоперевозок по миру .<br />
              Мы понимаем важность обеспечения конфиденциальности и безопасности данных наших клиентов и гарантируем, что они будут обрабатываться в соответствии с действующим законодательством и правилами.<br />
            </p>
            <p>
              1. Сбор персональных данных<br />
              Мы можем собирать следующие типы персональных данных:<br />
              Имя, фамилия, отчество;<br />
              Контактные данные (номер телефона, адрес электронной почты);<br />
              Адрес отправления и доставки грузов;<br />
              Платежные данные (включая информацию о банковских картах или иных методах оплаты);<br />
              Информация о грузе (размеры, вес, содержимое, стоимость);<br />
              История заказов и взаимодействий с Сайтом;<br />
              Техническая информация (IP-адрес, cookies, данные об устройстве и браузере).<br />
              Мы собираем ваши данные только в случае, если вы добровольно предоставляете их, используя наш Сайт, регистрируясь на нем или оформляя заказ.<br />
            </p>
            <p>
              2. Цели обработки данных<br />
              Ваши персональные данные используются исключительно для следующих целей:<br />
              Обработка и выполнение заказов на грузоперевозки;<br />
              Обеспечение качественного обслуживания клиентов;<br />
              Информирование о статусе заказа и предоставление обновлений;<br />
              Выполнение юридических обязательств;<br />
              Улучшение работы нашего Сайта и сервисов;<br />
              Предоставление персонализированных предложений и рекламных материалов (только с вашего согласия).<br />
              3. Передача данных третьим лицам<br />
              Мы не передаем ваши данные третьим лицам, за исключением случаев, предусмотренных законодательством, а также для выполнения заказа, в том числе:<br />
              Транспортным и логистическим партнерам для доставки грузов;<br />
              Финансовым учреждениям для обработки платежей;<br />
              Государственным органам по запросу в рамках законодательства.<br />
              Во всех остальных случаях передача данных возможна только с вашего предварительного согласия.<br />
            </p>
            <p>
              4. Безопасность данных<br />
              Мы принимаем все необходимые меры для защиты ваших данных от несанкционированного доступа, утраты, изменения или распространения.<br />
              В частности:<br />
              Используем современные технологии шифрования данных;<br />
              Ограничиваем доступ к данным только тем сотрудникам, которым это необходимо для выполнения их обязанностей;<br />
              Регулярно обновляем наши системы безопасности.<br />
            </p>
            <p>
              5. Ваши права<br />
              Вы имеете следующие права в отношении ваших персональных данных:<br />
              Получить доступ к вашим данным и получить копию информации, которую мы храним;<br />
              Исправить или обновить ваши данные;<br />
              Удалить ваши данные (при условии отсутствия юридических обязательств, требующих их сохранения);<br />
              Ограничить обработку ваших данных или возразить против их обработки;<br />
              Отозвать согласие на обработку данных в любой момент.<br />
              Для реализации ваших прав вы можете связаться с нами по контактам, указанным в разделе Контакты.<br />
            </p>
            <p>
              6. Использование файлов cookie<br />
              Мы используем файлы cookie для улучшения работы Сайта. Cookie позволяют:<br />
              Запоминать ваши предпочтения;<br />
              Анализировать поведение на Сайте для его улучшения;<br />
              Показывать релевантные рекламные материалы.<br />
              Вы можете управлять настройками cookie в вашем браузере.<br />
            </p>
            <p>
              7. Хранение данных<br />
              Мы храним ваши данные только до тех пор, пока это необходимо для выполнения целей, указанных в Политике, или в рамках требований законодательства.<br />
            </p>
            <p>
              8. Изменения в Политике<br />
              Мы оставляем за собой право обновлять данную Политику. Все изменения будут опубликованы на этой странице, и мы рекомендуем вам регулярно проверять ее актуальность.<br />
            </p>
            <p>
              9. Контакты <br />
              Если у вас есть вопросы или запросы относительно обработки ваших данных, свяжитесь с нами:<br />
              Электронная почта: [CargoTransportatioN@mail.ru]<br />
              Телефон: +88005553535<br />
              Адрес: г.Астана ул.Абая д.10 офис 15 <br />
              Мы ценим ваше доверие и делаем все возможное для обеспечения безопасности и конфиденциальности ваших данных.<br />
              Дата последнего обновления: 22.12.2024.
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
