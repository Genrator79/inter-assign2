import React from 'react';

const Header = ({ onLogout }) => {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="text-3xl font-black tracking-tighter text-primary">NOSH</span>
                </div>

                {/* Nav Links (Visual only for now) */}
                <nav className="hidden md:flex items-center gap-8">
                    <a href="#" className="text-sm font-medium text-white hover:text-primary transition-colors">HOME</a>
                    <a href="#" className="text-sm font-medium text-primary transition-colors">RECIPES</a>
                    <a href="#" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">KNOW YOUR NOSH</a>
                    <a href="#" className="text-sm font-medium text-slate-300 hover:text-primary transition-colors">OUR ETHOS</a>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onLogout}
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Sign Out
                    </button>
                    <button className="btn btn-primary text-sm px-6 py-2">
                        ORDER NOW
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
