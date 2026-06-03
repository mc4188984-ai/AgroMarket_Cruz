import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sprout, 
  Trash, 
  HelpCircle, 
  Info, 
  Calculator, 
  ChevronRight, 
  Layers, 
  Scale, 
  Activity, 
  ShoppingBag,
  Sparkles,
  Award
} from 'lucide-react';
import { Product } from '../types';

interface EcoCalculatorProps {
  onAddSubstrateMix: (coconutQty: number, humusQty: number) => void;
}

export const EcoCalculator: React.FC<EcoCalculatorProps> = ({ onAddSubstrateMix }) => {
  const [numPots, setNumPots] = useState<number>(4);
  const [potVolumeLiters, setPotVolumeLiters] = useState<number>(5); // average 5L pot
  
  // Cultivation formula selector: default is 60/40 recommended ratio
  const [cocoFiberRatio, setCocoFiberRatio] = useState<number>(60);
  const [potType, setPotType] = useState<'herbs' | 'vegetables' | 'flowers'>('vegetables');

  // Math equations for urban organic soils
  const totalVolumeNeeded = numPots * potVolumeLiters;
  const cocofiberVolume = parseFloat(((totalVolumeNeeded * cocoFiberRatio) / 100).toFixed(1));
  const wormHumusVolume = parseFloat(((totalVolumeNeeded * (100 - cocoFiberRatio)) / 100).toFixed(1));

  // Fibra de Coco usually comes in blocks expanding to 10L. 1 block = 10L.
  const recommendedCocoBlocks = Math.max(1, Math.ceil(cocofiberVolume / 10));
  // Humus de lombriz weight: 1 liter ≈ 0.65 kg. Saco of 5kg = ~7.7 Liters.
  const recommendedHumusSacks = Math.max(1, Math.ceil((wormHumusVolume * 0.65) / 5));

  // Estimated harvest kilograms based on agricultural specs (3.5kg per pot for vegetables, 1.2kg for herbs, 2kg flowers)
  const getYieldMultiplier = () => {
    if (potType === 'herbs') return 1.2;
    if (potType === 'vegetables') return 3.5;
    return 1.8;
  };
  const estimatedYieldKg = (numPots * getYieldMultiplier()).toFixed(1);
  const co2OffsetKg = (totalVolumeNeeded * 0.55).toFixed(1);

  const handleAddMixClick = () => {
    onAddSubstrateMix(recommendedCocoBlocks, recommendedHumusSacks);
  };  return (
    <div className="bg-gradient-to-br from-sage-50/40 via-[#fcfbf9] to-white dark:from-zinc-900/60 dark:to-zinc-900 border border-sage-100 dark:border-zinc-850 rounded-3xl p-6 shadow-xs flex flex-col gap-6">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-terracotta-100 dark:bg-terracotta-950/40 text-terracotta-600 dark:text-terracotta-400 rounded-lg">
            <Calculator size={18} />
          </div>
          <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-50">
            Mezclador de Sustrato y Estimador de Cosecha
          </h3>
        </div>
        <p className="text-xs text-zinc-550 mt-1 font-sans">
          Calcula la fórmula de oro (60% Fibra de Coco + 40% Humus de Lombriz) para garantizar el éxito y salud de tus raíces.
        </p>
      </div>

      {/* Main Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Dimensions Configuration */}
        <div className="bg-white/80 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-850 pb-1.5 font-mono">
            <Layers size={13} className="text-terracotta-500" />
            Configuración de Cultivo
          </span>

          {/* Number of Pots slider */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-semibold font-sans">
              <span className="text-zinc-500">Número de macetas / jardineras:</span>
              <span className="font-mono font-bold text-terracotta-600">{numPots} unidades</span>
            </div>
            <input 
              id="calc-num-pots"
              type="range" 
              min="1" 
              max="20" 
              value={numPots}
              onChange={(e) => setNumPots(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-150 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-terracotta-600" 
            />
          </div>

          {/* Individual Pot Volume Capacity */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] font-semibold">
              <span className="text-zinc-500 font-sans">Capacidad media por maceta:</span>
              <span className="font-mono font-bold text-terracotta-600">{potVolumeLiters} Litros</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[3, 5, 8, 12].map((vol) => (
                <button
                  key={vol}
                  id={`vol-btn-${vol}`}
                  type="button"
                  onClick={() => setPotVolumeLiters(vol)}
                  className={`py-1.5 text-[10px] font-mono border rounded ${
                    potVolumeLiters === vol 
                      ? 'bg-terracotta-50 text-terracotta-700 border-terracotta-200 font-bold dark:bg-terracotta-950/20' 
                      : 'bg-transparent border-zinc-250 text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {vol}L
                </button>
              ))}
            </div>
          </div>

          {/* Crop plant type selection */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-zinc-500">¿Qué planeas sembrar?</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { type: 'herbs', label: 'Hierbas / Brotes' },
                { type: 'vegetables', label: 'Tomates / Hortalizas' },
                { type: 'flowers', label: 'Flores / Fresas' },
              ].map((item) => (
                <button
                  key={item.type}
                  id={`crop-${item.type}`}
                  type="button"
                  onClick={() => setPotType(item.type as any)}
                  className={`px-1 py-1.5 px-2 rounded-lg text-[10px] font-bold text-center border cursor-pointer ${
                    potType === item.type 
                      ? 'bg-sage-700 border-sage-800 text-white shadow-sm' 
                      : 'bg-zinc-50 dark:bg-zinc-805 border-zinc-200 text-zinc-650 dark:text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic ratios Mixer values */}
        <div className="bg-white/80 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 flex flex-col gap-4">
          <span className="text-xs font-semibold text-zinc-650 dark:text-zinc-400 flex items-center gap-1.5 border-b border-zinc-100 dark:border-zinc-850 pb-1.5 font-mono">
            <Scale size={13} className="text-terracotta-500" />
            Control de Proporciones (%)
          </span>

          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-[11px] font-sans">
              <span className="text-zinc-600 font-bold flex items-center gap-1">🟤 Fibra de Coco: {cocoFiberRatio}%</span>
              <span className="text-zinc-600 dark:text-zinc-400 font-bold font-mono">🖤 Humus: {100 - cocoFiberRatio}%</span>
            </div>
            
            <input 
              id="slider-custom-ratio"
              type="range" 
              min="30" 
              max="80" 
              step="5"
              value={cocoFiberRatio}
              onChange={(e) => setCocoFiberRatio(parseInt(e.target.value))}
              className="w-full h-1 bg-zinc-150 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-terracotta-600" 
            />

            <div className="flex justify-between text-[9px] text-zinc-400 mt-1 font-mono italic">
              <span>Menos fibra = Más compacto</span>
              <span className="text-terracotta-605 dark:text-terracotta-400 font-bold font-sans">Ideal recomendado: 60% coco / 40% humus</span>
              <span>Más fibra = Mayor drenaje</span>
            </div>
          </div>

          {/* Yield calculations list */}
          <div className="bg-sage-50/40 dark:bg-zinc-950/30 rounded-2xl p-3 border border-sage-100 space-y-2 mt-auto">
            <div className="flex items-center gap-1.5">
              <Award size={13} className="text-terracotta-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase text-sage-800 dark:text-sage-200 font-mono">Simulador de Impacto</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white dark:bg-zinc-900 p-2 rounded-lg border border-sage-100 shadow-xs">
                <span className="text-terracotta-650 dark:text-terracotta-400 font-bold font-mono text-base">{estimatedYieldKg} kg</span>
                <p className="text-[8px] text-zinc-400 uppercase tracking-tight mt-0.5">Estimado cosecha orgánica</p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-2 rounded-lg border border-sage-100 shadow-xs">
                <span className="text-[#3f6212] dark:text-sage-200 font-bold font-mono text-base">{co2OffsetKg} kg</span>
                <p className="text-[8px] text-zinc-400 uppercase tracking-tight mt-0.5 font-sans">CO2 evitado y fijado</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recommended list supply outputs & Call-to-action */}
      <div className="bg-zinc-50 dark:bg-zinc-950/30 p-4 rounded-2xl border border-zinc-150 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Calculations info */}
        <div>
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block font-mono">Deducción de Insumos Necesarios:</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs">
            <div className="bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-lg border border-sage-100/50 shadow-xs font-semibold">
              📦 Fibra de Coco: <span className="text-terracotta-600 dark:text-terracotta-400 font-mono font-extrabold">{recommendedCocoBlocks} bloques</span> (10L c/u)
            </div>
            <div className="bg-white dark:bg-zinc-900 px-3 py-1.5 rounded-lg border border-sage-100/50 shadow-xs font-semibold">
              🎒 Humus de Lombriz: <span className="text-terracotta-600 dark:text-terracotta-400 font-mono font-extrabold">{recommendedHumusSacks} sacos</span> (5kg c/u)
            </div>
          </div>
          <span className="text-[10px] text-zinc-500 leading-none mt-1.5 block font-sans">
            Cubre un volumen total de <strong className="text-zinc-650 dark:text-zinc-350">{totalVolumeNeeded} Litros</strong> para el sustrato de tus {numPots} macetas de {potVolumeLiters}L.
          </span>
        </div>

        {/* Add recommendation directly to the cart sidebar */}
        <button
          id="btn-add-mix-to-cart"
          onClick={handleAddMixClick}
          className="bg-terracotta-600 hover:bg-terracotta-700 self-start sm:self-center text-white py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer shrink-0 outline-none"
        >
          <ShoppingBag size={13} />
          <span>Añadir Fórmula a Carrito</span>
        </button>

      </div>

    </div>
  );
};
