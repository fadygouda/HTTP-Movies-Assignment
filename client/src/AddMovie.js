import React, { useState } from 'react';
import axios from 'axios'

const AddMovie = props => {
    const [add, setAdd] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    const changeHandler = e => {
        setAdd({
            ...add,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/movies/`, add)
            .then(res=> props.setMovieList(res.data))
            .catch(err=> console.log(err))
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add a Movie</h1>
            <input type='text' placeholder='title'onChange={changeHandler} value={add.title} name='title' />
            <input type='text' placeholder='director'onChange={changeHandler} value={add.director} name='director' />
            <input type='text' placeholder='metascore'onChange={changeHandler} value={add.metascore} name='metascore' />
            <input type='text' placeholder='stars'onChange={changeHandler} value={add.stars} name='stars' />
            <button type='submit'>Submit</button>
        </form>
    )
}
export default AddMovie;