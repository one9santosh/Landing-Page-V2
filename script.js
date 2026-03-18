/* ============================================================
   TECHYGUIDE – JS  |  Orange & Teal Theme
============================================================ */

/* ─── 1. NAVBAR ─── */
const navbar   = document.getElementById('navbar');
const ham      = document.getElementById('ham');
const drawer   = document.getElementById('mobileDrawer');
const floatCta = document.getElementById('floatCta');

window.addEventListener('scroll', () => {
  const down = window.scrollY > 60;
  navbar.classList.toggle('scrolled', down);
  floatCta.classList.toggle('visible', down);
}, { passive: true });

function toggleDrawer(open) {
  drawer.classList.toggle('open', open);
  const [a, b, c] = ham.querySelectorAll('span');
  if (open) {
    a.style.cssText = 'transform:rotate(45deg) translateY(7px)';
    b.style.opacity = '0';
    c.style.cssText = 'transform:rotate(-45deg) translateY(-7px)';
  } else {
    [a, b, c].forEach(s => { s.style.cssText = ''; });
  }
}

ham.addEventListener('click', () => toggleDrawer(!drawer.classList.contains('open')));

// Close drawer on link click
drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => toggleDrawer(false));
});

// Close drawer on outside tap
document.addEventListener('click', e => {
  if (drawer.classList.contains('open') && !navbar.contains(e.target)) {
    toggleDrawer(false);
  }
});


/* ─── 2. SCROLL REVEAL ─── */
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.reveal').forEach(el => ro.observe(el));


/* ─── 3. COUNTER ANIMATION ─── */
function animCount(el, target, dur = 1600) {
  const big = target >= 1000;
  const t0  = performance.now();
  function tick(now) {
    const p   = Math.min((now - t0) / dur, 1);
    const val = Math.round(target * (1 - Math.pow(1 - p, 3)));
    el.textContent = big && val >= 1000 ? Math.round(val / 1000) + 'K' : val;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = big ? Math.round(target / 1000) + 'K' : target;
  }
  requestAnimationFrame(tick);
}

const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const t = parseInt(e.target.dataset.target, 10);
      if (!isNaN(t)) animCount(e.target, t);
      co.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => co.observe(el));


/* ─── 4. TESTIMONIALS — handled by CSS marquee, no JS needed ─── */



/* ─── 5. FAQ ACCORDION ─── */
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const was = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!was) item.classList.add('open');
  });
});


/* ─── 6. LEAD FORM ─── */
// (function initForm() {
//   const form    = document.getElementById('mainLeadForm');
//   if (!form) return;
//   const btnTxt  = form.querySelector('#submitText');
//   const btnLoad = form.querySelector('#submitLoader');
//   const success = form.querySelector('#formSuccess');

//   const fields = {
//     fname: {
//       el:  form.querySelector('#fname'),
//       err: form.querySelector('#fnameErr'),
//       fn:  v => v.trim().length >= 2 ? '' : 'Please enter your full name.'
//     },
//     phone: {
//       el:  form.querySelector('#phone'),
//       err: form.querySelector('#phoneErr'),
//       fn:  v => /^[+\d\s\-()]{7,16}$/.test(v.trim()) ? '' : 'Enter a valid phone number.'
//     },
//     email: {
//       el:  form.querySelector('#email'),
//       err: form.querySelector('#emailErr'),
//       fn:  v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Enter a valid email address.'
//     },
//     inst: {
//       el:  form.querySelector('#institution'),
//       err: form.querySelector('#instErr'),
//       fn:  v => v.trim().length >= 2 ? '' : 'Enter your institution name.'
//     },
//     city: {
//       el:  form.querySelector('#city'),
//       err: form.querySelector('#cityErr'),
//       fn:  v => v.trim().length >= 2 ? '' : 'Enter your city.'
//     },
//     interest: {
//       el:  form.querySelector('#interest'),
//       err: form.querySelector('#intErr'),
//       fn:  v => v !== '' ? '' : 'Please select an area of interest.'
//     }
//   };

//   Object.values(fields).forEach(({ el, err, fn }) => {
//     el.addEventListener('blur',  () => { const m = fn(el.value); err.textContent = m; el.classList.toggle('err', !!m); });
//     el.addEventListener('input', () => { if (el.classList.contains('err')) { const m = fn(el.value); err.textContent = m; el.classList.toggle('err', !!m); } });
//   });

