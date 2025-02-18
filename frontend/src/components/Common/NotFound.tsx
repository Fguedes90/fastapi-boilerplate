import { Button } from "@/components/ui/button"
import { Link } from "@tanstack/react-router"

const NotFound = () => {
  return (
    <>
      <div
        className="flex h-screen items-center justify-center flex-col p-4"
        data-testid="not-found"
      >
        <div className="flex z-10">
          <div className="flex flex-col items-center justify-center p-4">
            <p className="text-6xl md:text-8xl font-bold leading-none">404</p>
            <p className="text-2xl font-bold">Oops!</p>
          </div>
        </div>

        <p className="text-lg z-10">
          The page you are looking for was not found.
        </p>
        <div className="flex justify-center z-10">
          <Link to="/">
            <Button variant="default" className="self-center">
              Go Back
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
