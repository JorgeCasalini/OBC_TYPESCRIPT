interface usersInterface {
    id: number
    login: string
    name: string
    bio: string
    public_repos: number
    repos_url: string
    message?: "Not Found"
}

interface reposInterface {
    name: string
    description: string
    fork: boolean
    stargazers_count: number
}

const users: usersInterface[] = []

async function fetchUser(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`)
    const user: usersInterface = await response.json()

    if (user.message) return alert('Usuário não encontrado!');
    users.push(user)

    alert(
        `O usuário ${user.login} foi salvo.\n` +
        `\nid: ${user.id}` +
        `\nlogin: ${user.login}` +
        `\nNome: ${user.name}` +
        `\nBio: ${user.bio}` +
        `\nRepositórios públicos: ${user.public_repos}`
    )
}


// 2. Mostrar info salvas de um user e seus repo public
// -> URL: repos_url
// retorno da API sera um array de repo
// exibir: name/description (string), fork (boolean), stargazers_count (number)

async function showUser(username: string) {
    const user = users.find(user => user.login === username)
  
    if (typeof user === 'undefined') {
      alert('Usuário não encontrado!');
    } else {
      const response = await fetch(user.repos_url)
      const repos: reposInterface[] = await response.json()
  
      let message = `id: ${user.id}\n` +
        `\nlogin: ${user.login}` +
        `\nNome: ${user.name}` +
        `\nBio: ${user.bio}` +
        `\nRepositórios públicos: ${user.public_repos}`
  
      repos.forEach(repo => {
        message += `\nNome: ${repo.name}` +
          `\nDescrição: ${repo.description}` +
          `\nEstrelas: ${repo.stargazers_count}` +
          `\nÉ um fork: ${repo.fork ? 'Sim' : 'Não'}\n`
      })
  
      alert(message)
    } 
  }

// 3. Mostrar todos user salvos
function showAllUsers() {
    let usuario = 'Usuarios:\n '

    users.forEach((user) => {
        usuario += `\n ${user.login}`
    })

    console.log(usuario)
}

// 4. Calcula soma de todos repo users salvos na lista e exibe o resultado

function showAllRepo() {
    const repoTotal = users.reduce((accumulator, user) => accumulator + user.public_repos, 0)

    console.log(`O grupo possui um total de ${repoTotal} repositórios públicos!`)
}

// 5. Mostrar top 5 com maior num repo publico (nome + cant) em uma listinha
function showTopFiveRepo() {
    const topFive = users.slice().sort((currentUser,nextUser) => nextUser.public_repos - currentUser.public_repos).slice(0,5)

    let message = 'Top 5 usuários com mais repositórios públicos:\n'

    topFive.forEach((user, index) => {
      message += `\n${index + 1} - ${user.login}: ${user.public_repos} repositórios`
    })
  
    alert(message)
}

async function main() {
    await fetchUser('jorgeCasalini')
    await fetchUser('Giancardonee')
    await fetchUser('isaacpontes')
    await fetchUser('MatiasGuaymas')
    await fetchUser('frans203')
    await fetchUser('LeDragoX')
  
    await showUser('jorgeCasalini')
    await showUser('Giancardonee')
  
    showAllUsers()
    showAllRepo()
    showTopFiveRepo()
  }
  
  main()