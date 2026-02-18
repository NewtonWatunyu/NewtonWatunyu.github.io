import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';

const HeroSection = () => {
    const [hoveredHotspot, setHoveredHotspot] = useState(null);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-ocean-blue-900 text-white flex flex-col items-center justify-center">
            {/* Background with gradient matching 'The Submerged Savannah' theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-ocean-blue-400 to-ocean-blue-900 opacity-80 z-0"></div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.h1
                    className="text-5xl md:text-7xl font-bold mb-6 text-teal-100 text-shadow"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    The Blue Heart
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl mb-12 text-teal-50 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    Discover the hidden forests of Southeast Asia that sustain our oceans.
                </motion.p>

                {/* Interactive Map Placeholder - In a real app, this would be a detailed SVG or GeoJSON map */}
                <div className="relative w-full max-w-4xl mx-auto h-[400px] bg-ocean-blue-800/50 rounded-xl border border-teal-500/30 backdrop-blur-sm overflow-hidden flex items-center justify-center">
                    <p className="absolute top-4 left-4 text-sm text-teal-300">Interactive Map: Southeast Asia Seagrass Hotspots</p>

                    {/* Stylized Map Representation */}
                    <div className="relative w-full h-full">
                        {/* Abstract Thailand/Andaman Sea Hotspot */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            onHoverStart={() => setHoveredHotspot('thailand')}
                            onHoverEnd={() => setHoveredHotspot(null)}
                            whileHover={{ scale: 1.1 }}
                        >
                            <div className="w-64 h-64 bg-teal-500/20 rounded-full blur-2xl absolute inset-0"></div>
                            <MapPin className="w-12 h-12 text-teal-300 relative z-10 mx-auto" />
                            <div className="w-32 h-32 border-2 border-dashed border-teal-400/50 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"></div>
                        </motion.div>

                        {/* Tooltip */}
                        {hoveredHotspot === 'thailand' && (
                            <motion.div
                                className="absolute top-1/2 left-1/2 mt-16 -translate-x-1/2 glass-panel-dark p-4 max-w-sm text-left z-20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className="flex items-start gap-3">
                                    <Info className="w-5 h-5 text-teal-300 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-teal-200">Andaman Sea & Thai Gulf</h3>
                                        <p className="text-sm text-gray-200 mt-1">Global Hotspot for Seagrass Diversity. Home to over 12 species and critical Dugong habitats.</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p className="text-lg font-mono text-teal-200">36,000+ km² of Seagrass in the Region</p>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
