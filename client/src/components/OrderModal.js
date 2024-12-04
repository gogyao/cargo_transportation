import React, { useState } from 'react'

function OrderModal ({ isOpen, onClose }) {
  const [cargoData, setCargoData] = useState({
    name: '', weight: '', dimensions: '', destination: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Order placed: ${JSON.stringify(cargoData)}`)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" required />
        <button type="submit">Order</button>
        <button type="button" onClick={onClose}>Close</button>
      </form>
    </div>
  )
}

export default OrderModal
