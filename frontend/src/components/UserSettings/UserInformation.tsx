import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  type ApiError,
  type UserPublic,
  type UserUpdateMe,
  UsersService,
} from "@/client"
import { Field } from "@/components/ui/field"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { cn } from "@/lib/utils"
import { emailPattern, handleError } from "@/utils"

const UserInformation = () => {
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const [editMode, setEditMode] = useState(false)
  const { user: currentUser } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<UserUpdateMe>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      full_name: currentUser?.full_name,
      email: currentUser?.email,
    },
  })

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }

  const mutation = useMutation({
    mutationFn: (data: UserUpdateMe) =>
      UsersService.updateUserMe({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("User updated successfully.")
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })

  const onSubmit: SubmitHandler<UserUpdateMe> = async (data) => {
    mutation.mutate(data)
  }

  const onCancel = () => {
    reset()
    toggleEditMode()
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">User Information</h1>
      <form className="w-full md:w-1/2" onSubmit={handleSubmit(onSubmit)}>
        <Field label="Full name">
          {editMode ? (
            <Input
              {...register("full_name", { maxLength: 30 })}
              type="text"
              className="w-auto"
            />
          ) : (
            <p
              className={cn(
                "text-md truncate max-w-[250px]",
                errors.full_name ? "text-destructive" : "",
              )}
            >
              {currentUser?.full_name || "N/A"}
            </p>
          )}
        </Field>
        <Field
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message}
        >
          {editMode ? (
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: emailPattern,
              })}
              type="email"
              className="w-auto"
            />
          ) : (
            <p
              className={cn(
                "text-md truncate max-w-[250px]",
                errors.email ? "text-destructive" : "",
              )}
            >
              {currentUser?.email}
            </p>
          )}
        </Field>
        <div className="flex gap-3 mt-4">
          <Button
            onClick={toggleEditMode}
            type={editMode ? "button" : "submit"}
            disabled={editMode ? !isDirty || !getValues("email") : false}
          >
            {editMode ? "Save" : "Edit"}
          </Button>
          {editMode && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default UserInformation
