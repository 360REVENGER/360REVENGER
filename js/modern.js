const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const roles=["Entrepreneur & Web Designer","Web Designer","a little bit developer"];
let ri=0,ci=0,del=false; const role=$("#role");
function type(){const w=roles[ri]; role.textContent=del?w.slice(0,--ci):w.slice(0,++ci);let t=del?45:80;if(!del&&ci===w.length){t=1400;del=true}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;t=300}setTimeout(type,t)} type();

const header=$("#header"), progress=$("#scroll-progress");
function scrollUI(){header.classList.toggle("scrolled",scrollY>25);let h=document.documentElement.scrollHeight-innerHeight;progress.style.width=(h?scrollY/h*100:0)+"%";let pos=scrollY+innerHeight*.3,current="home";$$("main section[id]").forEach(s=>{if(pos>=s.offsetTop)current=s.id});$$(".links a").forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current))}
addEventListener("scroll",scrollUI,{passive:true});scrollUI();

$("#menu").addEventListener("click",()=>$("#links").classList.toggle("open"));
$$(".links a").forEach(a=>a.addEventListener("click",()=>$("#links").classList.remove("open")));

$("#theme").addEventListener("click",()=>{document.body.classList.toggle("light");});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");$$(".skill i",e.target).forEach(b=>b.style.width=b.dataset.value+"%");io.unobserve(e.target)}}),{threshold:.12});
$$(".reveal").forEach(e=>io.observe(e));
$("#year").textContent=new Date().getFullYear();


// Opening screen
addEventListener("load",()=>{setTimeout(()=>document.body.classList.add("opening-done"),1800)});
