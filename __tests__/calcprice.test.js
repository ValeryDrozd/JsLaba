import {decrease, findIndexInTheArray, getSum, increase, remove} from '../js/calcprice';
import {setJumpers} from '../js/jumpers';


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

test('getcart should return its base object in localstorage is undefined',()=>{
    expect(findIndexInTheArray([[1,'2'],[3,'1']],[4,1])).toEqual(-1);
})

test('getcart should return its base object in localstorage is undefined',()=>{
    expect(findIndexInTheArray([[1,'2'],[3,'1']],[1,'2'])).toEqual(0);
})

test('Testing getting the sum',()=>{
    document.body.innerHTML = '<p id="allsum">100UAH</p>';
    expect(getSum()).toEqual(100);
})

test("Increase function test",()=>{
    global.localStorage.clear();
    document.body.innerHTML = "<p id='sum11'> </p><p id='amount11'> </p><p id='allsum'>100UAH</p><p id='amount'></p>";
    increase(1,1,150);
    expect(global.localStorage.getItem('cart')).toEqual("{\"items\":[[2,\"1\"]],\"amount\":{\"2,1\":1},\"number\":1}");
})

test("Increase function test",()=>{
    global.localStorage.clear();
    document.body.innerHTML = "<p id='sum11'> </p><p id='amount11'> </p><p id='allsum'>100UAH</p><p id='amount'></p>";
    increase(1,1,150);
    expect(global.localStorage.getItem('cart')).toEqual("{\"items\":[[2,\"1\"]],\"amount\":{\"2,1\":1},\"number\":1}");
})

test("Increase function test, when cart is not empty",()=>{
    global.localStorage.clear();
    document.body.innerHTML = "<p id='sum11'> </p><p id='amount11'> </p><p id='allsum'>100UAH</p><p id='amount'></p>";
    increase(1,1,150);
    increase(1,1,150);
    expect(global.localStorage.getItem('cart')).toEqual("{\"items\":[[2,\"1\"]],\"amount\":{\"2,1\":2},\"number\":2}");
})

test("Decrease function test, when cart is not empty",()=>{
    global.localStorage.clear();
    document.body.innerHTML = "<p id='sum11'> </p><p id='amount11'> </p><p id='allsum'>100UAH</p><p id='amount'></p>";
    increase(1,1,150);
    increase(1,1,150);
    decrease(1,1,150);
    expect(global.localStorage.getItem('cart')).toEqual("{\"items\":[[2,\"1\"]],\"amount\":{\"2,1\":1},\"number\":1}");
})
test("Decrease function test, when cart is not empty",()=>{
    global.localStorage.clear();
    document.body.innerHTML = "<p id='sum11'> </p><p id='amount11'> </p><p id='allsum'>100UAH</p><p id='amount'></p>";
    increase(1,1,150);
    increase(1,1,150);
    decrease(1,1,150);
    decrease(1,1,150);
    expect(global.localStorage.getItem('cart')).toEqual("{\"items\":[],\"amount\":{},\"number\":0}");
})

test("Decrease function test, when cart is not empty",()=>{
    global.localStorage.clear();
    document.body.innerHTML = "<p id='sum11'> </p><p id='amount11'> </p><p id='allsum'>100UAH</p><p id='amount'></p><p id='elem1,1'></p>";
    increase(1,1,150);
    remove(1,1,150);
    expect(global.localStorage.getItem('cart')).toEqual("{\"items\":[],\"amount\":{},\"number\":0}");
})


