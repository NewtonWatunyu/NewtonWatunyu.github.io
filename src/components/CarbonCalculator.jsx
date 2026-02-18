import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Calculator, Leaf, Info } from 'lucide-react';

const CarbonCalculator = () => {
    const [area, setArea] = useState('');
    const [unit, setUnit] = useState('hectares'); // hectares or football-fields

    // Constants
    const CARBON_PER_HECTARE = 121.95; // Mg C
    const FOOTBALL_FIELD_IN_HECTARES = 0.714;
    const SMARTPHONE_CHARGE_CO2EQ = 0.0075; // Approx kg CO2 per charge (simplified conversion)
    // 1 Mg C = 3.67 Mg CO2. 
    // Let's use a standard equivalence for "smartphone charges" based on energy.
    // Using EPA calculator logic or similar: 1 Mg Carbon * (44/12) = 3.67 Mg CO2.
    // A smartphone charge is super small. Let's use a known multiplier or just a relative scale.
    // One common stat: 1 ton of carbon ~ consumption of ...
    // Let's stick to the prompt's request for "Equivalent number of smartphone charges".
    // A smartphone charge is approx 0.015 kWh. 
    // 1 Mg C = 1000 kg C -> ~3670 kg CO2.
    // Global average carbon intensity of electricity ~0.475 kgCO2/kWh.
    // So 3670 / 0.475 = 7726 kWh.
    // 7726 / 0.015 = ~515,000 charges per Mg C. 
    // This is a rough estimate for educational purposes. 
    // We'll use a multiplier: 1 Mg C = 500,000 charges (nice round number for impact).
    const CHARGES_PER_MG_C = 500000;

    const calculateCarbon = () => {
        const val = parseFloat(area);
        if (isNaN(val) || val < 0) return { carbon: 0, charges: 0 };

        let hectares = val;
        if (unit === 'football-fields') {
            hectares = val * FOOTBALL_FIELD_IN_HECTARES;
        }

        const startbonMg = hectares * CARBON_PER_HECTARE;
        const charges = startbonMg * CHARGES_PER_MG_C;

        return {
            carbon: startbonMg.toLocaleString(undefined, { maximumFractionDigits: 2 }),
            charges: charges.toLocaleString(undefined, { maximumFractionDigits: 0 }),
            rawCarbon: startbonMg
        };
    };

    const results = calculateCarbon();

    return (
        <section className="py-20 px-4 bg-teal-50 min-h-[80vh] flex items-center justify-center">
            <div className="container mx-auto max-w-4xl">
                <div className="flex flex-col md:flex-row gap-12 items-center">

                    {/* Input Section */}
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl font-bold text-ocean-blue-900 mb-6">The Lab</h2>
                        <h3 className="text-2xl font-semibold text-teal-700 mb-4">Blue Carbon Calculator</h3>
                        <p className="text-slate-600 mb-8">
                            Seagrass meadows are powerful carbon sinks. Enter an area size to see their impact.
                        </p>

                        <div className="glass-panel p-8 bg-white shadow-lg">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-slate-700 mb-2">Area Size</label>
                                <div className="flex gap-4">
                                    <input
                                        type="number"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                        placeholder="Enter value..."
                                        className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <select
                                        value={unit}
                                        onChange={(e) => setUnit(e.target.value)}
                                        className="px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 outline-none"
                                    >
                                        <option value="hectares">Hectares</option>
                                        <option value="football-fields">Football Fields</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-ocean-blue-50 p-4 rounded-lg flex items-start gap-3">
                                <Info className="w-5 h-5 text-ocean-blue-600 mt-0.5 shrink-0" />
                                <p className="text-sm text-ocean-blue-800">
                                    <strong>Did you know?</strong> ~97% of this carbon is stored in the sediment/soil, not the leaves, and can remain trapped for millennia.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="w-full md:w-1/2">
                        <motion.div
                            className="glass-panel-dark bg-muddy-green-800 p-8 relative overflow-hidden"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>

                            <h4 className="text-lg font-medium text-teal-100 mb-6 flex items-center gap-2">
                                <Calculator className="w-5 h-5" /> Results
                            </h4>

                            <div className="space-y-8 relative z-10">
                                <div>
                                    <p className="text-slate-300 text-sm mb-1">Carbon Stored</p>
                                    <p className="text-5xl font-bold text-white tracking-tight">
                                        {results.carbon} <span className="text-2xl text-teal-300 font-normal">Mg C</span>
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">Based on Southeast Asian average (121.95 Mg C/ha)</p>
                                </div>

                                <div className="w-full h-px bg-white/10"></div>

                                <div>
                                    <p className="text-slate-300 text-sm mb-1">Equivalent To</p>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-teal-500/20 rounded-lg">
                                            <Battery className="w-8 h-8 text-teal-300" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold text-white">
                                                {results.charges}
                                            </p>
                                            <p className="text-teal-200 text-sm">Smartphone Charges</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CarbonCalculator;
