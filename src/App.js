import { useState } from 'react'
import forca0 from './assets/forca0.png'
import forca1 from './assets/forca1.png'
import forca2 from './assets/forca2.png'
import forca3 from './assets/forca3.png'
import forca4 from './assets/forca4.png'
import forca5 from './assets/forca5.png'
import forca6 from './assets/forca6.png'
import palavras from './Palavras.js'


export default function App(){
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    const [palavraSorteada, setPalavraSorteada] = useState('');
    const [jogoOFF, setJogoOFF] = useState(true);
    const [chutesFeitos, setChutesFeitos] = useState(alfabeto);
    const [erros, setErros] = useState(0);
    const [chutesCertos, setChutesCertos] = useState([]);
    const [status, setStatus] = useState('array');
    const [inputChute, setInputChute] = useState('')
    const forcaImgs = [forca0, forca1, forca2, forca3, forca4, forca5, forca6];
    let errosTotais;
    let totalCertos;

    function sortearPalavra(){
        palavras.sort(() => 0.5 - Math.random());
        setPalavraSorteada(palavras[0]);
        setJogoOFF(false);
        setChutesFeitos([]);
        setChutesCertos([]);
        setErros(0);
        setStatus('array');
    }

    function chutarLetra(letra){
        setChutesFeitos([...chutesFeitos, letra]);
        if (palavraLimpa.includes(letra)){
            totalCertos = [...chutesCertos, letra];
            setChutesCertos(totalCertos);
            checaVitoria();
        } else {
            errosTotais = erros + 1
            setErros(errosTotais);
            checaErros();
        }
    }

    function checaVitoria(){
        if (palavraLimpa.every(letra => totalCertos.includes(letra))) {
            setJogoOFF(true);
            setChutesFeitos([...alfabeto]);
            setStatus('ganhou');
        }
    }

    function checaErros(){
        if (errosTotais === 6) {
            setJogoOFF(true);
            setChutesFeitos([...alfabeto]);
            setStatus('perdeu');
            setChutesCertos([...palavraLimpa]);
        }
    }

    function chutarPalavra(){
        let final = palavraLimpa.join('')
        if (inputChute === final){
            setJogoOFF(true);
            setChutesFeitos([...alfabeto]);
            setChutesCertos([...palavraLimpa]);
            setStatus('ganhou');
        } else {
            setJogoOFF(true);
            setChutesFeitos([...alfabeto]);
            setStatus('perdeu');
            setChutesCertos([...palavraLimpa]);
        }
    }

    const palavraLimpa = palavraSorteada.normalize("NFD").replace(/\p{Diacritic}/gu, "").split('');
    const palavraMascarada = palavraLimpa.map((letra) => chutesCertos.includes(letra) ? letra : '_');
    console.log(palavraLimpa)
    
    return(
        <>
            <div className="container">
                <div className="wrapper">
                    <div className="jogo">
                        <div className="imagem-forca">
                            <img src={forcaImgs[erros]} alt='' ></img>
                        </div>
                        <div className="info-jogo">
                            <button onClick={sortearPalavra}>Escolher palavra</button>
                            <div className={status}>{palavraMascarada.map((letra, idx) => <span key={idx}>{letra}</span>)}</div>
                        </div>
                    </div>
                    <div className='teclado'>
                        {alfabeto.map((a, index) => <button onClick={() => chutarLetra(a)}
                         disabled={chutesFeitos.includes(a) ? true : false}
                          key={index}>{a}</button>)}
                    </div>
                    <div className='chute'>
                        <p>Já sei a palavra!</p>
                        <input disabled={jogoOFF} onChange={event => setInputChute(event.target.value)} value={inputChute}></input>
                        <button disabled={jogoOFF} onClick={chutarPalavra}>Chutar!</button>
                    </div>
                </div>
            </div>
        </>
    )
}