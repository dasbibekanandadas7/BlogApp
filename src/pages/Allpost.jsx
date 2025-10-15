import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
 
  useEffect(() => {
    appwriteService.getPosts([]).then((result) => {
      if (result && result.documents) {
        setPosts(result.documents);
      } else {
        console.log("No posts found or failed to fetch:", result);
      }
    });
  }, []); 
  
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className='p-2 w-1/4'>              
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <p className="w-full text-center text-gray-500">No posts found.</p>
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
