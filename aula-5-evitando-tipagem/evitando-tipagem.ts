//É possível colocar opcional ao por '?' no final do argumento

/*
 function sendSpaceship(spaceship:{ pilot: string, copilot?: string}) {
     ...
 }
 sendSpaceship({ pilot: 'Han Solo', copilot: 'Chewbacca'})
 sendSpaceship({ pilot: 'Luke'})
*/

//Unknown = tipo desconhecido - permite asignar varios tipos dentro da mesma variavel
//Unknown pode receber outros tipos mas não ser outro tipo

/*
let input: unknown

input = 'test'
input = 20
input = []
*/

//Any = desabilita totalmente o Typescript ( não muito recomendado )
// utilizado como última opção

/*
let type: any 

type = 'test'
type = 20
type = []

let text: string
text = type
*/

// Never = Um caso que nunca deveria acontecer
// evita atribuir qualquer tipo a esse caso

/*
function verification(test) {
    if (test) {
        
    } else {
        let _check: never
        
        let text = _check //posso atribuir
        text = ''         //Uma vez atribuida não pode atribuir nada a ele

        return _check
    }
}

*/