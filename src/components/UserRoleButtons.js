import React from 'react';

const UserRoleButtons = ({ onRoleSelect }) => (
  <div className="flex justify-center">
    <button
      className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-l focus:outline-none"
      onClick={() => onRoleSelect('cliente')}
    >
      <i className="fas fa-user mr-2"></i> Cliente
    </button>
    <button
      className="bg-yellow-500 text-white font-bold py-2 px-4 rounded-r focus:outline-none"
      onClick={() => onRoleSelect('funcionario')}
    >
      <i className="fas fa-briefcase mr-2"></i> Funcionário
    </button>
  </div>
);

export default UserRoleButtons;
