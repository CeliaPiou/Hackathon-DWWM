import React, { useEffect, useState } from 'react'

function Apropos ({about, setAbout}){

    const handleClosure = () => {
        // Si le pop-op est ouvert, et qu'on clique sur le bouton jouer, ça se ferme:
        if(about) {
            const apropos = document.getElementById('container-apropos');
            apropos.classList.remove('hello');
            setAbout(!about)
        }
    }

    useEffect(() => {
        const apropos = document.getElementById('container-apropos');
        if(about) {
            apropos.classList.add('hello');
        }
    }, [about])

    return (

        <div id="container-apropos">

            <div id="apropos" className='px-7 py-4 bg-slate-950 rounded-lg leading-none border-2 border-solid border-slate-900 text-white shadow-[0px_0px_15px_3px_rgba(76,_29,_149,_0.70)] bg-slate-950 hover:border-violet-900 transition duration-800'>
                <h2 className=''>A propos</h2>
                <p>Et si ta caméra devenait un détective d'objets ? Montre-lui
                    n'importe quoi et bam, elle te dit ce que c'est ! Grâce à notre
                    appli, chaque objet devient une devinette. Simple, rapide,
                    presque magique — t'as juste à jouer !</p>

                <button onClick={handleClosure} className='px-7 py-4 bg-slate-950 rounded-lg leading-none border-2 border-solid border-slate-900 text-white hover:shadow-[0px_0px_15px_3px_rgba(76,_29,_149,_0.70)] bg-slate-950 hover:border-violet-950 transition duration-800'>
                Jouer !
                </button>
            </div>

        </div>
    )
}

export default Apropos