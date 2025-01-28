import { useState } from "react";
import styles from "./address.module.css";
import { Header } from "../../components/header";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress } from "../../redux/user/slice";

export function Address() {
  const { user } = useSelector((rootReducer) => rootReducer.user);
  //os dois pontos de interrogação significam que se a parte da esquerda dele nao for nula, retorna ela, caso contrário, retorna o que tem a direita dele ou seja "" +
  //então os campos da useState se já existirem (ja foram cadastrados) vão aparecer nos inputs, caso não existam, aparece uma string vazia e o placeholder aparece.
  const [addressName, setAddressName] = useState(user?.address?.location ?? "");
  const [addressNumber, setAddressNumber] = useState(
    user?.address?.number ?? ""
  );

  const dispatch = useDispatch();

  function handleRegisterAddress() {
    dispatch(
      addAddress({
        location: addressName,
        number: addressNumber,
      })
    );
  }
  function handleDeleteAddress() {
    dispatch(deleteAddress());
    setAddressName("")
    setAddressNumber("")
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.content}>
          <div>
            <Link to="/painel">Voltar para o painel</Link>
            {user?.address?.location && (
              <button
                className={styles.buttonDelete}
                onClick={handleDeleteAddress}
              >
                Deletar endereço
              </button>
            )}
          </div>

          <section className={styles.address}>
            <h2>Meu endereço:</h2>

            <input
              type="text"
              className={styles.input}
              placeholder="Ex: Rua centro, x"
              value={addressName}
              onChange={(e) => setAddressName(e.target.value)}
            />
            <input
              type="text"
              className={styles.input}
              placeholder="Numero"
              value={addressNumber}
              onChange={(e) => setAddressNumber(e.target.value)}
            />

            <button className={styles.button} onClick={handleRegisterAddress}>
              Salvar Alteração
            </button>
          </section>
        </main>
      </div>
    </>
  );
}
