import axios from 'axios';


interface Game {
    id: number;
    name: string;
    genreId: number;
    price: number;
    releaseDate: string;
}

const gameService = {
    // Get all games
    getAllGames: async (): Promise<Game[]> => {
        try {
            const response = await axios.get('http://localhost:8080/games');
            return response.data;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    },

    getGameById: async (id: number): Promise<Game> => {
        try {
            const response = await axios.get(`http://localhost:8080/games/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching game ${id}:`, error);
            throw error;
        }
    },

    createGame: async (game: Omit<Game, 'id'>): Promise<Game> => {
        try {
            const response = await axios.post('http://localhost:8080/games', game);
            return response.data;
        } catch (error) {
            console.error('Error creating game:', error);
            throw error;
        }
    },

    updateGame: async (game: Game): Promise<Game & { genre: string }> => {

        try {
            const response = await axios.put(`http://localhost:8080/games/${game.id}`, game);
            return response.data;
        } catch (error) {
            console.error(`Error updating game ${game.id}:`, error);
            throw error;
        }
    },

    deleteGame: async (id: number): Promise<void> => {
        try {
            await axios.delete(`http://localhost:8080/games/${id}`);
        } catch (error) {
            console.error(`Error deleting game ${id}:`, error);
            throw error;
        }
    }
};

export default gameService;