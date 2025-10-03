import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
  
    const userData = useSelector((state) => state.auth.userData);
  
useEffect(() => {
       if (slug) {
        appwriteService.getPost(slug).then((post) => {
            if (post) setPost(post);
            else navigate("/");
        });
    } else navigate("/");
}, [slug, navigate, userData]);


    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Image Box */}
                <div className="relative w-full flex justify-center mb-4">
                    <div className="relative border rounded-xl overflow-auto max-h-[400px]">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl object-contain max-h-[400px]"
                        />

                        {/* Edit/Delete Buttons - hidden by default, visible on hover */}
                        <div className="absolute top-2 right-2 opacity-0 hover:opacity-100 transition-opacity duration-300 flex space-x-3">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Title and Content Box (50% width) */}
                <div className="w-1/2 mx-auto mb-6 border rounded-xl p-4 shadow-md bg-white">
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <div className="browser-css overflow-auto max-h-[500px]">
                        {parse(post.content)}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
