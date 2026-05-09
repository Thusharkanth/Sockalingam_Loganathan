/* CURSOR */
const dot=document.getElementById('cursor-dot'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function animRing(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();
document.querySelectorAll('a,button,.skill-tag,.expertise-card,.achievement-card,.cert-card,.gallery-item,.photo-thumb,.training-item,.contact-card,.photo-tab').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('ch'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('ch'));
});

/* PROGRESS + NAV + SCROLL TOP */
const pbar=document.getElementById('pbar'),nb=document.getElementById('navbar'),st=document.getElementById('scrollTop');
window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  pbar.style.width=((h.scrollTop/(h.scrollHeight-h.clientHeight))*100)+'%';
  nb.classList.toggle('sc',window.scrollY>60);
  st.classList.toggle('show',window.scrollY>400);
  // active nav
  let cur='';
  document.querySelectorAll('section[id]').forEach(s=>{if(window.scrollY>=s.offsetTop-150)cur=s.id;});
  document.querySelectorAll('.nav-links a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

/* REVEAL */
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');}),{threshold:.1});
document.querySelectorAll('.reveal,.reveal-left').forEach(el=>io.observe(el));

/* LANGUAGE BARS */
const lo=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){document.querySelectorAll('.lang-fill').forEach(f=>f.style.width=f.dataset.width);lo.disconnect();}});},{threshold:.3});
const ts=document.querySelector('#training');if(ts)lo.observe(ts);

/* PHOTO TABS */
function switchTab(btn,id){
  document.querySelectorAll('.photo-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.photo-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
}

document.querySelectorAll('.photo-tab').forEach(btn=>{
  btn.addEventListener('click',()=>switchTab(btn,btn.dataset.tab));
});

st.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

/* PARALLAX HERO PHOTO */
window.addEventListener('scroll',()=>{
  const p=document.querySelector('.hero-photo-img');
  if(!p)return;
  p.style.transform=window.innerWidth>960?`translateY(${window.scrollY*.1}px)`:'';
});
