import { Input } from "@/components/ui/input"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock, FiMail } from "react-icons/fi"

import type { Body_login_login_access_token as AccessToken } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { PasswordInput } from "@/components/ui/password-input"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"
import Logo from "/assets/images/fastapi-logo.svg"
import { emailPattern, passwordRules } from "../utils"

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

function Login() {
  const { loginMutation, resetError } = useAuth()
  const form = useForm<AccessToken>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<AccessToken> = async (data) => {
    if (form.formState.isSubmitting) return

    resetError()

    try {
      await loginMutation.mutateAsync(data)
    } catch {
      // error is handled by useAuth hook
    }
  }

  return (
    <Form {...form}>
      <form
        className="container mx-auto px-4 h-screen max-w-sm flex flex-col items-center justify-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <img
          src={Logo}
          alt="FastAPI logo"
          className="h-auto max-w-[16rem] self-center"
        />
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: "Username is required",
            pattern: emailPattern,
          }}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <FiMail />
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    aria-label="Email"
                    type="email"
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={passwordRules()}
          render={({ field }) => (
            <PasswordInput
              icon={<FiLock />}
              placeholder="Password"
              aria-label="Password"
              {...field}
            />
          )}
        />
        <RouterLink
          to="/recover-password"
          className="text-primary hover:text-primary/80 text-sm"
        >
          Forgot Password?
        </RouterLink>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          Log In
        </Button>
        <p>
          Don't have an account?{" "}
          <RouterLink
            to="/signup"
            className="text-primary hover:text-primary/80"
          >
            Sign Up
          </RouterLink>
        </p>
      </form>
    </Form>
  )
}
