const defaultProducts = [
  {id:'p1', name:'Heirloom tomatoes', farm:'Mango Hill Farm', price:110, unit:'per kg', category:'Vegetables', image:'https://images.unsplash.com/photo-1546470427-e26264be0b0c?auto=format&fit=crop&w=700&q=80', tag:'Just picked'},
  {id:'p2', name:'Tender green beans', farm:'Meadow & Co.', price:85, unit:'per 500g', category:'Vegetables', image:'https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=700&q=80', tag:'Organic'},
  {id:'p3', name:'Wildflower honey', farm:'Bee Kind Apiary', price:220, unit:'per jar', category:'Pantry', image:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80', tag:'Small batch'},
  {id:'p4', name:'Free-range eggs', farm:'Sunny Side Farm', price:145, unit:'per dozen', category:'Dairy', image:'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=700&q=80', tag:'Farm fresh'},
  {id:'p5', name:'Sweet Alphonso mangoes', farm:'Sahyadri Orchard', price:260, unit:'per box', category:'Fruits', image:'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=700&q=80', tag:'Seasonal'},
  {id:'p6', name:'Creamy A2 milk', farm:'Nandi Dairy', price:76, unit:'per litre', category:'Dairy', image:'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80', tag:'Delivered daily'},
  {id:'p7', name:'Baby spinach', farm:'Mango Hill Farm', price:65, unit:'per bunch', category:'Vegetables', image:'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=700&q=80', tag:'Just picked'},
  {id:'p8', name:'Stone-ground millet flour', farm:'Earth Grains', price:120, unit:'per kg', category:'Pantry', image:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80', tag:'Stone ground'}
];
let products = JSON.parse(localStorage.getItem('farmly-products') || 'null') || defaultProducts;
let cart = JSON.parse(localStorage.getItem('farmly-cart') || '[]');
let category = 'All', query = '';
const grid = document.querySelector('#product-grid'), cartDrawer = document.querySelector('#cart-drawer'), overlay = document.querySelector('#overlay'), sellerModal = document.querySelector('#seller-modal');
const save = () => { localStorage.setItem('farmly-products', JSON.stringify(products)); localStorage.setItem('farmly-cart', JSON.stringify(cart)); };
const money = value => `₹${value.toLocaleString('en-IN')}`;
const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
function renderProducts(){
  const visible = products.filter(p => (category === 'All' || p.category === category) && `${p.name} ${p.farm}`.toLowerCase().includes(query));
  grid.innerHTML = visible.map(p => `<article class="product-card"><div class="product-image"><img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80'"><span class="product-label">${escapeHtml(p.tag || 'Fresh from farm')}</span><button class="add-product" data-add="${escapeHtml(p.id)}" aria-label="Add ${escapeHtml(p.name)} to basket">+</button></div><div class="product-info"><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.farm)}</p><strong>${money(p.price)} <small>${escapeHtml(p.unit)}</small></strong></div></article>`).join('');
  document.querySelector('#empty-products').hidden = visible.length > 0;
}
function renderCart(){
 const items = cart.map(item => ({...item, product: products.find(p => p.id === item.id)})).filter(x => x.product);
 document.querySelector('#cart-count').textContent = items.reduce((n,x) => n+x.qty, 0);
 document.querySelector('#cart-items').innerHTML = items.map(({product,qty}) => `<div class="cart-item"><img src="${escapeHtml(product.image)}" alt=""><div><h3>${escapeHtml(product.name)}</h3><p>${qty} × ${money(product.price)} · ${escapeHtml(product.unit)}</p><strong>${money(product.price * qty)}</strong></div><button data-remove="${escapeHtml(product.id)}" aria-label="Remove ${escapeHtml(product.name)}">×</button></div>`).join('');
 document.querySelector('#cart-empty').hidden = items.length > 0;
 document.querySelector('#cart-total').textContent = money(items.reduce((n,x) => n + x.product.price*x.qty, 0));
}
function addToCart(id){ const found=cart.find(item=>item.id===id); found ? found.qty++ : cart.push({id,qty:1}); save();renderCart();toast('Added to your basket'); }
function openCart(){ cartDrawer.classList.add('open'); overlay.classList.add('show'); cartDrawer.setAttribute('aria-hidden','false'); }
function closeCart(){ cartDrawer.classList.remove('open'); overlay.classList.remove('show'); cartDrawer.setAttribute('aria-hidden','true'); }
let toastTimer; function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),2200)}
document.querySelector('#filters').addEventListener('click',e=>{const b=e.target.closest('.filter');if(!b)return;category=b.dataset.category;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));renderProducts()});
document.querySelector('#search').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();renderProducts()});
grid.addEventListener('click',e=>{const button=e.target.closest('[data-add]');if(button)addToCart(button.dataset.add)});
document.querySelector('#open-cart').addEventListener('click',openCart); document.querySelector('[data-close="cart-drawer"]').addEventListener('click',closeCart); overlay.addEventListener('click',closeCart);
document.querySelector('#cart-items').addEventListener('click',e=>{const b=e.target.closest('[data-remove]');if(!b)return;cart=cart.filter(x=>x.id!==b.dataset.remove);save();renderCart()});
document.querySelector('#checkout').addEventListener('click',()=>{if(!cart.length)return toast('Your basket is still empty');toast('Checkout is ready for the next step!');});
function openSeller(){sellerModal.showModal()} document.querySelector('#open-seller').addEventListener('click',openSeller);document.querySelector('#hero-seller').addEventListener('click',openSeller);document.querySelector('#banner-seller').addEventListener('click',openSeller);document.querySelector('[data-close="seller-modal"]').addEventListener('click',()=>sellerModal.close());
document.querySelector('#product-form').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const name=f.get('name').trim();products.unshift({id:crypto.randomUUID(),name,price:Number(f.get('price')),unit:f.get('unit').trim(),category:f.get('category'),farm:f.get('farm').trim(),image:f.get('image').trim()||'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80',tag:'New harvest'});save();category='All';query='';document.querySelector('#search').value='';document.querySelectorAll('.filter').forEach((x,i)=>x.classList.toggle('active',i===0));renderProducts();sellerModal.close();e.currentTarget.reset();toast(`${name} is now live in the market`);document.querySelector('#market').scrollIntoView({behavior:'smooth'});});
document.querySelector('#view-all').addEventListener('click',()=>{category='All';query='';document.querySelector('#search').value='';document.querySelectorAll('.filter').forEach((x,i)=>x.classList.toggle('active',i===0));renderProducts();});
renderProducts();renderCart();
