import { router } from './navigate';
import { slider } from './slider';
import { buy, changeElem } from './buy';
import {decrease, increase, remove} from './calcprice';
import {makeorder, hideshow} from './makeorder';


// eslint-disable-next-line no-undef
global.slides = new slider();

async function jump(){
    const path = this.getAttribute('data-path');
    if(this.id==='clearorderlist')localStorage.clear();
    window.location.hash = path;
    await router();
    setJumpers();
}



export function setJumpers(){
    if(document.querySelectorAll('.good img').length!==0){
        document.querySelectorAll('.good img').forEach(el => {
            el.addEventListener('click', jump);
        });
    }
    if(document.querySelectorAll('.promoImg')){
        document.querySelectorAll('.promoImg').forEach(el => {
            el.addEventListener('click', jump);
        });
    }
    if(document.getElementById('prevbutton')){
        document.getElementById('prevbutton').addEventListener('click',function(){
            window.slides.slideleft();
        });
    }
    if(document.getElementById('nextbutton')){
        document.getElementById('nextbutton').addEventListener('click',function(){
            window.slides.slideright();
        });
    }
    if(document.querySelectorAll('.buy')){
        let btns = document.querySelectorAll('.buy');
        for(let i=0;i<btns.length;i++){
            document.getElementById(btns[i].id).addEventListener('click',function(){
                buy(btns[i].id.substr(3)*1);
            });
        }
    }

    if(document.querySelectorAll('rb')){
        let rbs = document.querySelectorAll('.rb');
        for(let i=0;i<rbs.length;i++){
            document.getElementById(rbs[i].id).addEventListener('click',function(){
                let id = rbs[i].id;
                let params = id.split('_');
                console.log(params);
                changeElem(params[0]*1,params[1]*1);
            });
        }
    }
    if(document.getElementById('confirm')){
        document.querySelectorAll('#confirm').forEach(el => {
            el.addEventListener('click', jump);
        });
        //  document.getElementById('confirm').addEventListener('click',jump);
    }
    if(document.getElementById('clearorderlist')){
        document.querySelectorAll('#clearorderlist').forEach(el => {
            el.addEventListener('click', jump);
        });
    }
    if(document.querySelectorAll('.change')){
        document.querySelectorAll('.less').forEach(el => {
            el.addEventListener('click', function () {
                let params = el.dataset['path'].split(',');
                decrease(params[0]*1,params[1]*1,params[2]*1);
            });
        });
        document.querySelectorAll('.increase').forEach(el => {
            el.addEventListener('click', function () {
                let params = el.dataset['path'].split(',');
                increase(params[0]*1,params[1]*1,params[2]*1);
            });
        });
        document.querySelectorAll('.remove').forEach(el => {
            el.addEventListener('click', function () {
                let params = el.dataset['path'].split(',');
                remove(params[0]*1,params[1]*1,params[2]*1);
            });
        });
    }
    if(document.getElementById('buybutton')){
        document.querySelectorAll('#buybutton').forEach(el => {
            el.addEventListener('click', function () {
                makeorder();
            });
        });
    }
    if(document.getElementById('paycash')){
        document.querySelector('#paycash').addEventListener('click',function () {
            hideshow(1);
        });
        document.querySelector('#paycard').addEventListener('click',function () {
            hideshow(2);
        });
    }
}

export async function init(){
    document.querySelectorAll('.nav').forEach(el => {
        el.addEventListener('click', jump);
    });
    await router();
    setJumpers();
}