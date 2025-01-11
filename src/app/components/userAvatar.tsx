import { auth } from "../../auth"
 
export default async function UserAvatar() {
  const session = await auth()
 
  console.log(session);
  if (!session) return null
 
  return (
    <div>
      {session.user?.id}
    </div>
  )
}