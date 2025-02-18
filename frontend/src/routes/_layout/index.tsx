import { createFileRoute } from "@tanstack/react-router"

import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <>
      <div className="container mx-auto px-4 w-full">
        <div className="m-4">
          <p className="text-2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </p>
          <p>Welcome back, nice to see you again!</p>
        </div>
      </div>
    </>
  )
}
