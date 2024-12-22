import React, { useContext, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import { Button, ButtonToolbar, Form, Modal, Checkbox, Message, toaster } from 'rsuite'
import ShowSideNav from '../components/ShowSideNav'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showTerms, setShowTerms] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const { store } = useContext(Context)
  const navigate = useNavigate()

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
          Примите Условия пользования
        </Message>,
        { placement: 'topEnd' }
      )
      return
    }

    const response = await store.registration(email, password)
    if (localStorage.getItem('token')) {
      await handleLogin()
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
        <Form.Group>
          <Checkbox checked={termsAccepted} onChange={(_, checked) => setTermsAccepted(checked)}>
            Я принимаю <Button appearance="link" onClick={() => setShowTerms(true)}>Условия пользования</Button>
          </Checkbox>
        </Form.Group>
        <Form.Group>
          <ButtonToolbar>
            <Button appearance="primary" onClick={handleLogin}>Логин</Button>
            <Button appearance="default" onClick={handleRegistration}>Регистрация</Button>
          </ButtonToolbar>
        </Form.Group>
      </Form>
        <Modal open={showTerms} onClose={() => setShowTerms(false)} size="sm">
      <div className="CompanyPolicy" >
          <Modal.Header>
            <Modal.Title>Условия пользования</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>Политика конфиденциальности</h1>
            <p>Введение
            Настоящая Политика конфиденциальности (далее – Политика) описывает, как компания CargoTransportatioN (далее – Компания, мы, наш или нас) собирает, использует, передает и защищает ваши персональные данные, предоставленные через наш сайт грузоперевозок по миру .
            Мы понимаем важность обеспечения конфиденциальности и безопасности данных наших клиентов и гарантируем, что они будут обрабатываться в соответствии с действующим законодательством и правилами.
            </p>
            <p>
            1. Сбор персональных данных
            Мы можем собирать следующие типы персональных данных:
            Имя, фамилия, отчество;
            Контактные данные (номер телефона, адрес электронной почты);
            Адрес отправления и доставки грузов;
            Платежные данные (включая информацию о банковских картах или иных методах оплаты);
            Информация о грузе (размеры, вес, содержимое, стоимость);
            История заказов и взаимодействий с Сайтом;
            Техническая информация (IP-адрес, cookies, данные об устройстве и браузере).
            Мы собираем ваши данные только в случае, если вы добровольно предоставляете их, используя наш Сайт, регистрируясь на нем или оформляя заказ.
            </p>
            <p>
            2. Цели обработки данных
            Ваши персональные данные используются исключительно для следующих целей:
            Обработка и выполнение заказов на грузоперевозки;
            Обеспечение качественного обслуживания клиентов;
            Информирование о статусе заказа и предоставление обновлений;
            Выполнение юридических обязательств;
            Улучшение работы нашего Сайта и сервисов;
            Предоставление персонализированных предложений и рекламных материалов (только с вашего согласия).
            3. Передача данных третьим лицам
            Мы не передаем ваши данные третьим лицам, за исключением случаев, предусмотренных законодательством, а также для выполнения заказа, в том числе:
            Транспортным и логистическим партнерам для доставки грузов;
            Финансовым учреждениям для обработки платежей;
            Государственным органам по запросу в рамках законодательства.
            Во всех остальных случаях передача данных возможна только с вашего предварительного согласия.
            </p>
            <p>
            4. Безопасность данных
            Мы принимаем все необходимые меры для защиты ваших данных от несанкционированного доступа, утраты, изменения или распространения.
            В частности:
            Используем современные технологии шифрования данных;
            Ограничиваем доступ к данным только тем сотрудникам, которым это необходимо для выполнения их обязанностей;
            Регулярно обновляем наши системы безопасности.
            </p>
            <p>
            5. Ваши права
            Вы имеете следующие права в отношении ваших персональных данных:
            Получить доступ к вашим данным и получить копию информации, которую мы храним;
            Исправить или обновить ваши данные;
            Удалить ваши данные (при условии отсутствия юридических обязательств, требующих их сохранения);
            Ограничить обработку ваших данных или возразить против их обработки;
            Отозвать согласие на обработку данных в любой момент.
            Для реализации ваших прав вы можете связаться с нами по контактам, указанным в разделе Контакты.
            </p>
            <p>
            6. Использование файлов cookie
            Мы используем файлы cookie для улучшения работы Сайта. Cookie позволяют:
            Запоминать ваши предпочтения;
            Анализировать поведение на Сайте для его улучшения;
            Показывать релевантные рекламные материалы.
            Вы можете управлять настройками cookie в вашем браузере.
            </p>
            <p>
            7. Хранение данных
            Мы храним ваши данные только до тех пор, пока это необходимо для выполнения целей, указанных в Политике, или в рамках требований законодательства.
            </p>
            <p>
            8. Изменения в Политике
            Мы оставляем за собой право обновлять данную Политику. Все изменения будут опубликованы на этой странице, и мы рекомендуем вам регулярно проверять ее актуальность.
            </p>
            <p>
            9. Контакты
            Если у вас есть вопросы или запросы относительно обработки ваших данных, свяжитесь с нами:
            Электронная почта: [CargoTransportatioN@mail.ru]
            Телефон: +88005553535
            Адрес: г.Астана ул.Абая д.10 офис 15
            Мы ценим ваше доверие и делаем все возможное для обеспечения безопасности и конфиденциальности ваших данных.
            Дата последнего обновления: 22.12.2024.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { setTermsAccepted(true); setShowTerms(false) }} appearance="primary">
              Принять
            </Button>
            <Button onClick={() => { setTermsAccepted(false); setShowTerms(false) }} appearance="subtle">
              Отказаться
            </Button>
          </Modal.Footer>
      </div>
        </Modal>
    </div>
  )
}

export default observer(LoginForm)
