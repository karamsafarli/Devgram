'use client'
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import Form from '@components/Form';

const UpdatePost = () => {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        text: '',
        tag: '',
        imageURL: ''
    })

    const router = useRouter();
    const searchParams = useSearchParams();
    const postId = searchParams.get('id');

    useEffect(() => {
        const getPostDetails = async () => {

            const res = await fetch(`/api/post/${postId}`);
            const data = await res.json();
            setPost({
                text: data.text,
                tag: data.tag,
                imageURL: data.imageURL
            });
        }

        if (postId) {
            getPostDetails()
        }
    }, [postId])

    const updatePost = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if (!postId) {
            return alert("Post not found")
        }

        try {
            const res = await fetch(`/api/post/${postId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    text: post.text,
                    tag: post.tag,
                    imageURL: post.imageURL
                })
            })

            if (res.ok) {
                router.push('/');
            }
        } catch (err) {
            console.log(err);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePost}
        />

    )
}

export default UpdatePost