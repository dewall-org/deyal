import React, { useEffect, useState } from 'react'
import Card from '../Card'

const Post = ({ name, description, date, time }, ref) => {

    const [expanded, setExpanded] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [isShort, setIsShort] = useState(false)

    const handleExpansion = e => {
        console.log(e)
        setExpanded(prevExpanded => !prevExpanded)
    }

    useEffect(() => {
        if (description && description.length > 400)
            setHasMore(true)
        if (description && description.length <= 100)
            setIsShort(true)
    }, [description])

    return (
        <div className='my-5 py-3' ref={ref}>
            <Card>
                <div className="card__info px-4 py-2 d-flex flex-column flex-sm-row align-items-center justify-content-center justify-content-sm-start">
                    <div className="left">
                        <i className="fal fa-user-secret"></i>
                    </div>
                    <div className="right px-4">
                        <div className="name text-center text-sm-start">
                            <h5>{name === '' ? 'Anonymous' : name}</h5>
                        </div>
                        <div className="datetime text-center text-sm-start">
                            <h4>{date} || {time}</h4>
                        </div>
                    </div>
                </div>
                <div className={`card__details p-4 ${isShort ? 'short' : ''}`}>
                    {hasMore ? expanded ? description : description.slice(0, 240) + '... ' : description}
                    {expanded ? <br /> : ''}
                    {hasMore ? <button className="btn btn-expand" onClick={handleExpansion}> {expanded ? 'Show Less' : 'Show More'}</button> : ''}
                </div>
            </Card>
        </div>
    )
}

export default React.memo(React.forwardRef(Post))
