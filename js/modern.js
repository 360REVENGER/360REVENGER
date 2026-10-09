const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,fine=matchMedia("(pointer:fine)").matches;
const store={get:k=>{try{return localStorage.getItem(k)}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}}};

/* ---------- EDIT YOUR CONTENT HERE ---------- */
const roles=["Entrepreneur & Web Designer","Web Designer","a little bit developer"];
const projects=[
 {t:"Personal Portfolio",c:"Web",d:"This responsive, animated portfolio built from scratch.",s:["HTML","CSS","JavaScript"]},
 {t:"Brand Identity Pack",c:"Design",d:"Logo and visual identity concepts for local businesses.",s:["Logo","Branding"]},
 {t:"Landing Page Kit",c:"Web",d:"Fast, mobile-first landing pages for small businesses.",s:["HTML","CSS"]},
 {t:"App Interface Concept",c:"UI/UX",d:"Clean mobile UI screens with a focus on usability.",s:["UI","Prototype"]},
 {t:"SEO Starter Audit",c:"SEO",d:"On-page SEO checklist and quick-win improvements.",s:["SEO","Audit"]},
 {t:"PHP Contact System",c:"Web",d:"Simple back-end form handling practice project.",s:["PHP","Forms"]}
];

/* ---------- Theme ---------- */
const themeBtn=$("#theme");
function setTheme(l){document.body.classList.toggle("light",l);themeBtn.textContent=l?"☾":"☼";store.set("theme",l?"light":"dark")}
const sv=store.get("theme");setTheme(sv?sv==="light":matchMedia("(prefers-color-scheme:light)").matches);
themeBtn.addEventListener("click",()=>setTheme(!document.body.classList.contains("light")));

/* ---------- Opening ---------- */
const done=()=>document.body.classList.add("opening-done");
addEventListener("load",()=>setTimeout(done,1800));setTimeout(done,4000);

/* ---------- Typewriter ---------- */
{let ri=0,ci=0,del=false;const el=$("#role");(function t(){const w=roles[ri];el.textContent=del?w.slice(0,--ci):w.slice(0,++ci);let d=del?45:80;if(!del&&ci===w.length){d=1400;del=true}else if(del&&!ci){del=false;ri=(ri+1)%roles.length;d=300}setTimeout(t,d)})()}

/* ---------- Scroll UI ---------- */
const header=$("#header"),prog=$("#scroll-progress"),toTop=$("#toTop"),heroBg=$(".hero-bg"),tl=$(".timeline");
function onScroll(){const y=scrollY,h=document.documentElement.scrollHeight-innerHeight;
 header.classList.toggle("scrolled",y>25);prog.style.width=(h?y/h*100:0)+"%";toTop.classList.toggle("show",y>600);
 if(!reduce&&y<innerHeight)heroBg.style.transform=`translateY(${y*.25}px)`;
 if(tl){const r=tl.getBoundingClientRect();tl.style.setProperty("--tl",Math.max(0,Math.min(100,(innerHeight*.65-r.top)/r.height*100))+"%")}}
addEventListener("scroll",onScroll,{passive:true});onScroll();
toTop.addEventListener("click",()=>scrollTo({top:0,behavior:reduce?"auto":"smooth"}));
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$(".links a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-40% 0px -55% 0px"});
$$("main section[id]").forEach(s=>spy.observe(s));

/* ---------- Menu ---------- */
const links=$("#links"),menu=$("#menu");
menu.addEventListener("click",()=>links.classList.toggle("open"));
$$(".links a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
addEventListener("keydown",e=>{if(e.key==="Escape")links.classList.remove("open")});

/* ---------- Count-up ---------- */
function count(el,to,suffix="",pad=0,dur=1600){if(reduce){el.textContent=String(to).padStart(pad,"0")+suffix;return}const t0=performance.now();(function f(t){const p=Math.min((t-t0)/dur,1),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=String(v).padStart(pad,"0")+suffix;if(p<1)requestAnimationFrame(f)})(t0)}

/* ---------- Projects ---------- */
{const box=$("#projects-list"),fl=$("#filters");const cats=["All",...new Set(projects.map(p=>p.c))];
 fl.innerHTML=cats.map((c,i)=>`<button class="chip${i?"":" active"}" data-c="${c}">${c}</button>`).join("");
 const render=c=>{box.innerHTML=projects.filter(p=>c==="All"||p.c===c).map((p,i)=>`<article class="project" style="animation-delay:${i*70}ms"><span class="tag">${p.c.toUpperCase()}</span><h3>${p.t}</h3><p>${p.d}</p><div class="stack">${p.s.map(s=>`<span>${s}</span>`).join("")}</div></article>`).join("")};
 render("All");fl.addEventListener("click",e=>{const b=e.target.closest(".chip");if(!b)return;$$(".chip",fl).forEach(x=>x.classList.toggle("active",x===b));render(b.dataset.c)})}

/* ---------- Reveal (staggered) + skills + stats ---------- */
$$(".skills .reveal,.services .reveal,.stats-grid .reveal,.timeline .reveal").forEach(e=>{const i=[...e.parentElement.children].indexOf(e);e.style.setProperty("--d",i*.09+"s")});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const t=e.target;t.classList.add("visible");
 $$(".skill",t).forEach(s=>{const i=$("i",s),v=+i.dataset.value;i.style.width=v+"%";count($("b",s),v,"%")});
 const n=$("strong[data-count]",t);if(n)count(n,+n.dataset.count,"",n.textContent.length>1&&n.dataset.count==="00"?2:0);
 io.unobserve(t)}),{threshold:.12});
