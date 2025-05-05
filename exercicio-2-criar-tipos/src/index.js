var planetas = [];
function createdPlanet(name, coordenada, situation) {
    var planet = {
        name: name,
        coordenada: coordenada,
        situation: situation,
        satelites: []
    };
    planetas.push(planet);
    alert("Planeta ".concat(planet.name, " criado com sucesso"));
}
function findPlanet(name) {
    var planet = planetas.find(function (planet) { return planet.name === name; });
    return planet !== null && planet !== void 0 ? planet : false;
}
function updatedPlanetSituation(situation, planeta) {
    planeta.situation = situation;
    alert("A situa\u00E7\u00E3o do planeta ".concat(planeta.name, " foi atualizada"));
}
function addSatelitePlanet(name, planeta) {
    planeta.satelites.push(name);
    alert("Satelite ".concat(name, " adicionado com sucesso a ").concat(planeta.name));
}
function removeSatelitePlanet(name, planeta) {
    planeta.satelites.filter(function (namePlanet) { return namePlanet !== name; });
    alert("Satelite ".concat(name, " removido com sucesso no planeta ").concat(planeta.name));
}
// Funções Auxiliares
function promptValidSituation() {
    var situation;
    var validSituation = false;
    while (!validSituation) {
        var situationInput = prompt('Informe a situação do planeta?\n1 - Habitado\n2 - Habitável\n3 - Inabitável\n4 - Inexplorado');
        switch (situationInput) {
            case '1':
                situation = 'Habitado';
                validSituation = true;
                break;
            case '2':
                situation = 'Habitável';
                validSituation = true;
                break;
            case '3':
                situation = 'Inabitável';
                validSituation = true;
                break;
            case '4':
                situation = 'Inexplorado';
                validSituation = true;
                break;
            default:
                alert('Situação inválida!');
                break;
        }
    }
    return situation;
}
// Aqui anotamos os tipos da função callback
// para facilitar a sua implementação futura
function promptValidPlanet(callback) {
    var planetName = prompt('Informe o nome do planeta:');
    var planet = findPlanet(planetName);
    // Aqui podemos reparar que o VS Code nos
    // avisa sobre o tipo Union de planet
    if (planet) {
        callback(planet);
    }
    else {
        alert('Planeta não encontrado! Retornando ao menu...');
    }
}
// Opções do Menu
function firstMenuOption() {
    var name = prompt('Informe o nome do planeta:');
    var coordinateA = Number(prompt('Informe a primeira coordenada:'));
    var coordinateB = Number(prompt('Informe a segunda coordenada:'));
    var coordinateC = Number(prompt('Informe a terceira coordenada:'));
    var coordinateD = Number(prompt('Informe a quarta coordenada:'));
    // Aqui a nossa função ajuda a ter um código mais organizado
    var situation = promptValidSituation();
    var confirmation = confirm("Confirma o registro do planeta ".concat(name, "?\n    Coordenadas: (").concat(coordinateA, ", ").concat(coordinateB, ", ").concat(coordinateC, ", ").concat(coordinateD, ")\n    Situa\u00E7\u00E3o: ").concat(situation));
    if (confirmation) {
        createdPlanet(name, [coordinateA, coordinateB, coordinateC, coordinateD], situation);
    }
}
// Nessas três funções vemos como a nossa função de callback
// proporciona uma facilidade enorme na implementação
function secondMenuOption() {
    // Além disso temos acesso automático às informações
    // dos argumentos, nesse caso a variável planet
    promptValidPlanet(function (planet) {
        var situation = promptValidSituation();
        updatedPlanetSituation(situation, planet);
    });
}
function thirdMenuOption() {
    promptValidPlanet(function (planet) {
        var satellite = prompt('Informe o nome do satélite a ser adicionado:');
        addSatelitePlanet(satellite, planet);
    });
}
function fourthMenuOption() {
    promptValidPlanet(function (planet) {
        var satellite = prompt('Informe o nome do satélite a ser removido:');
        removeSatelitePlanet(satellite, planet);
    });
}
function fifthMenuOption() {
    var list = 'Planetas:\n';
    planetas.forEach(function (planet) {
        // Repare que as tuplas são uma forma fácil de permitir a
        // desestruturação com qualquer nome nas variáveis.
        // As variáveis a seguir podem ter qualquer nome pois a
        // tupla segue um padrão fixo.
        var _a = planet.coordenada, a = _a[0], b = _a[1], c = _a[2], d = _a[3];
        list += "\n        Nome: ".concat(planet.name, "\n        Coordenadas: (").concat(a, ", ").concat(b, ", ").concat(c, ", ").concat(d, ")\n        Situa\u00E7\u00E3o: ").concat(planet.situation, "\n        Sat\u00E9lites: ").concat(planet.satelites.length, "\n      ");
        planet.satelites.forEach(function (satellite) {
            list += "    - ".concat(satellite, "\n");
        });
    });
    alert(list);
}
// Menu
var userOption = 0;
while (userOption !== 6) {
    var menu = "Menu\n    1 - Registrar um novo planeta\n    2 - Atualizar situa\u00E7\u00E3o do planeta\n    3 - Adicionar um sat\u00E9lite ao planeta\n    4 - Remover um sat\u00E9lite do planeta\n    5 - Lista todos os planetas\n    6 - Sair\n  ";
    userOption = window.parseInt(prompt(menu));
    switch (userOption) {
        case 1:
            firstMenuOption();
            break;
        case 2:
            secondMenuOption();
            break;
        case 3:
            thirdMenuOption();
            break;
        case 4:
            fourthMenuOption();
            break;
        case 5:
            fifthMenuOption();
            break;
        case 6:
            alert('Encerrando o sistema...');
            break;
        default:
            alert('Opção inválida! Retornando ao painel principal...');
            break;
    }
}
