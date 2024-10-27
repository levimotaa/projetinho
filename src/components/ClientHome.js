// components/ClientHome.js
import React, { useState } from 'react';
import { FaBars, FaMapMarkerAlt, FaSearch, FaHeart, FaUser, FaHome, FaTags, FaShoppingCart, FaConciergeBell, FaCog, FaSignOutAlt } from 'react-icons/fa';

// Importação das imagens
import loratamed from '../assets/loratamed.png';
import paracetamol from '../assets/paracetamol.png';
import banana from '../assets/banana.png';
import maca from '../assets/maca.png';
import picanha from '../assets/picanha.png';
import alcatra from '../assets/alcatra.png';

const ClientHome = ({ onLogout }) => {
    const [selectedCategory, setSelectedCategory] = useState('');

    const offers = [
        { id: 1, category: 'medicamentos', discount: '5%', price: 'R$ 8,99', name: 'Loratamed 10mg - 12 Comprimidos', img: loratamed },
        { id: 2, category: 'medicamentos', discount: '10%', price: 'R$ 15,99', name: 'Paracetamol 500mg - 20 Comprimidos', img: paracetamol },
        { id: 3, category: 'frutas', discount: '20%', price: 'R$ 3,99/kg', name: 'Banana Prata', img: banana },
        { id: 4, category: 'frutas', discount: '15%', price: 'R$ 5,49/kg', name: 'Maçã Gala', img: maca },
        { id: 5, category: 'carnes', discount: '30%', price: 'R$ 25,99/kg', name: 'Picanha Bovina', img: picanha },
        { id: 6, category: 'carnes', discount: '25%', price: 'R$ 19,99/kg', name: 'Alcatra', img: alcatra },
    ];

    const filteredOffers = selectedCategory
        ? offers.filter(offer => offer.category === selectedCategory)
        : offers;

    return (
        <div className="bg-white text-gray-800 max-w-sm mx-auto shadow-md">
            {/* Header */}
            <header className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center space-x-2">
                    <FaBars className="text-lg" />
                    <FaMapMarkerAlt className="text-lg text-red-500" />
                    <div>
                        <p className="text-xs">Você está na Loja</p>
                        <p className="text-red-500 font-bold text-sm">GB-Iguatemi</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <FaSearch className="text-lg" />
                    <FaHeart className="text-lg" />
                    <FaUser className="text-lg" />
                    <button onClick={onLogout} className="text-gray-500 hover:text-red-500 text-lg">
                        <FaSignOutAlt />
                    </button>
                </div>
            </header>
            
            {/* Notification */}
            <div className="bg-red-500 text-white text-center py-1 text-sm">
                Esta Loja suporta Localização em Tempo Real!
            </div>
            
            {/* Main content */}
            <main className="p-4">
                {/* Filtro de Categorias */}
                <section className="mb-4">
                    <div className="flex space-x-2 mb-4">
                        <button
                            className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'medicamentos' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setSelectedCategory('medicamentos')}
                        >
                            Medicamentos
                        </button>
                        <button
                            className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'frutas' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setSelectedCategory('frutas')}
                        >
                            Frutas
                        </button>
                        <button
                            className={`px-3 py-1 rounded-full text-sm ${selectedCategory === 'carnes' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                            onClick={() => setSelectedCategory('carnes')}
                        >
                            Carnes
                        </button>
                        <button
                            className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-800"
                            onClick={() => setSelectedCategory('')}
                        >
                            Todas
                        </button>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-lg font-bold">
                            {selectedCategory ? `Ofertas de ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'Ofertas Gerais'}
                        </h2>
                    </div>
                    {/* Lista de Ofertas Filtradas */}
                    <div className="grid grid-cols-2 gap-2">
                        {filteredOffers.map((offer) => (
                            <div key={offer.id} className="w-full bg-gray-100 p-2 rounded-lg text-center shadow-sm">
                                <img src={offer.img} alt={offer.name} className="w-full h-24 object-cover mb-2 rounded-lg" />
                                <p className="text-xs font-bold text-red-500">{offer.discount} OFF</p>
                                <p className="text-xs font-semibold">{offer.price}</p>
                                <p className="text-xs">{offer.name}</p>
                                <button className="bg-red-500 text-white w-full py-1 mt-2 text-xs rounded">Ativar Oferta</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
                <div className="flex justify-around py-2 text-sm">
                    <div className="text-center">
                        <FaHome className="text-red-500 text-lg" />
                        <p className="text-xs text-red-500">Home</p>
                    </div>
                    <div className="text-center">
                        <FaTags className="text-gray-500 text-lg" />
                        <p className="text-xs text-gray-500">Ofertas</p>
                    </div>
                    <div className="text-center">
                        <FaShoppingCart className="text-gray-500 text-lg" />
                        <p className="text-xs text-gray-500">Compras</p>
                    </div>
                    <div className="text-center">
                        <FaConciergeBell className="text-gray-500 text-lg" />
                        <p className="text-xs text-gray-500">Serviços</p>
                    </div>
                    <div className="text-center">
                        <FaCog className="text-gray-500 text-lg" />
                        <p className="text-xs text-gray-500">Config</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ClientHome;
