import { useState } from 'react'
import forca0 from './assets/forca0.png'
//import forca1 from './assets/forca1.png'
//import forca2 from './assets/forca2.png'
//import forca3 from './assets/forca3.png'
//import forca4 from './assets/forca4.png'
//import forca5 from './assets/forca5.png'
//import forca6 from './assets/forca6.png'
import palavras from './Palavras.js'


export default function App(){
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [palavraSorteada, setPalavraSorteada] = useState('');
    const [jogoOFF, setJogoOFF] = useState(true);

    function sortearPalavra(){
        palavras.sort(() => 0.5 - Math.random())
        setPalavraSorteada(palavras[0])
        setJogoOFF(false)
    }

    const palavraMascarada = palavraSorteada.split('').fill('_')
    
    return(
        <>
            <div className="container">
                <div className="wrapper">
                    <div className="jogo">
                        <div className="imagem-forca">
                            <img src={forca0} alt='' ></img>
                        </div>
                        <div className="info-jogo">
                            <button onClick={sortearPalavra}>Escolher palavra</button>
                            <div className='array'>{palavraMascarada.map((letra) => <span>{letra}</span>)}</div>
                        </div>
                    </div>
                    <div className='teclado'>
                        {alfabeto.map((a, index) => <button disabled={jogoOFF} key={index}>{a}</button>)}
                    </div>
                    <div className='chute'>
                        <p>Já sei a palavra!</p>
                        <input disabled={jogoOFF}></input>
                        <button>Chutar!</button>
                    </div>
                </div>
            </div>
        </>
    )
}