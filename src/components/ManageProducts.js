// components/ManageProducts.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ManageProducts = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('medicamentos');
    const [discount, setDiscount] = useState('');
    const [quantity, setQuantity] = useState(''); // Novo campo para quantidade
    const [image, setImage] = useState('');
    const [branch, setBranch] = useState('GB-Iguatemi'); // Nova opção para filial

    const handleBack = () => navigate('/employee-home');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                setImage(result); // Salva a string completa, incluindo o prefixo Base64
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!name || !price || !discount || !image || !branch || !quantity) {
            alert('Preencha todos os campos para cadastrar o produto.');
            return;
        }

        const newProduct = {
            name,
            price,
            category,
            discount: `${discount}%`,
            quantity,
            branch,
            image,
        };

        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        localStorage.setItem('products', JSON.stringify([...existingProducts, newProduct]));

        // Limpa os campos após o cadastro
        setName('');
        setPrice('');
        setCategory('medicamentos');
        setDiscount('');
        setQuantity('');
        setBranch('GB-Iguatemi');
        setImage('');

        alert('Produto cadastrado com sucesso!');
    };

    const handleNumericInput = (e, setState) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setState(value);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="w-full text-white flex items-center py-4 px-6" style={{ backgroundColor: '#3c3c3c' }}>
                <button onClick={handleBack} className="flex items-center text-white mr-4 focus:outline-none hover:text-gray-300 transition">
                    <FaArrowLeft className="text-xl" />
                </button>
                <h1 className="text-2xl font-bold">Gerenciador de Produtos</h1>
            </header>

            <div className="flex flex-wrap justify-center gap-8 p-6 w-full max-w-screen-lg">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Nome do Produto</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Digite o nome do produto"
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Preço</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => handleNumericInput(e, setPrice)}
                                placeholder="Digite o preço"
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Categoria</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <option value="medicamentos">Medicamentos</option>
                                <option value="frutas">Frutas</option>
                                <option value="carnes">Carnes</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Desconto (%)</label>
                            <input
                                type="text"
                                value={discount}
                                onChange={(e) => handleNumericInput(e, setDiscount)}
                                placeholder="Digite o desconto"
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Quantidade</label>
                            <input
                                type="text"
                                value={quantity}
                                onChange={(e) => handleNumericInput(e, setQuantity)}
                                placeholder="Digite a quantidade"
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Filial</label>
                            <select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                <option value="GB-Iguatemi">GB-Iguatemi</option>
                                <option value="GB-Centro">GB-Centro</option>
                                <option value="GB-Vila">GB-Vila</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Imagem do Produto</label>
                            <input type="file" onChange={handleImageUpload} className="w-full" />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-600 transition"
                        >
                            Cadastrar Produto
                        </button>
                    </div>
                </div>
                {image && (
                    <div className="bg-white rounded-lg shadow-lg p-4 w-48">
                        <img src={image} alt="Preview do Produto" className="w-full h-24 object-cover mb-2" />
                        <div className="text-gray-700 text-sm">{name || 'Preview do Produto'}</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProducts;
