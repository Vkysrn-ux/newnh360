import type { Metadata } from """"next""""
import { cookies } from """"next/headers""""
import { verifyToken } from """"@/lib/auth""""
import Link from """"next/link""""

export const metadata: Metadata = {
  title: """"NH360"""",
  description: """"NH360 FASTag"""",
}

export default function HomePage() {
  const token = cookies().get(""""nh360_auth"""")?.value
  const isAuth = token ? Boolean(verifyToken(token)) : false
  return (
    <main className=""""min-h-screen bg-black text-gray-200"""">
      <div className=""""container mx-auto px-4 py-16"""">
        <h1 className=""""text-3xl font-extrabold text-white mb-4"""">NH360 FASTag</h1>
        <p className=""""text-gray-400 mb-8"""">Buy FASTag, recharge, and get support across India.</p>

        {!isAuth ? (
          <div className=""""space-y-3"""">
            <p className=""""text-sm text-gray-400"""">Please login to see Buy/Recharge and your account.</p>
            <div className=""""flex gap-3"""">
              <Link href=""""/login"""" className=""""px-4 py-2 rounded-md bg-orange-600 text-white"""">Login</Link>
              <Link href=""""/register"""" className=""""px-4 py-2 rounded-md border border-orange-800 text-orange-300"""">Register</Link>
            </div>
          </div>
        ) : (
          <div className=""""space-y-6"""">
            <div className=""""grid md:grid-cols-3 gap-4"""">
              <Link href=""""/buy"""" className=""""rounded-xl border border-orange-900 bg-neutral-900 p-6 text-white"""">Buy FASTag</Link>
              <Link href=""""/recharge"""" className=""""rounded-xl border border-orange-900 bg-neutral-900 p-6 text-white"""">Recharge FASTag</Link>
              <Link href=""""/account"""" className=""""rounded-xl border border-orange-900 bg-neutral-900 p-6 text-white"""">My Account</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
