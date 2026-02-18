import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

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

                {/* Interactive Map */}
                <div className="relative w-full max-w-4xl mx-auto h-[500px] bg-ocean-blue-900/50 rounded-xl border border-teal-500/30 backdrop-blur-sm overflow-hidden">
                    <p className="absolute top-4 left-4 text-sm text-teal-300 z-10 pointer-events-none">Interactive Map: Southeast Asia Seagrass Hotspots</p>

                    <ComposableMap
                        projection="geoMercator"
                        projectionConfig={{
                            scale: 850,
                            center: [105, 10] // Focused on Thailand/SE Asia
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    // Optional: Filter to only show relevant asian countries if needed, but styling global is easier
                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="rgba(20, 184, 166, 0.2)" // teal-500 with low opacity
                                            stroke="rgba(20, 184, 166, 0.5)"
                                            strokeWidth={0.5}
                                            style={{
                                                default: { outline: "none" },
                                                hover: { fill: "rgba(20, 184, 166, 0.4)", outline: "none" },
                                                pressed: { fill: "rgba(20, 184, 166, 0.6)", outline: "none" },
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>

                        {/* Andaman Sea / Thailand Hotspot */}
                        <Marker coordinates={[99, 8]}>
                            <foreignObject x="-100" y="-100" width="200" height="200">
                                <motion.div
                                    className="w-full h-full flex items-center justify-center relative cursor-pointer"
                                    onHoverStart={() => setHoveredHotspot('thailand')}
                                    onHoverEnd={() => setHoveredHotspot(null)}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="w-32 h-32 bg-teal-500/20 rounded-full blur-xl absolute"></div>
                                    <MapPin className="w-8 h-8 text-teal-300 relative z-10 drop-shadow-lg" />
                                    <div className="w-16 h-16 border-2 border-dashed border-teal-400/50 rounded-full absolute animate-spin-slow"></div>

                                    {/* Tooltip positioned relative to marker */}
                                    {hoveredHotspot === 'thailand' && (
                                        <motion.div
                                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 glass-panel-dark p-3 text-left z-50 pointer-events-none rounded-lg border border-teal-500/30 bg-ocean-blue-900/95"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <div className="flex items-start gap-3">
                                                <Info className="w-4 h-4 text-teal-300 shrink-0 mt-1" />
                                                <div>
                                                    <h3 className="font-bold text-teal-200 text-sm">Andaman Sea & Thai Gulf</h3>
                                                    <p className="text-xs text-teal-50 mt-1 leading-snug">Global Hotspot for Seagrass Diversity. Critical Dugong habitats.</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </foreignObject>
                        </Marker>
                    </ComposableMap>
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
