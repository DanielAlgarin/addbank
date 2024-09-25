import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

function Home() {
    const [numeroCuenta, setNumeroCuenta] = useState(null);

    useEffect(() => {
        const fetchCuenta = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/v1/usuario", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Asegúrate de agregar el token de autenticación si es necesario
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setNumeroCuenta(data.cuenta.numeroCuenta); 
                } else {
                    console.error("Error fetching account:", response.status);
                }
            } catch (error) {
                console.error("Error fetching account:", error);
            }
        };

        fetchCuenta();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center mb-6 w-full max-w-md">
                    <h2 className="font-bold text-2xl mb-4">Tu Cuenta</h2>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        {numeroCuenta ? (
                            <div className="p-4">
                                <h3 className="font-bold text-lg">Número de Cuenta:</h3>
                                <p className="text-xl">{numeroCuenta}</p>
                            </div>
                        ) : (
                            <p>Cargando tu número de cuenta...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
