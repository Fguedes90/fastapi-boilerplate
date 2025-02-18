import { createFileRoute } from "@tanstack/react-router"

import useAuth from "@/hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: Dashboard,
})

function Dashboard() {
  const { user: currentUser } = useAuth()

  return (
    <>
      <div className="container mx-auto px-4" maxW="full">
        <div m={4}>
          <p fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </p>
          <p>Welcome back, nice to see you again!</p>
        </div>
      </div>
    </>
  )
}
