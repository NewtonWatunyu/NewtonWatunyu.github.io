import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const DugongTimeline = () => {
    const [sliderYear, setSliderYear] = useState(2019);

    // Data
    const data = [
        { year: 2019, health: 90, dugong: 260, deaths: 10 },
        { year: 2020, health: 85, dugong: 255, deaths: 12 },
        { year: 2021, health: 70, dugong: 250, deaths: 20 },
        { year: 2022, health: 45, dugong: 220, deaths: 25 },
        { year: 2023, health: 20, dugong: 180, deaths: 42 },
        { year: 2024, health: 5, dugong: 120, deaths: 45 },
    ];

    // Filter data based on slider
    const currentData = data.filter(d => d.year <= sliderYear);
    const currentStat = data.find(d => d.year === sliderYear);

    return (
        <section className="py-20 px-4 bg-slate-900 text-white">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-4xl font-bold mb-2 text-red-400">The Crisis</h2>
                <p className="text-xl text-slate-400 mb-12">Dugong Survival Timeline (Andaman Sea)</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Chart Area */}
                    <div className="lg:col-span-2 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={currentData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="year" stroke="#94a3b8" />
                                    <YAxis yAxisId="left" stroke="#cbd5e1" label={{ value: 'Population', angle: -90, position: 'insideLeft', fill: '#cbd5e1' }} />
                                    <YAxis yAxisId="right" orientation="right" stroke="#f87171" label={{ value: 'Deaths / Year', angle: 90, position: 'insideRight', fill: '#f87171' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }}
                                        itemStyle={{ color: '#f1f5f9' }}
                                    />

                                    {/* Dugong Population */}
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="dugong"
                                        name="Dugong Population"
                                        stroke="#38bdf8"
                                        strokeWidth={3}
                                        dot={{ fill: '#38bdf8', r: 6 }}
                                        animateNewValues={false}
                                    />

                                    {/* Mortality */}
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="deaths"
                                        name="Annual Deaths"
                                        stroke="#f87171"
                                        strokeWidth={3}
                                        dot={{ fill: '#f87171', r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-8 px-4">
                            <label className="block text-sm font-medium text-slate-400 mb-4">Time Travel: {sliderYear}</label>
                            <input
                                type="range"
                                min="2019"
                                max="2024"
                                step="1"
                                value={sliderYear}
                                onChange={(e) => setSliderYear(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2">
                                <span>2019</span>
                                <span>2024</span>
                            </div>
                        </div>
                    </div>

                    {/* Context Panel */}
                    <div className="space-y-6">
                        <motion.div
                            key={sliderYear}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl"
                        >
                            <h3 className="text-2xl font-bold text-teal-300 mb-1">{sliderYear} Status</h3>

                            <div className="my-6 space-y-4">
                                <div>
                                    <p className="text-sm text-slate-400">Seagrass Health (Ao Nammao)</p>
                                    <div className="h-4 w-full bg-slate-700 rounded-full mt-1 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-500 ${currentStat.health < 20 ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${currentStat.health}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-right text-xs mt-1 text-slate-300">{currentStat.health}% Coverage</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                                    <div>
                                        <p className="text-sm text-slate-400">Pop.</p>
                                        <p className="text-3xl font-bold text-white leading-none">{currentStat.dugong}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Deaths</p>
                                        <p className="text-3xl font-bold text-red-400 leading-none">{currentStat.deaths}</p>
                                    </div>
                                </div>
                            </div>

                            {sliderYear >= 2023 && (
                                <div className="bg-red-900/30 border border-red-500/50 p-4 rounded-lg flex gap-3 animate-pulse">
                                    <AlertTriangle className="text-red-500 w-6 h-6 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-red-200 text-sm">CRITICAL ALERT</h4>
                                        <p className="text-xs text-red-100/80">Starvation warning. Massive seagrass loss leading to malnourished population.</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DugongTimeline;
