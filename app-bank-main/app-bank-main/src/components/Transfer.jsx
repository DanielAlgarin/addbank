import { useState } from "react";
import NavBar from "./NavBar";

function Transfer() {
    // Estados para almacenar los valores del formulario
    const [cuentaDestino, setCuentaDestino] = useState("");
    const [monto, setMonto] = useState(0);
    const [mensaje, setMensaje] = useState("");
    
    const token = localStorage.getItem('token'); // Obtener el token JWT del localStorage

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar que el formulario se recargue

        try {
            const response = await fetch('http://localhost:8080/api/v1/transferir', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cuentaDestino: cuentaDestino,
                    monto: parseFloat(monto), // Asegurarse de que el monto sea un número
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            setMensaje("Transferencia exitosa!");
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setMensaje(`Error en la transferencia: ${error.message}`);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center mb-6 w-96">
                    <h2 className="font-bold text-2xl mb-4">Transferir Dinero a otra Cuenta</h2>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="cuentaDestino" className="block text-sm font-medium text-gray-700">
                                    Número de Cuenta
                                </label>
                                <input
                                    type="text"
                                    id="cuentaDestino"
                                    name="cuentaDestino"
                                    placeholder="Ingresa el número de cuenta"
                                    value={cuentaDestino}
                                    onChange={(e) => setCuentaDestino(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="monto" className="block text-sm font-medium text-gray-700">
                                    Monto a Transferir
                                </label>
                                <input
                                    type="number"
                                    id="monto"
                                    name="monto"
                                    placeholder="Ingresa el monto"
                                    value={monto}
                                    onChange={(e) => setMonto(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                            >
                                Transferir
                            </button>
                        </form>
                        {mensaje && (
                            <p className="mt-4 text-center text-red-600">
                                {mensaje}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transfer;
