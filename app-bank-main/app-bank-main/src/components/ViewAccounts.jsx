import { useState, useEffect } from "react";
import NavBar from "./NavBar";

function ViewAccounts() {
    // Estado para almacenar las cuentas
    const [cuentas, setCuentas] = useState([]);
    const [mensajeError, setMensajeError] = useState("");

    // Token JWT (asumimos que el token está almacenado en el localStorage)
    const token = localStorage.getItem("token");

    // Hacer la solicitud al backend para obtener las cuentas
    useEffect(() => {
        const fetchCuentas = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/usuarios", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`, // Enviar token en el header
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Error ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                setCuentas(data); // Asumimos que el endpoint devuelve un array de cuentas
            } catch (error) {
                console.error("Error al obtener las cuentas:", error);
                setMensajeError(`Error al obtener las cuentas: ${error.message}`);
            }
        };

        fetchCuentas();
    }, [token]); // La petición se realiza solo cuando el componente se monta

    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center mb-6 w-full max-w-3xl">
                    <h2 className="font-bold text-2xl mb-4 uppercase">Cuentas</h2>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        {mensajeError ? (
                            <p className="text-red-600">{mensajeError}</p>
                        ) : (
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-black">
                                    <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Nombre de Usuario</th>
                                            <th scope="col" className="px-6 py-3">Número de Cuenta</th>
                                            <th scope="col" className="px-6 py-3">Saldo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cuentas.length > 0 ? (
                                            cuentas.map((cuenta) => (
                                                <tr key={cuenta.cuenta.numeroCuenta} className="bg-white border-b dark:border-gray-700">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                        {cuenta.username}
                                                    </th>
                                                    <td className="px-6 py-4">{cuenta.cuenta.numeroCuenta}</td>
                                                    <td className="px-6 py-4">${cuenta.cuenta.saldo}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-4 text-center">
                                                    No hay cuentas disponibles.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewAccounts;
