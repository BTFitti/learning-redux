import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  //reducers - definir quais ações para atualizar o estado inicial (neste exemplo são os dados do usuário)
  reducers: {
    //na função anônima do reducer voce tem 2 propriedades, o estado inicial que temos, e action eu posso receber qual o tipo dela e o payload - payload é qual os itens que eu vou mandar
    createUser: (state, action) => {
      //oque acontece aqui é que estou recebendo oque está sendo digitado na pagina de login através do dispatch e colocando dentro da propriedade user do slice +
      //através do payload, lembrando que o payload é a "carga" ele recebe os dados e eles ficam armazenados nele

      return {
        ...state, //manter tudo oque ja tem e alterar oque eu quero em seguida.
        user: {
          //alterando a propriedade user adicionando um nome, email e address, mudei o estado inicial que era nulo para esses dados obtidos através do login
          name: action.payload.name,
          email: action.payload.email,
          address: null
        },
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        user: null,
      };
    },
  },
});
//exportando a action criada
export const { createUser, logoutUser, deleteAddress } = userSlice.actions;
export default userSlice.reducer;
