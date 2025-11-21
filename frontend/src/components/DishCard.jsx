import React from 'react';

const DishCard = ({ dish, onToggle }) => {
    return (
        <div className="card group relative flex flex-col h-full bg-card border border-slate-700/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 rounded-xl overflow-hidden">
            {/* Image Section */}
            <div className="aspect-[4/3] w-full overflow-hidden border-b border-slate-700/50">
                <img
                    src={dish.imageUrl}
                    alt={dish.dishName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                        ID: {dish.dishId}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${dish.isPublished
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-slate-700/30 text-slate-400 border-slate-600/30'
                        }`}>
                        {dish.isPublished ? 'Published' : 'Draft'}
                    </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-6 line-clamp-2 group-hover:text-primary transition-colors">
                    {dish.dishName}
                </h3>

                <div className="mt-auto">
                    <button
                        onClick={() => onToggle(dish.dishId)}
                        className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${dish.isPublished
                                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                                : 'bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:from-primary hover:to-indigo-500'
                            }`}
                    >
                        <span className={`w-2 h-2 rounded-full ${dish.isPublished ? 'bg-slate-500' : 'bg-white animate-pulse'}`}></span>
                        {dish.isPublished ? 'Unpublish Dish' : 'Publish Dish'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DishCard;
