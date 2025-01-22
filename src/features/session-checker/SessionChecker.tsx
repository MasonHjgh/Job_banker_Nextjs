// 'use client';

// import { useSession, SessionProvider } from 'next-auth/react';
// import { usePathname,redirect } from 'next/navigation';

// function SessionCheckerContent() {
//   const session = useSession();
//   const pathName = usePathname();
//   if (!session?.data && pathName !== "/login"){
//     console.log(session)
//     redirect("/login")
//   }

//   return (
//     <p> {session?.data && pathName !== "/login" ? "hjgjhg" : ""}</p>
//   );
// }

// export default function SessionChecker() {
//   return (
//     <SessionProvider>
//       <SessionCheckerContent />
//     </SessionProvider>
//   );
// }
