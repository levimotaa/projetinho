import React, { useState } from 'react';
import { FaArrowLeft, FaEye, FaCalendarAlt } from 'react-icons/fa';
import gbarbosaLogo from '../assets/gbarbosa.png';

const RegisterForm = ({ onBackToLogin, onSuccessfulRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthDate: '',
    termsAccepted: false,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const isValidPhone = (phone) => /^[0-9]{10,11}$/.test(phone);

  const isOver18 = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    return age > 18 || (age === 18 && m >= 0 && today.getDate() >= birth.getDate());
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword, phone, birthDate, termsAccepted } = formData;

    if (!fullName || !email || !password || !confirmPassword || !phone || !birthDate || !termsAccepted) {
      setError('Por favor, preencha todos os campos e aceite os Termos e Condições.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }

    if (!isValidPhone(phone)) {
      setError('O número de telefone deve conter apenas dígitos e ter entre 10 e 11 caracteres.');
      return;
    }

    if (!isOver18(birthDate)) {
      setError('Você precisa ter mais de 18 anos para se cadastrar.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Recupera os usuários existentes ou inicializa um array vazio
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Adiciona o novo usuário
    const newUser = { fullName, email, password, phone, birthDate };
    existingUsers.push(newUser);

    // Salva o array atualizado no LocalStorage
    localStorage.setItem('users', JSON.stringify(existingUsers));

    setSuccessMessage('Cadastro concluído com sucesso! Redirecionando...');

    setTimeout(() => {
      onSuccessfulRegister();
    }, 2500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-80 overflow-hidden">
      <div className="bg-red-600 p-6 pb-12 rounded-b-3xl relative">
        <div className="flex items-center justify-between mb-4">
          <FaArrowLeft className="text-white text-xl cursor-pointer" onClick={onBackToLogin} />
          <img src={gbarbosaLogo} alt="Logo Gbarbosa" className="w-10 h-10" />
        </div>
        <h1 className="text-center text-white text-xl font-bold mb-6">CADASTRO</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-white mb-1 font-bold">Nome Completo</label>
            <input type="text" name="fullName" placeholder="Digite seu nome completo" onChange={handleChange} value={formData.fullName} className="w-full p-2 rounded border border-gray-300" />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1 font-bold">E-Mail</label>
            <input type="email" name="email" placeholder="Digite seu E-Mail" onChange={handleChange} value={formData.email} className="w-full p-2 rounded border border-gray-300" />
          </div>
          <div className="mb-4 relative">
            <label className="block text-white mb-1 font-bold">Senha</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password" 
              placeholder="Digite sua senha" 
              onChange={handleChange} 
              value={formData.password} 
              className="w-full p-2 rounded border border-gray-300" 
            />
            <FaEye 
              className="absolute right-3 top-9 text-gray-500 cursor-pointer" 
              onClick={() => setShowPassword(!showPassword)} 
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-white mb-1 font-bold">Confirmação de Senha</label>
            <input 
              type={showConfirmPassword ? 'text' : 'password'} 
              name="confirmPassword" 
              placeholder="Confirme a sua senha" 
              onChange={handleChange} 
              value={formData.confirmPassword} 
              className="w-full p-2 rounded border border-gray-300" 
            />
            <FaEye 
              className="absolute right-3 top-9 text-gray-500 cursor-pointer" 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1 font-bold">Número de Telefone</label>
            <input 
              type="tel" 
              name="phone" 
              placeholder="Digite seu telefone" 
              onChange={handleChange} 
              value={formData.phone} 
              className="w-full p-2 rounded border border-gray-300" 
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-white mb-1 font-bold">Data de Nascimento</label>
            <input type="date" name="birthDate" onChange={handleChange} value={formData.birthDate} className="w-full p-2 rounded border border-gray-300" />
            <FaCalendarAlt className="absolute right-3 top-9 text-gray-500" />
          </div>
        </form>
      </div>

      <div className="p-6 pt-4">
        <div className="text-center text-gray-700 text-sm mb-2">Ler Termos e Condições</div>
        <div className="flex items-center mb-6">
          <input type="checkbox" name="termsAccepted" onChange={handleChange} checked={formData.termsAccepted} className="mr-2" />
          <label className="text-gray-700">Aceito os Termos e Condições</label>
        </div>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm mb-4 text-center">{successMessage}</p>}

        <button type="submit" onClick={handleRegister} className="w-full bg-red-600 text-white p-2 rounded">
          Concluir Cadastro
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
