import { getServerSession } from "next-auth"
import { options } from "@/api/auth/[...nextauth]/options"

export default async function DashboardPage () {
  const session = await getServerSession(options);
  console.log('session ', session);
  
  return (
    <div>
      DashboardPage
    </div>
  )
}