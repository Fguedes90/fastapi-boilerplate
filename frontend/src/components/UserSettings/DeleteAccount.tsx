import DeleteConfirmation from "./DeleteConfirmation"

const DeleteAccount = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Delete Account</h1>
      <p className="text-muted-foreground mb-4">
        Permanently delete your data and everything associated with your
        account.
      </p>
      <DeleteConfirmation />
    </div>
  )
}

export default DeleteAccount
