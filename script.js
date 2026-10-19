(() => {
 'use strict';
 const menuButton = document.querySelector('.menu-toggle');
 const header = document.querySelector('.site-header');
 const nav = document.getElementById('main-nav');
 function closeMenu(){ menuButton.setAttribute('aria-expanded','false'); header.classList.remove('menu-open'); }
 menuButton.addEventListener('click',()=>{ const open=menuButton.getAttribute('aria-expanded')==='true'; menuButton.setAttribute('aria-expanded',String(!open)); header.classList.toggle('menu-open',!open); });
 nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&header.classList.contains('menu-open')){closeMenu();menuButton.focus();}});
 addEventListener('resize',()=>{if(innerWidth>820)closeMenu();});

 const video=document.getElementById('portrait-film');
 const filmControl=document.getElementById('film-control');
 const filmStatus=document.getElementById('film-status');
 const filmFallback=document.getElementById('film-fallback');
 let pausedByVisitor=false;
 video.muted=true; video.defaultMuted=true; video.playsInline=true;
 function updateFilm(){const playing=!video.paused;filmControl.querySelector('.film-symbol').textContent=playing?'Ⅱ':'▷';filmControl.querySelector('.film-label').textContent=playing?'Pause':'Film ansehen';filmControl.setAttribute('aria-label',playing?'Bildsequenz pausieren':'Bildsequenz abspielen');filmControl.setAttribute('aria-pressed',String(!playing));}
 function startFilm(){if(pausedByVisitor||document.hidden||!video.paused)return;video.muted=true;video.play().catch(updateFilm);}
 video.addEventListener('playing',()=>{video.controls=false;filmFallback.hidden=true;filmStatus.textContent='';updateFilm();});
 video.addEventListener('pause',updateFilm);
 video.addEventListener('canplay',startFilm);
 video.addEventListener('error',()=>{filmFallback.hidden=false;filmStatus.textContent='Der Film ist momentan nicht verfügbar. Sie können ihn über den Direktlink öffnen.';updateFilm();});
 filmControl.addEventListener('click',()=>{if(video.paused){pausedByVisitor=false;video.muted=true;if(video.error)video.load();video.play().catch(()=>{video.controls=true;filmFallback.hidden=false;updateFilm();});}else{pausedByVisitor=true;video.pause();}});
 function gestureFallback(event){if(!filmControl.contains(event.target))startFilm();}
 document.addEventListener('touchend',gestureFallback,{passive:true});
 document.addEventListener('click',gestureFallback);
 document.addEventListener('keydown',gestureFallback);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)startFilm();});
 addEventListener('pageshow',startFilm);
 new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting))startFilm();},{threshold:.05}).observe(video);
 updateFilm();startFilm();

 const topic=document.getElementById('enquiry-topic');
 document.querySelectorAll('[data-interest]').forEach(link=>link.addEventListener('click',()=>{topic.value=link.dataset.interest;if(!result.hidden)buildEnquiry();}));
 const form=document.getElementById('enquiry-form');
 const result=document.getElementById('enquiry-result');
 const emailLink=document.getElementById('enquiry-email');
 const preview=document.getElementById('enquiry-preview');
 const enquiryStatus=document.getElementById('enquiry-status');
 const copyStatus=document.getElementById('copy-status');
 function buildEnquiry(){
  const team=document.getElementById('enquiry-team').value.trim();
  const message=document.getElementById('enquiry-message').value.trim();
  const lines=['Guten Tag Frau Erni,','','ich interessiere mich für: '+topic.value+'.'];
  if(team)lines.push('Unternehmen / Team: '+team);
  lines.push('',message,'','Ich freue mich über eine Rückmeldung.','','Freundliche Grüße');
  const text=lines.join('\n');
  preview.value=text;
  emailLink.href='mailto:Verena.Erni@gmx.de?subject='+encodeURIComponent('Trainingsanfrage – '+topic.value)+'&body='+encodeURIComponent(text);
 }
 form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!document.getElementById('enquiry-message').value.trim()){document.getElementById('enquiry-message').setCustomValidity('Bitte beschreiben Sie Ihr Anliegen kurz.');document.getElementById('enquiry-message').reportValidity();return;}
  buildEnquiry();result.hidden=false;enquiryStatus.textContent='Ihr Entwurf ist vorbereitet. Öffnen Sie ihn in Ihrem E-Mail-Programm oder kopieren Sie den Text.';copyStatus.textContent='';result.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 });
 document.getElementById('enquiry-message').addEventListener('input',event=>event.target.setCustomValidity(''));
 form.addEventListener('input',()=>{if(!result.hidden)buildEnquiry();});
 document.getElementById('copy-enquiry').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(preview.value);copyStatus.textContent='Anfragetext kopiert.';enquiryStatus.textContent='Der Anfragetext wurde kopiert. Sie können ihn jetzt in Ihre E-Mail einfügen.';}
  catch{preview.focus();preview.select();copyStatus.textContent='Bitte kopieren Sie den markierten Text.';enquiryStatus.textContent='Der Text ist markiert. Sie können ihn manuell kopieren.';}
 });

 document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{const dialog=document.getElementById(button.dataset.dialog);dialog.showModal();}));
 document.querySelectorAll('dialog').forEach(dialog=>{
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const bounds=dialog.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)dialog.close();}});
 });
 document.getElementById('year').textContent=String(new Date().getFullYear());
})();
