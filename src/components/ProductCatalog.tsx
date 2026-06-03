import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Leaf, 
  ShoppingBag, 
  Layers, 
  Sprout, 
  Star, 
  Info, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  Eye,
  CheckCircle,
  TrendingDown
} from 'lucide-react';
import { Product } from '../types';

interface ProductCatalogProps {
  onAddToCart: (product: Product) => void;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-cocofiber',
    name: 'Fibra de Coco Selecta',
    category: 'Sustratos',
    description: 'Sustrato de fibra de coco deshidratada y comprimida en formato premium. Proporciona una aireación excelente y retención hídrica natural equilibrada, ideal para el desarrollo óptimo de raíces.',
    price: 8.50,
    unit: 'Bloque 10L',
    imageUrl: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 18,
    rating: 4.9,
    ecologicalFactor: 'Sostenible • Residuo Cero',
    benefits: [
      'Retiene hasta 8 veces su peso en agua',
      'pH neutro optimizado para balconies (5.5 - 6.5)',
      'Excelente aireación que evita la asfixia celular'
    ],
    specDetails: [
      { label: 'Composición', value: '100% Corteza de coco natural tamizada' },
      { label: 'Estructura', value: 'Granulometría fina con microfibras ligeras' },
      { label: 'Conductividad', value: '< 0.4 mS/cm (excelente tolerancia)' }
    ]
  },
  {
    id: 'prod-humus',
    name: 'Humus de Lombriz Activo',
    category: 'Sustratos',
    description: 'Nutrición orgánica premium resultante del vermicompostaje. Regenera el suelo cansado aportando millones de consorcios bacterianos benéficos al sistema radicular.',
    price: 6.90,
    unit: 'Saco 5 kg',
    imageUrl: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 24,
    rating: 5.0,
    ecologicalFactor: '100% Bioactivado • Nutrición Lenta',
    benefits: [
      'Rico en microorganismos y enzimas reguladoras',
      'Neutraliza toxinas del sustrato y acelera enraizado',
      'Completamente inodoro y seguro para convivencia urbana'
    ],
    specDetails: [
      { label: 'Origen', value: 'Vermicultura ecológica controlada' },
      { label: 'Ácidos Húmicos', value: 'Elevada mineralización orgánica' },
      { label: 'Humedad', value: 'Estabilizado al 38% para máxima viabilidad' }
    ]
  },
  {
    id: 'prod-arroz-blanco',
    name: '🌾 Semillas de Arroz Blanco Súper',
    category: 'Semillas',
    description: 'Semillas puras seleccionadas para cultivar arroz blanco premium en camas elevadas o bandejas de inundación controlada. Excelente como proyecto agrícola y educativo en casa con alto índice de enraizamiento.',
    price: 3.80,
    unit: 'Bolsa 150g',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 35,
    rating: 4.8,
    ecologicalFactor: 'Semilla Autóctona Pura',
    benefits: [
      'Ciclo de crecimiento optimizado para pequeños huertos húmedos',
      'Excelente asimilación de nitrógeno en fibra de coco',
      'Espiga dorada ornamental y educativa de gran atractivo visual'
    ],
    specDetails: [
      { label: 'Variedad', value: 'Oryza Sativa L. Blanca' },
      { label: 'Tasa Germinación', value: '94% certificada' },
      { label: 'Profundidad Siembra', value: '1.0 cm en tierra saturada' }
    ]
  },
  {
    id: 'prod-maiz-tortilla',
    name: '🌽 Maíz Blanco para Masa y Tortillas',
    category: 'Semillas',
    description: 'Semillas premium de maíz criollo blanco harinero seleccionado para producir mazorcas de grano tierno ideales para la nixtamalización tradicional. ¡Siente el sabor original de tus tortillas hechas a mano!',
    price: 4.90,
    unit: 'Paquete 200g',
    imageUrl: 'https://images.unsplash.com/photo-1551754625-7fc5b945222e?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 42,
    rating: 4.9,
    ecologicalFactor: 'Criollo Cultivado Sin Pesticidas',
    benefits: [
      'Grano harinoso rico en almidones, perfecto para tortillas, tlayudas o pupusas',
      'Porte robusto excelente para balcones soleados y macetones profundos',
      'Polinización abierta y alta adaptabilidad a sustratos orgánicos urbanos'
    ],
    specDetails: [
      { label: 'Variedad', value: 'Zea Mays (Harinero Blanco)' },
      { label: 'Tasa Germinación', value: '96%' },
      { label: 'Días a Cosecha', value: '90 - 100 días' }
    ]
  },
  {
    id: 'prod-frijoles',
    name: '🫘 Semillas de Frijol Negro Criollo',
    category: 'Semillas',
    description: 'Semilla orgánica certificada de frijol negro arbustivo. Planta compacta que regenera el suelo de manera simbiótica al fijar nitrógeno atmosférico mediante sus nudos radiculares.',
    price: 3.50,
    unit: 'Papeleta 120g',
    imageUrl: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 50,
    rating: 4.8,
    ecologicalFactor: 'Fijadora Activa de Nitrógeno',
    benefits: [
      'Compañero ideal para asociar con el cultivo de maíz (Milpa urbana)',
      'Planta arbustiva de porte muy bajo que no requiere enrejado rígido',
      'Sabor de grano intenso, idóneo para caldos y frijoles refritos premium'
    ],
    specDetails: [
      { label: 'Variedad', value: 'Phaseolus Vulgaris (Negro)' },
      { label: 'Tipo de Crecimiento', value: 'Arbustivo erguido compacto' },
      { label: 'Profundidad Siembra', value: '2.0 cm' }
    ]
  },
  {
    id: 'prod-tomate-saladet',
    name: '🍅 Tomate Saladet / Roma de Guisados',
    category: 'Semillas',
    description: 'Semilla orgánica de tomate saladet clásico. Produce racimos de tomates firmes y pulposos con bajo contenido de agua, el ingrediente estrella para preparar caldos, salsas y sofritos criollos.',
    price: 4.20,
    unit: 'Sobre 3g',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 58,
    rating: 4.9,
    ecologicalFactor: 'Semilla Libre de Químicos Sintéticos',
    benefits: [
      'Frutos extraños con pulpa densa ideales para salsas espesas tradicionales',
      'Alto rendimiento continuo por planta en balcones con alta radiación',
      'Tolerante a hongos del sustrato común mediante micorrizas benéficas'
    ],
    specDetails: [
      { label: 'Variedad', value: 'Solanum Lycopersicum (Saladet)' },
      { label: 'Horas de Sol', value: 'Sol directo (mínimo 6-8 horas)' },
      { label: 'Tasa Germinación', value: '95%' }
    ]
  },
  {
    id: 'prod-chile-dulce',
    name: '🫑 Chile Dulce / Pimiento de Huerta',
    category: 'Semillas',
    description: 'Semillas de chile dulce nacional, un pimiento suave no picante de aroma excepcional. Su carne gruesa y crocante es perfecta para parrilladas, ensaladas de huerto o rellenos tradicionales.',
    price: 3.90,
    unit: 'Sobre 2.5g',
    imageUrl: 'https://images.unsplash.com/photo-1563565312-23c524021648?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 45,
    rating: 4.8,
    ecologicalFactor: 'Polinización 100% Libre',
    benefits: [
      'Variedad sumamente dulce que adquiere colores amarillos o rojos intensos',
      'Arbusto compacto altamente estético para colocar en tu terraza o balcón',
      'Excelente fuente alimenticia rica en Vitamina C y betacarotenos activos'
    ],
    specDetails: [
      { label: 'Variedad', value: 'Capsicum Annuum (Dulce)' },
      { label: 'Sabor', value: 'Extremadamente dulce y jugoso' },
      { label: 'Tiempo de Germinado', value: '10 - 14 días' }
    ]
  },
  {
    id: 'prod-cafe-altura',
    name: '☕ Café de Altura Arábica Orgánico',
    category: 'Semillas',
    description: 'Cultiva el elegante arbusto de café de altura Arábica en tu propio hogar. Además de un aroma inolvidable a jazmín durante la floración, produce cerezas de café real de origen místico.',
    price: 6.50,
    unit: 'Bolsita de 30grs',
    imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 20,
    rating: 4.7,
    ecologicalFactor: 'Cafeicultura de Conservación',
    benefits: [
      'Follaje verde brillante perenne sumamente decorativo para interiores o sombreados',
      'Deliciosa floración blanca con aroma que transforma cualquier estancia de hogar',
      'Cosecha tus propias cerezas rojas para tostado artesanal casero'
    ],
    specDetails: [
      { label: 'Variedad', value: 'Coffea Arabica Typica' },
      { label: 'Hábito Crecimiento', value: 'Arbusto perenne ornamental/productivo' },
      { label: 'Exposición', value: 'Luz indirecta brillante o semisombra' }
    ]
  },
  {
    id: 'prod-pots',
    name: 'Macetas de Auto-riego Bio-Fibras',
    category: 'Accesorios',
    description: 'Hermosas macetas moldeadas a partir de biomasa agrícola reciclada. Poseen un depósito inteligente que nutre por capilaridad las raíces evitando descuidos de riego en tu terraza.',
    price: 9.50,
    unit: 'Set x6 unidades',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&h=450&q=80',
    stock: 12,
    rating: 4.7,
    ecologicalFactor: 'Compostable • Evita Shock de Trasplante',
    benefits: [
      'Material 100% compostable al cabo de su ciclo útil',
      'Estructura porosa que propicia la respiración radicular',
      'Estética terracota minimalista, ideal para ventanas'
    ],
    specDetails: [
      { label: 'Diámetro', value: '14 cm por contenedor' },
      { label: 'Material', value: 'Desechos de cereales y aglutinante orgánico' },
      { label: 'Drenaje', value: 'Filtro textil de capilaridad incluido' }
    ]
  }
];

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const categories = ['Todos', 'Sustratos', 'Semillas', 'Accesorios'];

  const filteredProducts = PRODUCTS_DATA.filter(prod => {
    const matchesCategory = selectedCategory === 'Todos' || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCartWithFeedback = (prod: Product) => {
    onAddToCart(prod);
    setAddedAnimationId(prod.id);
    setTimeout(() => {
      setAddedAnimationId(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Intro section & Search bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/90 dark:bg-zinc-900 p-6 rounded-3xl border border-sage-100 dark:border-zinc-800 shadow-xs">
        <div className="flex-1">
          <h2 className="font-display font-medium text-2xl text-zinc-900 dark:text-zinc-50 flex items-center gap-2.5">
            <Leaf className="text-terracotta-500 fill-terracotta-100 dark:fill-transparent animate-pulse" size={22} />
            Catálogo <span className="font-display italic font-bold text-terracotta-600 dark:text-terracotta-500">AgroMarket Cruz</span>
          </h2>
          <p className="text-xs text-zinc-550 dark:text-zinc-400 mt-1 font-sans">
            Línea selecta de sustratos, semillas orgánicas y accesorios de cultivo biodinámico.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative max-w-sm w-full">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            id="search-input"
            type="text" 
            placeholder="Buscar fibra, semillas, humus..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-terracotta-50/40 dark:bg-zinc-800 border border-terracotta-100 dark:border-zinc-700 rounded-2xl pl-9 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-terracotta-500 focus:border-terracotta-500 outline-none text-zinc-800 dark:text-zinc-100 transition-all font-sans"
          />
        </div>
      </div>

      {/* Tabs Filter Bar */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-sage-800 dark:text-sage-200 flex items-center gap-1.5 mr-2">
          <SlidersHorizontal size={13} />
          Filtración selectiva:
        </span>
        <div className="flex p-1 bg-[#ebe9e4] dark:bg-zinc-800/80 rounded-2xl gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-btn-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-150 cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-sage-700 text-white shadow-sm' 
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 ml-auto select-none">
          Mostrando {filteredProducts.length} de {PRODUCTS_DATA.length} insumos selectos
        </span>
      </div>

      {/* Grid List Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((prod) => (
            <motion.div
              layout
              key={prod.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`rounded-3xl overflow-hidden shadow-xs transition-all duration-300 group flex flex-col justify-between border ${
                prod.category === 'Semillas'
                  ? 'bg-amber-50/5 dark:bg-zinc-900/30 border-amber-250/70 dark:border-amber-900/40 hover:border-amber-500 dark:hover:border-amber-500 hover:shadow-md'
                  : 'bg-white dark:bg-zinc-900 border-[#e5dfd9] dark:border-zinc-800 hover:border-terracotta-200 dark:hover:border-zinc-700 hover:shadow-md'
              }`}
            >
              {/* Product Card Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-[#ebe9e4] dark:bg-zinc-950 text-left">
                <img 
                  src={prod.imageUrl} 
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category & Status Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  <span className="bg-sage-700/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                    {prod.category}
                  </span>
                  <span className="bg-white/95 backdrop-blur-md dark:bg-zinc-900/90 text-terracotta-800 dark:text-terracotta-100 text-[9px] font-bold px-2.5 py-0.5 rounded-lg border border-terracotta-100/30">
                    🌿 {prod.ecologicalFactor}
                  </span>
                </div>

                {/* Special Highlight Ribbon for Urban Edible Crops */}
                {prod.category === 'Semillas' && (
                  <div className="absolute bottom-3 left-3 bg-gradient-to-r from-amber-500 via-amber-600 to-terracotta-600 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-lg shadow-md uppercase tracking-wider flex items-center gap-1 select-none z-10">
                    <Sparkles size={10} className="animate-pulse" />
                    <span>Cultivo del Hogar</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-zinc-950/80 backdrop-blur-md text-zinc-150 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 z-10">
                  <Star fill="#f59e0b" stroke="#f59e0b" size={10} />
                  <span>{prod.rating.toFixed(1)}</span>
                </div>

                {/* Quick inspection overlay */}
                <button
                  id={`inspect-${prod.id}`}
                  onClick={() => setSelectedProduct(prod)}
                  className="absolute bottom-3 right-3 bg-white/95 dark:bg-zinc-900/90 hover:bg-terracotta-600 hover:text-white p-2.5 rounded-xl text-zinc-700 dark:text-zinc-200 shadow-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 cursor-pointer animate-fade-in"
                  title="Detalles ecológicos"
                >
                  <Eye size={14} />
                </button>
              </div>

              {/* Product Content info */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-display font-bold text-zinc-900 dark:text-zinc-100 text-lg group-hover:text-terracotta-600 dark:group-hover:text-terracotta-400 transition-colors">
                      {prod.name}
                    </h3>
                    <span className="font-mono font-bold text-terracotta-600 dark:text-terracotta-500 text-right whitespace-nowrap text-base">
                      ${prod.price.toFixed(2)}
                    </span>
                  </div>
                  
                  <span className="text-[10px] text-zinc-400 font-mono italic">
                    Unidad: {prod.unit} • En stock: {prod.stock} u.
                  </span>

                  <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                {/* Benefits / Fast highlights list */}
                <div className="mb-1 py-3 bg-sage-50/40 dark:bg-zinc-950/20 rounded-2xl px-4 border border-sage-100/50 hover:border-sage-250 transition-all">
                  <span className="text-[10px] font-bold text-sage-800 dark:text-sage-200 block mb-1">Beneficios destacados:</span>
                  <ul className="text-[10px] text-zinc-650 dark:text-zinc-400 space-y-1">
                    {prod.benefits.slice(0, 2).map((b, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 flex-shrink-0" />
                        <span className="truncate">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to Cart button bar */}
                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/85 pt-4 mt-auto">
                  <button
                    id={`details-btn-${prod.id}`}
                    onClick={() => setSelectedProduct(prod)}
                    className="text-xs font-bold text-terracotta-600 hover:text-terracotta-850 dark:text-terracotta-400 dark:hover:text-terracotta-300 flex items-center gap-1 cursor-pointer outline-none font-sans"
                  >
                    <span>Ficha detallada</span>
                    <ChevronRight size={13} />
                  </button>

                  <button
                    id={`add-btn-${prod.id}`}
                    onClick={() => handleAddToCartWithFeedback(prod)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all duration-250 flex items-center gap-1.5 cursor-pointer outline-none ${
                      addedAnimationId === prod.id
                        ? 'bg-terracotta-700 text-white shadow-md scale-95'
                        : 'bg-terracotta-600 hover:bg-terracotta-700 text-white hover:shadow-xs'
                    }`}
                  >
                    {addedAnimationId === prod.id ? (
                      <>
                        <CheckCircle size={13} className="text-white animate-pulse" />
                        <span>Agregado ✓</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={13} />
                        <span>Añadir al carro</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Technical Detail Modal Component (AnimatePresence details) */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-zinc-950/55 backdrop-blur-sm z-55 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.93, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 15 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col"
            >
              <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-950">
                <img 
                  src={selectedProduct.imageUrl} 
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-sage-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg uppercase tracking-wider">
                    {selectedProduct.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 bg-zinc-950/85 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-terracotta-500/20">
                  🌿 {selectedProduct.ecologicalFactor}
                </div>
              </div>

              {/* Modal Description Content */}
              <div className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[350px]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-50">
                      {selectedProduct.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5 italic">
                      Insumo original de AgroMarket Cruz • {selectedProduct.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-mono font-extrabold text-terracotta-600 dark:text-terracotta-400 block">
                      ${selectedProduct.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-zinc-450 block font-mono">Stock: {selectedProduct.stock} u.</span>
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-150 dark:border-zinc-800/80">
                  {selectedProduct.description}
                </p>

                {/* Active benefits section */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-sage-800 dark:text-sage-300 block border-b border-zinc-100 dark:border-zinc-850 pb-1">
                    Beneficios Ecológicos y Técnicos
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {selectedProduct.benefits.map((ben, index) => (
                      <div key={index} className="flex gap-2 p-2.5 bg-sage-50/20 dark:bg-zinc-800/20 rounded-xl text-[11px] text-zinc-650 dark:text-zinc-400 border border-sage-100/50">
                        <Sprout size={13} className="text-terracotta-500 shrink-0 mt-0.5 animate-bounce" />
                        <span>{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Spec sheets */}
                <div className="flex flex-col gap-2 bg-zinc-50/50 dark:bg-zinc-950/30 p-3.5 rounded-xl">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Especificación del Insumo</span>
                  <div className="space-y-1.5 mt-1">
                    {selectedProduct.specDetails.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center text-[10px] font-mono border-b border-zinc-200/40 dark:border-zinc-850 pb-1.5 last:border-b-0 last:pb-0">
                        <span className="text-zinc-500 dark:text-zinc-400">{spec.label}</span>
                        <span className="text-zinc-700 dark:text-zinc-200 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons bar */}
              <div className="p-5 border-t border-zinc-100 dark:border-zinc-800/85 bg-zinc-50/50 dark:bg-zinc-950/20 flex gap-3 justify-end">
                <button
                  id="modal-close-btn"
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 border border-zinc-200 dark:border-zinc-750 rounded-xl text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer outline-none"
                >
                  Cerrar
                </button>
                <button
                  id="modal-add-btn"
                  onClick={() => {
                    handleAddToCartWithFeedback(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="px-4 py-2 bg-terracotta-600 text-white rounded-xl text-xs font-bold hover:bg-terracotta-700 shadow-sm flex items-center gap-1.5 cursor-pointer transition-all outline-none"
                >
                  <ShoppingBag size={13} />
                  <span>Añadir al Carro</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
