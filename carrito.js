
// Carrito simple con localStorage
const products = [
  {id:1, name:'Soporte remoto (1 hora)', price:350.00, img:'soporte.png', desc:'Soporte técnico remoto por 1 hora.'},
  {id:2, name:'Auditoría básica', price:1200.00, img:'auditoria.png', desc:'Evaluación de seguridad básica y reporte.'},
  {id:3, name:'Firewall virtual (configuración)', price:900.00, img:'firewall.png', desc:'Instalación y configuración básica de firewall.'},
  {id:4, name:'Curso: Fundamentos de Ciberseguridad', price:650.00, img:'curso.png', desc:'Curso presencial/online de 8 horas.'}
];

function formatMoney(n){ return Number(n).toFixed(2); }

function renderCatalog(){
  const c = document.getElementById('catalog');
  if(!c) return;
  c.innerHTML = '';
  products.forEach(p=>{
    const card = document.createElement('div'); card.className='card';
    card.innerHTML = `<img src="${p.img}" alt="${p.name}"><h4>${p.name}</h4><p>${p.desc}</p><div class="price">$${formatMoney(p.price)}</div><button class="btn" data-id="${p.id}">Agregar</button>`;
    c.appendChild(card);
  });
  // listeners
  document.querySelectorAll('.card .btn').forEach(b=> b.addEventListener('click', ()=> addToCart(Number(b.dataset.id))));
}

function getCart(){ return JSON.parse(localStorage.getItem('cs_cart')||'[]'); }
function saveCart(c){ localStorage.setItem('cs_cart', JSON.stringify(c)); renderCart(); }

function addToCart(id){
  const p = products.find(x=>x.id===id);
  if(!p) return;
  const cart = getCart();
  const existing = cart.find(x=>x.id===id);
  if(existing) existing.qty++;
  else cart.push({id:p.id,name:p.name,price:p.price,qty:1});
  saveCart(cart);
}

function removeFromCart(id){
  let cart = getCart();
  cart = cart.filter(x=>x.id!==id);
  saveCart(cart);
}

function clearCart(){ localStorage.removeItem('cs_cart'); renderCart(); }

function renderCart(){
  const el = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!el) return;
  const cart = getCart();
  el.innerHTML = '';
  let total=0;
  cart.forEach(item=>{
    total += item.price*item.qty;
    const div = document.createElement('div'); div.className='cart-item';
    div.innerHTML = `<div>${item.name} x${item.qty}</div><div>$${formatMoney(item.price*item.qty)} <button data-id="${item.id}" class="remove">x</button></div>`;
    el.appendChild(div);
  });
  totalEl.innerText = formatMoney(total);
  // attach remove listeners
  document.querySelectorAll('.remove').forEach(b=> b.addEventListener('click', ()=> removeFromCart(Number(b.dataset.id))));
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderCatalog();
  renderCart();
  document.getElementById('clear-cart')?.addEventListener('click', clearCart);
  document.getElementById('checkout')?.addEventListener('click', ()=>{
    alert('Simulación de pago: Gracias por su compra. (Esto es una demo)');
    clearCart();
  });
});
