/**
 * JC PARFUM - Base de Dados e Gerenciamento de Catálogo
 * Sincronizado com localStorage para edição em tempo real via Painel do Lojista
 */

const JC_STORAGE_KEY = 'jc_parfum_catalog_v2';
const JC_WHATSAPP_NUMBER = '559681197608';

const DEFAULT_PRODUCTS = [
  {
    id: 'musamam-white-intense',
    name: 'Musamam White Intense',
    brand: 'Lattafa',
    origin: 'Dubai · EAU',
    category: 'Unissex',
    volume: '100ml · Eau de Parfum',
    price: 490.00,
    oldPrice: null,
    stockQty: 5,
    inStock: true,
    featured: true,
    badge: 'Best-Seller',
    image: 'assets/img/real-musamam-white-intense.jpg',
    shortDesc: 'Frasco escultural coroado pela serpente dourada. Um oriental especiado solar, cremoso e hipnótico.',
    description: 'Assinatura de luxo da casa Lattafa. Musamam White Intense combina especiarias luminosas e bergamota italiana com um coração exótico de coco cremoso, ylang-ylang e ambroxan, repousando sobre sândalo nobre e benjoim.',
    notes: {
      top: 'Bergamota, Laranja Doce, Especiarias Nobres',
      heart: 'Coco Cremoso, Ylang-Ylang, Ambroxan, Mahonial',
      base: 'Sândalo, Almíscar Branco, Benjoim'
    },
    accords: ['Amadeirado Cremoso', 'Especiado Solar', 'Âmbar Almiscarado'],
    longevity: '10h – 12h+',
    projection: 'Alta / Marcante'
  },
  {
    id: 'bareeq-al-dhahab',
    name: 'Bareeq Al Dhahab',
    brand: 'Al Wataniah',
    origin: 'Dubai · EAU',
    category: 'Masculino',
    volume: '100ml · Eau de Parfum',
    price: 360.00,
    oldPrice: null,
    stockQty: 4,
    inStock: true,
    featured: true,
    badge: 'Destaque Dubai',
    image: 'assets/img/real-bareeq-al-dhahab.jpg',
    shortDesc: 'O brilho do ouro árabe em uma fusão magnética de açafrão real, oud nobre, caramelo e âmbar.',
    description: 'Bareeq Al Dhahab ("O Brilho do Ouro") da Al Wataniah Khususi personifica a opulência da perfumaria árabe. Uma abertura quente de açafrão e rosa damascena encontra notas envolventes de caramelo tostado, patchouli e madeiras preciosas.',
    notes: {
      top: 'Açafrão Real, Pimenta Preta, Rosa Damascena',
      heart: 'Agarwood (Oud), Caramelo Quente, Patchouli, Notas Florais',
      base: 'Incenso, Âmbar Dourado, Notas Amadeiradas, Almíscar'
    },
    accords: ['Oriental Quente', 'Oud & Açafrão', 'Âmbar Caramelado'],
    longevity: '9h – 11h',
    projection: 'Intensa'
  },
  {
    id: 'special-oud',
    name: 'Special Oud',
    brand: 'Al Wataniah',
    origin: 'Dubai · EAU',
    category: 'Unissex',
    volume: '100ml · Eau de Parfum',
    price: 350.00,
    oldPrice: null,
    stockQty: 4,
    inStock: true,
    featured: true,
    badge: 'Clássico Oriental',
    image: 'assets/img/real-special-oud.jpg',
    shortDesc: 'Clássico oriental amadeirado com lascas de oud legítimo, couro nobre, açafrão e baunilha.',
    description: 'Da linha exclusiva Khususi da Al Wataniah, Special Oud é uma criação marcante para apreciadores da alta perfumaria árabe. Acordes ricos de couro, açafrão e caramelo abrem caminho para um fundo denso e sensual de oud, bálsamo do Peru e baunilha.',
    notes: {
      top: 'Açafrão, Couro Nobre, Caramelo, Frutas Vermelhas, Pêssego',
      heart: 'Óleo de Cipriol, Pimenta Rosa, Ládano, Madeiras Nobres',
      base: 'Agarwood (Oud), Baunilha Negra, Benjoim, Almíscar'
    },
    accords: ['Oud Real', 'Couro Especiado', 'Balsâmico Intenso'],
    longevity: '10h+',
    projection: 'Alta'
  },
  {
    id: 'luminous-vivid',
    name: 'Luminous Vivid',
    brand: 'Maison Alhambra',
    origin: 'Dubai · EAU',
    category: 'Unissex',
    volume: '100ml · Eau de Parfum',
    price: 290.00,
    oldPrice: null,
    stockQty: 3,
    inStock: true,
    featured: false,
    badge: 'Sofisticado',
    image: 'assets/img/real-luminous-vivid.jpg',
    shortDesc: 'Radiante e sofisticado. Acordes cítricos vibrantes sobre vetiver terroso e madeiras ambaradas.',
    description: 'Luminous Vivid da Maison Alhambra entrega uma energia luminosa e elegante. A saída vibrante de toranja, bergamota e groselha negra evolui para um coração refinado de mandarina verde e vetiver, finalizando em âmbar cinzento e madeiras secas.',
    notes: {
      top: 'Toranja Rosa, Bergamota, Groselha Negra',
      heart: 'Mandarina Verde, Vetiver Nobre, Gerânio',
      base: 'Madeiras Secas, Âmbar Cinzento, Cashmere'
    },
    accords: ['Cítrico Aromático', 'Amadeirado Fresco', 'Âmbar Luminoso'],
    longevity: '8h – 10h',
    projection: 'Moderada a Alta'
  },
  {
    id: 'avant-ruby',
    name: 'Avant Ruby',
    brand: 'Maison Alhambra',
    origin: 'Dubai · EAU',
    category: 'Feminino',
    volume: '100ml · Eau de Parfum',
    price: 310.00,
    oldPrice: null,
    stockQty: 4,
    inStock: true,
    featured: true,
    badge: 'Joia Feminina',
    image: 'assets/img/real-avant-ruby.jpg',
    shortDesc: 'Fragrância rubi sedutora com notas de cereja licorosa, frutas vermelhas, rosa aveludada e baunilha.',
    description: 'Avant Ruby é uma fragrância envolvente e apaixonante da Maison Alhambra. Combina o brilho frutado de cereja, framboesa e pimenta rosa com um buquê luxuoso de rosas, madeira cashmere e fundo cremoso de baunilha e almíscar.',
    notes: {
      top: 'Cereja Negra, Pimenta Rosa, Néroli, Bergamota',
      heart: 'Rosa Aveludada, Violeta, Madeira Cashmere, Jasmim',
      base: 'Framboesa, Baunilha Cremosa, Âmbar, Almíscar'
    },
    accords: ['Frutado Licoroso', 'Floral Aveludado', 'Baunilha Sensual'],
    longevity: '8h – 10h',
    projection: 'Alta'
  },
  {
    id: 'silver-scent-tradicional',
    name: 'Silver Scent Tradicional',
    brand: 'Jacques Bogart',
    origin: 'Paris · França',
    category: 'Masculino',
    volume: '100ml · Eau de Toilette',
    price: 260.00,
    oldPrice: null,
    stockQty: 6,
    inStock: true,
    featured: false,
    badge: 'Clássico Francês',
    image: 'assets/img/real-silver-scent.jpg',
    shortDesc: 'Ícone francês de presença inconfundível. Flor de laranjeira, lavanda, especiarias e fava tonka.',
    description: 'Lenda consagrada da perfumaria francesa por Jacques Bogart Paris. Silver Scent entrega projeção intensa e excelente fixação noturna graças ao contraste entre flor de laranjeira gelada, cardamomo, noz-moscada, lichia e fava tonka.',
    notes: {
      top: 'Flor de Laranjeira, Limão Siciliano, Bergamota',
      heart: 'Lavanda, Cardamomo, Noz-Moscada, Alecrim, Gerânio',
      base: 'Fava Tonka, Lichia, Madeira de Teca, Vetiver'
    },
    accords: ['Oriental Fougère', 'Especiado Noturno', 'Intenso'],
    longevity: '10h – 12h',
    projection: 'Altíssima'
  },
  {
    id: 'hopeful-mega-collection',
    name: 'Hopeful',
    brand: 'Mega Collection',
    origin: 'Dubai · EAU',
    category: 'Feminino',
    volume: '100ml · Eau de Parfum',
    price: 230.00,
    oldPrice: null,
    stockQty: 5,
    inStock: true,
    featured: false,
    badge: 'Floral Elegante',
    image: 'assets/img/real-hopeful.jpg',
    shortDesc: 'Floral suave, delicado e elegante. Flores brancas, toque frutado e fundo cremoso de baunilha.',
    description: 'Hopeful da Mega Collection traduz delicadeza e sofisticação feminina. Suas notas luminosas de frutas frescas e pétalas florais repousam sobre um véu aveludado de almíscar branco, baunilha cremosa e madeiras claras.',
    notes: {
      top: 'Notas Frutadas Frescas, Mandarina, Pera',
      heart: 'Peônia Branca, Jasmim, Lírio do Vale, Rosa Suave',
      base: 'Almíscar Branco, Baunilha Suave, Madeiras Claras'
    },
    accords: ['Floral Branco', 'Almíscar Limpo', 'Suave & Sofisticado'],
    longevity: '7h – 9h',
    projection: 'Moderada / Elegante'
  }
];

