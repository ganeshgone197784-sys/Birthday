/* ============ EDIT EVERYTHING HERE ============ */
const C={
 his:"[HIS NAME]",
 her:"[HER NAME]",
 // Scene 3 message: one line per item, written from her. Fill in later.
 message:["[MESSAGE LINE 1 — what you love about him]","[MESSAGE LINE 2 — a memory you shared]","[MESSAGE LINE 3 — what he means to you]"],
 // Quiz: q = question, o = options, a = index of correct option (0 = first)
 quiz:[
  {q:"[QUESTION 1 — e.g. Who fell first?]",o:["[Option A]","[Option B]","[Option C]"],a:0},
  {q:"[QUESTION 2 — what she loves most about you]",o:["[Option A]","[Option B]","[Option C]"],a:0},
  {q:"[QUESTION 3 — which nickname she calls you]",o:["[Option A]","[Option B]","[Option C]"],a:0},
  {q:"[QUESTION 4 — which moment means the most to her]",o:["[Option A]","[Option B]","[Option C]"],a:0},
  {q:"[QUESTION 5 — what makes your relationship special]",o:["[Option A]","[Option B]","[Option C]"],a:0}
 ],
 captions:["[CAPTION FOR PHOTO 1]","[CAPTION FOR PHOTO 2]","[CAPTION FOR PHOTO 3]"],
 finalMsg:["[FINAL MESSAGE LINE 1]","[FINAL MESSAGE LINE 2]"],
 herLine:"[A last personal line from her]",
 secret:["[SECRET ROMANTIC MESSAGE — line 1]","[line 2]"]
};
/* ============ ENGINE ============ */
const $=id=>document.getElementById(id),wait=ms=>new Promise(r=>setTimeout(r,ms));
let cur=$('s0');
function go(id){cur.classList.remove('on');cur=$(id);cur.classList.add('on');cur.scrollTop=0}
async function seq(el,lines,gap=2300,cls='line'){el.innerHTML='';for(const t of lines){const d=document.createElement('div');d.className=cls;d.textContent=t;el.appendChild(d);await wait(60);d.classList.add('in');await wait(gap)}}
const show=b=>$(b).classList.add('in');
/* particles: floating hearts + confetti, capped for phones */
const cv=$('fx'),cx=cv.getContext('2d');let W,H,P=[],heartsOn=true;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight}rs();addEventListener('resize',rs);
function heart(x,y,s,c){cx.fillStyle=c;cx.beginPath();cx.moveTo(x,y+s*.3);cx.bezierCurveTo(x,y-s*.3,x-s,y-s*.3,x-s,y+s*.3);
cx.bezierCurveTo(x-s,y+s*.8,x,y+s*1.1,x,y+s*1.4);cx.bezierCurveTo(x,y+s*1.1,x+s,y+s*.8,x+s,y+s*.3);cx.bezierCurveTo(x+s,y-s*.3,x,y-s*.3,x,y+s*.3);cx.fill()}
function spawn(n,burst){for(let i=0;i<n&&P.length<70;i++)P.push(burst?{t:'c',x:W/2,y:H/2,vx:(Math.random()-.5)*14,vy:-Math.random()*14-3,s:4+Math.random()*5,c:`hsl(${[340,350,20,300][i%4]},85%,${60+Math.random()*20}%)`,l:160}
:{t:'h',x:Math.random()*W,y:H+20,vx:(Math.random()-.5)*.4,vy:-.5-Math.random()*.9,s:5+Math.random()*9,c:`rgba(255,${90+Math.random()*60|0},${120+Math.random()*60|0},${.25+Math.random()*.4})`,l:600})}
(function loop(){cx.clearRect(0,0,W,H);if(heartsOn&&Math.random()<.06)spawn(1);
P=P.filter(p=>{p.x+=p.vx;p.y+=p.vy;p.l--;if(p.t=='c'){p.vy+=.25;cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.s,p.s*.6)}else heart(p.x,p.y,p.s,p.c);return p.l>0&&p.y>-40});
requestAnimationFrame(loop)})();
const hb=n=>{for(let i=0;i<n;i++)setTimeout(()=>{P.push({t:'h',x:W/2+(Math.random()-.5)*W*.6,y:H/2,vx:(Math.random()-.5)*2,vy:-1-Math.random()*2,s:8+Math.random()*10,c:'rgba(255,90,122,.8)',l:140})},i*40)};
/* music */
const aud=$('aud'),mb=$('music');
mb.onclick=()=>{if(aud.paused){aud.play().then(()=>mb.classList.add('playing')).catch(()=>{})}else{aud.pause();mb.classList.remove('playing')}};
/* Screen 1 */
(async()=>{await wait(800);await seq($('intro'),["Hey... 👀","Someone made something special for you...","Ready?"],2200,'line big');show('b0')})();
$('b0').onclick=async()=>{aud.play().then(()=>mb.classList.add('playing')).catch(()=>{});go('s1');
 const b=$('bday');b.innerHTML=`<h1 class="line">Happy Birthday,<br>${C.his} ❤️</h1>`;await wait(300);b.firstChild.classList.add('in');
 await wait(2800);const l=document.createElement('p');l.className='line';l.textContent="But this isn't just another birthday wish...";b.appendChild(l);await wait(50);l.classList.add('in');
 await wait(2800);const m=document.createElement('p');m.className='line';m.textContent="It's a little journey through your story.";b.appendChild(m);await wait(50);m.classList.add('in');await wait(1800);show('b1')};
