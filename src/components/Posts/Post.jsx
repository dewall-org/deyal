import React, { useState } from 'react';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../firebase';
import Card from '../Card';

const Post = ({ _id, name, description, date, time, fireCount }, ref) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpansion = () => {
        setExpanded(prevExpanded => !prevExpanded);
    };

    const handleFireReaction = async () => {
        const postDocRef = doc(db, 'posts', _id);
        try {
            await updateDoc(postDocRef, {
                fireCount: increment(1)
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

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
                <div className={`card__details p-4 ${description.length <= 200 ? 'short' : ''}`}>
                    {description.length > 200 && !expanded ? `${description.substring(0, 200)}...` : description}
                    {description.length > 200 ? (
                        <button className="btn btn-expand" onClick={handleExpansion}>
                            {expanded ? 'Show Less' : 'Show More'}
                        </button>
                    ) : null}
                </div>
                <div className="card__reactions p-4 d-flex justify-content-start align-items-center">
                    <button className="btn btn-reaction" onClick={handleFireReaction}>
                        🔥 {fireCount}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default React.memo(React.forwardRef(Post));
