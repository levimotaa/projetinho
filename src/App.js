// App.js
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import LoginFuncionarios from './components/LoginFuncionarios';
import RegisterForm from './components/RegisterForm';
import ClientHome from './components/ClientHome';

const App = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isFuncionario, setIsFuncionario] = useState(false);
    const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);

    const handleRegisterClick = () => {
        setIsRegistering(true);
    };

    const handleSuccessfulRegister = () => {
        setIsRegistering(false);
    };

    const toggleLoginType = (isFuncionarioLogin) => {
        setIsFuncionario(isFuncionarioLogin);
    };

    const handleClientLoginSuccess = () => {
        setIsClientLoggedIn(true);
    };

    const handleLogout = () => {
        setIsClientLoggedIn(false);
    };

    if (isClientLoggedIn) {
        return <ClientHome onLogout={handleLogout} />;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {isRegistering ? (
                <RegisterForm
                    onBackToLogin={() => setIsRegistering(false)}
                    onSuccessfulRegister={handleSuccessfulRegister}
                />
            ) : isFuncionario ? (
                <LoginFuncionarios
                    onBack={() => toggleLoginType(false)}
                    toggleLoginType={toggleLoginType}
                    loginType="funcionario"
                />
            ) : (
                <LoginForm
                    onRegisterClick={handleRegisterClick}
                    toggleLoginType={toggleLoginType}
                    loginType="cliente"
                    onLoginSuccess={handleClientLoginSuccess}
                />
            )}
        </div>
    );
};

export default App;