function normalizeProduct(p) {
  const qty = typeof p.stockQty === 'number' ? Math.max(0, p.stockQty) : (p.inStock ? 5 : 0);
  return {
    ...p,
    stockQty: qty,
    inStock: qty > 0,
    oldPrice: p.oldPrice && Number(p.oldPrice) > Number(p.price) ? Number(p.oldPrice) : null
  };
}

function getProducts() {
  try {
    const raw = localStorage.getItem(JC_STORAGE_KEY);
    if (!raw) {
      const normalized = DEFAULT_PRODUCTS.map(normalizeProduct);
      localStorage.setItem(JC_STORAGE_KEY, JSON.stringify(normalized));
      return normalized;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(normalizeProduct);
    }
  } catch (err) {
    console.warn('Erro ao ler localStorage, usando catálogo padrão:', err);
  }
  return DEFAULT_PRODUCTS.map(normalizeProduct);
}

function saveProducts(productsList) {
  try {
    const normalized = productsList.map(normalizeProduct);
    localStorage.setItem(JC_STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent('jcCatalogUpdated'));
    return true;
  } catch (err) {
    console.error('Erro ao salvar catálogo:', err);
    return false;
  }
}

function resetCatalogToDefault() {
  const normalized = DEFAULT_PRODUCTS.map(normalizeProduct);
  localStorage.setItem(JC_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent('jcCatalogUpdated'));
  return normalized;
}

function formatBRL(value) {
  const num = Number(value) || 0;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function buildWhatsAppLink(product, customMessage) {
  const text = customMessage ||
    `Olá! Vim pelo catálogo online da *JC PARFUM* e tenho interesse no perfume:\n\n` +
    `• *${product.name}* (${product.brand})\n` +
    `• Categoria: ${product.category}\n` +
    `• Valor: ${formatBRL(product.price)}\n\n` +
    `Está disponível para entrega em Macapá/Santana?`;
  return `https://wa.me/${JC_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
