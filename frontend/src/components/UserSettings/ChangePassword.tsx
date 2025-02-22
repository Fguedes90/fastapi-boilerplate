import { useMutation } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock } from "react-icons/fi"

import { type ApiError, type UpdatePassword, UsersService } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { useToast } from "@/hooks/use-toast"
import { confirmPasswordRules, handleError, passwordRules } from "@/utils"

type UpdatePasswordForm = UpdatePassword & {
  confirm_password: string
}

const ChangePassword = () => {
  const { toast } = useToast()
  const form = useForm<UpdatePasswordForm>({
    mode: "onBlur",
    criteriaMode: "all",
  })

  const {
    handleSubmit,
    reset,
    getValues,
    formState: { isValid, isSubmitting },
  } = form

  const mutation = useMutation({
    mutationFn: (data: UpdatePassword) =>
      UsersService.updatePasswordMe({ requestBody: data }),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Password updated successfully",
      })
      reset()
    },
    onError: (err: ApiError) => {
      handleError(err)
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      })
    },
  })

  const onSubmit: SubmitHandler<UpdatePasswordForm> = async (data) => {
    const { confirm_password, ...updateData } = data
    mutation.mutate(updateData)
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full md:w-[300px] space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="current_password"
              rules={passwordRules()}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      icon={<FiLock className="h-4 w-4" />}
                      placeholder="Current Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="new_password"
              rules={passwordRules()}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      icon={<FiLock className="h-4 w-4" />}
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              rules={confirmPasswordRules(getValues)}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      icon={<FiLock className="h-4 w-4" />}
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ChangePassword
