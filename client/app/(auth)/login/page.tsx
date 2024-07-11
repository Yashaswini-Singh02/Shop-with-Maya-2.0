"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginFormSchema } from "@/utils/types/schema/login-schema";

const LoginForm: React.FC = () => {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "",

      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    console.log(values);
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center">
      <span className="absolute w-80 h-80 mb-72 mr-80 transition-all duration-700 bg-orange rounded-full blur-3xl ease"></span>

      <span className="absolute  w-80 h-80  mt-56 bg-red rounded-full blur-3xl"></span>
      <span className="absolute w-80 h-80 ml-72 mb-72 bg-pink rounded-full blur-3xl"></span>

      <Form {...form}>
        <div className="relative w-1/3 px-2">
          <h1 className="text-2xl font-bold text-metal text-center leading-loose tracking-widest">
            LOG IN
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-metal mt-10"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium tracking-wide">
                    USERNAME
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm font-medium"
                      placeholder="Maya Singh"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium tracking-wide">
                    PASSWORD
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex flex-col justify-center items-center text-center gap-y-4">
              <Button
                className="text-center mt-6 px-10 py-4 w-80 text-xl font-bold bg-white/90 tracking-widest text-metal hover:bg-white/5 hover:text-white hover:shadow-lg"
                type="submit"
              >
                SUBMIT
              </Button>
              <p className="text-md font-medium tracking-wide">
                Don&apos;t have an account?
                <Link href={"/signup"}>
                  <span className="underline underline-offset-2"> Sign Up</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Form>
    </section>
  );
};

export default LoginForm;
