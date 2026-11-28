/* JC PARFUM - dados do catálogo, configurações, vendas e armazenamento (index.html e admin.html) */
(function () {
  var MEM = {};
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return MEM[k] || null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { MEM[k] = v; } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { delete MEM[k]; } }
  };

  var KEY = 'jc_parfum_catalog_v3';
  var KEY_SET = 'jc_parfum_settings_v3';
  var KEY_SALES = 'jc_parfum_sales_v3';

  var DEFAULT_SETTINGS = {
    whatsapp: '559681197608',
    instagram: 'jc.perfumesarabe',
    maxInstallments: 2,
    payPix: true, payCash: true, payDebit: true, payCredit: true,
    banner: '',
    deliveryNote: 'Retirada ou entrega em Macapá: combinamos tudo pelo WhatsApp.'
  };

  var DEFAULT_PRODUCTS = [
    {
      id: 'bareeq-al-dhahab', name: 'Bareeq Al Dhahab', brand: 'Al Wataniah', category: 'Unissex',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/bareeq-al-dhahab.webp',
      images: ['assets/img/bareeq-al-dhahab.webp', 'assets/img/bareeq-al-dhahab-2.webp'],
      price: 250, priceInstallment: 275, cost: null, stock: 0, preorder: true, active: true, featured: true,
      promo: null, review: false,
      notes: { top: 'Rosa, açafrão, pimenta', heart: 'Oud, caramelo, patchouli, flores', base: 'Almíscar, incenso, âmbar, resinas' },
      desc: 'Perfume árabe oriental e dourado, quente e envolvente. Mistura açafrão, caramelo e oud com fundo de âmbar e incenso. Ideal para a noite e ocasiões especiais.'
    },
    {
      id: 'al-noble-wazeer', name: 'Al Noble Wazeer', brand: 'Lattafa', category: 'Unissex',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/al-noble-wazeer.webp',
      images: ['assets/img/al-noble-wazeer.webp', 'assets/img/al-noble-wazeer-2.webp'],
      price: 300, priceInstallment: 335, cost: null, stock: 0, preorder: true, active: true, featured: true,
      promo: null, review: false,
      notes: { top: 'Maçã, conhaque, noz-moscada, açafrão', heart: 'Uísque, carvalho, cedro, sândalo', base: 'Almíscar, mirra, ambroxan, baunilha' },
      desc: 'Frasco de veludo com tampa de cervo dourado. Fragrância amadeirada e licorosa, com notas de conhaque, madeiras nobres e baunilha. Forte e sofisticada.'
    },
    {
      id: 'khamrah', name: 'Khamrah', brand: 'Lattafa', category: 'Unissex',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/khamrah.webp',
      images: ['assets/img/khamrah.webp', 'assets/img/khamrah-2.webp'],
      price: 380, priceInstallment: 410, cost: null, stock: 0, preorder: true, active: true, featured: true,
      promo: null, review: false,
      notes: { top: 'Bergamota, canela, noz-moscada', heart: 'Tâmaras, praliné, tuberosa, lírio-do-vale', base: 'Baunilha, fava tonka, benjoim, mirra' },
      desc: 'Um dos perfumes árabes mais famosos do mundo. Doce e especiado, combina canela, tâmaras, praliné e baunilha em um frasco de vidro lapidado. Alta fixação.'
    },
    {
      id: 'sabah-al-ward', name: 'Sabah Al Ward', brand: 'Al Wataniah', category: 'Feminino',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/sabah-al-ward.webp',
      images: ['assets/img/sabah-al-ward.webp', 'assets/img/sabah-al-ward-2.webp'],
      price: 250, priceInstallment: 280, cost: null, stock: 0, preorder: true, active: true, featured: false,
      promo: null, review: false,
      notes: { top: 'Pimenta rosa, tangerina, flor de laranjeira', heart: 'Cacau, jasmim sambac', base: 'Baunilha, fava tonka' },
      desc: 'Floral adocicado e elegante. Abre com tangerina e pimenta rosa, evolui para flor de laranjeira e cacau, e finaliza com baunilha cremosa.'
    },
    {
      id: 'attar-al-wesal', name: 'Attar Al Wesal', brand: 'Al Wataniah', category: 'Unissex',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/attar-al-wesal.webp',
      images: ['assets/img/attar-al-wesal.webp', 'assets/img/attar-al-wesal-2.webp'],
      price: 310, priceInstallment: 340, cost: null, stock: 0, preorder: true, active: true, featured: false,
      promo: null, review: false,
      notes: { top: 'Pera, lavanda, hortelã, bergamota, limão', heart: 'Canela, sálvia, cominho', base: 'Notas amadeiradas e âmbar' },
      desc: 'Aromático e especiado de grande presença. Começa fresco com pera, lavanda e hortelã e esquenta na pele com canela, madeiras e âmbar.'
    },
    {
      id: 'european', name: 'European', brand: 'Linha árabe', category: 'Feminino',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/european.webp',
      images: ['assets/img/european.webp', 'assets/img/european-2.webp'],
      price: 224, priceInstallment: 264, cost: null, stock: 0, preorder: true, active: true, featured: false,
      promo: null, review: true,
      notes: { top: 'Framboesa e flor de cerejeira', heart: 'Orquídea', base: 'Almíscar' },
      desc: 'Floral frutado feminino e envolvente, com abertura de framboesa, coração de orquídea e fundo macio de almíscar.'
    },
    {
      id: 'special-oud', name: 'Special Oud', brand: 'Al Wataniah', category: 'Unissex',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/special-oud.webp',
      images: ['assets/img/special-oud-2.webp', 'assets/img/special-oud.webp'],
      price: null, priceInstallment: null, cost: null, stock: 2, preorder: true, active: true, featured: false,
      promo: null, review: false,
      notes: { top: 'Couro, açafrão, pêssego, caramelo, frutas vermelhas', heart: 'Madeiras, pimenta rosa, óleo de cipriol', base: 'Oud, baunilha, benjoim, almíscar' },
      desc: 'Clássico oriental amadeirado da Al Wataniah. Combina oud, couro, açafrão e caramelo em uma fragrância intensa e luxuosa.'
    },
    {
      id: 'luminous-vivid', name: 'Luminous Vivid', brand: 'Maison Alhambra', category: 'Masculino',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/luminous-vivid.webp',
      images: ['assets/img/luminous-vivid-2.webp', 'assets/img/luminous-vivid.webp'],
      price: null, priceInstallment: null, cost: null, stock: 2, preorder: true, active: true, featured: false,
      promo: null, review: false,
      notes: { top: 'Toranja, bergamota, groselha negra', heart: 'Tangerina verde, vetiver', base: 'Madeira seca, âmbar, cashmere' },
      desc: 'Cítrico aromático moderno e vibrante. Traz toranja, bergamota e vetiver sobre uma base elegante de madeiras secas e âmbar.'
    },
    {
      id: 'avant-ruby', name: 'Avant Ruby', brand: 'Maison Alhambra', category: 'Feminino',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/avant-ruby.webp',
      images: ['assets/img/avant-ruby-2.webp', 'assets/img/avant-ruby.webp'],
      price: null, priceInstallment: null, cost: null, stock: 2, preorder: true, active: true, featured: false,
      promo: null, review: false,
      notes: { top: 'Tangerina, bergamota, limão siciliano', heart: 'Rosa, violeta, cashmere', base: 'Âmbar e baunilha' },
      desc: 'Perfume feminino luminoso e romântico. Une frutas cítricas a um coração aveludado de rosa, violeta e madeira cashmere.'
    },
    {
      id: 'silver-scent', name: 'Silver Scent', brand: 'Jacques Bogart', category: 'Masculino',
      volume: '100 ml · Eau de Toilette',
      image: 'assets/img/silver-scent.webp',
      images: ['assets/img/silver-scent-2.webp', 'assets/img/silver-scent.webp'],
      price: null, priceInstallment: null, cost: null, stock: 2, preorder: true, active: true, featured: false,
      promo: null, review: false,
      notes: { top: 'Limão, flor de laranjeira', heart: 'Gerânio, lavanda, coentro, noz-moscada, alecrim, cardamomo', base: 'Teca, lichia, fava tonka, vetiver' },
      desc: 'Clássico masculino francês de grande projeção. Mistura limão e flor de laranjeira com lavanda, especiarias, fava tonka e madeiras.'
    },
    {
      id: 'hopeful', name: 'Hopeful', brand: 'Mega Collection', category: 'Feminino',
      volume: '100 ml · Eau de Parfum',
      image: 'assets/img/hopeful.webp',
      images: ['assets/img/hopeful-2.webp', 'assets/img/hopeful.webp'],
      price: null, priceInstallment: null, cost: null, stock: 2, preorder: true, active: true, featured: false,
      promo: null, review: true,
      notes: { top: 'Frutas e cítricos frescos', heart: 'Flores suaves', base: 'Almíscar e notas suaves' },
      desc: 'Fragrância feminina leve, frutada e floral, ótima para o uso diário e dias quentes.'
    }
  ];

  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function normalize(p) {
    var d = {
      id: '', name: '', brand: '', category: 'Unissex', volume: '100 ml', image: '', images: [],
      price: null, priceInstallment: null, cost: null, stock: 0, preorder: true, active: true, featured: false,
      promo: null, review: false, notes: { top: '', heart: '', base: '' }, desc: ''
    };
    for (var k in d) if (p[k] === undefined) p[k] = d[k];
    p.notes = p.notes || { top: '', heart: '', base: '' };
    if (!Array.isArray(p.images) || !p.images.length) p.images = p.image ? [p.image] : [];
    p.image = p.images[0] || p.image || '';
    p.stock = Math.max(0, parseInt(p.stock, 10) || 0);
    ['price', 'priceInstallment', 'cost'].forEach(function (f) {
      var v = p[f];
      p[f] = (v === null || v === '' || isNaN(Number(v)) || Number(v) <= 0) ? null : Number(v);
    });
    return p;
  }

  function loadCatalog() {
    var raw = store.get(KEY);
    if (raw) { try { return JSON.parse(raw).map(normalize); } catch (e) {} }
    return clone(DEFAULT_PRODUCTS).map(normalize);
  }
  function saveCatalog(list) { store.set(KEY, JSON.stringify(list)); }
  function loadSettings() {
    var s = clone(DEFAULT_SETTINGS), raw = store.get(KEY_SET);
    if (raw) { try { var o = JSON.parse(raw); for (var k in o) s[k] = o[k]; } catch (e) {} }
    return s;
  }
  function saveSettings(s) { store.set(KEY_SET, JSON.stringify(s)); }
  function loadSales() {
    var raw = store.get(KEY_SALES);
    if (raw) { try { var a = JSON.parse(raw); if (Array.isArray(a)) return a; } catch (e) {} }
    return [];
  }
  function saveSales(a) { store.set(KEY_SALES, JSON.stringify(a)); }

  function pricing(p) {
    var promo = !!(p.promo && p.promo.active && (p.promo.price || p.promo.priceInstallment));
    return {
      onPromo: promo,
      label: promo ? (p.promo.label || 'Promoção') : '',
      cash: promo && p.promo.price ? p.promo.price : p.price,
      inst: promo && p.promo.priceInstallment ? p.promo.priceInstallment : p.priceInstallment,
      oldCash: promo ? p.price : null, oldInst: promo ? p.priceInstallment : null
    };
  }
  function money(v) { return 'R$ ' + Number(v || 0).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }

  window.JC = {
    store: store, KEY: KEY, KEY_SET: KEY_SET, KEY_SALES: KEY_SALES,
    DEFAULT_PRODUCTS: DEFAULT_PRODUCTS, DEFAULT_SETTINGS: DEFAULT_SETTINGS,
    loadCatalog: loadCatalog, saveCatalog: saveCatalog,
    loadSettings: loadSettings, saveSettings: saveSettings,
    loadSales: loadSales, saveSales: saveSales,
    normalize: normalize, pricing: pricing, money: money, clone: clone
  };
})();
