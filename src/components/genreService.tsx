import axios from 'axios';
import { Genre } from './types.tsx';



// interface Genre {
//     id: number;
//     name: string;
// }

const genreService = {
    getAllGenres: async (): Promise<Genre[]> => {
        try {
            const response = await axios.get('http://localhost:8080/genres');
            return response.data;
        } catch (error) {
            console.error('Error fetching genres:', error);
            throw error;
        }
    }
};

export default genreService;