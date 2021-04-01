import React, { useContext } from 'react'
import { FiAlertTriangle } from "react-icons/fi"

import AlertContext from '../context/alert/alertContext'
import { Alert } from './styles/Alert'

const Alerts = () => {
  const alertContext = useContext(AlertContext)

  return (
    <Alert>
      { alertContext.alerts.length > 0 && alertContext.alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          <FiAlertTriangle /> {alert.msg}
        </div>
      ))}
    </Alert>
  )
}

export default Alerts
