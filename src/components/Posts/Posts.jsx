import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import PostCreate from '../PostCreate/PostCreate';
import Loading from './Loading';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);

        const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(postsQuery, (querySnapshot) => {
            const newPosts = querySnapshot.docs.map(doc => ({
                _id: doc.id,
                ...doc.data(),
                date: doc.data().createdAt.toDate().toLocaleDateString(),
                time: doc.data().createdAt.toDate().toLocaleTimeString(),
                fireCount: doc.data().fireCount || 0,
            }));

            setPosts(newPosts);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching posts:", error);
            setError(true);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="posts">
            <PostCreate setPosts={setPosts} />
            {loading && <Loading />}
            {error && <div>Error loading posts</div>}
            {!loading && !error && posts.map(post => (
                <Post
                    key={post._id}
                    _id={post._id}
                    name={post.name}
                    description={post.description}
                    date={post.date}
                    time={post.time}
                    fireCount={post.fireCount}
                />
            ))}
        </div>
    );
};

export default Posts;
