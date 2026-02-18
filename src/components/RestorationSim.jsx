import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Anchor, Sprout, Droplets, ArrowRight } from 'lucide-react';

const RestorationSim = () => {
    const [step, setStep] = useState(0); // 0: Intro, 1: Depth, 2: Method, 3: Substrate, 4: Result
    const [choices, setChoices] = useState({ depth: null, method: null, substrate: null });

    const handleChoice = (key, value) => {
        setChoices(prev => ({ ...prev, [key]: value }));
        setStep(prev => prev + 1);
    };

    const resetSim = () => {
        setChoices({ depth: null, method: null, substrate: null });
        setStep(0);
    };

    // Win condition: Sprigs + 2-4m + Anchors
    const isSuccess =
        choices.depth === 'optimal' &&
        choices.method === 'sprigs' &&
        choices.substrate === 'anchored';

    // Game Steps Configuration
    const steps = [
        {
            title: "Select Planting Depth",
            description: "Depth affects light availability and wave energy.",
            key: 'depth',
            options: [
                { id: 'shallow', label: '< 2 Meters', desc: 'Very high light, high heat', icon: '☀️' },
                { id: 'optimal', label: '2 - 4 Meters', desc: 'Balanced light & temp', icon: '✨' },
                { id: 'deep', label: '> 6 Meters', desc: 'Low light, cold', icon: '🌑' },
            ]
        },
        {
            title: "Select Planting Method",
            description: "How will you reintroduce the seagrass?",
            key: 'method',
            options: [
                { id: 'seeds', label: 'Seeds', desc: 'Low cost, low survival rate', icon: '🌱' },
                { id: 'sprigs', label: 'Sprigs / Plugs', desc: 'Mature plants, higher success', icon: '🌿' },
            ]
        },
        {
            title: "Select Substrate Strategy",
            description: "The seabed here has high wave energy.",
            key: 'substrate',
            options: [
                { id: 'loose', label: 'Loose Sand', desc: 'Natural planting', icon: '🏜️' },
                { id: 'anchored', label: 'Anchored (Bamboo)', desc: 'Secured against waves', icon: '⚓' },
            ]
        },
    ];

    return (
        <section className="py-20 px-4 bg-teal-900 text-white min-h-screen flex flex-col items-center justify-center">
            <div className="container mx-auto max-w-4xl text-center">
                <h2 className="text-4xl font-bold mb-4 text-muddy-green-300">Restoration Sim</h2>
                <p className="text-xl text-teal-100/80 mb-12">Mission: Restore the Meadow</p>

                <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 min-h-[400px] flex flex-col relative">

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-700">
                        <div
                            className="h-full bg-teal-500 transition-all duration-500"
                            style={{ width: `${(step / 4) * 100}%` }}
                        ></div>
                    </div>

                    <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center">
                        {step === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="w-24 h-24 bg-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Sprout className="w-12 h-12 text-teal-300" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Ready to plant?</h3>
                                <p className="text-slate-300 mb-8 max-w-lg mx-auto">
                                    Restoring a seagrass meadow is complex. You must make the right choices based on environmental conditions.
                                    If you fail, the plants will die or wash away.
                                </p>
                                <button
                                    onClick={() => setStep(1)}
                                    className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                                >
                                    Start Simulation
                                </button>
                            </motion.div>
                        )}

                        {step > 0 && step < 4 && (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="w-full max-w-2xl"
                            >
                                <h3 className="text-2xl font-bold mb-2">{steps[step - 1].title}</h3>
                                <p className="text-slate-400 mb-8">{steps[step - 1].description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {steps[step - 1].options.map((opt) => (
                                        <button
                                            key={opt.id}
                                            onClick={() => handleChoice(steps[step - 1].key, opt.id)}
                                            className="p-6 rounded-xl bg-slate-700 hover:bg-slate-600 border-2 border-transparent hover:border-teal-500 transition-all flex flex-col items-center gap-3 group"
                                        >
                                            <span className="text-4xl">{opt.icon}</span>
                                            <span className="font-bold text-white group-hover:text-teal-300">{opt.label}</span>
                                            <span className="text-xs text-slate-400">{opt.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 4 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6 ${isSuccess ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                                    {isSuccess ? <CheckResultIcon /> : <FailResultIcon />}
                                </div>

                                <h3 className={`text-3xl font-bold mb-4 ${isSuccess ? 'text-green-400' : 'text-red-400'}`}>
                                    {isSuccess ? 'Success: Meadow Established!' : 'Failure: Plants Lost'}
                                </h3>

                                <p className="text-slate-300 mb-8 max-w-lg mx-auto leading-relaxed">
                                    {isSuccess
                                        ? "Great job! By selecting Sprigs (hardy), Optimal Depth (good light/temp), and Anchors (protection from waves), your meadow has survived and is thriving."
                                        : "Unfortunately, your conditions weren't right. " + getFailReason(choices)
                                    }
                                </p>

                                <button
                                    onClick={resetSim}
                                    className="text-teal-300 underline hover:text-white"
                                >
                                    Try Again
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

// Helpers
const CheckResultIcon = () => (
    <svg className="w-16 h-16 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

const FailResultIcon = () => (
    <svg className="w-16 h-16 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const getFailReason = (choices) => {
    if (choices.depth === 'shallow') return "The water was too shallow and hot, cooking the plants.";
    if (choices.depth === 'deep') return "The water was too deep and dark; photosynthesis failed.";
    if (choices.substrate === 'loose') return "High wave energy washed away the plants because they weren't anchored.";
    if (choices.method === 'seeds') return "Seeds had a very low germination rate in these rough conditions.";
    return "The combination of factors led to high mortality.";
};

export default RestorationSim;
