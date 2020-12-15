import { routes } from '../js/getpage'
import { generatePromo,generateItems,getCart,generateProduct,valid,generateOrderList,generatePromoPage  } from '../js/functions.js';
import {genOrderList} from './makeorder'
export async function router(){
    let link = window.location.hash;
    let buttonList = document.querySelectorAll('header button');
    for(let i=0;i<buttonList.length;i++){
        buttonList[i].style.backgroundColor = 'darkorange';
    }
    document.getElementById('amount').innerText = await getCart()['number'];
    let t;
    switch(link){
        case '#sushi':
            document.getElementById('sushiBtn').style.backgroundColor = '#F9E79F';
            document.getElementById('content').innerHTML = routes['sushi'];
            document.getElementById('goodsField').innerHTML = await generateItems('sushi');
            break;
        case '#pizza':
            document.getElementById('pizzaBtn').style.backgroundColor = '#F9E79F';
            document.getElementById('content').innerHTML = routes['pizza'];
            document.getElementById('goodsField').innerHTML = await generateItems('pizza');
            break;
        case '#drinks':
            document.getElementById('drinkBtn').style.backgroundColor = '#f9e79f';
            document.getElementById('content').innerHTML = routes['drinks'];
            document.getElementById('goodsField').innerHTML = await generateItems('drinks');
            break;
        case('#cart'):
            document.getElementById('cartBtn').style.backgroundColor = '#F9E79F';
            document.getElementById('content').innerHTML = routes['cart'];
            document.getElementById('orderList').innerHTML = await generateOrderList();
            break;
        case ('#order'):
            if(getCart()['number']>0){
                document.getElementById('orderBtn').style.backgroundColor = '#F9E79F';
                document.getElementById('content').innerHTML = routes['order'];
                break;
            }else
            link = '#all';
        // eslint-disable-next-line no-fallthrough
        case '#all':
            document.getElementById('allBtn').style.backgroundColor = '#F9E79F';
            document.getElementById('content').innerHTML = routes['all'];
            document.getElementById('PizzaField').innerHTML = await generateItems('pizza');
            document.getElementById('SushiField').innerHTML = await generateItems('sushi');
            document.getElementById('DrinksField').innerHTML = await generateItems('drinks');
            break;
        case link:
            t = await valid(link);
            if(t==true){
                let group = link.substr(link.indexOf('#')+1,link.indexOf('/')-1);
                if(group=='products'){
                    document.getElementById('content').innerHTML = routes['item'];
                    await generateProduct(link);
                    break;
                }
                if(group=='promos'){
                    document.getElementById('content').innerHTML = routes['promo'];
                    await generatePromoPage(link);
                    break;
                }
                if(group=='order'){
                    document.getElementById('content').innerHTML = routes['clientorder'];
                    document.getElementById('orderList').innerHTML = await genOrderList();
                    break;
                }
            }
            window.location.hash = "";
        // eslint-disable-next-line no-fallthrough
        default:
            document.getElementById('mainBtn').style.backgroundColor = '#F9E79F';
            document.getElementById('content').innerHTML = routes['main'];
            document.getElementById('goodsField').innerHTML = await generateItems('recommended');
            await generatePromo();
            document.getElementById("prevbutton").style.display = 'inline-block';
            document.getElementById("nextbutton").style.display = 'inline-block';
            break;
    }
    
}
