import {router} from '../navigate';
import {enableFetchMocks} from 'jest-fetch-mock';
import 'regenerator-runtime';
enableFetchMocks();

beforeEach(() => {
    console.log('worked!');
    // if you have an existing `beforeEach` just add the following lines to it
    fetchMock.mockIf(/^https?:\/\/example.com.*$/, req => {
        console.log(req);
        if (req.url.endsWith("/drinks")) {
            console.log('Worked 2')
            return {'id':'drinks','values':[10,11,12,13,14,15,16]}
        } else if (req.url.endsWith("/path2")) {
            return {
                body: "another response body",
                headers: {
                    "X-Some-Response-Header": "Some header value"
                }
            }
        } else {
            return {
                status: 404,
                body: "Not Found"
            }
        }
    })
})


test("Testing render of the drinks page",async ()=>{
    window.location.hash = "drinks";
    document.body.innerHTML = "<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">" +
        "In the cart: <span id=\"amount\">0</span>" +
        "</button>" +
        "<button id='drinkBtn'></button>"+
        "<div id='content'></div>";

    await router();
    expect(document.body.innerHTML).toEqual("<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">In the cart: <span id=\"amount\">0</span></button><button id=\"drinkBtn\" style=\"background-color: rgb(249, 231, 159);\"></button><div id=\"content\"><div class=\"goods\" id=\"goodsField\"> <div class=\"good\"><img src=\"./images/juice.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/11\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Orange juice</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\">  </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"11_40\" name=\"11\" checked=\"\" value=\"0\">0.3L</span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"11_55\" name=\"11\" value=\"1\">0.7L</span></span><br> <span id=\"unitprice11\"> One item price: 40 UAH</span><br> <button id=\"buy11\" value=\"40\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/cc.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/12\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Coca-cola</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\">  </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"12_45\" name=\"12\" checked=\"\" value=\"0\">0.5L</span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"12_55\" name=\"12\" value=\"1\">1.0L</span></span><br> <span id=\"unitprice12\"> One item price: 45 UAH</span><br> <button id=\"buy12\" value=\"45\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/fanta.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/13\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Fanta</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\">  </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"13_45\" name=\"13\" checked=\"\" value=\"0\">0.5L</span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"13_55\" name=\"13\" value=\"1\">1.0L</span></span><br> <span id=\"unitprice13\"> One item price: 45 UAH</span><br> <button id=\"buy13\" value=\"45\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/sprite.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/14\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Sprite</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\">  </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"14_45\" name=\"14\" checked=\"\" value=\"0\">0.5L</span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"14_55\" name=\"14\" value=\"1\">1.0L</span></span><br> <span id=\"unitprice14\"> One item price: 45 UAH</span><br> <button id=\"buy14\" value=\"45\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/morshynska.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/15\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Morshynska water.</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\">  </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"15_30\" name=\"15\" checked=\"\" value=\"0\">0.5L</span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"15_40\" name=\"15\" value=\"1\">1.0L</span></span><br> <span id=\"unitprice15\"> One item price: 30 UAH</span><br> <button id=\"buy15\" value=\"30\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/redvine.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/16\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Red vine</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Red vine directly from Moldova. </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"16_250\" name=\"16\" checked=\"\" value=\"0\">0.75L</span></span><br> <span id=\"unitprice16\"> One item price: 250 UAH</span><br> <button id=\"buy16\" value=\"250\" class=\"buy\">Buy</button></div></div></div>");
})

test("Testing render of the sushis page",async ()=>{
    window.location.hash = "sushi";
    document.body.innerHTML = "<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">" +
        "In the cart: <span id=\"amount\">0</span>" +
        "</button>" +
        "<button id='sushiBtn'></button>"+
        "<div id='content'></div>";

    await router();
    expect(document.body.innerHTML).toEqual("<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">In the cart: <span id=\"amount\">0</span></button><button id=\"sushiBtn\" style=\"background-color: rgb(249, 231, 159);\"></button><div id=\"content\"><div class=\"goods\" id=\"goodsField\"> <div class=\"good\"><img src=\"./images/philadelphia.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/7\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Philadelphia roll</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Classic roll with salmon, cream cheese, avocado, tobiko caviar and cucumber. </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"7_45\" name=\"7\" checked=\"\" value=\"0\">8 pieces</span></span><br> <span id=\"unitprice7\"> One item price: 45 UAH</span><br> <button id=\"buy7\" value=\"45\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/avocado.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/8\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Avocado roll</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Roll with salmon, cream cheese, tobiko caviar and cucumber, sesame and Unagi sauce. </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"8_119\" name=\"8\" checked=\"\" value=\"0\">8 pieces</span></span><br> <span id=\"unitprice8\"> One item price: 119 UAH</span><br> <button id=\"buy8\" value=\"119\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/dragon.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/9\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Green dragon</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Dragon roll with salmon and eel punk, cream cheese, tobiko caviar, avocado, sesame and unagi sauce. </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"9_169\" name=\"9\" checked=\"\" value=\"0\">8 pieces</span></span><br> <span id=\"unitprice9\"> One item price: 169 UAH</span><br> <button id=\"buy9\" value=\"169\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/chicken.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/10\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Chicken roll</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Roll with cream cheese, punk chicken, sweet pepper, cucumber, romaine lettuce in cheddar cheese and spice sauce. </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"10_109\" name=\"10\" checked=\"\" value=\"0\">8 pieces</span></span><br> <span id=\"unitprice10\"> One item price: 109 UAH</span><br> <button id=\"buy10\" value=\"109\" class=\"buy\">Buy</button></div></div></div>"
)})


