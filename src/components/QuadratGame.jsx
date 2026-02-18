import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, XCircle, Award, Leaf } from 'lucide-react';

const QuadratGame = () => {
    const [estimatedCoverage, setEstimatedCoverage] = useState(50);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Game Setup
    const ACTUAL_COVERAGE = 65; // Hardcoded for this demo
    const CORRECT_SPECIES = 'enhalus';

    const checkResult = () => {
        const diff = Math.abs(estimatedCoverage - ACTUAL_COVERAGE);
        const isWin = diff <= 10;

        // Save badge if won (mock local storage)
        if (isWin) {
            localStorage.setItem('seagrass_badge', 'junior_scientist');
        }

        setHasSubmitted(true);
        setShowResult(true);
    };

    const resetGame = () => {
        setEstimatedCoverage(50);
        setHasSubmitted(false);
        setShowResult(false);
        setSelectedSpecies(null);
    };

    const isWin = Math.abs(estimatedCoverage - ACTUAL_COVERAGE) <= 10;

    return (
        <section className="py-20 px-4 bg-ocean-blue-50">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl font-bold text-ocean-blue-900 mb-2">The Field</h2>
                <p className="text-xl text-slate-600 mb-10">Virtual Quadrat Sampling</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Game Area */}
                    <div className="relative">
                        <div
                            className="relative aspect-square bg-muddy-green-200 rounded-xl overflow-hidden shadow-xl border-4 border-slate-800 cursor-crosshair group"
                        >
                            {/* Mock Seabed Image */}
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1559813247-c0e81116c497?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center filter brightness-90 contrast-110"></div>

                            {/* Quadrat Grid Overlay (50x50cm representation) */}
                            <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 border-[3px] border-white/80 shadow-2xl">
                                {[...Array(25)].map((_, i) => (
                                    <div key={i} className="border border-white/30 hover:bg-white/10 transition-colors"></div>
                                ))}
                            </div>

                            {/* Plants Overlay (Simplified visual representation of 65% cover) */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Imagine scattered seagrass here - using CSS pattern for now as placeholder */}
                                <div className="w-full h-full opacity-60 bg-repeat" style={{ backgroundImage: 'radial-gradient(circle, #064e3b 2px, transparent 2.5px)', backgroundSize: '10px 10px' }}></div>
                            </div>

                            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-mono backdrop-blur-sm">
                                Quadrat: 50cm x 50cm
                            </div>
                        </div>

                        <p className="mt-4 text-sm text-slate-500 italic text-center">
                            Analyze the quadrat above. Estimate the seagrass coverage percentage.
                        </p>
                    </div>

                    {/* Controls & Identification */}
                    <div className="flex flex-col gap-8">

                        {/* Task 1: Coverage Estimation */}
                        <div className="glass-panel p-6 bg-white">
                            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                                <Target className="w-5 h-5 text-teal-600" />
                                Step 1: Estimate Coverage
                            </h3>

                            <div className="flex items-center gap-4 mb-2">
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={estimatedCoverage}
                                    onChange={(e) => setEstimatedCoverage(parseInt(e.target.value))}
                                    disabled={hasSubmitted}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                                />
                                <span className="text-2xl font-bold w-16 text-right text-teal-700">{estimatedCoverage}%</span>
                            </div>
                        </div>

                        {/* Task 2: Species Identification */}
                        <div className="glass-panel p-6 bg-white">
                            <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2">
                                <Leaf className="w-5 h-5 text-muddy-green-600" />
                                Step 2: Identify Species
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => !hasSubmitted && setSelectedSpecies('enhalus')}
                                    className={`p-3 rounded-xl border-2 transition-all text-left ${selectedSpecies === 'enhalus' ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-200'}`}
                                >
                                    <div className="w-full h-24 bg-muddy-green-100 mb-2 rounded-lg flex items-center justify-center overflow-hidden">
                                        {/* Placeholder graphic for Enhalus */}
                                        <div className="w-2 h-20 bg-green-800 rounded mx-1"></div>
                                        <div className="w-2 h-16 bg-green-700 rounded mx-1"></div>
                                        <div className="w-2 h-24 bg-green-800 rounded mx-1"></div>
                                    </div>
                                    <p className="font-semibold text-sm text-slate-700">Enhalus acoroides</p>
                                    <p className="text-xs text-slate-500">Long, tape-like leaves</p>
                                </button>

                                <button
                                    onClick={() => !hasSubmitted && setSelectedSpecies('halophila')}
                                    className={`p-3 rounded-xl border-2 transition-all text-left ${selectedSpecies === 'halophila' ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-teal-200'}`}
                                >
                                    <div className="w-full h-24 bg-muddy-green-100 mb-2 rounded-lg flex items-center justify-center overflow-hidden">
                                        {/* Placeholder graphic for Halophila */}
                                        <div className="flex flex-col items-center">
                                            <div className="w-6 h-8 bg-green-400 rounded-full mb-1"></div>
                                            <div className="w-0.5 h-6 bg-green-600"></div>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-sm text-slate-700">Halophila ovalis</p>
                                    <p className="text-xs text-slate-500">Small, oval leaves</p>
                                </button>
                            </div>
                        </div>

                        {/* Submit & Results */}
                        {!hasSubmitted ? (
                            <button
                                onClick={checkResult}
                                disabled={!selectedSpecies}
                                className="w-full py-4 bg-ocean-blue-600 hover:bg-ocean-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Observation
                            </button>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-6 rounded-xl border-2 ${isWin ? 'bg-teal-50 border-teal-200' : 'bg-red-50 border-red-200'}`}
                            >
                                <div className="flex items-center gap-3 mb-2">
                                    {isWin ? <CheckCircle className="text-teal-600 w-8 h-8" /> : <XCircle className="text-red-500 w-8 h-8" />}
                                    <h4 className={`text-xl font-bold ${isWin ? 'text-teal-800' : 'text-red-800'}`}>
                                        {isWin ? 'Excellent Work!' : 'Try Again'}
                                    </h4>
                                </div>
                                <p className="mb-4 text-slate-700">
                                    Actual Coverage: <strong>{ACTUAL_COVERAGE}%</strong>.<br />
                                    Your Estimate: <strong>{estimatedCoverage}%</strong>.<br />
                                    Species: <strong>{selectedSpecies === CORRECT_SPECIES ? 'Correct' : 'Incorrect'}</strong>.
                                </p>

                                {isWin && (
                                    <div className="flex items-center gap-2 text-muddy-green-700 font-bold bg-muddy-green-100 max-w-max px-4 py-2 rounded-full mb-4">
                                        <Award className="w-5 h-5" /> Junior Scientist Badge Earned
                                    </div>
                                )}

                                <button onClick={resetGame} className="text-sm underline text-slate-500 hover:text-slate-800">
                                    Play Again
                                </button>
                            </motion.div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuadratGame;
