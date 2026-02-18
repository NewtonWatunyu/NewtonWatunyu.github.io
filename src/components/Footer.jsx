import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 px-4">
            <div className="container mx-auto max-w-6xl text-center">

                {/* Call to Action */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-white mb-4">Become a Citizen Scientist</h3>
                    <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
                        Your photos can help researchers track seagrass health. Join the global network of observers.
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-ocean-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-teal-500/25 transition-all transform hover:-translate-y-1"
                    >
                        Join SeagrassSpotter <ExternalLink className="w-4 h-4" />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left border-t border-slate-800 pt-8">
                    <div>
                        <h4 className="text-white font-bold mb-4">Seagrass Guardian</h4>
                        <p className="text-sm">
                            An educational platform dedicated to the conservation of Southeast Asian seagrass ecosystems and the protection of the Dugong.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">Data Sources</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                Department of Marine and Coastal Resources (DMCR)
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                Seagrass-Watch
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
                                Frontiers in Marine Science
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 text-xs text-slate-600">
                    © {new Date().getFullYear()} Seagrass Guardian Educational Project.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
