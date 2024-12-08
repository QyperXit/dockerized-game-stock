import React, { useState, useEffect } from 'react';
import gameService from './gameService';
import genreService from './genreService';
import { Game,Genre } from './types.tsx';


interface EditGameModalProps {
    game: Game;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedGame: Game) => void;
}

const EditGameModal: React.FC<EditGameModalProps> = ({ game, isOpen, onClose, onSave }) => {
    const [editedGame, setEditedGame] = useState<Game>({
        ...game,
        genreId: game.genreId // Ensure genreId is a string
    });
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    // Fetch genres when modal opens
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const fetchedGenres = await genreService.getAllGenres();
                setGenres(fetchedGenres);

                // Find the genre ID that matches the game's genre name
                const matchingGenre = fetchedGenres.find(genre => genre.name === game.genre);

                setEditedGame({
                    ...game,
                    genreId: matchingGenre ? matchingGenre.id : game.genreId
                });
            } catch (err) {
                setError('Failed to fetch genres');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchGenres();
        }
    }, [game, isOpen]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedGame(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) :
                name === 'genreId' ? value :
                    value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Ensure genreId is converted to a number for submission
            const gameToUpdate: Game = {
                ...editedGame,
                genreId: editedGame.genreId,
                genre: editedGame.genre
            };

            const updatedGame = await gameService.updateGame(gameToUpdate);
            onSave(updatedGame);
            onClose();
        } catch (error) {
            console.error('Failed to update game', error);
            setError('Failed to update game. Please try again.');
        }
    };

    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-4">Edit Game</h2>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={editedGame.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genreId">
                            Genre
                        </label>
                        {loading ? (
                            <div className="text-gray-500">Loading genres...</div>
                        ) : (
                            <select
                                name="genreId"
                                value={editedGame.genreId}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-white"
                                required
                            >
                                <option value="">Select a Genre</option>
                                {genres.map((genre) => (
                                    <option key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>



                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={editedGame.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="releaseDate">
                            Release Date
                        </label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={editedGame.releaseDate}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-white"
                            required
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGameModal;