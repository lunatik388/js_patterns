
// Окончательная реализация 
// var corolla = CarMaker.factory(‘Compact’);
// var solstice = CarMaker.factory(‘Convertible’);
// var cherokee = CarMaker.factory(‘SUV’);
// corolla.drive(); // 'Vroom, I have 4 doors'
// solstice.drive(); // 'Vroom, I have 2 doors'
// cherokee.drive(); // 'Vroom, I have 24 doors'+


//В статический метод класса-родитедля передаем название конструктора
// Определяем наследование через прототип CarMaker[constr].prototype = new CarMaker(); ДЕЛАЕМ ЭТО ЕДИНОЖДЫ
//  newcar = new CarMaker[constr]();  - создаем конкретный экземпляр
//его же и возвращаем



// Что нужно помнить. Конструткоры обеспчивающие конкретную функиональность - статические свойсвародительского класса, переопределяющие конкретный парметр

// родительский конструктор
function CarMaker() { }
// метод предка
CarMaker.prototype.drive = function () {
    return 'Vroom, I have ' + this.doors + ' doors';
};
// статический фабричный метод
CarMaker.factory = function (type) {
    var constr = type,
        newcar;
    // сообщить об ошибке, если конструктор
    // для запрошенного типа отсутствует
    if (typeof CarMaker[constr] !== 'function') {
        throw {
            name: 'Error',
            message: constr + ' doesn’t exist'
        };
    }
    // в этой точке известно, что требуемый конструктор существует
    // поэтому определим отношения наследования с предком,
    // но только один раз
    if (typeof CarMaker[constr].prototype.drive !== 'function') {
        CarMaker[constr].prototype = new CarMaker();                              // так делать не очень круто, лучше через Object create? чтобы не создавать объект а просто унаследовать конкретные методы
    }
    // создать новый экземпляр
    newcar = new CarMaker[constr]();
    // дополнительно можно вызвать какие-либо методы
    // и затем вернуть объект...
    return newcar;
};
// специализированные конструкторы
CarMaker.Compact = function () {
    this.doors = 4;
};
CarMaker.Convertible = function () {
    this.doors = 2;
};
CarMaker.SUV = function () {
    this.doors = 24;
};