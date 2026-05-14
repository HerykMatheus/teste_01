/* ============================================
   Jornada do Cliente — Interatividade
   - Renderiza as 6 etapas
   - Anima entrada em sequência
   - Abre modal com detalhes ao clicar
   ============================================ */

// Dados das etapas (fácil de editar)
const steps = [
  {
    id: 1,
    title: 'Descoberta',
    icon: 'fa-solid fa-magnifying-glass',
    short: 'O cliente percebe uma necessidade.',
    color: 'linear-gradient(135deg, #6366f1, #06b6d4)',
    flat: '#6366f1',
    glow: 'rgba(99,102,241,.45)',
    tag: 'Awareness',
    desc: 'É o primeiro contato do cliente com a marca. Ele identifica um problema ou desejo e começa a buscar informações.',
    customHtml: `
      <div class="modal-card">
        <h4><i class="fa-solid fa-circle-play"></i> Vídeo da etapa</h4>
        <video controls preload="metadata" style="width:100%;border-radius:14px;display:block;background:#000;">
          <source src="01.mp4" type="video/mp4">
          Seu navegador não suporta vídeo HTML5.
        </video>
      </div>`
  },
  {
    id: 2,
    title: 'Consideração',
    icon: 'fa-solid fa-scale-balanced',
    short: 'Avalia opções e compara soluções.',
    color: 'linear-gradient(135deg, #06b6d4, #10b981)',
    flat: '#06b6d4',
    glow: 'rgba(6,182,212,.45)',
    tag: 'Avaliação',
    desc: 'O cliente já conhece a marca e pesquisa alternativas. Compara funcionalidades, preço, prova social e diferenciais.',
    customHtml: `
      <div class="modal-card">
        <h4><i class="fa-solid fa-window-maximize"></i> Página principal da loja</h4>
        <iframe src="loja.html?page=landing-page" style="width:100%;height:520px;border:0;border-radius:14px;background:#fff;"></iframe>
      </div>`
  },
  {
    id: 3,
    title: 'Decisão de Compra',
    icon: 'fa-solid fa-cart-shopping',
    short: 'Escolhe e finaliza a compra.',
    color: 'linear-gradient(135deg, #10b981, #f59e0b)',
    flat: '#10b981',
    glow: 'rgba(16,185,129,.45)',
    tag: 'Conversão',
    desc: 'Momento crítico: o cliente decide pela compra. Qualquer fricção pode quebrar a conversão.',
    customHtml: `
      <div class="tab-bar" data-tabs>
        <button class="tab active" data-tab="cart"><i class="fa-solid fa-cart-shopping"></i> Carrinho</button>
        <button class="tab" data-tab="checkout"><i class="fa-solid fa-credit-card"></i> Pagamento</button>
      </div>
      <div class="modal-card">
        <iframe data-tabframe src="loja.html?page=cart-page" style="width:100%;height:520px;border:0;border-radius:14px;background:#fff;"></iframe>
      </div>`
  },
  {
    id: 4,
    title: 'Experiência / Pós-compra',
    icon: 'fa-solid fa-box-open',
    short: 'Usa o produto e forma sua opinião.',
    color: 'linear-gradient(135deg, #f59e0b, #ef4444)',
    flat: '#f59e0b',
    glow: 'rgba(245,158,11,.45)',
    tag: 'Experiência',
    desc: 'O cliente usa o produto/serviço pela primeira vez. A experiência define se ele volta ou abandona.',
    customHtml: `
    <div class="modal-card">
    <h4><i class="fa-solid fa-images"></i> Registros do produto</h4>

    <div class="photo-grid">
      ${[1,2,3,4,5,6,7].map(n => `
        <a class="photo-card" href="msg${n}.png" target="_blank">
          <img src="msg${n}.png" alt="Foto ${n}" loading="lazy">
          <span>Mensagem ${n}</span>
        </a>
      `).join('')}
    </div>
  </div>
      <div class="modal-card">
        <h4><i class="fa-solid fa-truck"></i> Acompanhamento da entrega</h4>
        <iframe src="loja.html?page=tracking-page" style="width:100%;height:520px;border:0;border-radius:14px;background:#fff;"></iframe>
      </div>`
  },
  {
    id: 5,
    title: 'Fidelização',
    icon: 'fa-solid fa-heart',
    short: 'Torna-se cliente recorrente.',
    color: 'linear-gradient(135deg, #ef4444, #ec4899)',
    flat: '#ef4444',
    glow: 'rgba(236,72,153,.45)',
    tag: 'Retenção',
    desc: 'O cliente confia na marca, repete a compra e desenvolve um vínculo emocional com o produto.',
    customHtml: ''
  },
  {
    id: 6,
    title: 'Recomendação',
    icon: 'fa-solid fa-bullhorn',
    short: 'Vira embaixador espontâneo.',
    color: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
    flat: '#8b5cf6',
    glow: 'rgba(139,92,246,.45)',
    tag: 'Advocacia',
    desc: 'Encantado, o cliente recomenda ativamente para amigos, colegas e nas redes — vira embaixador da marca.',
    customHtml: `
      <div class="modal-card">
        <h4><i class="fa-solid fa-star"></i> Página de avaliação / recomendação</h4>
        <iframe src="loja.html?page=rating-page" style="width:100%;height:560px;border:0;border-radius:14px;background:#fff;"></iframe>
      </div>`
  }
];

