import "/src/styles/MarvelToDoList.css";
import React, { useState, useEffect } from "react";

const MarvelToDoList = () => {
    const loadMoviesFromStorage = () => {
        const savedMovies = localStorage.getItem("movies");
        return savedMovies
            //Lista predeterminada
            ? JSON.parse(savedMovies)
            : [
                { id: 1, title: "Spider-Man: No Way Home", seen: false },
                { id: 2, title: "Avengers: Endgame", seen: false },
                { id: 3, title: "Captain America: Civil War", seen: false },
            ];
    };

    const saveMoviesToStorage = (movies) => {
        localStorage.setItem("movies", JSON.stringify(movies));
    };

    const [movies, setMovies] = useState(loadMoviesFromStorage());
    const [newMovie, setNewMovie] = useState("");
    const [editingMovie, setEditingMovie] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");

    const toggleSeen = (id) => {
        const updatedMovies = movies.map((movie) =>
            movie.id === id ? { ...movie, seen: !movie.seen } : movie
        );
        setMovies(updatedMovies);
        saveMoviesToStorage(updatedMovies);
    };

    const sortAlphabetically = () => {
        const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
        setMovies(sortedMovies);
    };

    const sortBySeen = () => {
        const sortedMovies = [...movies].sort((a, b) => b.seen - a.seen);
        setMovies(sortedMovies);
    };

    const addMovie = () => {
        if (newMovie.trim() === "") return;

        const movieExists = movies.some(
            (movie) => movie.title.toLowerCase() === newMovie.trim().toLowerCase()
        );

        if (movieExists) {
            alert("¡La película ya existe en la lista!");
            return;
        }

        const newMovieObject = { id: Date.now(), title: newMovie, seen: false };
        const updatedMovies = [...movies, newMovieObject];
        setMovies(updatedMovies);
        saveMoviesToStorage(updatedMovies);
        setNewMovie("");

        alert("¡Película agregada exitosamente!");
    };

    const editMovie = (id, newTitle) => {
        if (newTitle.trim() === "") return;

        const updatedMovies = movies.map((movie) =>
            movie.id === id ? { ...movie, title: newTitle } : movie
        );

        setMovies(updatedMovies);
        saveMoviesToStorage(updatedMovies);
        setEditingMovie(null);

        alert("¡Película editada exitosamente!");
    };

    const deleteMovie = (id) => {
        const updatedMovies = movies.filter((movie) => movie.id !== id);
        setMovies(updatedMovies);
        saveMoviesToStorage(updatedMovies);

        alert("¡Película eliminada exitosamente!");
    };

    return (
        <div className="app-container">
            <div className="todo-container">
                <h2 className="todo-title">🎬 Mis películas de Marvel</h2>

                <div className="sort-options">
                    <button onClick={sortAlphabetically} className=".sort-options button">
                        Ordenar alfabéticamente
                    </button>
                    <button onClick={sortBySeen} className=".sort-options button">
                        Ordenar por vistas
                    </button>
                </div>

                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id} className="todo-item">
                            <span className={movie.seen ? "seen" : ""}>{movie.title}</span>
                            <div className="button-group">
                                <button onClick={() => toggleSeen(movie.id)} className="todo-button">
                                    {movie.seen ? "✔️Visto" : "👀Por Ver"}
                                </button>
                                <button onClick={() => setEditingMovie(movie)} className="todo-button edit-button"> ✏️ Editar </button>
                                <button onClick={() => deleteMovie(movie.id)} className="todo-button delete-button"> ❌ Eliminar </button>
                            </div>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 flex">
                    <label htmlFor="movie-input">Nombre de la película: </label>
                    <input
                        type="text"
                        className="todo-input"
                        placeholder="Agregar película..."
                        value={newMovie}
                        onChange={(e) => setNewMovie(e.target.value)}
                    />
                    <button onClick={addMovie} className="add-button"> ➕ </button>
                </div>
            </div>

            {editingMovie && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Editar Película</h3>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                        <div className="modal-buttons">
                            <button onClick={() => editMovie(editingMovie.id, editedTitle)} className="save-btn">Guardar</button>
                            <button onClick={() => setEditingMovie(null)} className="cancel-btn">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MarvelToDoList;
