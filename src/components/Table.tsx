import { useState, useEffect } from 'react';
import gameService from './gameService';
import EditGameModal from "./editGameModal.tsx";
import  icon from "../assets/game-icon.png"
import { Game } from './types';


const Table = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true);
                const fetchedGames = await gameService.getAllGames();
                setGames(fetchedGames);
            } catch (err) {
                console.error('Error fetching games:', err);

                setError('Failed to fetch games');
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);


    const handleEditGame = (game: Game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGame(null);
    };

    const handleDeleteGame = async (id: { id: number }) => {

        await gameService.deleteGame(id.id);
        // Update the games list without the deleted game
        setGames(prevGames => prevGames.filter(game => game.id !== id.id));
    };

    const handleSaveGame = (updatedGame: Game) => {
        // Update the games list with the updated game
        setGames(prevGames =>
            prevGames.map(game =>
                game.id === updatedGame.id ? updatedGame : game
            )
        );
    };

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
                    <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                        <thead className="bg-gray-900">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Id</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Name</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Genre</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Price</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold">Release Date</th>
                                <th scope="col" className="px-6 py-4 text-white font-bold"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                            {games.map((game) => (
                                <tr key={game.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <img src={icon} alt="game icon" className="w-6 h-6" />
                                    </td>
                                    <td className="px-6 py-4 font-bold">{game.name}</td>
                                    <td className="px-6 py-4">{game.genre}</td>
                                    <td className="px-6 py-4 rounded-full  text-xs font-semibold text-green-600">£{game.price}</td>
                                    <td className="px-6 py-4">{game.releaseDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-4">
                                            <a href="#" onClick={() => handleDeleteGame(game)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                                </svg>
                                            </a>
                                            <a href="#" onClick={() => handleEditGame(game)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            {/* Edit Game Modal */}
            {selectedGame && (
                <EditGameModal
                game={selectedGame}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSave={handleSaveGame}
        />
            )}
                </>
            )}
        </>
    );
}

Table.propTypes = {}
export default Table