import { useCallback, useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { getDadosSensores } from '../services/api';
import { transformaDados } from '../utils/dataTransformer';

function useSensorData() {
    const [dados, setDados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);
    const firstLoad = useRef(true);
    const socketRef = useRef(null);

    const fetchDados = useCallback(async () => {
        try {
            setErro(null);
            if (firstLoad.current) setLoading(true);
            const resultado = await getDadosSensores();
            setDados(transformaDados(resultado));
        } catch (err) {
            setErro('Não foi possível carregar os dados. Verifique sua conexão ou tente novamente.');
            console.error(err);
        } finally {
            if (firstLoad.current) {
                setLoading(false);
                firstLoad.current = false;
            }
        }
        
    }, []);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchDados();

        // Criar conexão socket apenas uma vez
        if (!socketRef.current) {
            socketRef.current = io('http://localhost:5000'); // ajuste para seu backend real

            socketRef.current.on('novo-dado', (novoDado) => {
                console.log('Recebido novo dado via socket:', novoDado);
                const transformado = transformaDados([novoDado])[0];

                // Usar callback function para garantir que temos o estado mais atual
                setDados(prevDados => {
                    const novoArray = [...prevDados, transformado]
                        .slice(-30)
                        .sort((a, b) => new Date(a.data) - new Date(b.data)); // ordenação crescente por data

                    console.log('Atualizando dados com:', novoArray);
                    return novoArray;
                });
            });

            socketRef.current.on('connect', () => {
                console.log('Socket conectado');
            });

            socketRef.current.on('disconnect', () => {
                console.log('Socket desconectado');
            });

            socketRef.current.on('connect_error', (error) => {
                console.error('Erro de conexão socket:', error);
            });
        }

        // Cleanup function
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
        };
    }, [fetchDados]); // Array vazio para evitar reconexões desnecessárias

    return { dados, loading, erro };
}

export default useSensorData;

