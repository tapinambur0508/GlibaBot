const yahooWeather = require('yahoo-weather');
const yahooStocks = require('yahoo-stocks');
const currency = require('y-currency');

const bot = require('./bot');

class Controller {
    constructor(msg) {
        this.msg = msg;
    }

    get userId() {
        const {
            from: {
                id
            }
        } = this.msg;

        return id;
    }

    get userFirstName() {
        const {
            from: {
                first_name
            }
        } = this.msg;

        return first_name;
    }

    get userLastName() {
        const {
            from: {
                last_name
            }
        } = this.msg;

        return last_name;
    }

    get userUsername() {
        const {
            from: {
                username
            }
        } = this.msg;

        return username;
    }

    get chatId() {
        const {
            chat: {
                id
            }
        } = this.msg;

        return id;
    }

    start() {
        bot.sendMessage(this.userId, `Welcome, ${this.userFirstName}`);
    }

    help() {
        let message = 'Hello, I am *GlibaBot*.\n\n'
        message += 'You can control me by sending these commands:\n\n'
        message += '/weather - show weather\n'
        message += '/stock - show stock information\n'
        message += '/convert - currency converter\n'
        
        bot.sendMessage(this.userId, message, {
            parse_mode: 'Markdown'
        });
    }

    sayHello() {
        bot.sendMessage(this.userId, `Hello, ${this.userFirstName}`);
    }

    flipCoin() {
        let value = Math.floor(Math.random() * 99 + 1);

        if (value % 2 === 0) {
            bot.sendMessage(this.userId, 'Heads');
        } else {
            bot.sendMessage(this.userId, 'Tails');
        }
    }

    rollDie() {
        let value = Math.floor(Math.random() * 5 + 1);

        bot.sendMessage(this.userId, value);
    }

    weather(city) {
        yahooWeather(city).then(response => {
            let message = `Weather in *${response.location.city}, ${response.location.country}* today\n`
            message += `Weather description: *${response.item.condition.text}*\n`
            message += `Temperature: *${response.item.condition.temp}°C*\n`
            message += `Wind speed: *${response.wind.speed }km/h*\n`
            message += `Humidity level: *${response.atmosphere.humidity}%*\n`
            message += `Visibility: *${response.atmosphere.visibility}km*\n`
            message += `Sunrise: *${response.astronomy.sunrise}*\n`
            message += `Sunset: *${response.astronomy.sunset}*`

            bot.sendMessage(this.userId, message, {
                parse_mode: 'Markdown'
            });
        }).catch(err => {
            bot.sendMessage(this.userId, 'Oops! Errors! :(');
        });
    }

    stock(symbol) {
        yahooStocks.lookup(symbol).then(response => {
            let message = `*${response.name} (${response.symbol.toUpperCase()})*\n`
            message += `Exchange: *${response.exchange}*\n`
            message += `Current price: *$${response.currentPrice}*\n`
            message += `High price: *$${response.highPrice}*\n`
            message += `Low price: *$${response.lowPrice}*\n`
            message += `Mean price: *$${response.meanPrice}*\n`
            message += `Median price: *$${response.medianPrice}*`

            bot.sendMessage(this.userId, message, {
                parse_mode: 'Markdown'
            });
        }).catch(err => {
            bot.sendMessage(this.userId, 'Oops! Errors! :(');
        });
    }

    currencyСonverter(amount, fromCurrency, toCurrency) {
        currency.convert(amount, fromCurrency, toCurrency, (err, converted) => {
            if (err) {
                bot.sendMessage(this.userId, 'Oops! Errors! :(');
            } else {
                let message = `${amount} ${fromCurrency.toUpperCase()} = *${converted} ${toCurrency.toUpperCase()}*`;

                bot.sendMessage(this.userId, message, {
                    parse_mode: 'Markdown'
                });
            }
        });
    }
}

module.exports = Controller;