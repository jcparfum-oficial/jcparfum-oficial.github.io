/**
 * JC PARFUM - Vitrine Maison Editorial (Modelo 2 Oficial Otimizado)
 * Cards Horizontais Panorâmicos com Pirâmide Olfativa, Estoque por Unidade,
 * Busca Instantânea, Filtros pelo Cabeçalho, Modal Legível e Sacola WhatsApp.
 */

let currentCategory = 'Todos';
let currentSearch = '';
let currentSort = 'featured';
let shoppingBag = [];

document.addEventListener('DOMContentLoaded', () => {
  initCatalog();
  setupEventListeners();
});

function initCatalog() {
  renderProductsGrid();
  updateBagUI();
}

function filterFromHeader(category) {
  currentCategory = category;
  document.querySelectorAll('.filter-pill').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-category') === category);
  });
  renderProductsGrid();
}

function setupEventListeners() {
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      renderProductsGrid();
    });
  }

  const filterButtons = document.querySelectorAll('.filter-pill');
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderProductsGrid();
    });
  });

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProductsGrid();
    });
  }

  window.addEventListener('jcCatalogUpdated', () => {
    renderProductsGrid();
  });

  window.addEventListener('storage', (e) => {
    if (e.key === JC_STORAGE_KEY) {
      renderProductsGrid();
    }
  });

  const modalBackdrop = document.getElementById('product-modal');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeProductModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      toggleBagDrawer(false);
    }
  });
}

function getFilteredProducts() {
  const all = getProducts();

  let filtered = all.filter((item) => {
    const matchesCat =
      currentCategory === 'Todos' ||
      (currentCategory === 'Disponiveis'
        ? item.inStock
        : item.category.toLowerCase() === currentCategory.toLowerCase());

    const haystack = [
      item.name,
      item.brand,
      item.category,
      item.shortDesc || '',
      item.description || '',
      item.notes ? `${item.notes.top} ${item.notes.heart} ${item.notes.base}` : '',
      Array.isArray(item.accords) ? item.accords.join(' ') : ''
    ]
      .join(' ')
      .toLowerCase();

    const matchesSearch = !currentSearch || haystack.includes(currentSearch);
    return matchesCat && matchesSearch;
  });

  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (currentSort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  } else {
    filtered.sort((a, b) => {
      if (a.inStock !== b.inStock) return a.inStock ? -1 : 1;
      if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
      return 0;
    });
  }

  return filtered;
}

function getStockLabel(p) {
  if (!p.inStock || p.stockQty <= 0) {
    return { text: 'Sob Encomenda', cls: 'out' };
  }
  if (p.stockQty === 1) {
    return { text: 'Última unidade!', cls: 'low' };
  }
  return { text: 'Pronta Entrega', cls: 'in' };
}

