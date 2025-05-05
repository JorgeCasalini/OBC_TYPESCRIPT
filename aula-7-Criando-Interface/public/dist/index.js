var sun = {
    name: "Sol",
    mass: 1.989 * (Math.pow(10, 30)),
    age: 4.603 * (Math.pow(10, 9)),
    planets: []
};
var MilkWayPlanet = /** @class */ (function () {
    function MilkWayPlanet(name, mass, population) {
        this.name = name;
        this.mass = mass;
        this.population = population;
    }
    MilkWayPlanet.prototype.createSatellite = function (name) {
        // ...
    };
    return MilkWayPlanet;
}());
var BigAsteroids = /** @class */ (function () {
    function BigAsteroids(name, mass, size) {
        this.name = name;
        this.mass = mass;
        this.size = size;
    }
    return BigAsteroids;
}());