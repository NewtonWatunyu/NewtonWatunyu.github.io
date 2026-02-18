import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Calculator, Target, Activity, Sprout } from 'lucide-react';

import HeroSection from './components/HeroSection';
import CarbonCalculator from './components/CarbonCalculator';
import QuadratGame from './components/QuadratGame';
import DugongTimeline from './components/DugongTimeline';
import RestorationSim from './components/RestorationSim';
import Footer from './components/Footer';

function App() {
    const [activeTab, setActiveTab] = useState('hero');

    const tabs = [
        { id: 'hero', label: 'The Blue Heart', icon: Map, component: HeroSection },
        { id: 'lab', label: 'The Lab', icon: Calculator, component: CarbonCalculator },
        { id: 'field', label: 'The Field', icon: Target, component: QuadratGame },
        { id: 'crisis', label: 'The Crisis', icon: Activity, component: DugongTimeline },
        { id: 'sim', label: 'Restoration', icon: Sprout, component: RestorationSim },
    ];

    const ActiveComponent = tabs.find(t => t.id === activeTab)?.component || HeroSection;

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col font-sans">

            {/* Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-ocean-blue-900/90 backdrop-blur-md border-b border-white/10 shadow-lg">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo / Title */}
                        <div
                            className="font-bold text-xl text-teal-300 hidden md:block cursor-pointer hover:text-white transition-colors"
                            onClick={() => setActiveTab('hero')}
                        >
                            Seagrass Guardian
                        </div>

                        {/* Desktop Tabs */}
                        <div className="hidden md:flex items-center gap-2">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const Icon = tab.icon;

                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`
                      relative px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all duration-300
                      ${isActive ? 'text-white' : 'text-slate-400 hover:text-teal-200 hover:bg-white/5'}
                    `}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-teal-600/20 border border-teal-500/50 rounded-lg shadow-[0_0_15px_rgba(45,212,191,0.3)]"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-teal-300' : ''}`} />
                                        <span className="relative z-10">{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Mobile Tabs (Simplified) */}
                        <div className="flex md:hidden w-full justify-between items-center overflow-x-auto gap-4 py-2 no-scrollbar">
                            {tabs.map((tab) => {
                                const isActive = activeTab === tab.id;
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex flex-col items-center justify-center p-2 rounded-lg min-w-[64px] ${isActive ? 'bg-teal-900/50 text-teal-300' : 'text-slate-400'}`}
                                    >
                                        <Icon className="w-5 h-5 mb-1" />
                                        <span className="text-[10px] font-medium whitespace-nowrap">{tab.label.split(' ')[1] || tab.label}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content Area */}
            <main className="flex-grow relative bg-slate-50 overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        <ActiveComponent />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer is global */}
            <Footer />
        </div>
    );
}

export default App;