function renderProductsGrid() {
  const grid = document.getElementById('products-grid');
  const countEl = document.getElementById('catalog-count');
  if (!grid) return;

  const products = getFilteredProducts();
  if (countEl) {
    countEl.textContent = `${products.length} ${products.length === 1 ? 'fragrância encontrada' : 'fragrâncias encontradas'}`;
  }

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="empty-catalog-box">
        <h3>Nenhum perfume encontrado</h3>
        <p>Tente buscar por outro nome, marca (ex: Lattafa, Al Wataniah, Maison Alhambra) ou limpe o filtro.</p>
        <button type="button" class="btn-outline-gold" onclick="resetFilters()">Mostrar Coleção Completa</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products
    .map((p) => {
      const installment = formatBRL(p.price / 3);
      const topNotes = p.notes?.top || 'Especiarias orientais e acordes luminosos';
      const heartNotes = p.notes?.heart || 'Rosa damascena, madeiras nobres e âmbar';
      const baseNotes = p.notes?.base || 'Oud, baunilha, sândalo e almíscar';
      const accordsList = Array.isArray(p.accords) && p.accords.length > 0
        ? p.accords.slice(0, 3)
        : [p.category, 'Importado Original'];
      const stockInfo = getStockLabel(p);
      const badgeText = p.oldPrice ? 'Oferta' : (p.badge || 'Original');

      return `
        <article class="editorial-card ${p.inStock ? '' : 'out-of-stock'}" data-id="${p.id}">
          <div class="editorial-card-media" onclick="openProductModal('${p.id}')">
            <div class="card-badges">
              ${
                p.inStock
                  ? `<span class="badge-luxury">${badgeText}</span>`
                  : `<span class="badge-out">Esgotado</span>`
              }
              <span class="badge-category">${p.category}</span>
            </div>

            <img src="${p.image}" alt="${p.name} - ${p.brand}" loading="lazy" onerror="this.src='assets/img/logo.jpg'" />

            <div class="media-perf-bar">
              <span>Fixação: <strong>${p.longevity || '8h – 12h'}</strong></span>
              <span>Projeção: <strong>${p.projection || 'Alta'}</strong></span>
            </div>
          </div>

          <div class="editorial-card-body">
            <div class="editorial-header">
              <div class="editorial-brand-line">
                <span class="card-brand">${p.brand} · ${p.origin || 'Dubai'}</span>
                <span class="card-volume">${p.volume || '100ml EDP'}</span>
              </div>
              <h3 class="card-title" onclick="openProductModal('${p.id}')">${p.name}</h3>
              <p class="card-desc">${p.shortDesc || p.description || ''}</p>
            </div>

            <div class="inline-pyramid" onclick="openProductModal('${p.id}')" title="Clique para ver detalhes completos">
              <div class="inline-pyramid-header">
                <span>Pirâmide Olfativa</span>
                <small>Ver ficha completa</small>
              </div>
              <div class="inline-pyramid-row">
                <span class="pyr-label">Saída</span>
                <span class="pyr-value">${topNotes}</span>
              </div>
              <div class="inline-pyramid-row">
                <span class="pyr-label">Coração</span>
                <span class="pyr-value">${heartNotes}</span>
              </div>
              <div class="inline-pyramid-row">
                <span class="pyr-label">Fundo</span>
                <span class="pyr-value">${baseNotes}</span>
              </div>
            </div>

            <div class="card-notes-preview">
              ${accordsList.map((acc) => `<span class="note-tag">${acc}</span>`).join('')}
            </div>

            <div class="editorial-footer">
              <div class="price-row">
                <div>
                  <div>
                    ${p.oldPrice ? `<span class="price-old">${formatBRL(p.oldPrice)}</span>` : ''}
                    <span class="price-value">${formatBRL(p.price)}</span>
                  </div>
                  <div class="price-installment">ou até 3x de ${installment}</div>
                </div>
                <span class="stock-indicator ${stockInfo.cls}">
                  ${stockInfo.text}
                </span>
              </div>

              <div class="card-actions">
                ${
                  p.inStock
                    ? `<button type="button" class="btn-whatsapp-card" onclick="orderSingleWhatsApp('${p.id}')">
                        <span>Pedir no WhatsApp</span>
                      </button>`
                    : `<button type="button" class="btn-whatsapp-card btn-inquire" onclick="inquireOutStockWhatsApp('${p.id}')">
                        <span>Reservar / Consultar</span>
                      </button>`
                }
                <button type="button" class="btn-details" onclick="addToBag('${p.id}')" title="Adicionar à Sacola">
                  + Sacola
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    })
    .join('');
}

function resetFilters() {
  currentCategory = 'Todos';
  currentSearch = '';
  currentSort = 'featured';
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.filter-pill').forEach((b) => {
    b.classList.toggle('active', b.getAttribute('data-category') === 'Todos');
  });
  renderProductsGrid();
}

function openProductModal(productId) {
  const product = getProducts().find((item) => item.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const container = document.getElementById('modal-body-container');
  if (!modal || !container) return;

  const topNotes = product.notes?.top || 'Notas cítricas e especiarias nobres';
  const heartNotes = product.notes?.heart || 'Acordes florais e amadeirados orientais';
  const baseNotes = product.notes?.base || 'Âmbar, oud, almíscar e baunilha';
  const stockInfo = getStockLabel(product);

  container.innerHTML = `
    <div class="modal-media">
      <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/img/logo.jpg'" />
    </div>
    <div class="modal-content">
      <div>
        <span class="modal-eyebrow">
          ${product.brand} · ${product.category} · ${product.volume || '100ml'}
        </span>
        <h2 id="modal-title" class="modal-product-title">
          ${product.name}
        </h2>
      </div>

      <div class="modal-price-bar">
        <div>
          ${product.oldPrice ? `<span class="price-old">${formatBRL(product.oldPrice)}</span>` : ''}
          <span class="modal-price-val">${formatBRL(product.price)}</span>
        </div>
        <span class="stock-indicator ${stockInfo.cls}">
          ${product.inStock ? `${stockInfo.text} (Macapá - AP)` : 'Esgotado — Disponível sob encomenda'}
        </span>
      </div>

      <p class="modal-desc">
        ${product.description || product.shortDesc || ''}
      </p>

      <div class="pyramid-box">
        <div class="pyramid-box-title">
          Pirâmide Olfativa
        </div>
        <div class="pyramid-row">
          <strong>Notas de Saída</strong>
          <span>${topNotes}</span>
        </div>
        <div class="pyramid-row">
          <strong>Notas de Coração</strong>
          <span>${heartNotes}</span>
        </div>
        <div class="pyramid-row">
          <strong>Notas de Fundo</strong>
          <span>${baseNotes}</span>
        </div>
      </div>

      <div class="modal-metrics">
        <div class="metric-item">
          <span>Fixação Média</span>
          <strong>${product.longevity || '8h – 12h'}</strong>
        </div>
        <div class="metric-item">
          <span>Projeção</span>
          <strong>${product.projection || 'Alta / Marcante'}</strong>
        </div>
      </div>

      <div class="modal-cta-row">
        <button type="button" class="btn-gold" onclick="orderSingleWhatsApp('${product.id}')">
          Pedir no WhatsApp
        </button>
        <button type="button" class="btn-outline-gold" onclick="addToBag('${product.id}')">
          + Adicionar à Sacola
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.remove('open');
}

function orderSingleWhatsApp(productId) {
  const product = getProducts().find((item) => item.id === productId);
  if (!product) return;
  const url = buildWhatsAppLink(product);
  window.open(url, '_blank', 'noopener,noreferrer');
}

function inquireOutStockWhatsApp(productId) {
  const product = getProducts().find((item) => item.id === productId);
  if (!product) return;
  const msg =
    `Olá! Vi no catálogo da *JC PARFUM* o perfume *${product.name}* (${product.brand}) e gostaria de saber a previsão de chegada ou reservar uma unidade.`;
  const url = buildWhatsAppLink(product, msg);
  window.open(url, '_blank', 'noopener,noreferrer');
}

function addToBag(productId) {
  const product = getProducts().find((item) => item.id === productId);
  if (!product) return;

  const existing = shoppingBag.find((item) => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    shoppingBag.push({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: Number(product.price),
      image: product.image,
      qty: 1
    });
  }

  closeProductModal();
  updateBagUI();
  toggleBagDrawer(true);
}

function removeFromBag(productId) {
  shoppingBag = shoppingBag.filter((item) => item.id !== productId);
  updateBagUI();
}

function changeBagQty(productId, delta) {
  const item = shoppingBag.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromBag(productId);
  } else {
    updateBagUI();
  }
}

function updateBagUI() {
  const countBadge = document.getElementById('bag-count');
  const itemsContainer = document.getElementById('bag-items-list');
  const totalEl = document.getElementById('bag-total-value');

  const totalItems = shoppingBag.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = shoppingBag.reduce((acc, i) => acc + i.price * i.qty, 0);

  if (countBadge) countBadge.textContent = totalItems;
  if (totalEl) totalEl.textContent = formatBRL(totalPrice);

  if (!itemsContainer) return;

  if (shoppingBag.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-bag-msg">
        <p class="empty-bag-title">Sua sacola está vazia</p>
        <p class="empty-bag-sub">Adicione seus perfumes favoritos para enviar o pedido pronto pelo WhatsApp da JC PARFUM.</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = shoppingBag
    .map(
      (item) => `
      <div class="bag-item">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/img/logo.jpg'" />
        <div class="bag-item-info">
          <h4>${item.name}</h4>
          <span>${item.brand}</span>
          <p>${formatBRL(item.price * item.qty)}</p>
        </div>
        <div class="bag-qty-controls">
          <button type="button" onclick="changeBagQty('${item.id}', -1)" aria-label="Diminuir quantidade">-</button>
          <span>${item.qty}</span>
          <button type="button" onclick="changeBagQty('${item.id}', 1)" aria-label="Aumentar quantidade">+</button>
        </div>
      </div>
    `
    )
    .join('');
}

function toggleBagDrawer(forceState) {
  const drawer = document.getElementById('bag-drawer');
  if (!drawer) return;
  if (typeof forceState === 'boolean') {
    drawer.classList.toggle('open', forceState);
  } else {
    drawer.classList.toggle('open');
  }
}

function checkoutBagWhatsApp() {
  if (shoppingBag.length === 0) {
    const defaultText = `Olá! Vim pelo catálogo online da *JC PARFUM* e gostaria de atendimento personalizado para escolher um perfume.`;
    window.open(
      `https://wa.me/${JC_WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultText)}`,
      '_blank',
      'noopener,noreferrer'
    );
    return;
  }

  const totalPrice = shoppingBag.reduce((acc, i) => acc + i.price * i.qty, 0);
  const lines = shoppingBag.map(
    (item) => `• ${item.qty}x *${item.name}* (${item.brand}) — ${formatBRL(item.price * item.qty)}`
  );

  const clientName = document.getElementById('bag-client-name')?.value.trim() || '';
  const clientRegion = document.getElementById('bag-client-region')?.value || 'Macapá';

  let message = `Olá! Vim pelo catálogo online da *JC PARFUM* e gostaria de finalizar meu pedido:\n\n`;
  message += lines.join('\n');
  message += `\n\nTotal do Pedido: ${formatBRL(totalPrice)}`;
  if (clientName) message += `\nCliente: ${clientName}`;
  message += `\nLocalidade: ${clientRegion} - AP`;
  message += `\n\nPodemos combinar a entrega e forma de pagamento?`;

  window.open(
    `https://wa.me/${JC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
}
