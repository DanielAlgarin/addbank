import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Asegúrate de tener react-router-dom instalado

function decodeJwt(token) {
    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload;
    } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null; // Devuelve null si hay un error
    }
}

function NavBar() {
    const [isAdmin, setIsAdmin] = useState(false);
    const location = useLocation(); // Obtiene la ubicación actual

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = decodeJwt(token);
            if (decodedToken) {
                setIsAdmin(decodedToken.role === 'ADMIN'); // Ajusta el campo según tu JWT
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        window.location.href = '/';
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./img/bank.png" className="h-10" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Aplicación Bancaria</span>
                </a>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a
                                href="/home"
                                className={`block py-2 px-3 rounded md:p-0 ${location.pathname === '/home' ? 'text-blue-700' : 'text-white'} hover:text-blue-700`}
                                aria-current={location.pathname === '/home' ? 'page' : undefined}
                            >
                                Inicio
                            </a>
                        </li>
                        <li>
                            <a
                                href="/check-founds"
                                className={`block py-2 px-3 rounded md:p-0 ${location.pathname === '/check-founds' ? 'text-blue-700' : 'text-white'} hover:text-blue-700`}
                            >
                                Consultar Saldo
                            </a>
                        </li>
                        <li>
                            <a
                                href="/transfer"
                                className={`block py-2 px-3 rounded md:p-0 ${location.pathname === '/transfer' ? 'text-blue-700' : 'text-white'} hover:text-blue-700`}
                            >
                                Realizar Transferencia
                            </a>
                        </li>
                        {isAdmin && (
                            <li>
                                <a
                                    href="/view-accounts"
                                    className={`block py-2 px-3 rounded md:p-0 ${location.pathname === '/view-accounts' ? 'text-blue-700' : 'text-white'} hover:text-blue-700`}
                                >
                                    Ver todas las cuentas
                                </a>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
