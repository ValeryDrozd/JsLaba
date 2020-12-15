import '../slider'
import {slider} from '../slider';

test("Slide right",()=>{
    let a = new slider();
    document.body.innerHTML = '<div id="carousel"><img className="promoImg" src="./images/promo1.jpg" alt="promoimage" data-path="#promos/1">'+
            '<img className="promoImg" src="./images/promo2.jpg" alt="promoimage" data-path="#promos/2"></div>';
    a.slideright();
    expect(a.number).toEqual(1);
})

test("Double slide right",()=>{
    let a = new slider();
    document.body.innerHTML = '<div id="carousel"><img className="promoImg" src="./images/promo1.jpg" alt="promoimage" data-path="#promos/1">'+
        '<img className="promoImg" src="./images/promo2.jpg" alt="promoimage" data-path="#promos/2"></div>';
    a.slideright();
    a.slideright();
    expect(a.number).toEqual(1);
})

test("Slide left",()=>{
    let a = new slider();
    document.body.innerHTML = '<div id="carousel"><img className="promoImg" src="./images/promo1.jpg" alt="promoimage" data-path="#promos/1">'+
        '<img className="promoImg" src="./images/promo2.jpg" alt="promoimage" data-path="#promos/2"></div>';
    a.slideright();
    a.slideleft();
    expect(a.number).toEqual(0);
})

test("Start slide left",()=>{
    let a = new slider();
    document.body.innerHTML = '<div id="carousel"><img className="promoImg" src="./images/promo1.jpg" alt="promoimage" data-path="#promos/1">'+
        '<img className="promoImg" src="./images/promo2.jpg" alt="promoimage" data-path="#promos/2"></div>';
    a.slideleft();
    expect(a.number).toEqual(0);
})