import { Input } from "@/components/ui/input"
import {
  Link as RouterLink,
  createFileRoute,
  redirect,
} from "@tanstack/react-router"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FiLock, FiUser } from "react-icons/fi"

import type { UserRegister } from "@/client"
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
import { confirmPasswordRules, emailPattern, passwordRules } from "@/utils"
import Logo from "/assets/images/fastapi-logo.svg"

export const Route = createFileRoute("/signup")({
  component: SignUp,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/",
      })
    }
  },
})

interface UserRegisterForm extends UserRegister {
  confirm_password: string
}

function SignUp() {
  const { signUpMutation } = useAuth()
  const form = useForm<UserRegisterForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      email: "",
      full_name: "",
      password: "",
      confirm_password: "",
    },
  })

  const onSubmit: SubmitHandler<UserRegisterForm> = (data) => {
    signUpMutation.mutate(data)
  }

  return (
    <div className="flex flex-col md:flex-row justify-center h-screen">
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
            name="full_name"
            rules={{
              required: "Full Name is required",
              minLength: {
                value: 3,
                message: "Full Name must be at least 3 characters",
              },
            }}
            render={({ field: { value, ...fieldProps } }) => (
              <FormItem>
                <FormControl>
                  <InputGroup>
                    <InputGroupAddon>
                      <FiUser />
                    </InputGroupAddon>
                    <Input
                      placeholder="Full Name"
                      type="text"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={value ?? ""}
                      {...fieldProps}
                    />
                  </InputGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: emailPattern,
            }}
            render={({ field: { value, ...fieldProps } }) => (
              <FormItem>
                <FormControl>
                  <InputGroup>
                    <InputGroupAddon>
                      <FiUser />
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={value ?? ""}
                      {...fieldProps}
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
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Sign Up
          </Button>
          <p>
            Already have an account?{" "}
            <RouterLink
              to="/login"
              className="text-primary hover:text-primary/80"
            >
              Log In
            </RouterLink>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default SignUp