//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     let ok = true;
//     Object.values(fields).forEach(({ el, err, fn }) => {
//       const m = fn(el.value); err.textContent = m; el.classList.toggle('err', !!m);
//       if (m) ok = false;
//     });
//     if (!ok) { form.querySelector('.err')?.scrollIntoView({ behavior:'smooth', block:'center' }); return; }

//     btnTxt.style.display  = 'none';
//     btnLoad.style.display = 'inline';
//     form.querySelector('#submitBtn').disabled = true;

//     /* ── Replace this mock delay with real API call ──
//     const data = Object.fromEntries(new FormData(form));
//     const res  = await fetch('YOUR_ENDPOINT_URL', {
//       method:'POST', headers:{'Content-Type':'application/json'},
//       body: JSON.stringify(data)
//     });
//     ─────────────────────────────────────────────────── */
//     await new Promise(r => setTimeout(r, 1500));

//     form.querySelectorAll('.fg,.frow,.lfb-top,#submitBtn,.form-note').forEach(el => el.style.display = 'none');
//     success.style.display = 'block';
//   });
// })();


const scriptURL = 'https://script.google.com/macros/s/AKfycbzbicMmqKvHtg3J7iMPQTUbScf8xo7ZwMhPk7ZCaiyICPBgttgHJwq1J9c72bfCByZeLw/exec'
const form = document.getElementById('mainLeadForm')
const submitBtn = document.getElementById('submitBtn')
const submitText = document.getElementById('submitText')
const submitLoader = document.getElementById('submitLoader')
const formSuccess = document.getElementById('formSuccess')

form.addEventListener('submit', e => {
  e.preventDefault()
  
  // Button ko disable karein aur loader dikhayein
  submitBtn.disabled = true
  submitText.style.display = 'none'
  submitLoader.style.display = 'inline-block'

  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      // Success hone par ye hoga
      submitBtn.style.display = 'none'
      formSuccess.style.display = 'block'
      form.reset() // Form saaf kar dega
    })
    .catch(error => {
      // Error aane par ye hoga
      console.error('Error!', error.message)
      alert('Oops! Data save nahi ho paya. Dobara koshish karein.')
      submitBtn.disabled = false
      submitText.style.display = 'inline-block'
      submitLoader.style.display = 'none'
    })
})

/* ─── 7. SMOOTH SCROLL (nav offset) ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 8;
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'smooth' });
  });
});


/* ─── 8. MARQUEE PAUSE ON HOVER ─── */
const mq = document.querySelector('.mq-track');
if (mq) {
  mq.addEventListener('mouseenter', () => mq.style.animationPlayState = 'paused');
  mq.addEventListener('mouseleave', () => mq.style.animationPlayState = 'running');
}


/* ─── 9. HERO TILT PARALLAX ─── */
(function() {
  const wrap = document.getElementById('heroImgWrap');
  const img  = document.getElementById('heroFloatImg');
  if (!wrap || !img) return;

  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;  // -1 to 1
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    img.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg) scale(1.03)`;
    img.style.boxShadow = `${-x * 18}px ${y * 12}px 48px rgba(17,24,39,.22)`;
  });
  wrap.addEventListener('mouseleave', () => {
    img.style.transform = '';
    img.style.boxShadow = '';
  });
})();


/* ─── 10. HERO TYPEWRITER on eyebrow ─── */
(function() {
  const el = document.querySelector('.eyebrow');
  if (!el) return;
  const full = el.textContent.trim();
  el.textContent = '';
  el.style.opacity = '1';
  // re-add the dot span
  const dot = document.createElement('span');
  dot.className = 'ey-dot';
  el.appendChild(dot);
  const textNode = document.createTextNode('');
  el.appendChild(textNode);
  let i = 0;
  const txt = ' ' + full.replace(/^\s*/, '');
  const iv = setInterval(() => {
    textNode.textContent += txt[i++];
    if (i >= txt.length) clearInterval(iv);
  }, 45);
})();


/* ─── 11. ACTIVE NAV HIGHLIGHT ─── */
const navAs   = document.querySelectorAll('.nav-center a');
const sections = document.querySelectorAll('section[id]');
const secObs  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAs.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--orange)' : '';
      });
    }
  });
}, { rootMargin: '-38% 0px -50% 0px' });
sections.forEach(s => secObs.observe(s));
