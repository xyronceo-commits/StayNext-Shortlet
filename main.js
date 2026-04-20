/* STAYNEST — main.js */
(function () {
  'use strict';

  const apartments = [
    { id:1, name:'The Signature Loft', loc:'Victoria Island, Lagos', price:'₦45,000', per:'night', beds:1, baths:1, type:'studio', badge:'Top Rated', rating:4.9, reviews:142, img:'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80' },
    { id:2, name:'Garden View Suite', loc:'Maitama, Abuja', price:'₦65,000', per:'night', beds:2, baths:2, type:'1br', badge:'Popular', rating:4.8, reviews:98, img:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
    { id:3, name:'The Executive Flat', loc:'GRA, Port Harcourt', price:'₦55,000', per:'night', beds:2, baths:2, type:'2br', rating:4.7, reviews:67, img:'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80' },
    { id:4, name:'Skyline Penthouse', loc:'Ikoyi, Lagos', price:'₦120,000', per:'night', beds:3, baths:3, type:'3br', badge:'Luxury', rating:5.0, reviews:54, img:'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600&q=80' },
    { id:5, name:'Cozy Studio Haven', loc:'Wuse 2, Abuja', price:'₦32,000', per:'night', beds:1, baths:1, type:'studio', rating:4.6, reviews:201, img:'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80' },
    { id:6, name:'Urban Family Nest', loc:'Lekki Phase 1, Lagos', price:'₦85,000', per:'night', beds:3, baths:2, type:'3br', badge:'New', rating:4.9, reviews:12, img:'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=600&q=80' },
  ];

  const reviews = [
    { name:'Adaeze Okonkwo', loc:'Lagos', rating:'★★★★★', text:'"Absolutely stunning apartment! The photos do not do it justice. The host was responsive and the check-in was seamless. Will definitely return."', img:'https://i.pravatar.cc/60?img=21' },
    { name:'Emeka Nwachukwu', loc:'Abuja', rating:'★★★★★', text:'"Perfect location, spotlessly clean, and every amenity you could want. StayNest is my go-to for business trips. Highly recommend the Victoria Island listing!"', img:'https://i.pravatar.cc/60?img=33' },
    { name:'Fatimah Suleiman', loc:'Kano', rating:'★★★★★', text:'"My family had the most wonderful stay. The apartment was spacious, the pool was amazing, and the kids loved it. Exactly what was described. Five stars!"', img:'https://i.pravatar.cc/60?img=45' },
    { name:'Chinedu Obi', loc:'Enugu', rating:'★★★★★', text:'"I was blown away by the quality. It felt like a 5-star hotel but with so much more space and privacy. The generator backup is a huge plus. Thank you!"', img:'https://i.pravatar.cc/60?img=12' },
    { name:'Tolulope Adesanya', loc:'Ibadan', rating:'★★★★★', text:'"Used StayNest for a weekend getaway and it exceeded all expectations. Booking was instant, the apartment was immaculate. 10/10 experience!"', img:'https://i.pravatar.cc/60?img=52' },
    { name:'Musa Ibrahim', loc:'Kaduna', rating:'★★★★★', text:'"Professional service from start to finish. The 24/7 support team responded within minutes when I had a question. The apartment itself was gorgeous."', img:'https://i.pravatar.cc/60?img=7' },
  ];

  /* NAV */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => nav && nav.classList.toggle('solid', scrollY > 60));

  /* RENDER LISTINGS */
  function renderListings(filter = 'all') {
    const grid = document.getElementById('listingsGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const list = filter === 'all' ? apartments : apartments.filter(a => a.type === filter);
    list.forEach(a => {
      const card = document.createElement('div');
      card.className = 'listing-card';
      card.innerHTML = `
        <div class="listing-img">
          <img src="${a.img}" alt="${a.name}" loading="lazy"/>
          ${a.badge ? `<span class="listing-badge">${a.badge}</span>` : ''}
          <div class="listing-fav">❤️</div>
        </div>
        <div class="listing-info">
          <div class="listing-rating"><span class="star">★</span><span>${a.rating} (${a.reviews} reviews)</span></div>
          <div class="listing-name">${a.name}</div>
          <div class="listing-loc">📍 ${a.loc}</div>
          <div class="listing-footer">
            <div class="listing-price"><strong>${a.price}</strong> <span>/${a.per}</span></div>
            <button class="btn-book">Book Now</button>
          </div>
        </div>
      `;
      card.querySelector('.btn-book').addEventListener('click', () => {
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
      });
      const fav = card.querySelector('.listing-fav');
      fav.addEventListener('click', (e) => {
        e.stopPropagation();
        fav.textContent = fav.textContent === '❤️' ? '🤍' : '❤️';
      });
      grid.appendChild(card);
    });
  }

  document.querySelectorAll('.lf').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lf').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderListings(btn.dataset.f);
    });
  });
  renderListings();

  /* RENDER REVIEWS */
  function renderReviews() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid) return;
    reviews.forEach(r => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="stars">${r.rating}</div>
        <p>${r.text}</p>
        <div class="reviewer">
          <img src="${r.img}" alt="${r.name}"/>
          <div><strong>${r.name}</strong><span>📍 ${r.loc}</span></div>
        </div>
      `;
      grid.appendChild(card);
    });
  }
  renderReviews();

  /* SEARCH BTN */
  document.getElementById('searchBtn') && document.getElementById('searchBtn').addEventListener('click', () => {
    document.getElementById('listings').scrollIntoView({ behavior: 'smooth' });
  });

  /* NEWSLETTER */
  document.getElementById('nlForm') && document.getElementById('nlForm').addEventListener('submit', e => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#059669';
    setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; e.target.reset(); }, 3000);
  });

  /* REVEAL */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

})();
