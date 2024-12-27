import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Form, Schema } from 'rsuite'
import ShowSideNav from '../components/ShowSideNav'
import { store } from '..'
import OrderService from '../services/OrderService'
import { useTranslation } from 'react-i18next'

const { StringType } = Schema.Types

const model = Schema.Model({
  name: StringType().isRequired('Пожалуйста, введите имя'),
  email: StringType().isEmail('Введите корректный email').isRequired('Пожалуйста, введите email')
})

const Order = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: null,
    dangerType: null,
    pickupLocation: '',
    deliveryLocation: '',
    description: '',
    price: null
  })
  const [formError, setFormError] = useState({})
  const { t } = useTranslation()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store])

  useEffect(() => {
    if (store.user?.email) {
      setFormData((prevData) => ({
        ...prevData,
        email: store.user.email
      }))
    }
  }, [store.user])

  if (store.isLoading) {
    return <div>{t('loading')}</div>
  }

  const handleFileDownload = () => {
    const fileUrl = '/info/Info DG v.3.pdf'
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = 'Info DG v.3.pdf'
    link.click()
  }

  const handleModalSubmit = async () => {
    if (Object.keys(formError).length === 0) {
      try {
        const response = await OrderService.addOrderButton(formData)
        console.log('Данные успешно отправлены:', response)
        setIsModalOpen(false)
      } catch (error) {
        console.error('Ошибка при отправке данных:', error.response?.data?.message || error.message)
      }
    } else {
      console.error('Ошибки формы:', formError)
    }
  }

  const priceCalc = (distance, dangerType, volume) => {
    const distanceRate = distance > 1000 ? 0.05 : 0.1
    const dangerRate = dangerType < 3 ? 1 : dangerType < 6 ? 1.5 : 2
    const volumeRate = volume <= 5 ? 50 : volume <= 20 ? 100 : 150
    const basePrice = 10000
    const price = basePrice + (distance * distanceRate) + (dangerType * dangerRate) + (volume * volumeRate)

    return price
  }

  const handleCalculatePrice = () => {
    const price = priceCalc(formData.distance, formData.dangerType, formData.volume)
    setFormData((prevData) => ({
      ...prevData,
      price
    }))
  }

  return (
    <div className="PApage" style={{ backgroundImage: 'url(/images/order.jpg)' }}>
      {(store.isAuth && <ShowSideNav />) || <ShowSideNav />}
      <div className="order">
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: '#fff' }}>{t('order.title')}</h2>
          <p style={{ color: '#fff', maxWidth: '600px' }}>
            {t('order.thank')}
          </p>
          <p style={{ color: '#fff', maxWidth: '600px' }}>
            {t('order.step1')}
            {t('order.description1')}
          </p>
          <p style={{ color: '#fff', maxWidth: '600px' }}>
            {t('order.step2')}
            {t('order.description2')}
          </p>
          <p style={{ color: '#fff', maxWidth: '600px' }}>
            {t('order.step3')}
            {t('order.description3')}
          </p>
          <p style={{ color: '#fff', maxWidth: '600px' }}>
            {t('order.step4')}
            {t('order.description4')}
          </p>
          <p style={{ color: '#fff', maxWidth: '600px' }}>
            {t('order.step5')}
            {t('order.description5')}
          </p>
          <div className='orderButtons'>
            <Button appearance="primary" onClick={handleFileDownload} style={{ marginRight: '10px' }}>
              {t('order.downloadFile')}
            </Button>
            {(store.user.role !== 'ADMIN')
              ? <Button appearance="default" onClick={() => setIsModalOpen(true)}>
                {t('order.openForm')}
              </Button>
              : <p style={{ marginTop: 6 }}>{t('order.adminForm')}</p>}
          </div>
        </div>
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="Orderr">
          <Modal.Header>
            <Modal.Title>{t('order.formTitle')}</Modal.Title>
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
                <Form.ControlLabel>{t('order.name')}</Form.ControlLabel>
                <Form.Control name="name" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>{t('order.email')}</Form.ControlLabel>
                <Form.Control name="email" type="email" autoComplete="email" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>{t('order.phone')}</Form.ControlLabel>
                <Form.Control name="phoneNumber" type="integer" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>{t('order.dangerType')}</Form.ControlLabel>
                <Form.Control name="dangerType" type="string" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>{t('order.distance')}</Form.ControlLabel>
                <Form.Control name="distance" type="string" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>{t('order.volume')}</Form.ControlLabel>
                <Form.Control name="volume" type="string" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>{t('order.pickupLocation')}</Form.ControlLabel>
                <Form.Control name="pickupLocation" type="string" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>{t('order.deliveryLocation')}</Form.ControlLabel>
                <Form.Control name="deliveryLocation" type="string" />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel> {t('order.description')} </Form.ControlLabel>
                <Form.Control name="description" type="string" />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ paddingTop: 20, color: 'white' }}>
              {(formData.price === null) ? <Button onClick={handleCalculatePrice}>{t('order.calculatePrice')}</Button> : <span>{t('order.price')} {`${priceCalc(formData.distance, formData.dangerType, formData.volume)}`}₸</span>}
            </div>
            <div style={{ paddingTop: 20 }}>
            {(formData.price)
              ? <Button
                appearance="primary"
                onClick={() => {
                  if (Object.keys(formError).length === 0) {
                    handleModalSubmit()
                  } else {
                    console.error('Ошибки формы:', formError)
                  }
                }}
              >
                {t('order.submitOrder')}
              </Button>
              : null}
              <Button appearance="subtle" onClick={() => setIsModalOpen(false)}>
                {t('order.cancel')}
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  )
}

export default observer(Order)
