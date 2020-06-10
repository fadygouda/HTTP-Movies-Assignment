import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useHistory} from 'react-router-dom'

const UpdateMovie = props => {
    const [data, setData] = useState({
        title: '',
        director: '',
        metascore: '',
    })
    const { id } = useParams();
    const { push } = useHistory();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setData(res.data))
            .catch(err => console.log(err));
        

    }, [id]);
    const changeHandler = e => {
        e.persist();
        if (e.target.name === "metascore") {
            e.target.value = parseInt(e.target.value, 10);
        }
        setData({
           ...data, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${data.id}`, data)
        .then(res => {
            console.log(res)
            const newMovie = props.movieList.map(movie => {
                if (movie.id === data.id) {
                    return data
                }
                return movie
            })
            props.setMovieList(newMovie);
            push(`/movies/${data.id}`);
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                name='title'
                onChange={changeHandler}
                placeholder='title'
                value={data.title}
                />
                <input 
                type='text'
                name='director'
                onChange={changeHandler}
                placeholder='director'
                value={data.director}
                />
                <input 
                type='text'
                name='metascore'
                onChange={changeHandler}
                placeholder='metascore'
                value={data.metascore}
                />
              

                <button type='submit' >Update</button>
                
        </form>
        </>
    )
}

export default UpdateMovie