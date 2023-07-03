import { useRouter } from 'next/router'

export default function ProductName () {
  const router = useRouter()
  const name = router.query.name
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-2 bg-pastel-pink-200">
      <div className="text-white">{name}</div>
    </main>
  )
}