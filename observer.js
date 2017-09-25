

var publisher = {
    subscribers: {
        any: [] // тип события: подписчик
    },

    //подписываем подписчика    fn - вызываемая функция подписчика, type - тип периодичности
    subscribe: function (fn, type) {

        //если тип подписки не указан, значит будет получать каждый день
        type = type || 'any';
        if (typeof this.subscribers[type] === 'undefined') {
            this.subscribers[type] = [];
        }
        //добавляем в подписчики
        this.subscribers[type].push(fn);
    },
    unsubscribe: function (fn, type) {
        this.visitSubscribers('unsubscribe', fn, type);
    },
    publish: function (publication, type) {

          // издатель вызывает функцию оповещения подписчиков 
        this.visitSubscribers('publish', publication, type);
    },
    visitSubscribers: function (action, arg, type) {
       
        var pubtype = type || 'any',

        // из всех подписчико в берем тех, кто подписан на конкретный тип
            subscribers = this.subscribers[pubtype],
            i,
            max = subscribers.length;

        for (i = 0; i < max; i += 1) {
            if (action === 'publish') {
                //передаем конкретному подписчику инфу о конкре тном выходе какого-то издания
                //arg- текс сообщения
                subscribers[i](arg);
            } else {
                //иначе оповещаем о том что мы отписывем подписчика
                if (subscribers[i] === arg) {
                    subscribers.splice(i, 1);
                }
            }
        }
    }
};

//функция для регистрации издателя, сюда мы передаем издателя и наполняем его общим функционалом для всех издателей
function makePublisher(o) {
    var i;
    for (i in publisher) {
        if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
            o[i] = publisher[i];
        }
    }
    o.subscribers = { any: [] };
}

// некий издатель, в данном случае что то выпускается ежедневнео что-то ежемесячно
var paper = {
    daily: function () {
           // издатель вызывает функцию публикации
        this.publish('big news today');
    },
    monthly: function () {
           // издатель вызывает функцию публикации
        this.publish('interesting analysis', 'monthly');
    }
};

// создаем обект издателя, наполняем его общим функционалом
makePublisher(paper);



var joe = {
    drinkCoffee: function (paper) {
        console.log('Just read ' + paper);
    },
    sundayPreNap: function (monthly) {
        console.log('About to fall asleep reading this ' + monthly);
    }
};

//указываем какой метод сработает при конкретном типе подписки, any - при любом
paper.subscribe(joe.drinkCoffee);
paper.subscribe(joe.sundayPreNap, 'monthly');

paper.daily();
paper.daily();
paper.daily();
paper.monthly();
