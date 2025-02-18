import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Link } from "@tanstack/react-router"
import UserMenu from "./UserMenu"

function Navbar() {
  const isMobile = useIsMobile()

  return (
    <div
      className={cn(
        "flex justify-between items-center sticky top-0 w-full p-4 bg-muted/50 backdrop-blur-sm",
        isMobile ? "hidden" : "flex",
      )}
    >
      <Link to="/">
        <img
          src="/assets/images/fastapi-logo.svg"
          alt="Logo"
          className="w-[180px] max-w-xs h-auto"
        />
      </Link>
      <div className="flex gap-2">
        <UserMenu />
      </div>
    </div>
  )
}

export default Navbar
