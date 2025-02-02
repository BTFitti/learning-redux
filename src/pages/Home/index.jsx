import styles from "./home.module.css";
import { Header } from "../../components/header";
import { Link } from "react-router-dom";
//useSelector para consumir o reducer
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteAddress, fetchUserById, fetchUsers } from "../../redux/user/slice";
export function Home() {
  
  const { user, users, loading, didntFetch, errorMessage } = useSelector((rootReducer) => rootReducer.user); //consumindo os dados alterados que vem através do dispatch
  const dispatch = useDispatch();


  function handleDeleteAddress() {
    dispatch(deleteAddress())
  }
  function handleFetchUsers(){
    dispatch(fetchUsers())
  }
  function handleFetchUsersById(){
    const userId = 5;
    dispatch(fetchUserById(userId))
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Login
          </Link>

          <Link to="/painel" className={styles.link}>
            Painel
          </Link>
          <Link to="/address" className={styles.link}>
            Meus endereços
          </Link>
        </nav>

        <main className={styles.content}>
          <div className={styles.message}>
            {/* como já estou pegando os dados do usuário através do userReducer, eu consigo acessar por exemplo o user.name*/}
            <h1 className={styles.title}>
              Olá {user ? user.name : "Visitante"}, bem vindo!
            </h1>

            {user && <span>Email: {user.email}</span>}

            {user && user.address && (
              <>
                <strong className={styles.addressLabel}>Endereço atual:</strong>
                <div className={styles.address}>
                  <p>{user.address.location}, Nº {user.address.number}</p>

                  <button onClick={handleDeleteAddress}>
                    Deletar endereço
                  </button>
                </div>
              </>
            )}
            <hr />
            <br />
            <h2>Lista de usuários</h2>
            <button onClick={handleFetchUsers}>Buscar usuários</button>
            <button onClick={handleFetchUsersById}>Buscar usuário com ID</button>
            <br />
            {loading && <strong>Carregando usuários...</strong>}
            {didntFetch && <strong>Ocorreu um erro ao buscar os usuários, tente novamente! <br/>{errorMessage}</strong>}
            {!loading && users.map((user)=>(
              <div key={user.id}>
                <p>ID: {user.id} | {user.name}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
