import React, {useEffect, useState} from 'react'
import Navbar from './Components/Navbar'
import Characters from './Components/Characters'
import Pagination from './Components/Pagination'



function App() {

  // Declaramos las variables que seran contantes como personajes y su información
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const initialurl = "https://rickandmortyapi.com/api/character";


  // Consultas a la api los diferentes personajes
  const fetchCharacters = (url) => {
  fetch(url)  
   .then(response => response.json())
   .then((data) => {
      setCharacters(data.results);
      setInfo(data.info);
   })
   .catch(error => console.log(error))
  };
// Función para ver si hay una página anterior y mostrar el botón o no
  const onPrevious = () => {
    fetchCharacters(info.prev);
  }
// Funcion para ver si hay una página posterior y entonces mostrar el botón o no
  const onNext = () => {
    fetchCharacters(info.next);
  }

  useEffect(() => {
    fetchCharacters(initialurl);
  }, [])

  return (
    <>
    {/* Añadir un título*/}
    <Navbar brand="Rick and Morty App" /> 


    <div className="container mt-5">
      {/* Botones de movimiento de páginas superior */}
     <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext} />
     {/* Container donde encontramos todos los recuadros de los personajes con su información */}
     <Characters characters={characters} />
      {/* Botones de movimiento de páginas inferior */}
     <Pagination prev={info.prev} next={info.next} onPrevious={onPrevious} onNext={onNext} />
    </div>

    </>
  );
}

export default App;
