import { getServerSession } from "next-auth"
import { options } from "@/api/auth/[...nextauth]/options"

export default async function PostsPage () {
  const session = await getServerSession(options);
  console.log('session ', session);
  return (
    <div>
      {
        !session ?
        <h3>Not Auth</h3>
        : <h3>Show Posts !!!</h3>
      }
    </div>
  )
}