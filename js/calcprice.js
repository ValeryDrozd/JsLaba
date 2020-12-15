import {getCart} from './functions';

export function getSum(){
    //let elem = document.getElementById('allsum');
    let value = document.getElementById('allsum').textContent.trim();
    return 1*value.substring(0,value.indexOf('U'));
}

export function  findIndexInTheArray(arr,elem){
    console.log("Array:",arr.values," Elem:",elem);
    for(let i=0;i<arr.length;i++){
       // console.log("Arr values",arr[i]," elem values ",elem,' equ ',arr[i]===elem, ' = ',arr[i]==elem);
        console.log("Comparison zero element",arr[i][0]===elem[0], "Comparison of the first element",arr[i][1]===elem[1]);
        if(arr[i][0]===elem[0] && arr[i][1]===elem[1])return i;
    }
    console.log("Returning -1");
    return -1;
}

export function increase(productID,productSize,productPrice){
    let basket = getCart();
    if(basket['amount'][String([productID+1,1*productSize])]===undefined){
        basket['amount'][String([productID+1,1*productSize])] = 1;
        basket['items'].push([productID+1,String(productSize)]);
    }
    else
    basket['amount'][String([productID+1,1*productSize])]+=1;
    document.getElementById('sum'+productID+productSize).textContent = productPrice*basket['amount'][String([productID+1,1*productSize])]+'UAH';
    document.getElementById('allsum').innerText = getSum()+productPrice+'UAH';
    document.getElementById('amount'+productID+productSize).innerText= basket['amount'][String([productID+1,1*productSize])];
    localStorage.setItem('cart',JSON.stringify(basket));
    basket['number']++;
    document.getElementById('amount').innerText = basket['number'];
    localStorage.setItem('cart',JSON.stringify(basket));
    //return basket;
}

export function decrease(productID,productSize,productPrice){
    console.log(productID,productSize,productPrice);
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);
    if( basket['amount'][String([[productID+1,1*productSize]])]>0){
        basket['amount'][String([productID+1,1*productSize])]-=1;
        let prevprice = getSum();
        document.getElementById('sum'+productID+productSize).innerText = productPrice*basket['amount'][String([productID+1,1*productSize])]+'UAH';
        document.getElementById('allsum').innerText = prevprice-productPrice+'UAH';
        basket['number']--;
        document.getElementById('amount'+productID+productSize).innerText= basket['amount'][String([productID+1,1*productSize])];
        document.getElementById('amount').innerText = basket['number'];
        localStorage.setItem('cart',JSON.stringify(basket));
        if(basket['amount'][String([productID+1,1*productSize])]===0){
            delete basket['amount'][String([[productID+1,1*productSize]])];
            basket['items'].splice(findIndexInTheArray(basket["items"],[productID+1,String(productSize)]),1);
        }
        localStorage.setItem('cart',JSON.stringify(basket));
    }
}

export function remove(productID,productSize,productPrice){
    let basket = localStorage.getItem('cart');
    basket = JSON.parse(basket);

    let newPrice =  (getSum() - ((basket['amount'][String([productID+1,1*productSize])]===undefined)?0:basket['amount'][String([productID+1,1*productSize])])*productPrice );
    document.getElementById('allsum').innerText = newPrice+'UAH';
    let newNumber = ((basket['amount'][String([productID+1,1*productSize])]===undefined)?0:basket['amount'][String([productID+1,1*productSize])]);
    console.log("Deleting from number", newNumber);
    basket['number']-=newNumber;
    if(basket['amount'][String([productID+1,1*productSize])]!==0){
        basket['items'].splice(findIndexInTheArray(basket["items"], [productID+1, String(productSize)]), 1);
    }
    delete basket['amount'][String([productID+1,1*productSize])];
    document.getElementById("elem"+String([productID,productSize])).style.display = 'none';
    if(getSum()===0){
        document.getElementById("orderList").innerHTML = "<h1 style='text-align:center'>Your cart is empty... Buy something!</h1>";
    }
    document.getElementById('amount').innerText = basket['number'];
    localStorage.setItem('cart',JSON.stringify(basket));
}
