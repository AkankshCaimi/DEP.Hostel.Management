import React from 'react'
import { useAuth } from '../contexts/authContext'
function Test() {
  const {currentUser}=useAuth();
  // axios.get('http://localhost:8000/api/onlyadmin', {withCredentials: true})
  // .then((res) => {
  //   console.log(res)
  // })
  // .catch((err) => {
  //   console.log(err)
  // })
  console.log(currentUser)
  return (
    <div>Test</div>
  )
}

export default Test