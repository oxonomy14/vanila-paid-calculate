(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();let i=[];fetch("./data/users.json").then(e=>e.json()).then(e=>{i=e,console.log(i)}).catch(e=>console.error("Ошибка загрузки:",e));const f="feedback-form-state",c={form:document.querySelector(".feedback-form"),container:document.querySelector(".feedback-message"),title:document.querySelector(".sub-title"),result:document.querySelector(".text-1"),text2:document.querySelector(".text-2"),text3:document.querySelector(".text-3")};//! Парсим xml обменника
let a=null;fetch("./exprates.xml").then(e=>e.text()).then(e=>{const t=new DOMParser().parseFromString(e,"application/xml"),s="WIRETHB",r="SBERRUB",o=Array.from(t.querySelectorAll("item")).find(l=>l.querySelector("from").textContent===s&&l.querySelector("to").textContent===r);o?(a=o.querySelector("out").textContent,console.log(`Курс ${s} → ${r}: ${a}`)):console.log("Курс не найден")}).catch(e=>console.error("Ошибка загрузки XML:",e));//! Сохраняем значения в localStorage
c.form.addEventListener("input",e=>{const t={email:e.currentTarget.elements.email.value};x(f,t)});d();//!  Загружаем данные из localStorage
function d(){const e=h(f);c.form.elements.email.value=(e==null?void 0:e.email)||""}//! Текущая дата
const u=new Date,p=String(u.getDate()).padStart(2,"0"),g=String(u.getMonth()+1).padStart(2,"0"),y=u.getFullYear(),m=`${p}.${g}.${y}`;console.log(m);//!  submit - выводим информацию
c.form.addEventListener("submit",e=>{if(e.preventDefault(),!e.currentTarget.elements.email.value){alert("Заполните поле Email для идентификации Вас");return}const n=e.currentTarget.elements.email.value.trim().toLowerCase(),t=i.find(s=>s.email.toLowerCase()===n);t?(c.title.textContent=`${t.username}, ${t.titleCourse}`,c.result.textContent=`Стоимость сессии ${t.price} Бат, что на сегодня ${m} по текущему курсу vipChanger 1 Бат = ${a} руб. составляет: ${Math.floor(t.price*a)} руб.`,c.text3.textContent=`Куратор: ${t.teacher}`,console.log(t.opt),t.opt!==""?c.text2.textContent=`Стоимость ${t.opt}-x занятий составит - ${Math.floor(t.priceOpt*a*t.opt)} руб.`:c.text2.textContent=""):c.result.textContent="Такой электронной почты нет в списке",c.form.reset()});//! функция для LocalStorage
function x(e,n){const t=JSON.stringify(n);localStorage.setItem(e,t)}function h(e){const n=localStorage.getItem(e);try{return JSON.parse(n)}catch{return n}}
//# sourceMappingURL=index.js.map
