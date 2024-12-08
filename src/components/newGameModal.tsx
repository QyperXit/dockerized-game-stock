import React, { useState, useEffect } from 'react';
import genreService from "./genreService.tsx";
import gameService from './gameService';
import { Genre } from './types';



const NewGameModal = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [newGame, setNewGame] = useState({
        name: '',
        genreId: '',
        price: '',
        releaseDate: ''
    });

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                setLoading(true);
                const fetchedGenres = await genreService.getAllGenres();
                setGenres(fetchedGenres);
                console.log(fetchedGenres);
            } catch (err) {
                console.error('Error fetching games:', err);
                setError('Failed to fetch genres');
            } finally {
                setLoading(false);
            }
        };
        fetchGenres();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate inputs
        if (!newGame.name || !newGame.genreId || !newGame.price || !newGame.releaseDate) {
            setError('Please fill in all fields');
            return;
        }

        try {
            // Convert price to number and create game object
            const gameToCreate = {
                name: newGame.name,
                genreId: parseInt(newGame.genreId),
                price: parseFloat(newGame.price),
                releaseDate: newGame.releaseDate
            };

            console.log('Attempting to create game:', gameToCreate);

            // Call gameService to create the game
            const createdGame = await gameService.createGame(gameToCreate);

            // Reset form and close modal
            setNewGame({
                name: '',
                genreId: '',
                price: '',
                releaseDate: ''
            });

            // Close the modal programmatically
            const modal = document.getElementById('my_modal_5') as HTMLDialogElement;
            modal.close();

            console.log('Game created successfully:', createdGame);
        } catch (err) {
            console.error('Full error object:', err);

            // More detailed error logging
            if (err) {
                // The request was made and the server responded with a status code
                console.error('Server responded with:', err);
                console.error('Status code:', err);
                setError(`Server error: ${err || 'Failed to create game'}`);
            } else if (err) {
                // The request was made but no response was received
                console.error('No response received:', err);
                setError('No response from server. Please check your network connection.');
            } else {
                // Something happened in setting up the request
                console.error('Error setting up request:', err);
                setError(`Error: ${err}`);
            }
        }
    };

    return (
        <>

            <button className="btn btn-secondary text-white my-7"
                    onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).showModal()}>New Game
            </button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-gray-500">
                    <h3 className="font-bold text-lg text-white">New Game</h3>

                    {error && (
                        <div className="text-red-500 mb-4">
                            {error}
                        </div>
                    )}
                    {/* Display loading spinner or message */}
                    {loading ? (
                        <div className="text-center text-white">Loading genres...</div>
                    ) : (
                    <form onSubmit={handleSubmit} className="mx-auto max-w-xs space-y-5 mt-4">
                        <input
                            type="text"
                            className="block p-1 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="Name"
                            value={newGame.name}
                            onChange={(event) => setNewGame({ ...newGame, name: event.target.value })}
                            required
                        />

                        <label htmlFor="genreSelect" className="mb-1 block text-sm font-medium text-white">
                            Genre:
                        </label>
                        <select
                            id="genreSelect"
                            className="block p-1 text-sm w-full rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50"
                            value={newGame.genreId ?? ''}
                            onChange={(event) => setNewGame({ ...newGame, genreId: event.target.value })}
                            required
                        >
                            <option value="">Select a genre</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>

                        <input
                            type="number"
                            step="0.01"
                            className="block p-1 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="Price"
                            value={newGame.price}
                            onChange={(event) => setNewGame({ ...newGame, price: event.target.value })}
                            required
                        />
                        <input
                            type="date"
                            className="block p-1 w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-400 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
                            placeholder="Release Date"
                            value={newGame.releaseDate}
                            onChange={(event) => setNewGame({ ...newGame, releaseDate: event.target.value })}
                            required
                        />

                        <div className="modal-action">
                            <button type="submit" className="btn btn-primary">Create Game</button>
                            <button type="button" className="btn" onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement).close()}>Close</button>
                        </div>
                    </form>
                    )}

                </div>
            </dialog>
        </>
    )
}

NewGameModal.propTypes = {}

export default NewGameModal