import { useState } from 'react'
import './App.css'
import logo from './assets/logo-min.png'

function App() {

  const [content , setContent] = useState("")
  //Categoria selecionada para ter controle do botão clicado
  const [selectedCat , setSelectedCat] = useState(0)

  const objects = [
    {
      id  : 1,
      button : "Motivação",
      text : [
        "Não sei o que escrever aqui!",
        "Deus está olhando por nós do seu trono de majestade.",
        "Eu sei que vou vencer. A história contada pela primeira vez é mais emocionante.",
        "Uma vez li na biblía que diz um amigo é mais chegado que um irmão.",
        "Escute mais música do que toda história negativa que te contam."
      ]
    },
    {
      id : 2,
      button : "Bom dia",
      text : [
        "Bom dia minha querida amiga!",
        "Bom dia, espero que tudo dê certo no seu caminho!",
        "Amanhã começa uma nova história com os novos personagens.",
        "Bom dia venha escutar o coro das aves e ver a esperança que elas trazem em suas asas."
      ]
    }
  ]

  //Condicional de estilo para os botões
  let selectedButton = objects[selectedCat].button

  //Função para capturar o index e manter o controle do botão selecionado
  const changeButton = (index : number) =>{
    setSelectedCat(index)
  }

  //Função aleatória para gerar as frases conforme escoherr o botão
  const randomPhrase = () =>{
    let lenght_text = objects[selectedCat].text.length
    let rand_number = Math.floor(Math.random() * lenght_text) //Gera número de 0 até o máximo de frases contidas na categoria text
    //Funciona assim, vai pegar as frases conforme o númerro aleatório gerado que vai se igualar com os index das respectivas frases em text
    let text = objects[selectedCat].text[rand_number]
    setContent(`"${text}"`)
  }

  return (
    <>
      <div className="container">

        <img src={logo} alt="Logo do projeto" className='logo' />

        <h2 className='title-h2'>Categoria</h2>

        <section className='category-section' title='Motivação'> 
          {objects.map((item, index) => (
            <button key={item.id} className='category-button' style={{ borderWidth : item.button === selectedButton ? 2 : 0 , borderColor : " #1fa4db" }} onClick={ () => changeButton(index)} >{item.button}</button>
          ))}
        </section>

        <button className='generate-button' onClick={randomPhrase}>Gerar frase</button>

        <span>{content ? <p className="phrase-p">{content}</p> : ''}</span>
      </div>
    </>
  )
}

export default App
