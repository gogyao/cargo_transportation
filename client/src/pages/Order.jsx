import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Form, Schema } from 'rsuite'
import ShowSideNav from '../components/ShowSideNav'
import { store } from '..'

const { StringType } = Schema.Types

const model = Schema.Model({
  name: StringType().isRequired('Пожалуйста, введите имя'),
  email: StringType().isEmail('Введите корректный email').isRequired('Пожалуйста, введите email')
})

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [formError, setFormError] = useState({})

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  if (store.isLoading) {
    return <div>Загрузка...</div>
  }

  const handleFileDownload = () => {
    const fileUrl = '/info/Info DG v.3.pdf'
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = 'Info DG v.3.pdf'
    link.click()
  }

  const handleModalSubmit = () => {
    console.log('Данные отправлены:', formData)
    setIsModalOpen(false)
  }

  return (
    <div className="PApage" style={{ backgroundImage: 'url(/images/order.jpg)' }}>
    { (store.isAuth && <ShowSideNav/>) || <ShowSideNav/>}
    <div className="order">
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#fff' }}>Отправка вашего заказа</h2>
        <p style={{ color: '#fff', maxWidth: '600px' }}>
        Отправка вашего заказа
        Спасибо за выбор нашей службы грузоперевозок! Для оформления и отправки вашего груза, пожалуйста, заполните форму ниже. Убедитесь, что все данные указаны верно, чтобы избежать задержек в процессе доставки.
        </p>
        <p style={{ color: '#fff', maxWidth: '600px' }}>
        Шаг 1: Заполните данные о грузе
        Введите всю необходимую информацию о вашем грузе, включая тип товара, количество и место отправления. Важно указать точные данные, чтобы наш сервис мог точно рассчитать стоимость и сроки доставки.
        </p>
        <p style={{ color: '#fff', maxWidth: '600px' }}>
        Шаг 2: Ознакомьтесь с опасностями груза
        Если ваш груз относится к категории опасных товаров, пожалуйста, скачайте наш файл с перечнем всех возможных опасностей. Внимательно ознакомьтесь с условиями транспортировки.
        [Скачать файл с опасностями груза]
        </p>
        <p style={{ color: '#fff', maxWidth: '600px' }}>
        Шаг 3: Введите свои контактные данные
        Пожалуйста, укажите ваши контактные данные для связи, чтобы мы могли оперативно обработать ваш заказ и предупредить о возможных изменениях.
        </p>
        <p style={{ color: '#fff', maxWidth: '600px' }}>
        Шаг 4: Выберите дополнительные услуги
        Отметьте, если вам нужны дополнительные услуги (например, упаковка, страховка и другие).
        </p>
        <p style={{ color: '#fff', maxWidth: '600px' }}>
        Шаг 5: Отправьте заказ
        Когда все поля будут заполнены, нажмите кнопку Отправить, чтобы подтвердить заказ. Ваши данные будут обработаны, и мы свяжемся с вами для уточнения деталей.
        </p>
        <Button appearance="primary" onClick={handleFileDownload} style={{ marginRight: '10px' }}>
          Скачать файл с опасностями груза
        </Button>
        <Button appearance="default" onClick={() => setIsModalOpen(true)}>
          Открыть форму для отправки заказа
        </Button>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="Orderr">
        <Modal.Header>
          <Modal.Title>Заполните данные для отправки заказа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            model={model}
            formValue={formData}
            onChange={(value) => setFormData(value)}
            onCheck={(errors) => setFormError(errors)}
          >
            <Form.Group>
              <Form.ControlLabel>Имя</Form.ControlLabel>
              <Form.Control name="name" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Email</Form.ControlLabel>
              <Form.Control name="email" type="email" autoComplete="email" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Телефон</Form.ControlLabel>
              <Form.Control name="phone" type="integer" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Тип Опасности</Form.ControlLabel>
              <Form.Control name="type" type="string" />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel> Описание и Информация </Form.ControlLabel>
              <Form.Control name="info" type="string"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            appearance="primary"
            onClick={() => {
              if (Object.keys(formError).length === 0) {
                handleModalSubmit()
              } else {
                console.error('Ошибки формы:', formError)
              }
            }}
          >
            Отправить заказ
          </Button>
          <Button appearance="subtle" onClick={() => setIsModalOpen(false)}>
            Отмена
          </Button>
        </Modal.Footer>
        </div>
      </Modal>
    </div>
  )
}

export default observer(Order)
