import { useEffect, useState } from 'react'
import UserCard from './components/UserCard'
import './App.css'
 
const ItensPorPagina = 10
 
function App() {
  const [users, setUsers] = useState([])
  const [pagina, setpagina] = useState(1)
 
  useEffect(() => {
    fetch('http://localhost:3001/peoples')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Erro ao buscar usuários:',err));
  }, []);
 
  const TotalPaginas = (users.length / ItensPorPagina) //Total de paginas = 5
  const IndicePag = (pagina - 1) * ItensPorPagina  //
  const usuariosExibidos = users.slice(IndicePag, IndicePag + ItensPorPagina) // Contagem das paginas pra pode dividi-las em 10 10
 
  const ProxPag = (Pag) => {
    if (Pag >= 1 && Pag <= TotalPaginas) {
      setpagina(Pag)
    }
  }
 
  return (
<div className='App'>
<h1>Dashboard de Usuários</h1>
<p>Total de Usuários: {users.length}</p>
 <div className="paginasNumeracao">
     <p>Página {pagina}</p>
    </div>
 
      <div className='user-container'>
        {usuariosExibidos.map(user => (
<UserCard key={user.id} user={user} />
        ))}
</div>
      
     <div className='Paginacao'>
  <button onClick={() => ProxPag(pagina - 1)} disabled={pagina === 1}> 
     {'<'} Anterior
</button>
           {Array.from({ length: TotalPaginas }, (_, i) => (
<button
            key={i+1}
            onClick={() => ProxPag(i + 1)}
            className={pagina === i + 1 ? 'active' : ''}>
            {i + 1}
</button>
        ))}

   <button onClick={() => ProxPag(pagina + 1)} 
   disabled={pagina === TotalPaginas}>
       Próxima {'>'}

</button>
</div>
</div>
  )}

//linha 39 define o botão pra voltar pra pagina anterior, e no disabled, esse botão é desativado quando seu valor for igual ao minimo de paginas
//linha 44 cria um paragrafo com um texto q diz qual pagina o usuario esta
//linha 48 define o botão pra passar pra proxima pagina, e no disabled, esse botão é desativado quando seu valor for igual ao total de paginas


export default App;
