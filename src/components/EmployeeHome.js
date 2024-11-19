// components/EmployeeHome.js
import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaUser, FaSignOutAlt, FaHistory } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const EmployeeHome = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false); // Controla a exibição da modal
    const [editedProduct, setEditedProduct] = useState(null); // Produto em edição

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
        setProducts(storedProducts);
    }, []);

    const handleLogout = () => {
        setTimeout(() => {
            navigate('/'); // Redireciona ao login de funcionários
        }, 300);
    };

    const handleManageProducts = () => {
        navigate('/manage-products'); // Redireciona para a tela ManageProducts
    };

    const handleDeleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const handleEditProduct = (index) => {
        setEditedProduct({ ...products[index], index });
    };

    const handleSaveEdit = () => {
        const updatedProducts = products.map((product, i) =>
            i === editedProduct.index ? editedProduct : product
        );
        setProducts(updatedProducts);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        setEditedProduct(null);
    };

    const calculateDiscountPrice = (price, discount) => {
        const numericPrice = parseFloat(price) || 0; // Garante que o preço é um número
        const numericDiscount = parseFloat(discount) || 0; // Garante que o desconto é um número
        const discountAmount = (numericPrice * numericDiscount) / 100;
        return (numericPrice - discountAmount).toFixed(2); // Retorna o valor com duas casas decimais
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-800 text-white">
            {/* Header */}
            <header
                className="w-full p-4 flex flex-col md:flex-row md:justify-between md:items-center"
                style={{ backgroundColor: '#3c3c3c' }}
            >
                <h1 className="text-3xl font-bold text-center md:text-left">ÁREA DE PRODUTOS</h1>
                <nav className="flex mt-2 md:mt-0 space-x-4 md:space-x-8 justify-center md:justify-end">
                    <button
                        className="flex flex-col items-center focus:outline-none"
                        onClick={handleManageProducts}
                    >
                        <FaBoxOpen className="text-xl mb-1" />
                        <span className="text-sm">Gerenciar</span>
                    </button>
                    <button className="flex flex-col items-center focus:outline-none">
                        <FaUser className="text-xl mb-1" />
                        <span className="text-sm">Perfil</span>
                    </button>
                    <button
                        className="flex flex-col items-center focus:outline-none"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="text-xl mb-1" />
                        <span className="text-sm">Logout</span>
                    </button>
                </nav>
            </header>

            {/* Histórico de Atividades */}
            <div className="w-full p-4 flex justify-center" style={{ backgroundColor: '#3c3c3c' }}>
                <button
                    className="bg-gray-300 text-black py-2 px-4 rounded-full flex items-center"
                    onClick={() => setShowModal(true)}
                >
                    <FaHistory className="mr-2" /> Histórico de Atividades
                </button>
            </div>

            {/* Produtos Recentes */}
            <main className="w-full p-4 bg-gray-100 text-black flex-1 max-w-4xl">
                <h2 className="text-xl font-bold mb-4 text-center">PRODUTOS RECENTES</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <div
                                key={index}
                                className="border rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-32 object-cover"
                                />
                                <div
                                    className="text-white p-3"
                                    style={{ backgroundColor: '#3c3c3c' }}
                                >
                                    <p>ID: {index + 1}</p>
                                    <p>Nome: {product.name}</p>
                                    <p>
                                        Preço Original:{' '}
                                        <span className="line-through text-red-500">
                                            R$ {parseFloat(product.price).toFixed(2)}
                                        </span>
                                    </p>
                                    <p>
                                        Preço com Desconto:{' '}
                                        <span className="text-green-500">
                                            R$ {calculateDiscountPrice(product.price, product.discount)}
                                        </span>
                                    </p>
                                    <p>Quantidade: {product.quantity}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-700">Nenhum produto cadastrado.</p>
                    )}
                </div>
            </main>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                        <h2 className="text-lg font-bold mb-4 text-black">Histórico de Atividades</h2>
                        <div className="overflow-y-auto max-h-80">
                            {products.map((product, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-gray-100 mb-2 rounded-lg flex items-center gap-4 text-black"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <p>Nome: {product.name}</p>
                                        <p>Preço: R$ {product.price}</p>
                                        <p>Quantidade: {product.quantity}</p>
                                    </div>
                                    <div className="space-x-2">
                                        <button
                                            onClick={() => handleEditProduct(index)}
                                            className="bg-blue-500 text-white px-4 py-1 rounded"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(index)}
                                            className="bg-red-500 text-white px-4 py-1 rounded"
                                        >
                                            Excluir
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowModal(false)}
                            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4 text-black">Editar Produto</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="text-black font-semibold">Nome do Produto</label>
                                <input
                                    type="text"
                                    value={editedProduct.name}
                                    placeholder={editedProduct.name}
                                    onChange={(e) =>
                                        setEditedProduct({ ...editedProduct, name: e.target.value })
                                    }
                                    className="w-full border p-2 rounded text-black"
                                />
                            </div>
                            <div>
                                <label className="text-black font-semibold">Preço</label>
                                <input
                                    type="number"
                                    value={editedProduct.price}
                                    placeholder={editedProduct.price}
                                    onChange={(e) =>
                                        setEditedProduct({ ...editedProduct, price: e.target.value })
                                    }
                                    className="w-full border p-2 rounded text-black"
                                />
                            </div>
                            <div>
                                <label className="text-black font-semibold">Quantidade</label>
                                <input
                                    type="number"
                                    value={editedProduct.quantity}
                                    placeholder={editedProduct.quantity}
                                    onChange={(e) =>
                                        setEditedProduct({ ...editedProduct, quantity: e.target.value })
                                    }
                                    className="w-full border p-2 rounded text-black"
                                />
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button
                                onClick={handleSaveEdit}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Salvar
                            </button>
                            <button
                                onClick={() => setEditedProduct(null)}
                                className="bg-gray-700 text-white px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeHome;
