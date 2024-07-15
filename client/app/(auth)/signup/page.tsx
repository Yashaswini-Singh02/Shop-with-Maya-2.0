"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupFormSchema } from "@/utils/types/schema/signup-schema";
import axios from "axios";

const SignupForm: React.FC = () => {
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignupFormSchema>) => {
    console.log(values);
    try {
      const res = await axios.post("http://localhost:8080/api/users/", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("user", res.data.email);
      return res.data;
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
            SIGN UP
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
              <a href="/tryon">
                <Button
                  className="text-center mt-10 px-10 py-4 w-80 text-lg font-bold  bg-white border-pink border tracking-widest text-metal "
                  type="submit"
                >
                  SUBMIT
                </Button>
              </a>
              <p className="text-md font-medium tracking-wide">
                Already have an account?{" "}
                <Link href={"/login"}>
                  <span className="underline underline-offset-2">Log In</span>
                </Link>
              </p>
              ;
            </div>
          </form>
        </div>
      </Form>
    </section>
  );
};

export default SignupForm;
