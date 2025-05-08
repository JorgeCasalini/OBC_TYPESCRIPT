//Tipos genéricos (ou Generics) são um recurso do TypeScript que permite que um tipo seja passado como 
//argumento para um função ou classe. Isso é especialmente útil quando o tipo da entrada está diretamente 
//relacionado ao tipo da saída, ou então os tipos de diferentes argumentos está relacionado entre si de alguma
//forma. Vejamos como isso funciona na prática:
    
//Vejamos como isso funciona na prática. Em um arquivo typescript adicione o seguinte:
    
//Obs.: Ao passar o mouse sobre firstPilot e lastPilot vemos que neste último o tipo foi inferido
//corretamente porque a função last especifica um tipo <Type> para o array e também o retorno. 
// O que isso faz é deixar em aberto o tipo do array para que o TypeScript descubra o tipo e atribua-o ao retorno.

function first(array) {
    return array[0]
  }
  
  function last<Type>(array: Type[]): Type | undefined {
    return array[array.length - 1]
  }
  
  const pilots = ['Luke', 'Biggs', 'Wedge', 'Han', 'Lando']
  
  // Tipo any
  const firstPilot = first(pilots)
  
  // Tipo inferido
  const lastPilot = last(pilots)

//Agora vejamos um exemplo um pouco mais elaborado. Adicione o código abaixo:
    
//Obs.: Veja que teríamos inicialmente duas opções para o argumento ship, poderíamos não tipá-lo,
//deixando-o como any e desativando o typescript, ou então tipá-lo como ship, visto que só estamos utilizando
//as propriedades comuns name e pilot.
    
//Obs².: Se utilizássemos um dos tipos mais específicos como Fighter ou Speeder ele acusaria erro quando
//passássemos um outro tipo específico que não fosse o mesmo

interface Ship {
    name: string
    pilot: string
  }
  
  interface Fighter extends Ship {
    weapons: number
    shields: number
  }
  
  interface Transport extends Ship {
    capacity: number
  }
  
  interface Speeder extends Ship {
    speed: number
    acceleration: number
  }
  
//Como o comportamento anterior não é o que queremos podemos utilizar as funções genéricas 
//para melhorar nosso código. Modifique o código como mostrado abaixo:
    
//Obs.: Veja que agora ao passar o mouse o retorno da função usará o ShipType, 
//porém agora as propriedades name e pilot estão acusando um erro.

// Veja que agora ao passar o mouse o retorno da função usará o ShipType
// Porém agora as propriedades name e pilot estão acusando um erro
function cloneShip<ShipType extends { name:string, pilot:string }>(ship: ShipType, newName: string, newPilot: string) {
    const newShip = ship
    newShip.name = newName
    newShip.pilot = newPilot
    return newShip
  }
  
  const falcon: Ship = {
    name: 'Millenium Falcon',
    pilot: 'Han'
  }
  
  const xWing: Fighter = {
    name: 'Red Five',
    pilot: 'Luke',
    weapons: 4,
    shields: 1
  }
  
  // Agora a cópia funciona e os tipos inferidos estão corretos
  // copy1 é do tipo Ship e copy2 do tipo Fighter
  const copy1 = cloneShip(falcon, 'Milano', 'Peter')
  const copy2 = cloneShip(xWing, 'Black One', 'Poe')


//Outra coisa que pode ser necessária em alguns momentos é especificar manualmente o tipo para a função genérica.
//Imagine que no nosso caso não queremos que o VS Code infira automaticamente o mesmo tipo que passamos, 
//ao invés disso queremos forçar um tipo diferente. Vejamos como podemos fazer isso:
  interface EnemyShip {
    name: string
    pilot: string
    flag?: string // A propriedade é opcional para evitar erros
  }
  
  // O tipo Ship não estaria correto aqui
  const enemyCopy = cloneShip(falcon, 'Enemy', 'Enemy')
  // Mas podemos explicitamente passar o tipo para a função
  // e agora temos o tipo EnemyShip atribuido corretamente
  const enemyCopy2 = cloneShip<EnemyShip>(falcon, 'Enemy', 'Enemy')
  
  // Aqui temos um erro por conta do tipo Ship
  enemyCopy.flag = 'Imperial'
  // Já aqui temos a propriedade opcional flag
  enemyCopy2.flag = 'Imperial'

//Os genéricos funcionam da mesma forma com classes e também com interfaces:

// Segue a mesma implementação das funções
// e o mesmo valeria para as interfaces
class Pilot <ShipType> {
    name: string
    ship: ShipType
  
    constructor(name: string, ship: ShipType) {
      this.name = name
      this.ship = ship
    }
  }
  
  // Apesar de não ser necessário aqui, seria
  // possível explicitar o tipo da mesma forma
  const han = new Pilot('Han Solo', falcon)
  const luke = new Pilot<Fighter>('Luke Skywalker', xWing)