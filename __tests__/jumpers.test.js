import { setJumpers } from '../js/jumpers'
import 'regenerator-runtime';
import {router} from '../js/navigate';
import {changeElem} from '../js/buy';

test("",()=>{
    localStorage.clear();
    document.body.innerHTML =
        '<div id="amount"></div><div class="good"><img src="./images/peperoney.jpg" alt="image" class="goodImg" data-path="#products/1">'+
        '<p style="font-size: 1.2em;font-weight: bolder;">Classic peperoney pizza</p>'+
        '<hr style="width:80%;"><p style="margin-bottom:0;"> Pizza with Mozarella, Peperoney tomatoes and BBQ'+
        'sause. </p><span><span style="margin-right:20px;"><input type="radio" style="margin-right:5px;"'+
        'onChange="changeElem(1,169)" name="1"'+
        'checked="" value="0">20cm</span></span><br>'+
        '<span id="unitprice1"> One item price: 169 UAH</span><br>'+
        '<button id="buy1" value="169" class="buy">Buy</button></div>';
    setJumpers();
    document.getElementById('buy1').click();
    expect(document.getElementById('buy1').innerText).toEqual('In the cart');
})


test("",()=>{
    localStorage.clear();
    document.body.innerHTML =
        '<div id="amount"></div><div class="good"><img src="./images/peperoney.jpg" alt="image" class="goodImg" data-path="#products/1">'+
        '<p style="font-size: 1.2em;font-weight: bolder;">Classic peperoney pizza</p>'+
        '<hr style="width:80%;"><p style="margin-bottom:0;"> Pizza with Mozarella, Peperoney tomatoes and BBQ'+
        'sause. </p><span><span style="margin-right:20px;"><input type="radio" style="margin-right:5px;"'+
        'onChange="changeElem(1,169)" name="1"'+
        'checked="" value="0">20cm</span></span><br>'+
        '<span id="unitprice1"> One item price: 169 UAH</span><br>'+
        '<button id="buy1" value="169" class="buy">Buy</button></div>';
    setJumpers();
    document.getElementById('buy1').click();
    expect(document.getElementById('buy1').innerText).toEqual('In the cart');
})

test("",async ()=>{
    document.body.innerHTML = '<div id="desc"><p style="font-size: 1.2em;font-weight: bolder;">Coca-cola</p>'+
        '<hr style="width:80%;"><p style="margin-bottom:0;"></p><span><span style="margin-right:20px;">' +
        '<input type="radio" style="margin-right:5px;" onChange="changeElem(12,45)" name="12" checked value="0">0.5L</span>' +
        '<span style="margin-right:20px;"><input id="chage2" type="radio" style="margin-right:5px;"'+
        'onChange="changeElem(12,55)" name="12"'+
        'value="1">1.0L</span></span><br> <span id=unitprice12> One item price: 45 UAH</span><br>'+
        '<button id="buy12" value="45" className="buy" >Buy</button>'+
        '</div>';
    setJumpers();
    document.getElementById('buy12').click();
    changeElem(12,55);
    expect(document.getElementById('buy12').innerText).toEqual('Buy');
})

test("", ()=>{
    localStorage.setItem('cart','{"items":[[12,"0"],[12,"1"]],"amount":{"12,0":1,"12,1":1},"number":2,"unitprice":0}');
    document.body.innerHTML = '<button id="clearorderlist" data-path="#all"> Clear order list </button>';
    setJumpers();
    document.getElementById('clearorderlist').click();
    expect(window.location.hash).toEqual('#all');
})

