const bot = require('./bot');
const Controller = require('./controller');

bot.onText(/\/start/, msg => {
    let controller = new Controller(msg);

    controller.start();
});

bot.onText(/\/help/, msg => {
    let controller = new Controller(msg);

    controller.help();
});

bot.onText(/\/weather/, msg => {
    const { from: { id } } = msg;

    bot.sendMessage(id, 'In what city do you want to know the weather?').then(() => {
        bot.once('text', msg => {
            let controller = new Controller(msg);

            controller.weather(msg.text);
        });
    });
});

bot.onText(/\/stock/, msg => {
    const { from: { id } } = msg;

    bot.sendMessage(id, 'Enter company stock symbol').then(() => {
        bot.once('text', msg => {
            let controller = new Controller(msg);
            
            controller.stock(msg.text);
        });
    });
});

bot.onText(/\/convert/, msg => {
    const { from: { id } } = msg;

    bot.sendMessage(id, 'From currency').then(() => {
        bot.once('text', msg => {
            let fromCurrency = msg.text;

            bot.sendMessage(id, 'To currency').then(() => {
                bot.once('text', msg => {
                    let toCurrency = msg.text;

                    bot.sendMessage(id, 'Amount').then(() => {
                        bot.once('text', msg => {
                            try {
                                let amount = Number(msg.text);
                                let controller = new Controller(msg);
                                
                                controller.currencyСonverter(amount, fromCurrency, toCurrency);
                            } catch(err) {
                                bot.sendMessage(this.userId, 'Oops! Errors! :(');
                            }
                        });
                    });
                });
            });
        });
    });
});

bot.on('text', msg => {
    const { text } = msg;
    const controller = new Controller(msg);

    if (text.toLowerCase().indexOf('hello') === 0) {
        controller.sayHello();
    } else if (text.toLowerCase().indexOf('flip a coin') === 0) {
        controller.flipCoin();
    } else if (text.toLowerCase().indexOf('roll die') === 0) {
        controller.rollDie();
    }
});