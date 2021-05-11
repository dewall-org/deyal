import React from 'react'
import style from './Post.module.scss'

const Post = ({ name, description }, ref) => {
    return (
        <div className='my-5' ref={ref}>
            <div className={`card ${style.card}`}>
                <h2>{name === '' ? 'Anonymous' : name}</h2>
                <p>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default React.forwardRef(Post)