test("Testing render of the pizzas page",async ()=>{
    window.location.hash = "pizza";
    document.body.innerHTML = "<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">" +
        "In the cart: <span id=\"amount\">0</span>" +
        "</button>" +
        "<button id='pizzaBtn'></button>"+
        "<div id='content'></div>";

    await router();
    expect(document.body.innerHTML).toEqual(    '<button id="cartBtn" class="nav" style="float:right;" data-path="#cart">In the cart: <span id="amount">0</span></button><button id="pizzaBtn" style="background-color: rgb(249, 231, 159);"></button><div id="content"><div class="goods" id="goodsField"> <div class="good"><img src="./images/peperoney.jpg" alt="image" class="goodImg" data-path="#products/1"><p style="font-size: 1.2em;font-weight: bolder;">Classic peperoney pizza</p><hr style="width:80%;"><p style="margin-bottom:0;"> Pizza with Mozarella, Peperoney tomatoes and BBQ sause. </p><span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="1_169" name="1" checked="" value="0">20cm</span></span><br> <span id="unitprice1"> One item price: 169 UAH</span><br> <button id="buy1" value="169" class="buy">Buy</button></div> <div class="good"><img src="./images/toscana.jpg" alt="image" class="goodImg" data-path="#products/2"><p style="font-size: 1.2em;font-weight: bolder;">Toscana pizza</p><hr style="width:80%;"><p style="margin-bottom:0;"> Pizza with Chicken, Feta, Mozarella, Cherry tomatoes, Al\'fredo sauce, Spinach. </p><span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="2_140" name="2" checked="" value="0">20cm</span></span><br> <span id="unitprice2"> One item price: 140 UAH</span><br> <button id="buy2" value="140" class="buy">Buy</button></div> <div class="good"><img src="./images/bavarian.jpg" alt="image" class="goodImg" data-path="#products/3"><p style="font-size: 1.2em;font-weight: bolder;">Bavarian pizza</p><hr style="width:80%;"><p style="margin-bottom:0;"> Pizza with Bavarian Sausages, Mozarella, Parmesan and BBQ sause. </p><span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="3_145" name="3" checked="" value="0">20cm</span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="3_165" name="3" value="1">30cm</span></span><br> <span id="unitprice3"> One item price: 145 UAH</span><br> <button id="buy3" value="145" class="buy">Buy</button></div> <div class="good"><img src="./images/diablo.jpg" alt="image" class="goodImg" data-path="#products/4"><p style="font-size: 1.2em;font-weight: bolder;">Diablo pizza</p><hr style="width:80%;"><p style="margin-bottom:0;"> Pizza with Mozzarella, Pepperoni, Chili pepper, Bell pepper, Onion, BBQ sauce, Chili sauce, Parsley.<font style="color:red">Spicy.</font> </p><span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="4_119" name="4" checked="" value="0">20cm</span></span><br> <span id="unitprice4"> One item price: 119 UAH</span><br> <button id="buy4" value="119" class="buy">Buy</button></div> <div class="good"><img src="./images/margarita.jpg" alt="image" class="goodImg" data-path="#products/5"><p style="font-size: 1.2em;font-weight: bolder;">Margarita pizza</p><hr style="width:80%;"><p style="margin-bottom:0;"> Pizza with Mozarella and Dominos sause. </p><span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="5_109" name="5" checked="" value="0">20cm</span></span><br> <span id="unitprice5"> One item price: 109 UAH</span><br> <button id="buy5" value="109" class="buy">Buy</button></div> <div class="good"><img src="./images/cheese.jpg" alt="image" class="goodImg" data-path="#products/6"><p style="font-size: 1.2em;font-weight: bolder;">Four cheese pizza</p><hr style="width:80%;"><p style="margin-bottom:0;">  </p><span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="6_109" name="6" checked="" value="0">20cm</span></span><br> <span id="unitprice6"> One item price: 109 UAH</span><br> <button id="buy6" value="109" class="buy">Buy</button></div></div></div>'    );
})

