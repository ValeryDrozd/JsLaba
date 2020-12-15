
//Function to get cart from localstorage
export function getCart(){
    let basket = localStorage.getItem('cart');
    if(basket!=null)basket = JSON.parse(basket);
    else
        basket = {'items':[],'amount':{},'number':0};
    return basket;
}

//Generating page with promo
export async function generatePromoPage(path){
    let promo = await fetch('https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/'+path.substr(1)).then(res => res.json());
    document.getElementById('promoImage').innerHTML = '<img src="./images/'+promo['images']+'.jpg" alt="promoimage">';
    let content = '<h2 style="text-align:center;">'+promo['title']+'</h2><br>';
    content+='<p style="font-size:1.1em;font-weight:bolder">'+promo['description']+'</p>';
    content+='<p style="font-size:1.2em;font-weight:bolder">Time when promo is avaiable: '+promo['time']+'</p>';
    document.getElementById('promoDescription').innerHTML = content;
}


//Generating slider with promo
export async function generatePromo(){
    let items = await fetch('https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/promos').then(res => res.json());
    let images = '';
    
    for(let i=0;i<items.length;i++){
        images+= '<img class="promoImg" src="./images/'+items[i]['images']+'.jpg" alt="promoimage" data-path="#promos/'+items[i]['id']+'"> ';
    }
    document.getElementById('carousel').innerHTML = images;
}


//Generating block with description
function genDescBlock(product){
    let basket = getCart();
    let form = '';
    form+= '<p style="font-size: 1.2em;font-weight: bolder;" >'+product['productName']+'</p>'; 
    form+= '<hr style="width:80%;">';
    form+= '<p style="margin-bottom:0;"> '+product['productDescription']+((product['spicy']==true)?'<font style="color:red">Spicy.</font>':'')+' </p>';
    form+= '<span>';
    for(let i=0;i<product['radius'].length;i++){
        form+= '<span style="margin-right:20px;"><input type="radio" class="rb" style="margin-right:5px;" id="'+product['id']+'_'+product['price'][i]+'"  name="'+product['id']+'" '+((i==0)?'checked':'')+' value = "'+i+'" >'+product['radius'][i]+'</span>';
    }
    form+= '</span><br>';
  
    form+=' <span id="unitprice'+product['id']+'" > One item price: '+product['price'][0]+' UAH</span><br>';
    form+=' <button id="buy'+product['id']+'" value = "'+product['price'][0]+'" class="buy" '+((basket['amount'][String([product['id'],0])]>=1)?'style = \'background-color:#2ECC71;\'':'')+' >'+((basket['amount'][String([product['id'],0])]>=0)?'In the cart':'Buy')+'</button>';
    return form;
}

//Generate block with good
export function generateBlock(product){

    let form = ' <div class="good">';
    //Adding image
    form+= '<img src="./images/'+product['url']+'.jpg" alt = "image" class="goodImg" data-path="#products/'+product['id']+'" >';
    //Adding description
    form+=genDescBlock(product);
    
    form+='</div>';
    return form;
}


//Generating items
export async function generateItems(path){
    let inds;
    //let temp = path;
    //IF PATH IS NOT ALL(SOME GROUP OF ITEMS)
    if(path!='all'){
        //GETTING ITEMS OF THAT VALUE
        inds = await fetch('https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/categories/'+path).then(res => res.json());
        inds = inds['values'];
    }

    //GETTING LIST OF THE ITEMS
    let items = await fetch('https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products').then(res => res.json());
    let forms = '';
    //GETTING END OF THE LOOP(NUMBER OF ITEMS OR LENGHT OF ARRAY WITH CATEGORY INDEXES)
    let end = ((path=='all')?items.length:inds.length);
    //GENERATING FORMS WITH ITEMS
    for(let i=0;i<end;i++){
        if(path!='all'){
            forms+=generateBlock(items[inds[i]]);
        }
        else
            forms+=generateBlock(items[i]);
    }
    return forms;
}

//GENERATING PAGE WITH ITEMS
export async function generateProduct(path){
    let product = await fetch('https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/'+path.substring(1)).then(res => res.json());
    document.getElementById('image').innerHTML = '<img src= "./images/'+product['url']+'.jpg" >';
    let desc = genDescBlock(product);
    document.getElementById('desc').innerHTML = desc;
}


