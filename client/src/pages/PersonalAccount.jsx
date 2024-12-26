import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../index'
import { observer } from 'mobx-react-lite'
import UserService from '../services/UserService'
import OrderService from '../services/OrderService'
import ShowSideNav from '../components/ShowSideNav'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EditIcon from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'
import CheckOutlineIcon from '@rsuite/icons/CheckOutline'
import CloseOutlineIcon from '@rsuite/icons/CloseOutline'

const PersonalAccount = () => {
  const { store } = useContext(Context)
  const [orders, setOrders] = useState([])
  const [editingOrder, setEditingOrder] = useState(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem('token')) {
          await store.checkAuth()
        }

        const userEmail = store.user.email

        const isAdmin = store.user.role === 'ADMIN'
        const response = isAdmin
          ? await UserService.fetchAllOrders()
          : await UserService.fetchOrder(userEmail)

        if (response?.data) {
          setOrders(response.data)
        } else {
          console.warn('No data or invalid response format')
          setOrders([])
        }
      } catch (e) {
        console.error('Error fetching orders:', e)
        setOrders([])
      }
    }

    fetchData()
  }, [store])

  const handleLogout = async () => {
    const response = await store.logout()
    if (!store.isAuth) {
      navigate('/')
    }
  }

  const handleDeleteOrder = async (orderId) => {
    const response = await OrderService.deleteOrder(orderId)
    setOrders(orders.filter(order => order.id !== orderId))
    console.log('Order deleted successfully')
  }

  const handleEditOrder = (order) => {
    setEditingOrder(order)
  }

  const handleSaveEdit = async () => {
    try {
      const response = await OrderService.editOrder(
        editingOrder.id,
        editingOrder.pickupLocation,
        editingOrder.deliveryLocation,
        editingOrder.description
      )

      if (response.success) {
        setOrders(orders.map(order =>
          order.id === editingOrder.id ? { ...order, ...editingOrder } : order
        ))
        setEditingOrder(null)
      } else {
        console.error('Failed to update order')
      }
    } catch (error) {
      console.error('Error saving order:', error)
    }
  }

  const handleCancelEdit = () => {
    setEditingOrder(null)
  }

  const changeOrderStatus = async (orderId, pickupLocation, deliveryLocation, description, status) => {
    const response = await OrderService.editOrder(orderId, pickupLocation, deliveryLocation, description, status)
    if (response.success) {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status } : order
      ))
      console.log(`Order ${orderId} status updated to ${status}`)
    }
  }

  if (store.isLoading) {
    return <div>{t('loading')}</div>
  }

  return (
    <div className="PApage" style={{ backgroundImage: 'url(/images/PApage.jpg)' }}>
      <ShowSideNav />
      {(store.user.role === 'USER')
        ? <div className='accountInfo'>
          <h1>{t('userInfo.title')}</h1>
          <h2>{`${t('userInfo.email')}: ${store.user.email}`}</h2>
          <h2>{`${t('userInfo.role')}: ${store.user.role}`}</h2>
          <h2>{t('userInfo.authStatus')}: {store.isAuth ? <span style={{ color: 'green' }}>{t('userInfo.authenticated')}</span> : <span style={{ color: 'red' }}>{t('userInfo.notAuthenticated')}</span>} </h2>
          <h2>Активация: {store.user.isActivated ? <span style={{ color: 'green' }}>{t('userInfo.activated')}</span> : <span style={{ color: 'red' }}>{t('userInfo.notActivated')}</span>}</h2>
          {(store.isAuth) ? <button className='logout' onClick={handleLogout}>{t('logout')}</button> : ''}
        </div>
        : null}

      <div className='orderInfo'>
        {store.user.role === 'USER'
          ? (
            <>
              <h1>{t('order.checklist')}</h1>
              {orders.length > 0
                ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Pickup Location</th>
                        <th>Delivery Location</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(order => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>
                            {editingOrder?.id === order.id
                              ? (
                                <input
                                  type="text"
                                  value={editingOrder.pickupLocation}
                                  onChange={(e) =>
                                    setEditingOrder({ ...editingOrder, pickupLocation: e.target.value })
                                  }
                                />
                                )
                              : (
                                  order.pickupLocation
                                )}
                          </td>
                          <td>
                            {editingOrder?.id === order.id
                              ? (
                                <input
                                  type="text"
                                  value={editingOrder.deliveryLocation}
                                  onChange={(e) =>
                                    setEditingOrder({ ...editingOrder, deliveryLocation: e.target.value })
                                  }
                                />
                                )
                              : (
                                  order.deliveryLocation
                                )}
                          </td>
                          <td>
                            {editingOrder?.id === order.id
                              ? (
                                <input
                                  type="text"
                                  value={editingOrder.description}
                                  onChange={(e) =>
                                    setEditingOrder({ ...editingOrder, description: e.target.value })
                                  }
                                />
                                )
                              : (
                                  order.description
                                )}
                          </td>
                          <td>{order.price}₸</td>
                          <td
                            style={{
                              color: order.status === 'одобрен' ? 'green' : order.status === 'отклонен' ? 'red' : 'black'
                            }}
                          >
                            {order.status}
                          </td>
                          <td>
                            {editingOrder?.id === order.id
                              ? (
                                <>
                                  <button
                                    className='btn'
                                    style={{ marginBottom: 3 }}
                                    onClick={handleSaveEdit}
                                  >
                                    Save
                                  </button>
                                  <button className='btn' onClick={handleCancelEdit}>
                                    Cancel
                                  </button>
                                </>
                                )
                              : (
                                <EditIcon onClick={() => handleEditOrder(order)} />
                                )}
                          </td>
                          <td>
                            <TrashIcon onClick={() => handleDeleteOrder(order.id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  )
                : (
                  <p>Заказов нет</p>
                  )}
            </>
            )
          : (
              (
              <>
                <h1>Список заказов</h1>
                {orders.length > 0
                  ? (
                    <table >
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>PhoneNumber</th>
                          <th>Pickup Location</th>
                          <th>Delivery Location</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.email}</td>
                            <td>{order.phoneNumber}</td>
                            <td>{order.pickupLocation}</td>
                            <td>{order.deliveryLocation}</td>
                            <td>{order.description}</td>
                            <td>{order.price}₸</td>
                            <td
                              style={{
                                color: order.status === 'одобрен' ? 'green' : order.status === 'отклонен' ? 'red' : 'black'
                              }}
                            >
                              {order.status}
                            </td>
                            <td><CheckOutlineIcon onClick={() => changeOrderStatus(order.id, order.pickupLocation, order.deliveryLocation, order.description, 'одобрен')}
                              style={{ cursor: 'pointer', color: 'green' }} /></td>
                            <td><CloseOutlineIcon onClick={() => changeOrderStatus(order.id, order.pickupLocation, order.deliveryLocation, order.description, 'отклонен')}
                              style={{ cursor: 'pointer', color: 'red' }} /></td>
                            <td><TrashIcon onClick={() => handleDeleteOrder(order.id)} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    )
                  : (
                    <p>Нет заказов</p>
                    )}
              </>
              )
            )}
      </div>
    </div>
  )
}

export default observer(PersonalAccount)
