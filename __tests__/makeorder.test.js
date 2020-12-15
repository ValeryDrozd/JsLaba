import {
    getOrder,
    validateEmail,
    validateName,
    validateCVV,
    validateCard,
    validateDE,
    validateDate,
    validate, hideshow, genOrderList
} from '../js/makeorder';
import 'regenerator-runtime';

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = value.toString();
    }

    removeItem(key) {
        delete this.store[key];
    }
};

global.localStorage = new LocalStorageMock;

test('Validate name should return true if name does not contain spaces',()=>{
    expect(validateName('Valery')).toBeTruthy();
    expect(validateName('Some name')).toBeFalsy();
})

test('Validate email should return true if email is valid',()=>{
    expect(validateEmail('someemail@')).toBeFalsy();
    expect(validateEmail('Some email@mail.com')).toBeFalsy();
    expect(validateEmail('email@mail.com')).toBeTruthy();
})

test('Validate cvv should return true if cvv is valid',()=>{
    expect(validateCVV('1235')).toBeTruthy();
    expect(validateCVV('123q')).toBeFalsy();
    expect(validateCVV('123')).toBeTruthy();
})

test('Validate date of expire should return true if card is not expired',()=>{
    expect(validateDE('1q/q3')).toBeFalsy();
    expect(validateDE('12/12')).toBeFalsy();
    expect(validateDE('12/23')).toBeTruthy();
})

test('Validate card if it"s number',()=>{
    expect(validateCard('111111111111')).toBeFalsy();
    expect(validateCard('4111111111111111')).toBeTruthy();
})

test('Validate date if time difference between order time and delivery time is more than three hours ',()=>{
    expect(validateDate('2020-12-15T10:26')).toBeTruthy();
    expect(validateDate('2020-11-14T10:26')).toBeFalsy();
})

test('Trying to check form validation',()=>{
    document.body.innerHTML = '<div><input type="radio" name="pay" id="paycard"  style="margin: initial;font:initial;font-size: 1.4em;width: initial;">' +
        '<input type="radio" name="pay" id="paycard"  checked style="margin: initial;font:initial;font-size: 1.4em;width: initial;"></div>';
    let userData = {};
    userData['name'] = 'Qwerty';
    userData['surname'] = 'Qwerty';
    userData['phone'] = '0981234567';
    userData['email'] ='qwerty@gmail.com';
    userData['delCity'] = 'City';
    userData['address'] = 'Address 12';
    userData['deliverydate'] = "2020-12-16T21:08";
    expect(validate(userData)).toEqual(true);
})

test('Testing hideshow function',()=>{
    document.body.innerHTML = '<div><input type="radio" name="pay" id="paycard"  style="margin: initial;font:initial;font-size: 1.4em;width: initial;">' +
        '<input type="radio" name="pay" id="paycard"  checked style="margin: initial;font:initial;font-size: 1.4em;width: initial;"></div><div id="cardcreds"></div>';
    hideshow(1);
    expect(document.getElementById('cardcreds').style.display).toEqual('none');
})

test('testing getOrderFunction when order is empty',()=>{
    expect(getOrder()).toEqual({'orderdata':{},'ordercart':{},'orderids':[]});
})

test('testing getOrderFunction when order is not empty',()=>{
    localStorage.clear();
    localStorage.setItem('orders',JSON.stringify({"orderdata":{"kNKiNyu":{"name":"Valery","surname":"Valery","phone":"0986547097","email":"valery@gmail.com",
                "delCity":"Khmelnytskyi","address":"Ssume 23","deliverydate":"2020-12-13T23:28","cnumber":"",
                "cvv":"","dateofexpire":"","city":""}},"ordercart":{"kNKiNyu":{"items":[[2,"0"]],"amount":{"2,0":1},"number":1,"unitprice":0}},"orderids":["kNKiNyu"]}));
    expect(getOrder()).toEqual({"orderdata":{"kNKiNyu":{"name":"Valery","surname":"Valery","phone":"0986547097","email":"valery@gmail.com",
                "delCity":"Khmelnytskyi","address":"Ssume 23","deliverydate":"2020-12-13T23:28","cnumber":"",
                "cvv":"","dateofexpire":"","city":""}},"ordercart":{"kNKiNyu":{"items":[[2,"0"]],"amount":{"2,0":1},"number":1,"unitprice":0}},"orderids":["kNKiNyu"]});
})

