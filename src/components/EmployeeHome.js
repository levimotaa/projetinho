// EmployeeHome.js
import React from 'react';
import { FaBoxOpen, FaUser, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import loratamed from '../assets/loratamed.png';
import naproxeno from '../assets/naproxeno.png';
import teflon from '../assets/teflon.png';
import predilecta from '../assets/predilecta.png';

const EmployeeHome = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        setTimeout(() => {
            navigate('/'); // Redireciona ao login de funcionários
        }, 300);
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
            {/* Header com nova cor de fundo */}
            <header className="w-full p-4 flex flex-col md:flex-row md:justify-between md:items-center" style={{ backgroundColor: '#3c3c3c' }}>
                <h1 className="text-3xl font-bold text-center md:text-left">ÁREA DE PRODUTOS</h1>
                <nav className="flex mt-2 md:mt-0 space-x-4 md:space-x-8 justify-center md:justify-end">
                    <button className="flex flex-col items-center focus:outline-none">
                        <FaBoxOpen className="text-xl mb-1" />
                        <span className="text-sm">Gerenciar</span>
                    </button>
                    <button className="flex flex-col items-center focus:outline-none">
                        <FaUser className="text-xl mb-1" />
                        <span className="text-sm">Perfil</span>
                    </button>
                    <button className="flex flex-col items-center focus:outline-none" onClick={handleLogout}>
                        <FaSignOutAlt className="text-xl mb-1" />
                        <span className="text-sm">Logout</span>
                    </button>
                </nav>
            </header>

            {/* Histórico de Atividades com ícone */}
            <div className="w-full p-4 flex justify-center" style={{ backgroundColor: '#3c3c3c' }}>
                <button className="bg-gray-300 text-black py-2 px-4 rounded-full flex items-center">
                    <FaHistory className="mr-2" /> Histórico de Atividades
                </button>
            </div>

            {/* Produtos Recentes */}
            <main className="w-full p-4 bg-gray-100 text-black flex-1 max-w-4xl">
                <h2 className="text-xl font-bold mb-4 text-center">PRODUTOS RECENTES</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[{ id: 123, name: "Loratamed...", discount: "20% OFF", image: loratamed },
                      { id: 456, name: "Naproxeno...", discount: "10% OFF", image: naproxeno },
                      { id: 789, name: "Teflon Con...", discount: "50% OFF", image: teflon },
                      { id: 101112, name: "Predilecta...", discount: "35% OFF", image: predilecta }]
                      .map((product) => (
                        <div key={product.id} className="border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105">
                            <img src={product.image} alt={`${product.name} product image`} className="w-full h-32 object-cover" />
                            <div className=" text-white p-3" style={{ backgroundColor: '#3c3c3c' }}>
                                <p>ID: {product.id}</p>
                                <p>Nome: {product.name}</p>
                                <p>Desconto: {product.discount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default EmployeeHome;
