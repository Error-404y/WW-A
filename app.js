const products = [
  {id:"starter",name:"Starter Supply Pack",type:"BUNDLES",category:"bundles",desc:"Everything a new recruit needs to make a strong first impression.",price:4.99,tag:"BEST FOR BEGINNERS",symbol:"S",shape:"crate",tone:["#cfd7e3","#7d9ab9","#324963"],glow:"#93b8ef"},
  {id:"gold",name:"Gold Reserve",type:"CURRENCY",category:"currency",desc:"A generous digital currency bundle for building your next strategy.",price:9.99,tag:"POPULAR",symbol:"G",shape:"circle",tone:["#ffe4a3","#d29b32","#6e491d"],glow:"#f8c550"},
  {id:"elite",name:"Elite Commander Pack",type:"BUNDLES",category:"bundles",desc:"A premium selection of items for dedicated squad leaders.",price:19.99,tag:"TOP PICK",symbol:"E",shape:"crate",tone:["#c4d8fa","#7588bb","#293866"],glow:"#739cff"},
  {id:"speed",name:"Speed-Up Collection",type:"BOOSTS",category:"boosts",desc:"Advance the pace of progression with a powerful boost set.",price:6.99,tag:"",symbol:"»",shape:"diamond",tone:["#8de9f2","#4ca7c0","#1d4c6e"],glow:"#69dbf6"},
  {id:"diamond",name:"Diamond Vault",type:"CURRENCY",category:"currency",desc:"A high-value currency pack designed for bigger ambitions.",price:24.99,tag:"GREAT VALUE",symbol:"D",shape:"diamond",tone:["#c8d9ff","#809ad2","#364d84"],glow:"#8ca9fa"},
  {id:"shield",name:"Defense Protocol",type:"BOOSTS",category:"boosts",desc:"A tactical collection centered on protection and readiness.",price:12.99,tag:"",symbol:"V",shape:"circle",tone:["#b2f0dd","#4eaa93","#21584e"],glow:"#55ccad"},
  {id:"legend",name:"Legendary Drop",type:"EXCLUSIVE",category:"special",desc:"An exclusive premium-style bundle with standout rewards.",price:49.99,tag:"EXCLUSIVE",symbol:"L",shape:"crate",tone:["#ffe2a6","#bb873e","#613d22"],glow:"#ffbc6b"},
  {id:"squad",name:"Squad Support Crate",type:"BUNDLES",category:"bundles",desc:"A versatile gift selection for your most trusted teammate.",price:14.99,tag:"",symbol:"W",shape:"crate",tone:["#d6b6ef","#8e65b5","#472f6d"],glow:"#b17ee5"}
];
const byId = Object.fromEntries(products.map(product => [product.id,product]));
const cartKey = "warfront-store-cart-v1";
let cart = {};
try {
  const saved = JSON.parse(localStorage.getItem(cartKey) || "{}");
  if(saved && typeof saved === "object" && !Array.isArray(saved)) {
    for(const [id,quantity] of Object.entries(saved)) {
      if(byId[id] && Number.isInteger(quantity) && quantity > 0 && quantity <= 99) cart[id] = quantity;
    }
  }
} catch {}
const $ = selector => document.querySelector(selector);
const money = amount => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(amount);
const totalCount = () => Object.values(cart).reduce((a,b)=>a+b,0);
const subtotal = () => Object.entries(cart).reduce((sum,[id,quantity])=>sum+byId[id].price*quantity,0);
function saveCart(){try{localStorage.setItem(cartKey,JSON.stringify(cart));}catch{}}
function renderProducts(filter="all"){
 const selected = filter === "all" ? products : products.filter(product=>product.category===filter);
 $("#resultCount").textContent = String(selected.length).padStart(2,"0");
 $("#productGrid").innerHTML = selected.map(product=>`<article class="product-card">
  ${product.tag?`<span class="product-tag">${product.tag}</span>`:""}
  <div class="product-art ${product.shape}" style="--tone1:${product.tone[0]};--tone2:${product.tone[1]};--tone3:${product.tone[2]};--glow:${product.glow}"><div class="product-shape"><span>${product.symbol}</span></div></div>
  <div class="product-card-body"><div class="product-type">${product.type}</div><h3 class="product-title">${product.name}</h3><p class="product-desc">${product.desc}</p><div class="product-bottom"><div><div class="price-label">PRICE</div><strong class="product-price">${money(product.price)}</strong></div><button type="button" class="add-button" data-add="${product.id}" aria-label="Add ${product.name} to cart">+</button></div></div>
 </article>`).join("");
}
function renderCart(){
 const count=totalCount();
 $("#cartCount").textContent=count;
 $("#drawerCartCount").textContent=`(${count})`;
 $("#cartSubtotal").textContent=money(subtotal());
 $("#checkoutTotal").textContent=money(subtotal());
 $("#checkoutButton").disabled=count===0;
 const list=Object.entries(cart);
 $("#cartItems").innerHTML=list.length?list.map(([id,quantity])=>{
   const p=byId[id];
   return `<div class="cart-row"><div class="cart-thumbnail">${p.symbol}</div><div><strong>${p.name}</strong><small>${money(p.price)} each</small><div class="qty-controls"><button type="button" data-change="${id}" data-delta="-1" aria-label="Remove one ${p.name}">−</button><span>${quantity}</span><button type="button" data-change="${id}" data-delta="1" aria-label="Add one ${p.name}">+</button></div></div><div class="cart-row-price">${money(p.price*quantity)}</div></div>`;
 }).join(""):'<div class="empty-cart"><strong>YOUR CART IS EMPTY</strong>Select a gift from the collection to get started.</div>';
 saveCart();
}
function updateCart(id,delta){
 const next=(cart[id]||0)+delta;
 if(next<=0)delete cart[id]; else cart[id]=Math.min(99,next);
 renderCart();
}
let toastTimeout;
function toast(message){
 $("#toast").textContent=message;$("#toast").classList.add("show");
 clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>$("#toast").classList.remove("show"),2300);
}
function showLayer(which){
 $("#overlay").hidden=false;
 document.body.classList.add("modal-open");
 const isCart=which==="cart";
 $("#cartDrawer").classList.toggle("open",isCart);
 $("#cartDrawer").setAttribute("aria-hidden",String(!isCart));
 $("#checkoutModal").classList.toggle("open",!isCart);
 $("#checkoutModal").setAttribute("aria-hidden",String(isCart));
 setTimeout(()=>{(isCart?$("#closeCart"):$("#closeCheckout")).focus();},60);
}
function hideLayers(){
 $("#overlay").hidden=true;
 document.body.classList.remove("modal-open");
 $("#cartDrawer").classList.remove("open");
 $("#checkoutModal").classList.remove("open");
 $("#cartDrawer").setAttribute("aria-hidden","true");
 $("#checkoutModal").setAttribute("aria-hidden","true");
 $("#cartToggle").focus();
}
document.querySelectorAll(".filter").forEach(button=>button.addEventListener("click",()=>{
 document.querySelectorAll(".filter").forEach(other=>other.classList.toggle("active",other===button));
 renderProducts(button.dataset.filter);
}));
$("#productGrid").addEventListener("click",event=>{
 const button=event.target.closest("[data-add]");
 if(!button)return;
 updateCart(button.dataset.add,1);
 toast("Added to your cart");
});
$("#cartItems").addEventListener("click",event=>{
 const button=event.target.closest("[data-change]");
 if(!button)return;
 updateCart(button.dataset.change,Number(button.dataset.delta));
});
$("#cartToggle").addEventListener("click",()=>showLayer("cart"));
$("#closeCart").addEventListener("click",hideLayers);
$("#closeCheckout").addEventListener("click",hideLayers);
$("#overlay").addEventListener("click",hideLayers);
document.addEventListener("keydown",event=>{if(event.key==="Escape" && !$("#overlay").hidden)hideLayers();});
$("#currencyButton").addEventListener("click",()=>toast("USD is the demo store currency"));
$("#checkoutButton").addEventListener("click",()=>{
 if(totalCount()===0)return;
 $("#checkoutContents").innerHTML=`<div class="checkout-alert">DEMO MODE — YOUR ORDER WILL NOT BE CHARGED OR DELIVERED.</div>
 <form id="checkoutForm"><label>RECIPIENT PLAYER ID<input name="recipientId" type="text" minlength="3" maxlength="40" autocomplete="off" placeholder="Enter player ID" required></label><label>RECIPIENT NAME <span>(OPTIONAL)</span><input name="recipientName" maxlength="40" type="text" placeholder="Player display name"></label><label>GIFT MESSAGE <span>(OPTIONAL)</span><textarea name="message" maxlength="180" rows="3" placeholder="Add a short message"></textarea></label><div class="summary-row"><span>ORDER TOTAL</span><strong>${money(subtotal())}</strong></div><button class="primary-button full" type="submit">PREVIEW DEMO ORDER <span>↗</span></button></form>`;
 showLayer("checkout");
});
$("#checkoutContents").addEventListener("submit",event=>{
 if(event.target.id!=="checkoutForm")return;
 event.preventDefault();
 const data=new FormData(event.target);
 const player=String(data.get("recipientId")||"").trim();
 if(player.length<3)return;
 const amount=money(subtotal());
 $("#checkoutContents").replaceChildren();
 const success=document.createElement("div");success.className="success-box";
 const heading=document.createElement("h4");heading.textContent="DEMO ORDER COMPLETE";
 const message=document.createElement("p");message.textContent=`Your simulated order for player ${player} totals ${amount}. No payment was taken, and no products were delivered.`;
 const close=document.createElement("button");close.type="button";close.className="primary-button full";close.textContent="BACK TO STORE";close.addEventListener("click",hideLayers);
 success.append(heading,message,close);$("#checkoutContents").append(success);
 cart={};renderCart();
});
$("#year").textContent=new Date().getFullYear();
renderProducts();
renderCart();