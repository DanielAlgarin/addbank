import { useState } from 'react';

function Login() {
    // Manejo del estado para username y password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Función para manejar el submit del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevenir recarga de página por defecto

        // Crear un objeto con los datos del formulario
        const credentials = { username, password };

        try {
            // Hacer una solicitud POST al endpoint de login
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login exitoso:', data);
                // Aquí puedes almacenar el token JWT o redirigir al usuario
                localStorage.setItem('token', data.jwt);
                window.location.href = '/home';

            } else {
                console.error('Error en el login:', response);
                setError("Credenciales Invalidas");
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="./img/bank.png" alt="logo" />
                        Aplicación Bancaria
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Iniciar Sesión
                            </h1>
                            {/* Formulario */}
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Usuario</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="nombre@compañia.com"
                                        required
                                        value={username} // Asignar el estado
                                        onChange={(e) => setUsername(e.target.value)} // Actualizar el estado
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="••••••••"
                                        required
                                        value={password} // Asignar el estado
                                        onChange={(e) => setPassword(e.target.value)} // Actualizar el estado
                                    />
                                </div>
                                <p className='mt-2 text-red-600'>{error}</p>
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                    Iniciar Sesión
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    ¿Aún no tienes cuenta? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Regístrate</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
