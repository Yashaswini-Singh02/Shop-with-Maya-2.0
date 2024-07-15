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
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",

      password: "",
    },
  });

  const { push } = useRouter();

  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("user", res.data.email);
      push("/tryon");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <section className="relative h-screen flex flex-col justify-center items-center">
      <span className="absolute w-full h-full transition-all duration-700 bg-orange/40 rounded-full blur-3xl"></span>
      <span className="absolute w-full h-full mt-56 bg-red/40 rounded-full blur-3xl"></span>
      <span className="absolute w-full h-20 ml-72 mb-72 bg-pink/60 rounded-full blur-3xl"></span>

      <Form {...form}>
        <div className="relative w-1/3 px-10 py-10 backdrop-filter rounded-xl backdrop-blur-xl bg-white/80">
          <h1 className="text-2xl font-bold text-metal text-center leading-loose tracking-widest">
            LOG IN
          </h1>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" text-metal space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium tracking-wide">
                    EMAIL
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="text-sm font-medium"
                      placeholder="mayasingh@gmail.com"
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
            <div className="flex flex-col justify-center items-center text-center gap-y-2">
              <Button
                className="text-center mt-10 px-10 py-4 w-80 text-lg font-bold  bg-white border-pink border tracking-widest text-metal "
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
