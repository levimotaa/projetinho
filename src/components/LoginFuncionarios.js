import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaBriefcase } from 'react-icons/fa';
import gbarbosaLogo from '../assets/gbarbosa.png';

const LoginFuncionarios = ({ onBack, toggleLoginType, loginType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [credencial, setCredencial] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const employee = employees.find(emp => emp.id === credencial && emp.password === password);

    if (employee) {
      setErrorMessage('');
      setSuccessMessage('Login efetuado com sucesso!');
      setTimeout(() => {
        navigate('/employee-home');
      }, 2500);
    } else {
      setSuccessMessage('');
      setErrorMessage('Credenciais inválidas. Verifique sua credencial e senha.');
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="bg-red-600 rounded-b-full pt-10 pb-20 flex justify-center">
        <img src={gbarbosaLogo} alt="Logo da empresa" className="w-32 h-32 rounded-full border-4 border-white" />
      </div>
      <div className="px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="credencial">Credencial</label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
            id="credencial"
            type="text"
            placeholder="Digite sua credencial"
            value={credencial}
            onChange={(e) => setCredencial(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Senha</label>
          <div className="relative">
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}
        <div className="flex items-center justify-between">
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            onClick={handleLogin}
          >
            Entrar
          </button>
          <button
            className="text-gray-500 text-sm underline focus:outline-none"
            onClick={onBack}
          >
            Voltar
          </button>
        </div>
      </div>

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

export default LoginFuncionarios;
