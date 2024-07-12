import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

const Search = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword?.trim()) {
            navigate(`/?keyword=${keyword}`)
        } else {
            navigate('/')
        }
    }
    return (
        <form onSubmit={submitHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    aria-describedby="search_btn"
                    className="form-control py-2"
                    placeholder="Enter Product Name ..."
                    aria-label='Enter Product Name ...'
                    name="keyword"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button id="search_btn" className="input-group-text" type="submit">
                    <BsSearch className='fs-5' />
                </button>
            </div>
        </form>
    )
}

export default Search