// components/ClientHome.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaBars,
    FaMapMarkerAlt,
    FaSearch,
    FaHeart,
    FaUser,
    FaHome,
    FaTags,
    FaShoppingCart,
    FaConciergeBell,
    FaCog,
    FaSignOutAlt,
} from 'react-icons/fa';

const ClientHome = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('GB-Iguatemi'); // Filial inicial
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();

    // Lista fixa de filiais
    const branches = ['GB-Iguatemi', 'GB-Centro', 'GB-Vila'];

    useEffect(() => {
        // Busca os produtos cadastrados no localStorage
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setOffers(storedProducts);
    }, []);

    // Função para calcular o preço com desconto
    const calculateDiscountPrice = (price, discount) => {
        const numericPrice = parseFloat(price) || 0; // Garante que o preço é um número
        const numericDiscount = parseFloat(discount) || 0; // Garante que o desconto é um número
        const discountAmount = (numericPrice * numericDiscount) / 100;
        return (numericPrice - discountAmount).toFixed(2); // Retorna o valor com duas casas decimais
    };

    // Filtrar ofertas com base na categoria e filial selecionadas
    const filteredOffers = offers.filter(
        (offer) =>
            (!selectedCategory || offer.category === selectedCategory) &&
            (!selectedBranch || offer.branch === selectedBranch)
    );

    const handleLogout = () => {
        navigate('/'); // Redireciona para LoginForm.js
    };

    return (
        <div className="bg-white text-gray-800 min-h-screen w-full flex justify-center">
            <div className="w-full max-w-5xl px-4">
                {/* Header */}
                <header className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center space-x-2">
                        <FaBars className="text-lg" />
                        <FaMapMarkerAlt className="text-lg text-red-500" />
                        <div>
                            <p className="text-xs">Você está na Loja</p>
                            <select
                                value={selectedBranch}
                                onChange={(e) => setSelectedBranch(e.target.value)}
                                className="text-sm font-bold text-red-500 bg-transparent border-none cursor-pointer focus:outline-none"
                            >
                                {branches.map((branch, index) => (
                                    <option key={index} value={branch}>
                                        {branch}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaSearch className="text-lg" />
                        <FaHeart className="text-lg" />
                        <FaUser className="text-lg" />
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
                                className={`px-3 py-1 rounded-full text-sm ${
                                    selectedCategory === 'medicamentos' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
                                }`}
                                onClick={() => setSelectedCategory('medicamentos')}
                            >
                                Medicamentos
                            </button>
                            <button
                                className={`px-3 py-1 rounded-full text-sm ${
                                    selectedCategory === 'frutas' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
                                }`}
                                onClick={() => setSelectedCategory('frutas')}
                            >
                                Frutas
                            </button>
                            <button
                                className={`px-3 py-1 rounded-full text-sm ${
                                    selectedCategory === 'carnes' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'
                                }`}
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
                                {selectedCategory
                                    ? `Ofertas de ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
                                    : 'Ofertas Gerais'}
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filteredOffers.length > 0 ? (
                                filteredOffers.map((offer, index) => (
                                    <div
                                        key={index}
                                        className="w-full bg-gray-100 p-3 rounded-lg text-center shadow-sm transition-transform transform hover:scale-105"
                                    >
                                        <img
                                            src={offer.image}
                                            alt={offer.name}
                                            className="w-full h-32 object-cover rounded-lg mb-2"
                                        />
                                        <p className="text-xs font-bold text-red-500">{offer.discount} OFF</p>
                                        <p className="text-xs line-through text-red-500">R$ {parseFloat(offer.price).toFixed(2)}</p>
                                        <p className="text-xs font-semibold text-green-500">
                                            R$ {calculateDiscountPrice(offer.price, offer.discount)}
                                        </p>
                                        <p className="text-xs font-semibold">Quantidade: {offer.quantity}</p>
                                        <p className="text-xs">{offer.name}</p>
                                        <button className="bg-red-500 text-white w-full py-1 mt-2 text-xs rounded">
                                            Ativar Oferta
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-700 text-sm col-span-full">
                                    Nenhuma oferta disponível no momento.
                                </p>
                            )}
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
                        <div className="text-center cursor-pointer" onClick={handleLogout}>
                            <FaSignOutAlt className="text-gray-500 text-lg hover:text-red-500" />
                            <p className="text-xs text-gray-500 hover:text-red-500">Logout</p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default ClientHome;
