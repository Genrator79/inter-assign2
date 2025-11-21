import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import api from '../api';
import DishCard from './DishCard';
import Header from './Header';

const Dashboard = ({ onLogout }) => {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDishes();

        // Socket connection
        const socket = io(import.meta.env.VITE_API_URL);

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('dishUpdated', (updatedDish) => {
            setDishes(prev => prev.map(dish =>
                dish.dishId === updatedDish.dishId ? updatedDish : dish
            ));
        });

        socket.on('dishesSync', (syncedDishes) => {
            // Only update if there are actual changes to avoid unnecessary re-renders
            // For simplicity, we just replace
            setDishes(syncedDishes);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const fetchDishes = async () => {
        try {
            const res = await api.get('/dishes');
            setDishes(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const togglePublish = async (id) => {
        try {
            // Optimistic update
            setDishes(prev => prev.map(dish =>
                dish.dishId === id ? { ...dish, isPublished: !dish.isPublished } : dish
            ));

            await api.put(`/dishes/${id}/toggle`);
        } catch (err) {
            console.error(err);
            // Revert on error
            fetchDishes();
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            <Header onLogout={onLogout} />

            {/* Hero Section */}
            <div className="relative h-[400px] w-full overflow-hidden flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 text-center max-w-3xl px-6">
                    <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                        <span className="text-white">CRAFTED BY</span> <span className="text-primary">CHEFS</span>
                    </h1>
                    <p className="text-xl text-slate-300 mb-8 font-light">
                        Experience the finest culinary delights managed directly from your dashboard.
                    </p>
                    <div className="flex justify-center gap-4">
                        <button className="btn btn-primary">EXPLORE MENU</button>
                        <button className="btn btn-secondary">WATCH VIDEO</button>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-primary tracking-wide uppercase">
                        Signature Dishes
                    </h2>
                    <div className="h-px flex-grow bg-white/10 ml-8"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dishes.map(dish => (
                            <DishCard
                                key={dish.dishId}
                                dish={dish}
                                onToggle={togglePublish}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
