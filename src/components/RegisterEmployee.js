// RegisterEmployee.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterEmployee = () => {
    const [employeeID, setEmployeeID] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [tempPassword, setTempPassword] = useState(''); // Estado para a senha temporária
    const navigate = useNavigate();

    const handleRegister = () => {
        if (employeeID && employeeName) {
            // Gerar uma senha temporária simples
            const generatedPassword = Math.random().toString(36).slice(-8);
            setTempPassword(generatedPassword);

            // Salvar o funcionário no localStorage
            const employees = JSON.parse(localStorage.getItem('employees')) || [];
            employees.push({ id: employeeID, name: employeeName, password: generatedPassword });
            localStorage.setItem('employees', JSON.stringify(employees));

            // Navegar para a página de login após uma pequena pausa para exibir a senha
            setTimeout(() => {
                navigate('/'); // Redireciona para o login
            }, 4000); // Ajuste o tempo conforme necessário
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-2xl font-bold mb-4">Cadastro de Funcionário</h2>
            <div className="mb-4">
                <label className="block text-gray-700">ID do Funcionário</label>
                <input
                    type="text"
                    value={employeeID}
                    onChange={(e) => setEmployeeID(e.target.value)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 py-2"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Nome do Funcionário</label>
                <input
                    type="text"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 py-2"
                />
            </div>
            <button
                onClick={handleRegister}
                className="w-full bg-yellow-500 text-white py-2 rounded mt-4"
            >
                Cadastrar Funcionário
            </button>
            {tempPassword && (
                <div className="mt-4 bg-gray-200 p-3 rounded">
                    <p>Cadastro realizado com sucesso!</p>
                    <p><strong>Senha Temporária:</strong> {tempPassword}</p>
                    <p>Use esta senha para o primeiro login.</p>
                </div>
            )}
        </div>
    );
};

export default RegisterEmployee;
