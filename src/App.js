import { db } from './fireBaseConnection';
//
import { doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc } from 'firebase/firestore';

import './App.css';

import { useState } from 'react';


function App() {

  const [titulo, setTitulo] = useState("");

  const [autor, setAutor] = useState("");

  const [idPost, setIdPost] = useState("");

  const [posts, setPosts]
    = useState([]);

  //Anexando users
  //deixando uma funcao async, usando os import do firebase/ banco/ campos e o que cadastrar
  async function handleAdd() {


    // apost com ID Automatica
    await addDoc(collection(db, "posts"), {
      titulo: titulo,
      autor: autor,
    })
      //     // caso dê sucesso
      .then(() => {
        alert("Sucesso");
        setAutor('');
        setTitulo('');
      })
      // caso dê erro
      .catch((error) => {
        alert("Gerou Erro" + error);
      })
  }


  // funcao buscando uma lista de posts
  async function buscarPost() {

    const postsRef = collection(db, "posts")
    await getDocs(postsRef)
      .then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })

        setPosts(lista);

        alert("Solicitacao feita com suscesso")
      })

      .catch((error) => {
        alert("Algo deu errado")
      })


  }

  //funcao post, modificando usuario
  async function editarPost() {
    const docRef = doc(db, "posts", idPost)
    await updateDoc(docRef, {
      titulo: titulo,
      autor: autor
    })
      //     // caso dê sucesso
      .then(() => {
        alert("Sucesso");
        setAutor('');
        setTitulo('');
        setIdPost('');
      })
      // caso dê erro
      .catch((error) => {
        alert("Gerou Erro" + error);
      })
  }

  return (
    <div>
      <h1>React + Fire </h1>

      <div className='container'>
        <label>ID do Post:</label>
        <input
          placeholder='Digite o ID do post'
          value={idPost}
          onChange={(e) => setIdPost(e.target.value)}
        /><br />

        <label>Titulo:</label>
        <textarea
          type="text"
          placeholder='Digite o seu texto'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <label>Autor:</label>
        <textarea
          type="text"
          placeholder='Autor do post'
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
        />

        <button onClick={handleAdd}> cadastrar </button>

        <button onClick={buscarPost}> Buscar Posts </button>

        <button onClick={editarPost}>Atualizar Post</button>

        {/* mostrando a lista */}

        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <span>Titulo: {post.titulo} </span>
                <br />
                <span>Autor: {post.autor} </span>
                <br />
                <strong>ID: {post.id}</strong>
              </li>
            )
          })}
        </ul>

      </div>
    </div>
  );
}

export default App; 
