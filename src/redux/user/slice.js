import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  users: [],
  loading: false,
  didntFetch: false,
  errorMessage: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  //reducers - definir quais ações para atualizar o estado inicial (neste exemplo são os dados do usuário)
  reducers: {
    //na função anônima do reducer voce tem 2 propriedades, o estado inicial que temos, e action eu posso receber qual o tipo dela e o payload - payload é qual os itens que eu vou mandar
    createUser: (state, action) => {
      if (action.payload.name.length <= 4) {
        alert("Preencha um nome com mais de 4 letras!");
        return { ...state };
      }
      //oque acontece aqui é que estou recebendo oque está sendo digitado na pagina de login através do dispatch e colocando dentro da propriedade user do slice +
      //através do payload, lembrando que o payload é a "carga" ele recebe os dados e eles ficam armazenados nele
      return {
        ...state, //manter tudo oque ja tem e alterar oque eu quero em seguida.
        user: {
          //alterando a propriedade user adicionando um nome, email e address, mudei o estado inicial que era nulo para esses dados obtidos através do login
          name: action.payload.name,
          email: action.payload.email,
          address: null,
        },
      };
    },
    logoutUser: (state) => {
      return {
        ...state,
        user: null,
      };
    },
    addAddress: (state, action) => {
      if (action.payload.location === "" || action.payload.number === "") {
        alert("Preencha todos os campos!");
        return { ...state };
      }
      if (state.user === null) {
        alert("Faça o login para cadastrar o endereço!");
        return { ...state };
      }
      return {
        ...state,
        user: {
          ...state.user,
          address: {
            //pegando o que for enviado no formulario de endereço e colocando dentro de um objeto do user chamado address
            location: action.payload.location,
            number: action.payload.number,
          },
        },
      };
    },
    deleteAddress: (state) => {
      return {
        ...state,
        user: {
          ...state.user, //para manter os dados do usuário e atualizar apenas o endereço, usa o spread operator no user porque se nao ele vai dar como vazio.
          address: null,
        },
      };
    },
    fetchUsers: (state) => {
      state.loading = true;
    },
    fetchUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure: (state, action) => {
      console.log(action.payload);
      state.errorMessage = action.payload
      state.loading = false;
      state.didntFetch = true;
    },
    fetchUserById: (state) => {
      console.log("Slice chamado");
    },
    fetchUserByIdSuccess: (state,action) => {
      console.log(`User do id ${action.payload.id}`);
      console.log(`Cujo nome é: ${action.payload.name}`);
      
      
    },
    fetchUserByIdFailure: (state, action) => {
      console.log("Error no fetchById");
    },
  },
});
//exportando a action criada
export const {
  createUser,
  logoutUser,
  deleteAddress,
  addAddress,
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserById,
  fetchUserByIdFailure,
  fetchUserByIdSuccess,
} = userSlice.actions;
export default userSlice.reducer;
