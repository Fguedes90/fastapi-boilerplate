import { Button } from "@shadcn/ui"
import { Link } from "@tanstack/react-router"

const NotFound = () => {
  return (
    <>
      <div
        className="flex"
        height="100vh"
        align="center"
        justify="center"
        flexDir="column"
        data-testid="not-found"
        p={4}
      >
        <div className="flex" zIndex={1}>
          <div
            className="flex"
            flexDir="column"
            align="center"
            justify="center"
            p={4}
          >
            <p
              fontSize={{ base: "6xl", md: "8xl" }}
              fontWeight="bold"
              lineHeight="1"
            >
              404
            </p>
            <p fontSize="2xl" fontWeight="bold">
              Oops!
            </p>
          </div>
        </div>

        <p fontSize="lg" zIndex={1}>
          The page you are looking for was not found.
        </p>
        <Center zIndex={1}>
          <Link to="/">
            <Button colorScheme="teal" alignSelf="center">
              Go Back
            </Button>
          </Link>
        </Center>
      </div>
    </>
  )
}

export default NotFound
