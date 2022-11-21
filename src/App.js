/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

export function App() {
  const [modalIncluir,setModalIncluir] = useState(false)
  const [modalExcluir, setModalExcluir] = useState(false)
  const [modalEditar,setModalEditar] = useState(false)
  const [dados,setDados] = useState([])
  const [updateDados,setUpdateDados] = useState(true)
  const [usuarioSelecionado,setUsuarioSelecionado] = useState({
    id: '',
    nome: '',
    sobreNome:'',
    email: '',
    telefone:''
  })

const url = 'https://localhost:44312/api/dados'

  useEffect(()=>{
    if(updateDados){
      GetData();
        setUpdateDados(false);
    }
  },[updateDados])

  const GetData = async() =>{
    await axios.get(url)
    .then(response => {
      setDados(response.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const PostData = async() =>{
    delete usuarioSelecionado.id

    await axios.post(url, usuarioSelecionado)
    .then(response => {
      setDados(dados.concat(response.data))
      setUpdateDados (true);
      abrirFecharModal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const PutData = async() =>{
    await axios.put(url+"/"+usuarioSelecionado.id, usuarioSelecionado)
    .then(response => {
      var res = response.data
      var dadosAux = dados
      dadosAux.map((usuario) => {
        if(usuario.id === usuarioSelecionado.id){
          usuario.nome = res.nome;
          usuario.sobreNome = res.sobreNome;
          usuario.email = res.email;
          usuario.telefone = res.telefone 
        }
      })
      setUpdateDados (true);
      EditarModal()
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const DeleteData = async() =>{
      await axios.delete(url+"/"+usuarioSelecionado.id)
      .then((response) => {
        setDados(data.filter(usuario => usuario.id !== response.data))
        setUpdateDados (true);
          ExcluirModal()
      })
      .catch((err) => {
        console.log(err)
      })
  }


  const SelecionarUsuario = (usuario, opcao) => {
    setUsuarioSelecionado(usuario);
        (opcao==="Editar") ?
         EditarModal() : ExcluirModal()
  }

  const abrirFecharModal = () => {
    setModalIncluir(!modalIncluir)
  }

  const EditarModal = () => {
    setModalEditar(!modalEditar)
  }

  const ExcluirModal = () => {
    setModalExcluir(!modalExcluir)
  }
  

  const handleChange = (e) => {
    const{name,value} = e.target;
    setUsuarioSelecionado({
      ...usuarioSelecionado,
      [name]:value,
    })
    console.log(usuarioSelecionado)
  }

  return (
    <>
    <div  className="container-dados">
    <header>
        <h1>Cadastro de Usuários</h1>
    </header>
    <table className="table-dados">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Telefone</th>
          <button 
          type="button" 
          className="button-blue" 
          id="cadastrarCliente" 
          onClick={() => abrirFecharModal()}
          >Cadastrar Usuário
          </button>
        </tr>
      </thead>
      <tbody>
        {dados.map(usuario => (
          <tr key={usuario.id}>
            <td>{usuario.id}</td>
            <td>{usuario.nome}</td>
            <td>{usuario.sobreNome}</td>
            <td>{usuario.email}</td>
            <td>{usuario.telefone}</td>
            <td>
            <button type="button" className="button-green" onClick={() => SelecionarUsuario(usuario,"Editar")} >Editar</button> {"  "}
            <button type="button" className="button-red" onClick={() => SelecionarUsuario(usuario,"Excluir")} >Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>


          <Modal 
          isOpen={modalIncluir}
          >
           <ModalHeader>Cadastro de Usuários</ModalHeader>

           <ModalBody>
           <div className='form-group'>
               <label>Nome</label>
               <br/>
               <input type="text" className="form-control" name='nome' onChange={handleChange}/>
               <br/>
               <label>Sobrenome</label>
               <br/>
               <input type="text" className="form-control" name='sobreNome' onChange={handleChange}/>
               <br/>
               <label>Email</label>
               <br/>
               <input type="text" className="form-control" name='email' onChange={handleChange}/>
               <br/>
               <label>Telefone</label>
               <br/>
               <input type="text" className="form-control" name='telefone' onChange={handleChange}/>
               <br/>
             </div>
           </ModalBody>

             <ModalFooter>
               <button className='btn btn-primary'onClick={() => PostData()} >Adicionar</button>{"  "}
               <button className='btn btn-danger' onClick={() => abrirFecharModal()} >Cancelar</button>
             </ModalFooter>
         </Modal>

          <Modal 
          isOpen={modalEditar}
           >
            <ModalHeader>Editar Usuário</ModalHeader>

            <ModalBody>
            <div className='form-group'>
            <label>ID: </label>
            <input type="text" className="form-control" onChange={handleChange}
            value={usuarioSelecionado && usuarioSelecionado.id}
            />
            <br/>
            <label>Nome</label>
            <input type="text" className="form-control" name='nome' onChange={handleChange}
            value={usuarioSelecionado && usuarioSelecionado.nome}
            /><br/>
            <label>Sobrenome</label>
            <input type="text" className="form-control" name='sobreNome' onChange={handleChange}
            value={usuarioSelecionado && usuarioSelecionado.sobreNome}
            /><br/>
            <label>Email</label>
            <input type="text" className="form-control" name='email' onChange={handleChange}
            value={usuarioSelecionado && usuarioSelecionado.email}
            /><br/>
            <label>Telefone</label>
            <input type="text" className="form-control" name='telefone' onChange={handleChange}
            value={usuarioSelecionado && usuarioSelecionado.telefone}
            />
            </div>
            </ModalBody>

              <ModalFooter>
                <button className='btn btn-primary'onClick={() => PutData()}>Editar</button>
                <button className='btn btn-danger' onClick={() => EditarModal()}> Cancelar</button>
              </ModalFooter>

          </Modal>
       


          <Modal 
          isOpen={modalExcluir} 
          >
            <ModalBody>
            Confirmar a exclusão deste usuário : {usuarioSelecionado && usuarioSelecionado.nome}
            </ModalBody>

              <ModalFooter>
                <button className='btn btn-primary'onClick={() => DeleteData()}> Sim</button>
                <button className='btn btn-danger' onClick={() => ExcluirModal()}> Não</button>
              </ModalFooter>

          </Modal>
         
    </>
  );
}

