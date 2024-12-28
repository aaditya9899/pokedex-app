'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function NavBar() {
  const { data: session, status } = useSession()

  return (
    <nav className="bg-red-600 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Pokédex Lite</h1>
        
        <div className="flex items-center gap-4">
          {status === 'authenticated' ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src={session.user.image || '/default-avatar.png'}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-white">{session.user.name || 'User'}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/guest-avatar.png"
                  alt="Guest"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-white">Guest</span>
              </div>
              <button
                onClick={() => signIn('github')}
                className="px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Sign In with GitHub
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
