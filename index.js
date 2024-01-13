// primero por el camino facil xd

// obteniendo todas las casillas


// warning : este codigo esta lleno de bichos!


let shift = true // true x | false o
let counterX = 0
let counterO = 0
const show = (shif) => {
    document.querySelector('.bar p strong').innerHTML = shif ? 'x' : 'o'
}

// momento de refactorizar
const list = [] // lista de boxes
const boxes = [...document.querySelectorAll('.box')]
boxes.forEach((element) => {
    list.push(
        {
            press: false,
            box: element,
        }
    )
    console.log(element)
})

list.forEach(element => {
    element.box.addEventListener('click', () => {
        if (element.box.press) {
            alert('Ya has marcado esta casilla')
            return
        }
        if (shift) {
            element.box.innerHTML = 'x'
        } else {
            element.box.innerHTML = 'o'
        }
        element.box.press = true
        element.letter = shift ? 'x' : 'o'
        shift = !shift
        show(shift)
        checkWinner()
    })
})

// hacer que haya un ganador
// como hacerlo ? usando matrices

const clean = () => {
    list.forEach(element => {
        element.box.innerHTML = '-'
        element.box.press = false
        element.letter = '-'
    })
}
const win = (letter) => {
    console.log(letter)
    if (letter === 'x') {
        document.querySelector('#x').innerHTML = `${++counterX}`
    } else {
        console.log('en else')
        document.querySelector('#o').innerHTML = `${++counterO}`
    }

    clean()
}

// codigo repetitivo del que no estoy orgulloso

const rows = () => {
    // se usa filter para quitar los elementos como undefined
    const arrow = [list[0].letter, list[1].letter, list[2].letter].filter(Boolean).join('')
    const arrow2 = [list[3].letter, list[4].letter, list[5].letter].filter(Boolean).join('')
    const arrow3 = [list[5].letter, list[6].letter, list[7].letter].filter(Boolean).join('')

    if (arrow === 'xxx' || arrow === 'ooo'){
        return [true, arrow]
    }

    if (arrow2 === 'xxx' || arrow2 === 'ooo'){
        return [true, arrow2]
    }
    if (arrow3 === 'xxx' || arrow3 === 'ooo'){
        return [true, arrow3]
    }

    return [false, '---']
    
}

const columns = () => {
    const col = [list[0].letter, list[3].letter, list[6].letter].filter(Boolean).join('')
    const col2 = [list[1].letter, list[4].letter, list[7].letter].filter(Boolean).join('')
    const col3 = [list[2].letter, list[5].letter, list[8].letter].filter(Boolean).join('')

    if (col === 'xxx' || col === 'ooo'){
        return [true, col]
    }

    if (col2 === 'xxx' || col2 === 'ooo'){
        return [true, col2]
    }
    if (col3 === 'xxx' || col3 === 'ooo'){
        return [true, col3]
    }

    return [false, '---']
}

const diagonally = () => {
    const diagonally = [list[0].letter, list[4].letter, list[8].letter].filter(Boolean).join('')
    const diagonally2 = [list[2].letter, list[4].letter, list[6].letter].filter(Boolean).join('')
    console.log(diagonally, diagonally2)
    if (diagonally === 'xxx' || diagonally === 'ooo'){
        return [true, diagonally]
    }
    if (diagonally2 === 'xxx' || diagonally2 === 'ooo'){
        return [true, diagonally2]
    }

    return [false, '---']
}

const checkWinner = () => {
    console.log('checking')
    // caso 1 | cuando alguna fila tiene todo en x - o
    let [result, winner] = rows()
    if (result){
        win(winner.split('')[0])
    }
    [result, winner] = columns()
    if (result){
        win(winner.split('')[0])
    }
    [result, winner] = diagonally()
    console.log(result)
    if (result){
        console.log('si')
        win(winner.split('')[0])
    }
}