// Renderiza etapas na timeline
const timeline = document.getElementById('timeline');

steps.forEach((s, i) => {
  const el = document.createElement('div');
  el.className = 'step';
  el.style.animationDelay = `${0.5 + i * 0.15}s`;
  el.style.setProperty('--step-color', s.color);
  el.style.setProperty('--step-glow', s.glow);
  el.style.setProperty('--step-flat', s.flat);

  el.innerHTML = `
    <button class="step-icon" data-step="${i}" aria-label="Abrir detalhes: ${s.title}">
      <span class="step-number">${String(s.id).padStart(2,'0')}</span>
      <i class="${s.icon}"></i>
    </button>
    <h3 class="step-title">${s.title}</h3>
    <p class="step-desc">${s.short}</p>
    <span class="step-card"><i class="fa-solid fa-tag"></i> ${s.tag}</span>
  `;
  timeline.appendChild(el);
});

// Modal
const backdrop = document.getElementById('modalBackdrop');
const modalClose = document.getElementById('modalClose');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalIcon = document.getElementById('modalIcon');
const modalStep = document.getElementById('modalStep');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalCustom = document.getElementById('modalCustom');
const modal = backdrop.querySelector('.modal');

function openModal(index) {
  const s = steps[index];
  modal.style.setProperty('--modal-color', s.color);
  modal.style.setProperty('--modal-glow', s.glow);
  modal.style.setProperty('--modal-flat', s.flat);
  modalIcon.style.setProperty('--modal-color', s.color);
  modalIcon.style.setProperty('--modal-glow', s.glow);

  modalIcon.innerHTML = `<i class="${s.icon}"></i>`;
  modalStep.textContent = `Etapa ${String(s.id).padStart(2,'0')} · ${s.tag}`;
  modalTitle.textContent = s.title;
  modalDesc.textContent = s.desc;
  modalCustom.innerHTML = s.customHtml || '';

  // Tabs (etapa 03)
  const tabBar = modalCustom.querySelector('[data-tabs]');
  if (tabBar) {
    const frame = modalCustom.querySelector('[data-tabframe]');
    tabBar.querySelectorAll('.tab').forEach(t => {
      t.addEventListener('click', () => {
        tabBar.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
        t.classList.add('active');
        const target = t.dataset.tab === 'checkout' ? 'checkout-page' : 'cart-page';
        frame.src = `loja.html?page=${target}`;
      });
    });
  }

  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (modalCustom) modalCustom.innerHTML = '';
}

// Eventos: clique nos ícones
document.querySelectorAll('.step-icon').forEach(btn => {
  btn.addEventListener('click', () => openModal(Number(btn.dataset.step)));
});

modalClose.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Ano dinâmico no rodapé
document.getElementById('year').textContent = new Date().getFullYear();
