import Image from "next/image";
import Login from "../pages/login"; 
export default function Home() {
  return (
    <div className="grid grid-cols-3 ">
    <Login/>
    </div>
  );
}