global.fetch =  jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{
            "id":1,
            "url":"peperoney",
            "productName":"Classic peperoney pizza",
            "productDescription":"Pizza with Mozarella, Peperoney tomatoes and BBQ sause.",
            "images":[],
            "radius":["20cm"],
            "price":[169],
            "spicy":false,
            "recommend":false
        },{
            "id":2,
            "url":"toscana",
            "productName":"Toscana pizza",
            "productDescription":"Pizza with Chicken, Feta, Mozarella, Cherry tomatoes, Al'fredo sauce, Spinach.",
            "price":[140],
            "images":[],
            "wegith":[],
            "radius":["20cm"],
            "spicy":false,
            "recommend":false
        },
            {
                "id":3,
                "url":"bavarian",
                "productName":"Bavarian pizza",
                "productDescription":"Pizza with Bavarian Sausages, Mozarella, Parmesan and BBQ sause.",
                "price":[145.00,165.00],
                "images":[],
                "wegith":[],
                "radius":["20cm","30cm"],
                "spicy":false,
                "recommend":false
            },
            {
                "id":4,
                "url":"diablo",
                "productName":"Diablo pizza",
                "productDescription":"Pizza with Mozzarella, Pepperoni, Chili pepper, Bell pepper, Onion, BBQ sauce, Chili sauce, Parsley.",
                "price":[119.00],
                "images":[],
                "wegith":[],
                "radius":["20cm"],
                "spicy":true,
                "recommend":false
            },{
                "id":5,
                "url":"margarita",
                "productName":"Margarita pizza",
                "productDescription":"Pizza with Mozarella and Dominos sause.",
                "price":[109],
                "images":[],
                "wegith":[],
                "radius":["20cm"],
                "spicy":false,
                "recommend":false
            },
            {
                "id":6,
                "url":"cheese",
                "productName":"Four cheese pizza",
                "productDescription":"",
                "price":[109],
                "images":[],
                "wegith":[],
                "radius":["20cm"],
                "spicy":false,
                "recommend":true

            },{
                "id":7,
                "url":"philadelphia",
                "productName":"Philadelphia roll",
                "productDescription":"Classic roll with salmon, cream cheese, avocado, tobiko caviar and cucumber.",
                "price":[45.00],
                "images":"",
                "wegith":[],
                "radius":["8 pieces"],
                "spicy":false,
                "recommend":false
            },
            {
                "id":8,
                "url":"avocado",
                "productName":"Avocado roll",
                "productDescription":"Roll with salmon, cream cheese, tobiko caviar and cucumber, sesame and Unagi sauce.",
                "price":[119.00],
                "images":"",
                "wegith":[],
                "radius":["8 pieces"],
                "spicy":false,
                "recommend":false

            },{
                "id":9,
                "url":"dragon",
                "productName":"Green dragon",
                "productDescription":"Dragon roll with salmon and eel punk, cream cheese, tobiko caviar, avocado, sesame and unagi sauce.",
                "price":[169],
                "images":"",
                "wegith":[],
                "radius":["8 pieces"],
                "spicy":false,
                "recommend":false

            },{
                "id":10,
                "url":"chicken",
                "productName":"Chicken roll",
                "productDescription":"Roll with cream cheese, punk chicken, sweet pepper, cucumber, romaine lettuce in cheddar cheese and spice sauce.",
                "price":[109],
                "images":"",
                "wegith":[],
                "radius":["8 pieces"],
                "spicy":false,
                "recommend":false

            },
            {
                "id":11,
                "url":"juice",
                "productName":"Orange juice",
                "productDescription":"",
                "price":[40.00,55.00],
                "images":"",
                "wegith":[],
                "radius":["0.3L","0.7L"],
                "spicy":false,
                "recommend":false

            },
            {
                "id":12,
                "url":"cc",
                "productName":"Coca-cola",
                "productDescription":"",
                "price":[45.00,55.00],
                "images":"",
                "wegith":[],
                "radius":["0.5L","1.0L"],
                "spicy":false,
                "recommend":false

            },
            {
                "id":13,
                "url":"fanta",
                "productName":"Fanta",
                "productDescription":"",
                "price":[45.00,55.00],
                "images":"",
                "wegith":[],
                "radius":["0.5L","1.0L"],
                "spicy":false,
                "recommend":false

            },{
                "id":14,
                "url":"sprite",
                "productName":"Sprite",
                "productDescription":"",
                "price":[45.00,55.00],
                "images":"",
                "wegith":[],
                "radius":["0.5L","1.0L"],
                "spicy":false,
                "recommend":false

            },{
                "id":15,
                "url":"morshynska",
                "productName":"Morshynska water.",
                "productDescription":"",
                "price":[30.00,40.00],
                "images":"",
                "wegith":[],
                "radius":["0.5L","1.0L"],
                "spicy":false,
                "recommend":false

            },{
                "id":16,
                "url":"redvine",
                "productName":"Red vine",
                "productDescription":"Red vine directly from Moldova.",
                "price":[250.00],
                "images":"",
                "wegith":[],
                "radius":["0.75L"],
                "spicy":false,
                "recommend":false

            }
        ]),
    })
);
test('Testing render of the page',async ()=>{
    localStorage.clear();
    document.body.innerHTML = '<div id=content></div>';
    window.location.hash = "#order/kNKiNyu";
    localStorage.setItem('orders',JSON.stringify({"orderdata":{"kNKiNyu":{"name":"Valery","surname":"Valery","phone":"0986547097","email":"valery@gmail.com",
                "delCity":"Khmelnytskyi","address":"Ssume 23","deliverydate":"2020-12-13T23:28","cnumber":"",
                "cvv":"","dateofexpire":"","city":""}},"ordercart":{"kNKiNyu":{"items":[[2,"0"]],"amount":{"2,0":1},"number":1,"unitprice":0}},"orderids":["kNKiNyu"]}));
    const text = await (genOrderList());
    expect(text).toBeTruthy();
})