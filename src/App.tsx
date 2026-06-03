import { useState, useCallback } from 'react';
import { 
  Sparkles, 
  Heart, 
  Info, 
  Zap, 
  Compass, 
  Leaf, 
  ChevronRight, 
  HelpCircle,
  Award,
  BookOpen,
  MessageSquare,
  Sprout,
  Store,
  ShoppingCart,
  Calendar
} from 'lucide-react';
import { ProductCatalog, PRODUCTS_DATA } from './components/ProductCatalog';
import { CartSidebar } from './components/CartSidebar';
import { EcoCalculator } from './components/EcoCalculator';
import { Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');
  const [tipIndex, setTipIndex] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Ecological tips carousel database
  const ECO_TIPS = [
    "¡Truco! La mezcla perfecta para macetas es 60% fibra de coco (retención y aire) y 40% humus de lombriz (nutrientes y vida).",
    "Riega tus semillas orgánicas con pulverizador fino para evitar desenterrar los pequeños brotes de raíces.",
    "El humus de lombriz no quema las raíces de las plantas, por lo que es ideal para principiantes y trasplantes delicados.",
    "La fibra de coco retiene una gran cantidad de líquido; comprueba la humedad introduciendo un dedo en el sustrato antes de volver a regar.",
    "La agricultura de balcón reduce hasta un 15% la temperatura de tu hogar en verano gracias a la evapotranspiración vegetal."
  ];

  // Cart operations
  const handleAddToCart = useCallback((product: Product) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + 1
        };
        return next;
      } else {
        return [...prev, { id: product.id, product, quantity: 1 }];
      }
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQuantity = useCallback((productId: string, delta: number) => {
    setCartItems(prev => {
      const targetIndex = prev.findIndex(item => item.product.id === productId);
      if (targetIndex === -1) return prev;
      
      const next = [...prev];
      const nextQty = next[targetIndex].quantity + delta;
      
      if (nextQty <= 0) {
        return next.filter(item => item.product.id !== productId);
      } else {
        next[targetIndex] = {
          ...next[targetIndex],
          quantity: nextQty
        };
        return next;
      }
    });
  }, []);

  const handleRemoveItem = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Substrate mixer integration
  const handleAddSubstrateMix = useCallback((coconutQty: number, humusQty: number) => {
    const cocoProduct = PRODUCTS_DATA.find(p => p.id === 'prod-cocofiber');
    const humusProduct = PRODUCTS_DATA.find(p => p.id === 'prod-humus');

    if (!cocoProduct || !humusProduct) return;

    setCartItems(prev => {
      let next = [...prev];

      // Update Coconut quantity
      const cocoIndex = next.findIndex(item => item.product.id === 'prod-cocofiber');
      if (cocoIndex > -1) {
        next[cocoIndex] = {
          ...next[cocoIndex],
          quantity: next[cocoIndex].quantity + coconutQty
        };
      } else {
        next.push({ id: 'prod-cocofiber', product: cocoProduct, quantity: coconutQty });
      }

      // Update Humus quantity
      const humusIndex = next.findIndex(item => item.product.id === 'prod-humus');
      if (humusIndex > -1) {
        next[humusIndex] = {
          ...next[humusIndex],
          quantity: next[humusIndex].quantity + humusQty
        };
      } else {
        next.push({ id: 'prod-humus', product: humusProduct, quantity: humusQty });
      }

      return next;
    });
    setIsCartOpen(true);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 font-sans ${themeMode === 'dark' ? 'bg-[#0b130e] text-zinc-100' : 'bg-[#fbf9f6] text-zinc-900'}`}>
      
      {/* Top Premium Announcement Bar */}
      <div className="bg-gradient-to-r from-terracotta-600 via-terracotta-700 to-sage-800 text-white text-[11px] sm:text-xs py-2.5 px-4 font-semibold relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-terracotta-800 shadow-md">
        <div className="flex items-center gap-2 truncate text-center sm:text-left">
          <span className="bg-white text-terracotta-700 font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider text-[8px] sm:text-[9px] shrink-0 animate-pulse flex items-center gap-1">
            🔥 ¡SUPER PROMOCIÓN!
          </span>
          <p className="truncate text-white font-medium hover:underline">
            Usa el cupón <strong className="bg-[#ffffff30] px-2 py-0.5 rounded-sm font-mono tracking-widest text-[#fff]">ECO20</strong> para 20% de descuento en cultivos. Envío gratis desde $25.
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-3 shrink-0 text-[11px] bg-black/25 px-3 py-1 rounded-full border border-white/15">
          <span className="text-[#a7f3d0] font-bold">Consejo:</span>
          <p className="max-w-[280px] lg:max-w-[450px] truncate text-zinc-100 italic">{ECO_TIPS[tipIndex]}</p>
          <button
            id="next-tip-btn"
            onClick={() => setTipIndex(prev => (prev + 1) % ECO_TIPS.length)}
            className="text-white hover:text-terracotta-200 transition font-extrabold underline pl-1 cursor-pointer outline-none"
          >
            Siguiente
          </button>
        </div>

        {/* Fallback button for mobile tip toggle */}
        <button
          id="next-tip-btn-mobile"
          onClick={() => setTipIndex(prev => (prev + 1) % ECO_TIPS.length)}
          className="md:hidden text-[10px] text-white hover:text-terracotta-200 transition font-bold underline cursor-pointer outline-none"
        >
          Ver Siguiente Consejo ➔
        </button>
      </div>

      {/* Main Premium Navbar (Dark Background Header) */}
      <header className="border-b border-zinc-800 bg-[#0f1411] text-zinc-100 sticky top-0 z-50 shadow-lg select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-terracotta-500 to-sage-500 text-white rounded-2xl shadow-lg ring-2 ring-white/10 flex items-center justify-center transform hover:rotate-6 transition duration-300">
              <Sprout size={20} className="animate-spin-slow text-white" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 flex-wrap sm:flex-nowrap">
                <span className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-terracotta-500 via-amber-400 to-[#10b981] bg-clip-text text-transparent">
                  AgroMarket Cruz
                </span>
                <span className="text-[8px] font-mono font-extrabold bg-terracotta-900/90 text-terracotta-250 px-1.5 py-0.5 rounded-md border border-terracotta-800/40">
                  Urbano • 100% Orgánico
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 leading-none mt-1">Huertos Sostenibles y Kit de Cultivo</p>
            </div>
          </div>

          {/* Quick Stats & Theme toggler */}
          <div className="flex items-center gap-2.5">
            
            <div className="hidden lg:flex items-center gap-4 text-xs text-zinc-400 pr-3 border-r border-zinc-800">
              <div className="flex items-center gap-1.5 font-mono bg-zinc-900/60 py-1.5 px-3 rounded-lg border border-zinc-800/60">
                <Calendar size={13} className="text-terracotta-500" />
                <span>Siembra: <strong className="text-[#10b981]">Temporada Activa</strong></span>
              </div>
            </div>

            {/* Floating side drawer trigger button in the navbar */}
            <button
              id="navbar-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-850 hover:border-terracotta-500/50 transition cursor-pointer text-xs flex items-center gap-1.5 font-medium outline-none"
              title="Ver mi carrito"
            >
              <ShoppingCart size={13} className="text-terracotta-500 animate-pulse" />
              <span className="hidden sm:inline">Mi Carrito</span>
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-terracotta-600 text-white text-[9px] font-extrabold flex items-center justify-center animate-bounce shadow-md">
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                </span>
              )}
            </button>

            <button
              id="global-theme-btn"
              onClick={handleToggleTheme}
              className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200 hover:text-white hover:bg-zinc-850 hover:border-sage-500/50 transition cursor-pointer text-xs flex items-center gap-2 font-medium outline-none"
            >
              <Zap size={13} className={themeMode === 'dark' ? 'text-amber-400 fill-amber-400' : 'text-terracotta-500'} />
              <span className="hidden sm:inline">Modo {themeMode === 'light' ? 'Oscuro' : 'Claro'}</span>
            </button>
          </div>

        </div>
      </header>

      {/* Hero Banner Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* Banner with organic textures and highlights */}
        <section className="bg-gradient-to-br from-sage-50 via-[#f9f8f6] to-white dark:from-[#0f1812] dark:to-[#0a110d] border border-sage-100 dark:border-zinc-800/80 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
          {/* Graphic shapes */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-radial from-sage-200/20 to-transparent dark:from-terracotta-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-3xl relative z-10 flex flex-col gap-4 text-left">
            <div className="flex items-center gap-1.5 bg-terracotta-100 dark:bg-zinc-800 text-terracotta-800 dark:text-terracotta-300 text-[10px] font-extrabold py-1 px-3.5 rounded-full w-fit border border-terracotta-200/45">
              <Leaf size={11} className="text-terracotta-500 animate-pulse" />
              <span className="tracking-wider">CULTIVA TUS PROPIOS ALIMENTOS DESDE CASA</span>
            </div>
            
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-zinc-900 dark:text-zinc-50 leading-tight tracking-tight">
              Vive la Agricultura Urbana con <span className="underline decoration-terracotta-500 decoration-wavy underline-offset-4">AgroMarket Cruz</span>
            </h1>
            
            <p className="text-zinc-600 dark:text-zinc-350 text-xs sm:text-sm leading-relaxed max-w-2xl font-sans text-justify sm:text-left">
              Simplificamos el cultivo ecológico en departamentos, balcones o terrazas con insumos 
              orgánicos premium. Compra fibra de coco deshidratada, humus de lombriz rico en microbiota activa, 
              y colecciones de semillas con alta tasa de germinación. ¡Configura el sustrato perfecto con nuestro simulador inteligente!
            </p>

            <span className="text-[10px] text-terracotta-600 dark:text-terracotta-400 font-semibold font-mono tracking-wide mt-1 select-none">
              ✓ DESCUENTO DISPONIBLE: Introduce el cupón <strong className="bg-terracotta-100 dark:bg-zinc-800 text-terracotta-700 dark:text-terracotta-300 px-1.5 py-0.5 rounded font-mono">ECO20</strong> para obtener un 20% de rebaja en tu compra.
            </span>
          </div>
        </section>

        {/* Main Content Split: Left items / Right fixed interactive checkout cart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Area (Col Span 12 due to gorgeous sideways floating panel integration) */}
          <div className="lg:col-span-12 flex flex-col gap-8">
            
            {/* Component 1: Custom Eco Substrate Ratio Mixer */}
            <EcoCalculator onAddSubstrateMix={handleAddSubstrateMix} />

            {/* Component 2: Product Catalog list */}
            <ProductCatalog onAddToCart={handleAddToCart} />

          </div>

        </div>

        {/* FLOATING AND LATERAL DRAWER CARTS SECTION */}
        <AnimatePresence>
          {isCartOpen && (
            <>
              {/* Overlay Backdrop background shadow */}
              <motion.div
                id="drawer-backdrop"
                key="drawer-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.55 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsCartOpen(false)}
                className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs z-50 transition-opacity"
              />
              
              {/* Sliding Floating Drawer Sidepanel */}
              <motion.div
                id="drawer-panel"
                key="drawer-panel"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 26, stiffness: 220 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl z-55 border-l border-sage-100 dark:border-zinc-800 flex flex-col"
              >
                <div className="h-full flex flex-col p-5">
                  <div className="flex-1 overflow-visible">
                    <CartSidebar 
                      cartItems={cartItems}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                      onClearCart={handleClearCart}
                      onClose={() => setIsCartOpen(false)}
                    />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Floating Action Circle Button for Cart (FAB) */}
        <motion.button
          id="floating-cart-fab"
          onClick={() => setIsCartOpen(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 p-4 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full shadow-lg z-40 flex items-center justify-center cursor-pointer transition-all border border-terracotta-500/10 outline-none"
          title="Ver Carrito de Compras"
        >
          <div className="relative">
            <ShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-3.5 -right-3.5 h-5 w-5 rounded-full bg-sage-700 text-white text-[10px] font-bold flex items-center justify-center animate-bounce border border-white dark:border-zinc-900">
                {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
              </span>
            )}
          </div>
        </motion.button>

        {/* Guarantee block under the catalog */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl p-4 flex gap-3 text-xs shadow-xs max-w-xl mx-auto w-full">
          <div className="p-2 bg-terracotta-50 dark:bg-zinc-800 text-terracotta-600 rounded-xl shrink-0 h-fit">
            <Store size={15} />
          </div>
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 font-sans">Red AgroMarket Cruz</h4>
            <p className="text-[11px] text-zinc-500 leading-relaxed mt-1">
              Envíos express en transporte de bajas emisiones. Garantizamos el origen de insumos y semillas libres de herbicidas o químicos sintéticos.
            </p>
          </div>
        </div>

        {/* Info footer & Environmental metrics overview */}
        <footer className="bg-white/80 dark:bg-zinc-900 border border-sage-100/30 dark:border-zinc-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 mt-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-terracotta-600 to-sage-600 rounded-2xl text-white">
              <Sprout size={20} className="animate-bounce" />
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-50">
                AgroMarket Cruz © {currentYear}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl">
                Alentando la reducción de la huella de carbono alimenticia mediante producción vegetal doméstica y regeneración de suelos.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-terracotta-600 dark:text-terracotta-400 font-mono">
            <Heart size={14} className="text-terracotta-500 fill-terracotta-500 animate-pulse" />
            <span>Cultivo con Conciencia Colectiva</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