$$(".reveal").forEach(e=>io.observe(e));

/* ---------- Particles ---------- */
{const hero=$(".hero"),cv=document.createElement("canvas");cv.id="particles";hero.prepend(cv);const x=cv.getContext("2d");
 let W,H,P=[],m={x:-999,y:-999},run=true;
 const size=()=>{W=cv.width=hero.clientWidth;H=cv.height=hero.clientHeight;P=Array.from({length:Math.min(90,W*H/16000|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}))};
 size();addEventListener("resize",size);
 hero.addEventListener("mousemove",e=>{const r=hero.getBoundingClientRect();m.x=e.clientX-r.left;m.y=e.clientY-r.top});hero.addEventListener("mouseleave",()=>m.x=m.y=-999);
 new IntersectionObserver(e=>{run=e[0].isIntersecting;if(run)draw()}).observe(hero);
 function draw(){if(!run||reduce)return;x.clearRect(0,0,W,H);const light=document.body.classList.contains("light"),c=light?"20,21,26":"255,255,255";
  for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
   const dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);if(d<130){p.x+=dx/d*1.6;p.y+=dy/d*1.6}
   x.fillStyle="rgba(239,63,79,.75)";x.beginPath();x.arc(p.x,p.y,1.7,0,7);x.fill()}
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);if(d<120){x.strokeStyle=`rgba(${c},${.13*(1-d/120)})`;x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke()}}
  requestAnimationFrame(draw)}
 draw()}

/* ---------- Cursor glow, tilt, magnetic ---------- */
if(fine&&!reduce){
 const g=document.createElement("div");g.className="cursor-glow";document.body.append(g);let gx=0,gy=0,tx=0,ty=0;
 addEventListener("mousemove",e=>{tx=e.clientX;ty=e.clientY;g.classList.add("on")});
 (function f(){gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;g.style.transform=`translate(${gx}px,${gy}px)`;requestAnimationFrame(f)})();
 const tilt=(el,max)=>{el.addEventListener("mousemove",e=>{const r=el.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;
  el.style.transition="transform .1s";el.style.transform=`perspective(800px) rotateY(${px*max}deg) rotateX(${-py*max}deg) translateY(-4px)`;el.style.setProperty("--mx",(px+.5)*100+"%");el.style.setProperty("--my",(py+.5)*100+"%")});
  el.addEventListener("mouseleave",()=>{el.style.transition="transform .5s";el.style.transform=""})};
 $$(".photo-frame").forEach(e=>tilt(e,10));$$(".service").forEach(e=>tilt(e,8));
 $$(".btn").forEach(b=>{b.addEventListener("mousemove",e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.2}px,${(e.clientY-r.top-r.height/2)*.3}px)`});b.addEventListener("mouseleave",()=>b.style.transform="")})}

/* ---------- Contact form (no page reload) ---------- */
{const f=$(".form"),st=$(".form-status"),btn=$("button",f);
 f.addEventListener("submit",async e=>{e.preventDefault();btn.disabled=true;st.className="form-status";st.textContent="Sending…";
  try{const r=await fetch(f.action,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}});
   if(!r.ok)throw 0;f.reset();st.classList.add("ok");st.textContent="Thanks! Your message was sent."}
  catch(_){st.classList.add("err");st.textContent="Couldn't send. Please email me directly."}
  btn.disabled=false})}

$("#year").textContent=new Date().getFullYear();
