//* ======== Libraries
import Image from "next/image"
//* ======== Components
import Login from "features/login"
//* ======== Custom Logic
//* ======== Assets and styles

export default function Home() {
  return (
    <div className="grid grid-cols-3 ">
      <Login />
    </div>
  )
}
