type Situation = "Habitado" | "Habitável" | "Inabitável" | "Inexplorado"
type Coordenada = [number, number, number, number]

type Planetas = {
    name: String,
    coordenada: Coordenada,
    situation: Situation,
    satelites: String[]
}

const planetas: Planetas[] = []


function createdPlanet(name: String, coordenada: Coordenada, situation: Situation) {
    const planet = {
        name,
        coordenada,
        situation,
        satelites: []
    }

    planetas.push(planet)
    alert(`Planeta ${planet.name} criado com sucesso`)
}

function findPlanet(name: String) {
    const planet = planetas.find(planet => planet.name === name)

    return planet ?? false
}

function updatedPlanetSituation(situation: Situation, planeta: Planetas) {
    planeta.situation = situation

    alert(`A situação do planeta ${planeta.name} foi atualizada`)
}

function addSatelitePlanet(name: string, planeta: Planetas) {
    planeta.satelites.push(name)
    alert(`Satelite ${name} adicionado com sucesso a ${planeta.name}`)

}
function removeSatelitePlanet(name: string, planeta: Planetas) {
    planeta.satelites.filter(namePlanet => namePlanet !== name)

    alert(`Satelite ${name} removido com sucesso no planeta ${planeta.name}`)
}

// Funções Auxiliares

function promptValidSituation() {
    let situation: Situation
    let validSituation = false

    while (!validSituation) {
        const situationInput = prompt('Informe a situação do planeta?\n1 - Habitado\n2 - Habitável\n3 - Inabitável\n4 - Inexplorado')

        switch (situationInput) {
            case '1':
                situation = 'Habitado'
                validSituation = true
                break;
            case '2':
                situation = 'Habitável'
                validSituation = true
                break;
            case '3':
                situation = 'Inabitável'
                validSituation = true
                break;
            case '4':
                situation = 'Inexplorado'
                validSituation = true
                break;
            default:
                alert('Situação inválida!')
                break;
        }
    }

    return situation
}

// Aqui anotamos os tipos da função callback
// para facilitar a sua implementação futura
function promptValidPlanet(callback: (planet: Planetas) => void) {
    const planetName = prompt('Informe o nome do planeta:')
    const planet = findPlanet(planetName)

    // Aqui podemos reparar que o VS Code nos
    // avisa sobre o tipo Union de planet
    if (planet) {
        callback(planet)
    } else {
        alert('Planeta não encontrado! Retornando ao menu...')
    }
}

// Opções do Menu

function firstMenuOption() {
    const name = prompt('Informe o nome do planeta:')
    const coordinateA = Number(prompt('Informe a primeira coordenada:'))
    const coordinateB = Number(prompt('Informe a segunda coordenada:'))
    const coordinateC = Number(prompt('Informe a terceira coordenada:'))
    const coordinateD = Number(prompt('Informe a quarta coordenada:'))

    // Aqui a nossa função ajuda a ter um código mais organizado
    const situation = promptValidSituation()

    const confirmation = confirm(`Confirma o registro do planeta ${name}?
    Coordenadas: (${coordinateA}, ${coordinateB}, ${coordinateC}, ${coordinateD})
    Situação: ${situation}`)

    if (confirmation) {
        createdPlanet(name, [coordinateA, coordinateB, coordinateC, coordinateD], situation)
    }
}

// Nessas três funções vemos como a nossa função de callback
// proporciona uma facilidade enorme na implementação
function secondMenuOption() {
    // Além disso temos acesso automático às informações
    // dos argumentos, nesse caso a variável planet
    promptValidPlanet(planet => {
        const situation = promptValidSituation()
        updatedPlanetSituation(situation, planet)
    })
}

function thirdMenuOption() {
    promptValidPlanet(planet => {
        const satellite = prompt('Informe o nome do satélite a ser adicionado:')
        addSatelitePlanet(satellite, planet)
    })
}

function fourthMenuOption() {
    promptValidPlanet(planet => {
        const satellite = prompt('Informe o nome do satélite a ser removido:')
        removeSatelitePlanet(satellite, planet)
    })
}

function fifthMenuOption() {
    let list = 'Planetas:\n'

    planetas.forEach(planet => {
        // Repare que as tuplas são uma forma fácil de permitir a
        // desestruturação com qualquer nome nas variáveis.
        // As variáveis a seguir podem ter qualquer nome pois a
        // tupla segue um padrão fixo.
        const [a, b, c, d] = planet.coordenada

        list += `
        Nome: ${planet.name}
        Coordenadas: (${a}, ${b}, ${c}, ${d})
        Situação: ${planet.situation}
        Satélites: ${planet.satelites.length}
      `

        planet.satelites.forEach(satellite => {
            list += `    - ${satellite}\n`
        })
    })

    alert(list)
}
// Menu

let userOption = 0

while (userOption !== 6) {
    const menu = `Menu
    1 - Registrar um novo planeta
    2 - Atualizar situação do planeta
    3 - Adicionar um satélite ao planeta
    4 - Remover um satélite do planeta
    5 - Lista todos os planetas
    6 - Sair
  `

    userOption = window.parseInt(prompt(menu))

    switch (userOption) {
        case 1:
            firstMenuOption()
            break
        case 2:
            secondMenuOption()
            break
        case 3:
            thirdMenuOption()
            break
        case 4:
            fourthMenuOption()
            break
        case 5:
            fifthMenuOption()
            break
        case 6:
            alert('Encerrando o sistema...')
            break
        default:
            alert('Opção inválida! Retornando ao painel principal...')
            break;
    }
}