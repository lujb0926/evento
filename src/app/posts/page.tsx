'use client'
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function PostsPage () {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/posts')
    }
  });
  console.log('posts session ', session);
  console.log('posts status ', status);
  return (
    <div>
      {
        status !== 'authenticated' ?
        <h3>Not Auth</h3>
        : <h3>Show Posts !!!  {session.user?.email}</h3>
      }
    </div>
  )
}