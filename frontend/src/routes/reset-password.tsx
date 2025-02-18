import { useMutation } from "@tanstack/react-query"
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock } from "react-icons/fi"

import { type ApiError, LoginService, type NewPassword } from "@/client"
import { Button } from "@/components/ui/button"
import { Form, FormField } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { isLoggedIn } from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { confirmPasswordRules, handleError, passwordRules } from "@/utils"

interface NewPasswordForm extends NewPassword {
  confirm_password: string
}

export const Route = createFileRoute("/reset-password")({
  component: ResetPassword,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function ResetPassword() {
  const form = useForm<NewPasswordForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  })
  const { showSuccessToast } = useCustomToast()
  const navigate = useNavigate()

  const resetPassword = async (data: NewPassword) => {
    const token = new URLSearchParams(window.location.search).get("token")
    if (!token) return
    await LoginService.resetPassword({
      requestBody: { new_password: data.new_password, token: token },
    })
  }

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      showSuccessToast("Password updated successfully.")
      form.reset()
      navigate({ to: "/login" })
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
  })

  const onSubmit: SubmitHandler<NewPasswordForm> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <div className="container mx-auto px-4 max-w-sm flex flex-col gap-4 justify-center items-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      <p className="text-center mb-4">
        Please enter your new password and confirm it to reset your password.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="new_password"
            rules={passwordRules()}
            render={({ field }) => (
              <PasswordInput
                icon={<FiLock />}
                placeholder="New Password"
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirm_password"
            rules={confirmPasswordRules(form.getValues)}
            render={({ field }) => (
              <PasswordInput
                icon={<FiLock />}
                placeholder="Confirm Password"
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Reset Password
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ResetPassword
