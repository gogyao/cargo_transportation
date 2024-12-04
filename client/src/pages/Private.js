import React, { useState } from 'react'
import OrderModal from '../components/OrderModal'

function Private () {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <h2>Частным лицам</h2>
      <button onClick={openModal}>Сделать заказ</button>
      <OrderModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Private
