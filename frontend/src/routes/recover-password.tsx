import { useMutation } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiMail } from "react-icons/fi"

import { type ApiError, LoginService } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { isLoggedIn } from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { emailPattern, handleError } from "@/utils"

interface FormData {
  email: string
}

export const Route = createFileRoute("/recover-password")({
  component: RecoverPassword,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function RecoverPassword() {
  const form = useForm<FormData>()
  const { showSuccessToast } = useCustomToast()

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      LoginService.recoverPassword({
        email: data.email,
      }),
    onSuccess: () => {
      showSuccessToast("Password recovery email sent successfully.")
      form.reset()
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <div className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Password Recovery</h1>
        <p className="text-center text-muted-foreground">
          A password recovery email will be sent to the registered account.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Email"
                        type="email"
                        className="pl-10"
                        {...field}
                        {...form.register("email", {
                          required: "Email is required",
                          pattern: emailPattern,
                        })}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Sending..." : "Continue"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
