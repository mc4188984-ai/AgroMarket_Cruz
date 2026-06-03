import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Leaf, 
  Gift, 
  Activity, 
  ShieldCheck, 
  MessageSquare,
  AlertCircle,
  Truck,
  CheckCircle2,
  BookmarkCheck
} from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onClose?: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onClose
}) => {
  const [discountCode, setDiscountCode] = useState('');
  const [activeDiscount, setActiveDiscount] = useState<number>(0); // percentages
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
  const [checkoutCode, setCheckoutCode] = useState<string | null>(null);

  // Math Pricing summation
  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const discountAmount = subtotal * (activeDiscount / 100);
  const shippingFee = subtotal > 30 || subtotal === 0 ? 0 : 4.50; // free shipping of ecological goods above $30
  const total = subtotal - discountAmount + shippingFee;

  // Calculador Ecológico Integrado al Carro
  // Calculates estimated urban organic impact from current shopping cart contents
  const calculateEcoImpact = () => {
    let cocofiberLiters = 0;
    let humusKg = 0;
    let seedPacks = 0;

    cartItems.forEach(item => {
      if (item.product.id === 'prod-cocofiber') {
        cocofiberLiters += item.quantity * 10;
      } else if (item.product.id === 'prod-humus') {
        humusKg += item.quantity * 5;
      } else if (item.product.id === 'prod-seeds') {
        seedPacks += item.quantity;
      }
    });

    // Humus covers approx 2 square meters per kg for rich urban gardening
    const landFertilizedSqM = (humusKg * 2).toFixed(1);
    // Coconut fiber prevents carbon burning of peat moss
    const co2AvoidedKg = (cocofiberLiters * 0.45 + humusKg * 1.2).toFixed(2);
    // Approximate count of organic plant sprouts
    const estimatedSprouts = seedPacks * 50;

    return {
      landFertilizedSqM,
      co2AvoidedKg,
      estimatedSprouts
    };
  };

  const { landFertilizedSqM, co2AvoidedKg, estimatedSprouts } = calculateEcoImpact();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = discountCode.trim().toUpperCase();
    if (normalized === 'CULTIVAVERDE' || normalized === 'AGROCRUZ' || normalized === 'ECO20') {
      setActiveDiscount(20);
      setCouponFeedback('¡Código de 20% de Descuento Ecológico Activado con éxito!');
      setDiscountCode('');
    } else {
      setCouponFeedback('Código inválido. Prueba con ECO20 o CULTIVAVERDE');
      setTimeout(() => setCouponFeedback(null), 3000);
    }
  };

  const handleCheckoutProcess = () => {
    if (cartItems.length === 0) return;
    const orderNum = 'AMC-' + Math.floor(100000 + Math.random() * 900000);
    setCheckoutCode(orderNum);
  };

  const handleResetCheckout = () => {
    setCheckoutCode(null);
    onClearCart();
  };

  return (
    <div id="cart-sidebar" className="bg-white dark:bg-zinc-900 border border-sage-100 dark:border-zinc-800 rounded-3xl p-5 shadow-sm sticky top-24 flex flex-col gap-5 h-full max-h-[85vh] lg:max-h-[calc(100vh-140px)] overflow-y-auto">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-terracotta-100 dark:bg-terracotta-950/30 text-terracotta-600 dark:text-terracotta-400 rounded-lg shrink-0">
            <ShoppingBag size={18} />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-50 leading-tight">
              Carrito AgroMarket Cruz
            </h3>
            <span className="text-[10px] text-zinc-400 font-mono">Resumen de Insumos Activos</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {cartItems.length > 0 && (
            <button
              id="clear-cart-btn"
              onClick={onClearCart}
              className="text-[10px] text-zinc-400 hover:text-red-500 font-mono transition flex items-center gap-1 bg-zinc-50 dark:bg-zinc-800 px-2 py-0.5 rounded cursor-pointer"
              title="Vaciar Carro"
            >
              <Trash2 size={11} />
              <span>Vaciar</span>
            </button>
          )}
          {onClose && (
            <button
              id="close-drawer-btn"
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer text-xs font-bold"
              title="Cerrar carrito"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {checkoutCode ? (
          /* Check success view */
          <motion.div
            key="checkout-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-4 text-center py-6"
          >
            <div className="mx-auto p-3 bg-sage-50 text-sage-600 rounded-full dark:bg-zinc-800 dark:text-sage-400">
              <CheckCircle2 size={36} className="text-terracotta-600 animate-bounce" />
            </div>
            
            <div>
              <h4 className="font-display font-bold text-base text-zinc-950 dark:text-zinc-50">
                ¡Pedido Confirmado!
              </h4>
              <p className="text-[11px] text-zinc-500 mt-1 px-2 leading-relaxed font-sans">
                Su orden ha sido sincronizada en el sistema ecológico de AgroMarket Cruz. Prepárese para iniciar su próximo cultivo urbano sostenible.
              </p>
            </div>

            {/* Generated ticket order details */}
            <div className="bg-[#fcfbf9] dark:bg-zinc-950/45 border border-sage-100 dark:border-zinc-800/60 rounded-2xl p-4 text-left font-mono text-[10px] space-y-1.5">
              <div className="font-bold text-sage-800 dark:text-sage-300 flex justify-between">
                <span>Código de Reserva:</span>
                <span className="text-terracotta-605 font-sans font-bold">{checkoutCode}</span>
              </div>
              <div className="text-zinc-500 flex justify-between font-mono">
                <span>Total Abonado:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">${total.toFixed(2)}</span>
              </div>
              {parseFloat(co2AvoidedKg) > 0 && (
                <div className="text-terracotta-700 font-semibold border-t border-zinc-150 pt-1.5 mt-1.5 flex justify-between">
                  <span>Carbono Evitado CO2:</span>
                  <span>{co2AvoidedKg} kg</span>
                </div>
              )}
            </div>

            <button
               id="success-new-order-btn"
               onClick={handleResetCheckout}
               className="w-full py-2.5 bg-sage-700 hover:bg-sage-850 text-white rounded-xl text-xs font-bold cursor-pointer transition-all outline-none font-sans"
            >
              Iniciar Nueva Compra
            </button>
          </motion.div>
        ) : cartItems.length === 0 ? (
          /* Empty cart view */
          <motion.div
            key="empty-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center gap-2 "
          >
            <div className="p-3 bg-[#fcfbf9] dark:bg-zinc-800 text-zinc-400 rounded-2xl border border-zinc-100">
              <Leaf className="opacity-40 text-sage-600" size={24} />
            </div>
            <span className="text-xs font-semibold text-zinc-400 leading-normal">El carrito de compras está vacío</span>
            <p className="text-[10px] text-zinc-400 px-6 max-w-xs leading-relaxed font-sans">
              Agrega productos de agricultura urbana (como fibra de coco, humus, o de semillas orgánicas) para calcular los importes interactivos.
            </p>
          </motion.div>
        ) : (
          /* Active cart process */
          <motion.div
            key="active-cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col gap-4"
          >
            {/* List items */}
            <div className="max-h-[220px] overflow-y-auto space-y-3 pr-1">
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex justify-between items-center gap-2 bg-zinc-50/50 dark:bg-zinc-950/20 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-850"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {item.product.name}
                      </h4>
                      <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono mt-0.5">
                        <span>${item.product.price.toFixed(2)} x {item.quantity}</span>
                        <span className="font-bold text-terracotta-600 dark:text-terracotta-400">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Quantity controllers */}
                    <div className="flex items-center bg-white dark:bg-zinc-800 border border-zinc-150 dark:border-zinc-700/80 rounded-lg p-0.5 scale-90">
                      <button
                        id={`dec-qty-${item.product.id}`}
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="p-1 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded text-zinc-500 cursor-pointer"
                      >
                        <Minus size={9} />
                      </button>
                      <span className="w-5 text-center text-xs font-mono font-medium">
                        {item.quantity}
                      </span>
                      <button
                        id={`inc-qty-${item.product.id}`}
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="p-1 hover:bg-zinc-50 dark:hover:bg-zinc-700 rounded text-zinc-500 cursor-pointer"
                      >
                        <Plus size={9} />
                      </button>
                    </div>

                    <button
                      id={`rm-item-${item.product.id}`}
                      onClick={() => onRemoveItem(item.product.id)}
                      className="p-1 text-zinc-300 hover:text-red-500 transition cursor-pointer"
                      title="Eliminar insumo"
                    >
                      <Trash2 size={12} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Ecologic Impact Stats Panel */}
            {(parseFloat(co2AvoidedKg) > 0 || parseFloat(landFertilizedSqM) > 0) && (
              <div className="bg-sage-50/40 dark:bg-sage-950/10 border border-sage-500/15 rounded-2xl p-3 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold text-sage-800 dark:text-sage-200 uppercase tracking-wider flex items-center gap-1 select-none font-mono">
                  <Activity size={10} className="text-terracotta-500 animate-pulse" />
                  Impacto Urbano de tu Carrito:
                </span>
                <div className="grid grid-cols-2 gap-2 mt-0.5 text-[9px] font-mono text-zinc-650 dark:text-zinc-400">
                  {parseFloat(co2AvoidedKg) > 0 && (
                    <div className="bg-white/60 dark:bg-zinc-900/60 p-1.5 rounded border border-[#e5dfd9] dark:border-zinc-800">
                      <div className="text-terracotta-600 dark:text-terracotta-400 font-bold text-xs">{co2AvoidedKg} kg</div>
                      <div className="text-[8px] uppercase tracking-tighter text-zinc-400 mt-0.5">CO2 evitado/retenido</div>
                    </div>
                  )}
                  {parseFloat(landFertilizedSqM) > 0 && (
                    <div className="bg-white/60 dark:bg-zinc-900/60 p-1.5 rounded border border-[#e5dfd9] dark:border-zinc-800">
                      <div className="text-sage-700 dark:text-sage-300 font-bold text-xs">{landFertilizedSqM} m²</div>
                      <div className="text-[8px] uppercase tracking-tighter text-zinc-400 mt-0.5">Suelo enriquecido</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Promo coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-1.5 pt-1">
              <input
                id="coupon-input"
                type="text"
                placeholder="Código (ej. ECO20)"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 rounded-lg px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-terracotta-500 text-zinc-800 dark:text-zinc-100 font-mono placeholder:text-zinc-400 placeholder:italic placeholder:font-sans"
              />
              <button
                id="apply-coupon-btn"
                type="submit"
                className="px-2.5 py-1 bg-[#1c1917] hover:bg-terracotta-600 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                Aplicar
              </button>
            </form>

            {couponFeedback && (
              <span className={`text-[10px] font-medium leading-none block px-1 ${activeDiscount > 0 ? 'text-terracotta-600' : 'text-amber-600'}`}>
                {couponFeedback}
              </span>
            )}

            {/* Sum totals math sheet details */}
            <div className="border-t border-zinc-150 dark:border-zinc-800 pt-3 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {activeDiscount > 0 && (
                <div className="flex justify-between text-terracotta-600 dark:text-terracotta-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Gift size={10} />
                    Eco-Descuento (20%):
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-zinc-500 font-mono">
                <span className="flex items-center gap-1 text-[11px] font-sans">
                  <Truck size={10} />
                  Envío Ecológico:
                </span>
                <span>{shippingFee === 0 ? '¡Gratis!' : `$${shippingFee.toFixed(2)}`}</span>
              </div>

              {shippingFee > 0 && (
                <div className="text-[9px] text-zinc-400 leading-none font-sans">
                  ¡Envío Gratis por compras superiores a $30.00! Falta ${(30 - subtotal).toFixed(2)}
                </div>
              )}

              <div className="flex justify-between text-zinc-800 dark:text-zinc-50 font-bold text-sm border-t border-zinc-100 dark:border-zinc-850 pt-2.5 mt-1 pb-1">
                <span className="font-sans">Total AMC:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Live checkout confirmation */}
            <button
              id="checkout-btn"
              onClick={handleCheckoutProcess}
              className="w-full py-2.5 bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all outline-none cursor-pointer font-sans"
            >
              <ShieldCheck size={14} />
              <span>Confirmar Pedido Sostenible</span>
            </button>

            <span className="text-[9px] text-zinc-400 text-center block max-w-xs leading-tight mx-auto px-2 font-sans">
              Pago 100% verificado contra entrega. Compromiso de carbono neutral de la red AgroMarket Cruz.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
