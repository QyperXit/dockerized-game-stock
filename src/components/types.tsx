// src/types.ts
export interface Genre {
    id: number;
    name: string;
}

export interface Game {
    id: number;
    name: string;
    genreId: number;
    genre?: string;
    price: number;
    releaseDate: string;
}