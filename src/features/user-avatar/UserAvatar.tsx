import { auth } from "../../auth"
 
export default async function UserAvatar() {
  const session = await auth()
 

  if (!session) return null
 
  return (
    <div>
      {session.user?.email}
    </div>
  )
}