/* Screen 3 quiz */
let qi=0;
$('b1').onclick=()=>{go('s2');ask()};
function ask(){const q=C.quiz[qi];$('qd').textContent=`${qi+1} / ${C.quiz.length}`;$('qq').textContent=q.q;$('fb').textContent='';
 const o=$('qo');o.innerHTML='';q.o.forEach((t,i)=>{const b=document.createElement('button');b.className='opt';b.textContent=t;b.onclick=()=>pick(b,i);o.appendChild(b)})}
async function pick(b,i){const q=C.quiz[qi];document.querySelectorAll('.opt').forEach(x=>x.disabled=true);
 if(i==q.a){b.classList.add('ok');$('fb').textContent="Okayyy... you actually know her ❤️";hb(18)}else{b.classList.add('no');$('fb').textContent="Hmm... nice try 😂"}
 await wait(1800);qi++;if(qi<C.quiz.length)ask();else endQuiz()}
async function endQuiz(){go('s2b');const w=$('wait');await seq(w,["WAIT...","YOU KNOW HER REALLY WELL ❤️"],1800,'line big');show('b2b')}
/* Screen 4 message */
$('b2b').onclick=async()=>{go('s3');const m=$('msg');
 await wait(1200);await seq(m,["There are some things that are easier to feel than to say...",...C.message,"But there's one thing she never wants you to forget..."],2800);
 await wait(1500);m.style.transition='opacity 1.5s';m.style.opacity=0;await wait(2200);m.style.display='none';
 document.body.style.background='#000';$('burst').classList.add('go');$('lovebig').classList.add('in');hb(40);await wait(5000);show('b3')};
/* Screen 5 moments */
$('b3').onclick=()=>{document.body.style.background='';go('s4');
 C.captions.forEach((t,i)=>$('c'+(i+1)).textContent=t);
 const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('seen');if(x.target.classList.contains('a4'))hb(30)}}),{threshold:.35});
 document.querySelectorAll('.mom').forEach(m=>io.observe(m))};
document.querySelectorAll('.frame').forEach(f=>f.onclick=()=>{const i=f.querySelector('img');$('lb').querySelector('img').src=i.src;$('lb').classList.add('on')});
$('lb').onclick=()=>$('lb').classList.remove('on');
/* Screen 6 build-up */
$('b4').onclick=async()=>{go('s5');heartsOn=false;await wait(1500);
 await seq($('build'),["Three moments...","Countless feelings...","And hopefully...","A lifetime of memories still waiting to happen. ❤️"],2800,'line big');await wait(1500);
 heartsOn=true;$('hb2').textContent='';party()};
/* Screen 7 party */
async function party(){go('s6');$('hb2').innerHTML=`HAPPY BIRTHDAY<br>${C.his} ❤️`;document.body.style.filter='brightness(1.25)';
 const cols=['#a3122f','#ff5a7a','#7a2aa8','#ffb3c1'];
 for(let i=0;i<10;i++)setTimeout(()=>{const b=document.createElement('div');b.className='bal';b.style.left=Math.random()*90+'%';b.style.background=cols[i%4];b.style.animationDuration=(8+Math.random()*5)+'s';document.body.appendChild(b);setTimeout(()=>b.remove(),14000)},i*500);
 for(let i=0;i<5;i++)setTimeout(()=>spawn(30,true),i*900);await wait(7000);show('b6')}
$('b6').onclick=async()=>{document.body.style.filter='';go('s7');await wait(1200);
 await seq($('fin'),[...C.finalMsg,"Happy Birthday, "+C.his+". ❤️","Keep smiling. Keep being you.",C.herLine],2600);
 $('l2').style.opacity=1;hb(30);await wait(2500);show('b7')};
/* Secret */
$('b7').onclick=async()=>{$('secret').classList.add('on');const s=$('sec');
 await wait(800);await seq(s,["Okay... this is actually the last thing.",...C.secret,"Now go give her a hug. ❤️"],2800)};
