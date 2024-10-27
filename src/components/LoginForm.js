// LoginForm.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaBriefcase } from 'react-icons/fa';
import googleLogo from '../assets/google-logo.png';
import gbarbosaLogo from '../assets/gbarbosa.png';

const LoginForm = ({ onRegisterClick, toggleLoginType, loginType, onLoginSuccess }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Novo estado para a mensagem de sucesso

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = storedUsers.some(
            (user) => user.email === email && user.password === password
        );

        if (userExists) {
            setSuccessMessage('Login efetuado com sucesso!');
            setErrorMessage('');

            // Exibe a mensagem por 2.5 segundos antes de redirecionar
            setTimeout(() => {
                setSuccessMessage('');
                onLoginSuccess();
            }, 2500);
        } else {
            setErrorMessage('Credenciais inválidas para Cliente.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <div className="bg-red-600 rounded-lg p-6 flex justify-center mb-6">
                <img src={gbarbosaLogo} alt="Logo da empresa" className="rounded-full border-6 border-white w-32 h-32" />
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="exemplo@gmail.com"
                        className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 py-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Senha</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="123456"
                            className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span onClick={togglePasswordVisibility} className="absolute right-2 top-2 text-gray-500 cursor-pointer">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                </div>

                {errorMessage && <p className="text-center text-red-500 mb-4">{errorMessage}</p>}
                {successMessage && <p className="text-center text-green-500 mb-4">{successMessage}</p>}

                <div className="mt-4">
                    <button
                        onClick={handleLogin}
                        className="w-full bg-red-600 text-white py-2 rounded-lg"
                    >
                        Entrar
                    </button>
                </div>
                <div className="mt-4">
                    <button
                        onClick={onRegisterClick}
                        className="w-full bg-gray-400 text-white py-2 rounded-lg"
                    >
                        Registrar
                    </button>
                </div>
                <div className="mt-4 flex items-center justify-center">
                    <span className="text-gray-500">OU</span>
                </div>
                <div className="mt-4">
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg flex items-center justify-center">
                        <img src={googleLogo} alt="Google logo" className="w-5 h-5 mr-2" />
                        Entrar com Google
                    </button>
                </div>
            </form>

            <div className="flex justify-center mt-6 border border-gray-300 bg-gray-100 bg-opacity-50 rounded-lg p-1">
                <button
                    className={`py-2 px-4 flex items-center w-1/2 justify-center ${loginType === 'cliente' ? 'bg-red-600 text-white' : 'text-gray-700'}`}
                    onClick={() => toggleLoginType(false)}
                >
                    <FaUser className="mr-2" />
                    Cliente
                </button>
                <button
                    className={`py-2 px-4 flex items-center w-1/2 justify-center ${loginType === 'funcionario' ? 'bg-yellow-500 text-white' : 'text-gray-700'}`}
                    onClick={() => toggleLoginType(true)}
                >
                    <FaBriefcase className="mr-2" />
                    Funcionário
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
