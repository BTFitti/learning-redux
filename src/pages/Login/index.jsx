import { useState } from 'react'; 
import styles from './login.module.css'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux';
import { createUser } from '../../redux/user/slice';

export function Login() {
  const dispatch = useDispatch();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  function handleLogin(e){
    e.preventDefault()
    if(name === "" || email === ""){
      alert("Envie os dados do usuário")
      return
    }
    dispatch(createUser({
      name: name,
      email: email,
    }))
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
          <Link to="/painel">
            <h1 className={styles.title}>Dev Login</h1>
          </Link>

          <form onSubmit={handleLogin} className={styles.form}>
            <input 
              type="text" 
              className={styles.input}
              value={name}
              onChange={ event => setName(event.target.value)}
              placeholder='Digite seu nome....'
            />
            <input 
              type="text" 
              className={styles.input}
              value={email}
              onChange={ event => setEmail(event.target.value)}
              placeholder='Digite seu email...'
            />

            <button type="submit">Acessar</button>
          </form>
      </main>
    </div>
  )
}
