'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation'
import Form from '@components/Form';
import { fetchPosts } from '@redux/features/postslice';
import { useDispatch } from 'react-redux';

const CreatePost = () => {

  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    text: '',
    tag: '',
    imageURL: ''
  })

  const router = useRouter();
  const { data: session } = useSession();

  const makePost = async (e) => {
    if (!session.user) return redirect('/');
    e.preventDefault();

    setSubmitting(true);

    try {
      const res = await fetch('/api/post/new', {
        method: 'POST',
        cache: 'no-store',
        body: JSON.stringify({
          userId: session?.user.id,
          text: post.text,
          tag: post.tag,
          imageURL: post.imageURL
        })
      })

      if (res.ok) {
        // dispatch(fetchPosts())
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
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={makePost}
    />

  )
}

export default CreatePost