import { useToast } from "@/hooks/use-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"
import { type UserCreate, UsersService } from "../../client"

const AddUser = () => {
  const { register, handleSubmit, reset } = useForm<UserCreate>()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (data: UserCreate) =>
      UsersService.createUser({
        requestBody: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      reset()
      toast({
        title: "Success",
        description: "User added successfully",
      })
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add user",
        variant: "destructive",
      })
    },
  })

  const onSubmit: SubmitHandler<UserCreate> = (data) => {
    mutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        {...register("password")}
        type="password"
        placeholder="Password"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <input
        {...register("full_name")}
        placeholder="Full Name"
        className="w-full px-3 py-2 border rounded"
      />
      <div className="flex items-center gap-2">
        <input
          {...register("is_active")}
          type="checkbox"
          className="h-4 w-4"
          id="is_active"
        />
        <label htmlFor="is_active">Active</label>
      </div>
      <div className="flex items-center gap-2">
        <input
          {...register("is_superuser")}
          type="checkbox"
          className="h-4 w-4"
          id="is_superuser"
        />
        <label htmlFor="is_superuser">Superuser</label>
      </div>
      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {mutation.isPending ? "Adding..." : "Add User"}
      </button>
    </form>
  )
}

export default AddUser
