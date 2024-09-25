import { useEffect, useState } from 'react';
import NavBar from "./NavBar";

function CheckFounds() {
    const [balance, setBalance] = useState(null); // Estado para el saldo
    const [activeView, setActiveView] = useState(''); // Estado para controlar la vista actual ('deposito' o 'retiro')
    const [amount, setAmount] = useState(''); // Estado para el monto ingresado
    const token = localStorage.getItem('token'); // Obtener el token JWT del localStorage

    const fetchBalance = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/saldo', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);
            setBalance(data.saldo); 
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setBalance(null);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    // Función para realizar depósito o retiro
    const handleTransaction = async (type) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/${type}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    monto: parseFloat(amount), // Enviar el monto
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${errorText}`);
            }
            window.location.reload();
            setAmount(''); // Limpiar el campo de monto
            setActiveView(''); // Volver a la vista inicial
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <section className="text-black bg-gray-100 body-font min-h-screen">
                <h2 className="text-center font-bold text-2xl py-6 uppercase">Gestión de Fondos</h2>
                
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-lg w-4/5 shadow-lg p-6">
                        <div className="p-4">
                            <div className="bg-gradient-to-b from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl p-8">
                                <div className="flex flex-row items-center">
                                    <div className="bg-green-800 p-3 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 text-right md:text-center">
                                        <h5 className="font-bold uppercase text-gray-600">SALDO DISPONIBLE</h5>
                                        <h3 className="font-bold text-4xl">
                                            {balance !== null ? `$${balance}` : 'Cargando...'}
                                            <span className="text-green-500"><i className="fas fa-caret-up"></i></span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="bg-white rounded-lg w-4/5 shadow-lg p-6">
                        <div className="flex justify-around mb-6">
                            <button
                                className={`px-4 py-2 rounded ${activeView === 'deposito' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setActiveView('deposito')}
                            >
                                Depositar
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${activeView === 'retirar' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                                onClick={() => setActiveView('retirar')}
                            >
                                Retirar
                            </button>
                        </div>

                        {activeView === 'deposito' && (
                            <div>
                                <h3 className="text-center font-bold text-xl">Depositar Fondos</h3>
                                <div className="my-4">
                                    <label className="block mb-2">Monto a depositar:</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="border rounded-md p-2 w-full"
                                        placeholder="Ingrese monto"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleTransaction('deposito')}
                                    >
                                        Confirmar Depósito
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={() => setActiveView('')}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeView === 'retirar' && (
                            <div>
                                <h3 className="text-center font-bold text-xl">Retirar Fondos</h3>
                                <div className="my-4">
                                    <label className="block mb-2">Monto a retirar:</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="border rounded-md p-2 w-full"
                                        placeholder="Ingrese monto"
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleTransaction('retirar')}
                                    >
                                        Confirmar Retiro
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded"
                                        onClick={() => setActiveView('')}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CheckFounds;