//FUNCTION WITH VALIDATION
export async function valid(path){
    //GETTING GROUP OF THE PRODUCTS
    let  group = path.substr(path.indexOf('#')+1,path.indexOf('/')-1);
    //GET ID OF ITEM OF THE GROUP
    let url = path.substr(path.indexOf('/')+1);
    if(group=='products'){
        let found = false;
        //CHECKING IF ITEM WITH THAT ID EXISTS
        let tempItems = await fetch('https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products');
        let items = await tempItems.json();
        for(let i=0;i<items.length;i++){
            if(String(items[i]['id'])===url){found = true;}
        }
        if(found)return true;
        else
        return false;
    }
    if(group=='promos'){
        let items = await fetch('https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/promos').then(res => res.json());
        for(let i=0;i<items.length;i++){
            if(String(items[i]['id'])==url)return true;
        }
        return false;
    }
    if(group=='order'){
        let orders = JSON.parse(localStorage.getItem('orders'));
        if(orders==null)return false;
        if(orders['orderids'].indexOf(url)==-1)return false;
        return false;
    }
    return false;
}

//GENERATE ORDER LIST
export async function generateOrderList(){
    //GETTING DATA OF THE CART
    let basket = getCart();
    //INNERHTML TEXT THAT CART IS EMPTY
    console.log(basket['number']===0)
    if(!basket['number']){
        console.log("Entered");
        return '<h1>Your cart is empty... Buy something!</h1>';
    }
    //GETTING LIST OF PRODUCTS
    let productList = await fetch('https://my-json-server.typicode.com/ValeryDrozd/Valerydrozd.github.io/products').then(res => res.json());
    //GENERATING HEADER OF THE TABLE
    let form = '<div id="list"><table>';
    form+='<tr>';
    form+='<td class="image"></td>';
    form+='<td class="name" >Product name</td>';
    form+='<td class="size" >Product size</td>';
    form+='<td class="empty" ></td>';

    form+='<td class="oneitemprice">One item price</td>';
    form+='<td class="less"> </td>';
    form+='<td class="amount"> Amount of item</td>';
    form+='<td class="more"> </td>';
    form+='<td>Full position price</td>';
    form+='<td class="remove"></td>';
    form+='</tr>';
    //GENERATING BODY OF THE TABLE AND COUNTING ITS SUM
    let sum = 0;
    for(let i=0;i<basket['items'].length;i++){
        let productID = basket['items'][i][0]-1;
        let productSize = basket['items'][i][1]*1;
        let product=productList[productID];
        form+='<tr id="elem'+productID+','+productSize+'">';
        form+='<td class="image" >';
        //Photo
        form+= '<img src= "./images/'+product['url']+'.jpg" alt=itemImage >';
        form+='</td>';
        form+='<td class="name">';
        //NAME
        form+= String(product['productName']);
        form+='</td>';
        form+='<td class="size" >';
        //RADIUS
        form+= String(product['radius'][productSize]);
        form+='</td>';
        //EMPTY
        form+='<td class="empty"></td>';
        //PRICE
        form+='<td class="price" >';
        form+= String(product['price'][productSize*1])+'UAH';
        form+='</td>';
        //DECREASE

        form+='<td class="less change"  data-path="'+productID+','+productSize+','+String(product['price'][productSize*1])+'" >';
        form+= 'Less';
        form+='</td>';
        //AMOUNT
        form+='<td class="amount" id=amount'+String(productID)+String(productSize)+'>';
        form+=  String(basket['amount'][basket['items'][i]]);
        sum+=basket['amount'][basket['items'][i]]*product['price'][productSize*1];
        form+='</td>';
        //INCREASE
        form+='<td class="increase change" data-path="'+productID+','+productSize+','+String(product['price'][productSize*1])+'" >';
        form+=  'More';
        form+='</td>';
        //FINALSUM
        form+='<td class="allsum" id="sum'+String(productID)+String(productSize)+'">';
        form+=  String(basket['amount'][basket['items'][i]]*product['price'][productSize*1])+'UAH';
        form+='</td>';
        //REMOVE
        form+='<td class="remove change" data-path="'+productID+','+productSize+','+String(product['price'][productSize*1])+'" >';
        form+=  'Remove';
        form+='</td></tr>';

    }
    form+='</table></div>';
    //GENERATING TABLE WITH SUM
    form+='<hr style="width:80%;">';
    form += '<table class="itemList"><tr><td style="font-weight:bolder;height:100%;"> All price </td><td></td><td></td><td></td><td id="allsum" style="font-weight:bolder">'+sum+'UAH</td></tr></table>';
    form += '<button id="confirm" data-path="#order"> CONFIRM </button></div>';
    form += '<button id="clearorderlist" data-path="#all"> Clear order list </button></div>';
    return form;
}
