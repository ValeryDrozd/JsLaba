import {getCart, generateBlock, valid, generateOrderList} from '../functions';
import 'regenerator-runtime';
//import {enableFetchMocks} from 'jest-fetch-mock';
//enableFetchMocks()

test('getcart should return its base object in localstorage is undefined',()=>{
    expect(getCart()).toEqual({'items':[],'amount':{},'number':0});
})

test('Generate block should generate block with image and description',()=>{
    expect(generateBlock({
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
    })).toBe(' <div class="good">'+
        '<img src="./images/toscana.jpg" alt = "image" class="goodImg" data-path="#products/2" >'+
        '<p style="font-size: 1.2em;font-weight: bolder;" >Toscana pizza</p>'+
        '<hr style="width:80%;">'+
        '<p style="margin-bottom:0;"> Pizz'+
        "a with Chicken, Feta, Mozarella, Cherry tomatoes, Al'fredo sauce, Spinach. "+
        '</p>'+
        '<span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="2_140"  name="2" checked value = "0" >20cm</span></span>'+
        '<br> <span id="unitprice2" > One item price: 140 UAH</span><br> <button id="buy2" value = "140" class="buy"  >Buy</button>'+
        '</div>');
})

global.fetch =  jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([{'id': 1}, {'id': 2}, {'id': 3}]),
    })
);

test("Testing valid product",  async ()=>{
    const result = await valid('#products/1');
    expect(result).toBe(true);
});

test("Testing valid order",  async ()=>{
    const result = await valid('#orders/1');
    expect(result).toBe(false);
});


test("Testing valid promo",  async ()=>{
    const result = await valid('#promos/1');
    expect(result).toBe(true);
});

test('Testing generate table function when localstorage is empty',async ()=>{
    expect(await generateOrderList()).toBe("<h1>Your cart is empty... Buy something!</h1>");
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
test('Testing generate table function when localstorage is full', async ()=>{
    localStorage.setItem('cart','{"items":[[12,"0"],[2,"0"]],"amount":{"12,0":1,"2,0":1},"number":2,"unitprice":0}');
    expect(await generateOrderList()).toBe("<div id=\"list\">" +
        "<table>" +
            "<tr>" +
                "<td class=\"image\"></td>" +
                "<td class=\"name\" >Product name</td>" +
                "<td class=\"size\" >Product size</td>" +
                "<td class=\"empty\" ></td>" +
                "<td class=\"oneitemprice\">One item price</td>" +
                "<td class=\"less\"> </td><td class=\"amount\"> Amount of item</td>" +
                "<td class=\"more\"> </td><td>Full position price</td>" +
                "<td class=\"remove\"></td></tr><tr id=\"elem11,0\">" +
                "<td class=\"image\" ><img src= \"./images/cc.jpg\" alt=itemImage ></td>" +
                "<td class=\"name\">Coca-cola</td><td class=\"size\" >0.5L</td>" +
                "<td class=\"empty\"></td><td class=\"price\" >45UAH</td>" +
                "<td class=\"less change\"  data-path=\"11,0,45\" >Less</td>" +
                "<td class=\"amount\" id=amount110>1</td>" +
                "<td class=\"increase change\" data-path=\"11,0,45\" >More</td>" +
                "<td class=\"allsum\" id=\"sum110\">45UAH</td>" +
                "<td class=\"remove change\" data-path=\"11,0,45\" >Remove</td>" +
            "</tr><tr id=\"elem1,0\">" +
                "<td class=\"image\" >" +
                "<img src= \"./images/toscana.jpg\" alt=itemImage ></td><td class=\"name\">Toscana pizza</td>" +
                "<td class=\"size\" >20cm</td><td class=\"empty\"></td>" +
                "<td class=\"price\" >140UAH</td><td class=\"less change\"  data-path=\"1,0,140\" >Less</td>" +
                "<td class=\"amount\" id=amount10>1</td><td class=\"increase change\" data-path=\"1,0,140\" >More</td>" +
                "<td class=\"allsum\" id=\"sum10\">140UAH</td><td class=\"remove change\" data-path=\"1,0,140\" >Remove</td></tr>" +
        "</table></div><hr style=\"width:80%;\">" +
        "<table class=\"itemList\"><tr><td style=\"font-weight:bolder;height:100%;\"> All price </td><td></td><td></td><td></td><td id=\"allsum\" style=\"font-weight:bolder\">185UAH</td></tr></table>" +
    "<button id=\"confirm\" data-path=\"#order\"> CONFIRM </button></div><button id=\"clearorderlist\" data-path=\"#all\"> Clear order list </button></div>"
);
})