test('Testing render of the product page',async ()=> {
    window.location.hash = 'products/11';
    document.body.innerHTML = "<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">" +
        "In the cart: <span id=\"amount\">0</span>" +
        "</button>" +
        "<button id='pizzaBtn'></button>" +
        "<div id='content'></div>";
    await router();

    expect(document.body.innerHTML).toEqual('<button id="cartBtn" class="nav" style="float:right;" data-path="#cart">In the cart: <span id="amount">0</span></button><button id="pizzaBtn"></button><div id="content"><div id="item"><div id="image"><img src="./images/juice.jpg"></div><div id="desc"><p style="font-size: 1.2em;font-weight: bolder;">Orange juice</p><hr style="width:80%;"><p style="margin-bottom:0;">  </p><span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="11_40" name="11" checked="" value="0">0.3L</span><span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="11_55" name="11" value="1">0.7L</span></span><br> <span id="unitprice11"> One item price: 40 UAH</span><br> <button id="buy11" value="40" class="buy">Buy</button></div></div></div>');
})


test('Testing render of the wrong route page',async ()=> {
    window.location.hash = 'products/111';
    document.body.innerHTML = "<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">" +
        "In the cart: <span id=\"amount\">0</span>" +
        "</button>" +
        "<button id='mainBtn'></button>" +
        "<div id='content'></div>";
    await router();

    expect(document.body.innerHTML).toEqual("<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">In the cart: <span id=\"amount\">0</span></button><button id=\"mainBtn\" style=\"background-color: rgb(249, 231, 159);\"></button><div id=\"content\"><div id=\"promos\"><div id=\"carousel\"><img class=\"promoImg\" src=\"./images/promo1.jpg\" alt=\"promoimage\" data-path=\"#promos/1\"> <img class=\"promoImg\" src=\"./images/promo2.jpg\" alt=\"promoimage\" data-path=\"#promos/2\"> </div><div id=\"buttons\"><button id=\"prevbutton\" style=\"display: inline-block;\">Previous</button><button id=\"nextbutton\" style=\"display: inline-block;\">Next</button></div></div><hr><span><h1 style=\"margin-left:10px;margin-top: 0px;\">The most popular orders</h1></span><div class=\"goods\" id=\"goodsField\"> <div class=\"good\"><img src=\"./images/peperoney.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/1\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Classic peperoney pizza</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Pizza with Mozarella, Peperoney tomatoes and BBQ sause. </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"1_169\" name=\"1\" checked=\"\" value=\"0\">20cm</span></span><br> <span id=\"unitprice1\"> One item price: 169 UAH</span><br> <button id=\"buy1\" value=\"169\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/toscana.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/2\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Toscana pizza</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Pizza with Chicken, Feta, Mozarella, Cherry tomatoes, Al'fredo sauce, Spinach. </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"2_140\" name=\"2\" checked=\"\" value=\"0\">20cm</span></span><br> <span id=\"unitprice2\"> One item price: 140 UAH</span><br> <button id=\"buy2\" value=\"140\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/diablo.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/4\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Diablo pizza</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Pizza with Mozzarella, Pepperoni, Chili pepper, Bell pepper, Onion, BBQ sauce, Chili sauce, Parsley.<font style=\"color:red\">Spicy.</font> </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"4_119\" name=\"4\" checked=\"\" value=\"0\">20cm</span></span><br> <span id=\"unitprice4\"> One item price: 119 UAH</span><br> <button id=\"buy4\" value=\"119\" class=\"buy\">Buy</button></div> <div class=\"good\"><img src=\"./images/avocado.jpg\" alt=\"image\" class=\"goodImg\" data-path=\"#products/8\"><p style=\"font-size: 1.2em;font-weight: bolder;\">Avocado roll</p><hr style=\"width:80%;\"><p style=\"margin-bottom:0;\"> Roll with salmon, cream cheese, tobiko caviar and cucumber, sesame and Unagi sauce. </p><span><span style=\"margin-right:20px;\"><input type=\"radio\" class=\"rb\" style=\"margin-right:5px;\" id=\"8_119\" name=\"8\" checked=\"\" value=\"0\">8 pieces</span></span><br> <span id=\"unitprice8\"> One item price: 119 UAH</span><br> <button id=\"buy8\" value=\"119\" class=\"buy\">Buy</button></div></div></div>");
})


test('Testing render of the wrong route page',async ()=> {
    window.location.hash = 'promos/2';
    document.body.innerHTML = "<button id=\"cartBtn\" class=\"nav\" style=\"float:right;\" data-path=\"#cart\">" +
        "In the cart: <span id=\"amount\">0</span>" +
        "</button>" +
        "<button id='mainBtn'></button>" +
        "<div id='content'></div>";
    await router();

    expect(document.body.innerHTML).toEqual('<button id="cartBtn" class="nav" style="float:right;" data-path="#cart">In the cart: <span id="amount">0</span></button><button id="mainBtn"></button><div id="content"><div id="promoContainer"><div id="promoImage"><img src="./images/promo2.jpg" alt="promoimage"></div><div id="promoDescription"><h2 style="text-align:center;">50% cashback for classis pizzas</h2><br><p style="font-size:1.1em;font-weight:bolder">If you buy Peperoney or Margarita in our restaurant you will get 50% cashback!</p><p style="font-size:1.2em;font-weight:bolder">Time when promo is avaiable: 31.11.20-31.12.20</p></div></div></div>');
})
