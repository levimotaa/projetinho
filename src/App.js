// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LoginFuncionarios from './components/LoginFuncionarios';
import RegisterForm from './components/RegisterForm';
import EmployeeHome from './components/EmployeeHome';
import RegisterEmployee from './components/RegisterEmployee';
import ClientHome from './components/ClientHome';

const App = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [isFuncionario, setIsFuncionario] = useState(false);
    const [isClientLoggedIn, setIsClientLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true); // Controle temporário para admin

    const handleRegisterClick = () => setIsRegistering(true);
    const handleSuccessfulRegister = () => setIsRegistering(false);
    const toggleLoginType = (isFuncionarioLogin) => setIsFuncionario(isFuncionarioLogin);
    const handleClientLoginSuccess = () => setIsClientLoggedIn(true);

    // Rota protegida para o cadastro de funcionários
    const PrivateRoute = ({ children }) => {
        return isAdmin ? children : <Navigate to="/" />;
    };

    return (
        <Router>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            isClientLoggedIn ? (
                                <Navigate to="/client-home" />
                            ) : isRegistering ? (
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
                            )
                        } 
                    />
                    <Route path="/client-home" element={<ClientHome />} />
                    <Route path="/employee-home" element={<EmployeeHome />} />
                    <Route 
                        path="/register-employee" 
                        element={
                            <PrivateRoute>
                                <RegisterEmployee />
                            </PrivateRoute>
                        } 
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
