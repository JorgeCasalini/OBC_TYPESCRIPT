const spaceships = []

function addSpaceship(name: string, pilot: string, crewLimit: number) {
    const spaceship = {
        name,
        pilot,
        crewLimit,
        crew: [],
        inMission: false
    }

    spaceships.push(spaceship)
    alert(`A nave ${spaceship.name} foi registrada`)
}

function findSpaceship(name: string) {
    let spaceship: {
        name: string,
        pilot: string,
        crewLimit: number,
        crew: string[],
        inMission: boolean
    }

    spaceship = spaceships.find(ship => ship.name === name)

    return spaceship
}

function addCrewMember(name: string, spaceship: { name: string, crewLimit: number, crew: string[] }) {

    if (spaceship.crew.length >= spaceship.crewLimit) return alert(`${name} não pode ser adicionado. Atingiu o limite de passageiros.`)

    spaceship.crew.push(name)
    alert(`${name} foi adicionado à tripulação da ${spaceship.name}`)

}

function sendInMission(spaceship: { name: string, crewLimit: number, crew: string[], inMission: boolean }) {
    if (spaceship.inMission) return alert(`${spaceship.name} não pode ser enviada pois já está em missão`)

    if (spaceship.crew.length < Math.floor(spaceship.crewLimit / 3)) return alert(`${spaceship.name} não pode ser enviada. Não atingiu limite minimo de tripulação.`)

    spaceship.inMission = true

    alert(`${spaceship.name} enviada com sucesso!`)
}

function firstMenuOption() {
    const name = prompt("Qual o nome da nave a ser registrada ?")
    const pilot = prompt(`Qual o nome do piloto da ${name}`)
    const crewLimit = Number(prompt(`Quantos tripulantes a ${name} suporta ?`))

    const confirmation = confirm(`Confirma o registro da nava ${name}\n Piloto: ${pilot}\n Limite da tripulação: ${crewLimit} `)

    if (confirmation) return addSpaceship(name, pilot, crewLimit)
}
function secondMenuOption() {
    const member = prompt("Qual o nome do tripulante ? ")
    const spaceshipName = prompt(`Para qual nabe ${member} deverá ser designado?`)

    const spaceship = findSpaceship(spaceshipName)

    if (spaceship) {
        const confirmation = confirm(`Confirma a inclusão de ${member} na tripulação da ${spaceship.name} ?`)

        if (confirmation) return addCrewMember(member, spaceship)
    }
}

function thirdMenuOption() {
    const spaceshipName = prompt("Qual é o nome da nave a ser enviada ?")

    const spaceship = findSpaceship(spaceshipName);

    if(spaceship) {
        const confirmation = confirm(`Confirma o envio da ${spaceship.name} na missão ?`)

        if(confirmation) return sendInMission(spaceship)
    }
}

function  fourthMenuOption() {
    let list = 'Naves Registradas: \n'

    spaceships.forEach((spaceship: {
        name:string,
        pilot:string,
        crewLimit: number,
        crew: string[],
        inMission: boolean
    }) => {
        list += `
        Nave: ${spaceship.name}\n
        Pilot: ${spaceship.pilot}\n
        Em missão ?: ${spaceship.inMission}\n
        Tamanho máximo da tripulação: ${spaceship.crewLimit}\n
        Tripulantes: ${spaceship.crew.length}\n
        `

        spaceship.crew.forEach(member => {
            list += `        -${member}\n`
        })
    })
    alert(list)
}

/**
 * Menu
 */

let userOption = 0;

while (userOption !== 5) {
  const menu = `Painel Principal
    1 - Registrar uma nova nave
    2 - Adicionar membro da tripulação
    3 - Enviar nave em missão
    4 - Listar naves registradas
    5 - Encerrar
  `

  userOption = Number.parseInt(prompt(menu))

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
      alert('Encerrando o sistema...')
      break
    default:
      alert('Opção inválida! Retornando ao painel principal...')
      break;
  }
}