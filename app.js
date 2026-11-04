const products=[
{id:"diamonds100",name:"Diamond Supply Pack",category:"resources",price:4.99,tag:"HOT",description:"A starter resource pack for your next mission.",symbol:"D",shape:"gem",colors:["#9ceaff","#4099d8","#24549e"],glow:"#a2d9ff"},
{id:"resources",name:"Essential Resources Pack",category:"resources",price:9.99,tag:"",description:"A selection of resources for headquarters upgrades.",symbol:"R",shape:"box",colors:["#e4c88e","#a67d46","#624a30"],glow:"#e8c896"},
{id:"speedup",name:"Speedup Bundle",category:"boosts",price:4.99,tag:"",description:"A useful bundle to speed up your next upgrades.",symbol:"S",shape:"gem",colors:["#a4f5de","#39a995","#1d675e"],glow:"#b4f4e6"},
{id:"elite",name:"Elite Supply Crate",category:"special",price:19.99,tag:"POPULAR",description:"An enhanced selection of high-value digital gifts.",symbol:"E",shape:"box",colors:["#eec78a","#d38a30","#7f461c"],glow:"#ffd08e"},
{id:"coins",name:"Gold Reserve Pack",category:"resources",price:9.99,tag:"",description:"Gold resources for building and strategic upgrades.",symbol:"G",shape:"coin",colors:["#ffe198","#e7b33c","#956116"],glow:"#ffd56b"},
{id:"construction",name:"Construction Support",category:"boosts",price:14.99,tag:"",description:"A collection designed around faster development.",symbol:"C",shape:"box",colors:["#b5d7f6","#5796ce","#23518b"],glow:"#b4d7fc"},
{id:"commander",name:"Commander Gift Pack",category:"special",price:49.99,tag:"LIMITED",description:"Premium-style rewards for your trusted teammate.",symbol:"P",shape:"coin",colors:["#ffe5a3","#d4a03e","#7b4d17"],glow:"#ffde8c"},
{id:"operations",name:"Operations Booster",category:"boosts",price:24.99,tag:"",description:"A powerful assortment of demonstration boosts.",symbol:"O",shape:"gem",colors:["#e0c2ff","#9772cb","#594184"],glow:"#c7a5ef"}
];
const productMap=Object.fromEntries(products.map(p=>[p.id,p]));
const storageKey="pcgift-demo-cart-v2";
let cart={};
try{const saved=JSON.parse(localStorage.getItem(storageKey)||"{}");if(saved&&typeof saved==="object"&&!Array.isArray(saved)){for(const [id,qty] of Object.entries(saved)){if(productMap[id]&&Number.isInteger(qty)&&qty>0&&qty<=99)cart[id]=qty;}}}catch{}
const $=id=>document.getElementById(id);
const money=value=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(value);
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
const total=()=>Object.entries(cart).reduce((sum,[id,qty])=>sum+productMap[id].price*qty,0);
function save(){try{localStorage.setItem(storageKey,JSON.stringify(cart));}catch{}}
function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2100)}
function selectTab(name){const packs=name==="packs";$("packScreen").hidden=!packs;$("cartScreen").hidden=packs;$("tabPacks").classList.toggle("active",packs);$("tabCart").classList.toggle("active",!packs);$("navPacks").classList.toggle("selected",packs);$("navCart").classList.toggle("selected",!packs);if(!packs)renderCart();window.scrollTo({top:Math.max(0,document.querySelector(".store-tabs").getBoundingClientRect().top+window.scrollY-80),behavior:"smooth"})}
function productHTML(p){return `<article class="product-card"><div class="product-art" style="--tone1:${p.colors[0]};--tone2:${p.colors[1]};--tone3:${p.colors[2]};--glow:${p.glow}">${p.tag?`<span class="product-tag">${p.tag}</span>`:""}<div class="item-shape ${p.shape}"><span>${p.symbol}</span></div></div><div class="product-info"><h3>${p.name}</h3><p class="product-description">${p.description}</p><div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-button" type="button" data-add="${p.id}" aria-label="Add ${p.name} to cart">Add to Cart</button></div></div></article>`}
function renderProducts(filter="all"){const selected=filter==="all"?products:products.filter(p=>p.category===filter);$("packCount").textContent=String(selected.length);$("productGrid").innerHTML=selected.map(productHTML).join("")}
function renderCart(){const n=count();$("navCount").textContent=n;$("tabCount").textContent=n;$("summaryItems").textContent=n;$("summaryTotal").textContent=money(total());$("finalTotal").textContent=money(total());$("modalTotal").textContent=money(total());$("checkoutBtn").disabled=n===0;const rows=Object.entries(cart);$("cartList").innerHTML=rows.length?rows.map(([id,qty])=>{const p=productMap[id];return `<div class="cart-row"><div class="cart-thumbnail">${p.symbol}</div><div class="cart-text"><strong>${p.name}</strong><small>${money(p.price)} each</small><div class="qty"><button type="button" data-id="${id}" data-delta="-1" aria-label="Remove one ${p.name}">−</button><span>${qty}</span><button type="button" data-id="${id}" data-delta="1" aria-label="Add one ${p.name}">+</button></div></div><div class="cart-price">${money(p.price*qty)}</div></div>`}).join(""):'<div class="cart-empty">Your shopping cart is empty. Choose a gift pack to get started.</div>';save()}
function changeCart(id,difference){const next=(cart[id]||0)+difference;if(next<1)delete cart[id];else cart[id]=Math.min(next,99);renderCart()}
function openModal(){if(!count())return;$("modalTotal").textContent=money(total());$("modalBackdrop").hidden=false;$("checkoutModal").classList.add("open");$("checkoutModal").setAttribute("aria-hidden","false");document.body.classList.add("lock");setTimeout(()=>$("closeModal").focus(),30)}
function closeModal(){$("modalBackdrop").hidden=true;$("checkoutModal").classList.remove("open");$("checkoutModal").setAttribute("aria-hidden","true");document.body.classList.remove("lock");$("checkoutBtn").focus()}
$("navPacks").addEventListener("click",e=>{e.preventDefault();selectTab("packs")});
$("navCart").addEventListener("click",()=>selectTab("cart"));
$("tabPacks").addEventListener("click",()=>selectTab("packs"));
$("tabCart").addEventListener("click",()=>selectTab("cart"));
$("continueShopping").addEventListener("click",()=>selectTab("packs"));
$("filters").addEventListener("click",e=>{const button=e.target.closest("[data-filter]");if(!button)return;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===button));renderProducts(button.dataset.filter)});
$("productGrid").addEventListener("click",e=>{const button=e.target.closest("[data-add]");if(!button)return;changeCart(button.dataset.add,1);toast("Pack added to cart")});
$("cartList").addEventListener("click",e=>{const b=e.target.closest("[data-id]");if(b)changeCart(b.dataset.id,Number(b.dataset.delta))});
$("checkoutBtn").addEventListener("click",openModal);
$("closeModal").addEventListener("click",closeModal);
$("modalBackdrop").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("modalBackdrop").hidden)closeModal()});
$("langBtn").addEventListener("click",()=>toast("English is the current demo language"));
$("modalBody").addEventListener("submit",e=>{if(e.target.id!=="giftForm")return;e.preventDefault();const data=new FormData(e.target);const player=String(data.get("playerId")||"").trim();if(player.length<3)return;const value=money(total());const result=document.createElement("div");result.className="success-message";const title=document.createElement("h3");title.textContent="Gift Order Preview";const paragraph=document.createElement("p");paragraph.textContent=`Demo gift for player ${player}, total ${value}. This is only a preview. No payment was collected and no items were delivered.`;const close=document.createElement("button");close.type="button";close.className="buy-button wide";close.textContent="Return to Store";close.addEventListener("click",()=>{closeModal();selectTab("packs")});result.append(title,paragraph,close);$("modalBody").replaceChildren(result);cart={};renderCart()});
renderProducts();renderCart();