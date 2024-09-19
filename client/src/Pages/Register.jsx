import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { getUser, useRegisterMutation } from "@/services/userApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "@/features/userSlice";

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First name should have minimum 3 letters." })
      .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
    lastName: z
      .string()
      .min(3, { message: "Last name should have minimum 3 letters." })
      .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)),
    phone: z.string().regex(/^\d{10}$/, {
      message: "Phone number should be exactly 10 digits.",
    }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password should have minimum 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password should have minimum 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function Register() {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");

  const [register] = useRegisterMutation();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      if (!gender) return setGenderError("Add Gender");

      const res = await register({
        name: values.firstName + " " + values.lastName,
        email: values.email,
        gender: gender,
        phone: values.phone,
        password: values.password,
      });

      if ("data" in res) {
        const data = await getUser(res.data.userId);
        dispatch(
          userExist({
            userId: data.userId,
            name: data.name,
            email: data.email,
            gender: data.gender,
            phone: data.phone,
            isAdmin: data.isAdmin,
            profileUrl: data?.image || null,
            googleId: data?.googleId || null,
          })
        );
        localStorage.setItem("currentUser", JSON.stringify(data));
        toast.success(res.data.message);
      } else {
        const error = res.error;
        const message = error.data.message;
        dispatch(userNotExist());
        toast.error(message);
      }

      form.reset();
      setGenderError("");
      setGender("");
    } catch (error) {
      toast.error("Sign In Failed");
    }
  };

  const { isSubmitting, isValid } = form.formState;
  return (
    <>
      <div className="registerPage flex justify-center h-screen items-center">
        <div className="registerPageContainer bg-white w-[1400px] h-[90vh] rounded-2xl flex shadow-2xl shadow-black">
          <div className="leftSection flex-[.7] flex justify-center">
            <div className="w-[85%] h-full flex flex-col gap-3 items-center">
              <h1 className="text-4xl font-bold my-12">FashionEra</h1>
              <div className="self-start">
                <p className="font-medium text-2xl">Register</p>
                <h1 className="font-normal text-md">
                  Lorem ipsum dolor sit amet.
                </h1>
              </div>
              <div className="registerFormSection w-full mt-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="my-4 flex flex-col gap-12 items-center w-full"
                  >
                    <div className="grid grid-cols-2 gap-5 w-full">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                className="w-full"
                                disabled={isSubmitting}
                                placeholder="Enter First Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                className="w-full"
                                disabled={isSubmitting}
                                placeholder="Enter Last Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                inputMode="numeric"
                                className="w-full"
                                type="number"
                                disabled={isSubmitting}
                                placeholder="Enter Phone Number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                className="w-full"
                                type="email"
                                disabled={isSubmitting}
                                placeholder="Enter Email"
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                className="w-full"
                                type="password"
                                disabled={isSubmitting}
                                placeholder="Enter Password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                className="w-full"
                                type="password"
                                disabled={isSubmitting}
                                placeholder="Enter Confirm Password"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex flex-col">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            {gender
                              ? gender.charAt(0).toUpperCase() + gender.slice(1)
                              : "Select Gender"}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setGender("male")}>
                            Male
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setGender("female")}>
                            female
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      {genderError ? (
                        <div className="mt-2 self-center text-sm font-medium text-red-500">
                          {genderError}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <Button
                      className=""
                      disabled={!isValid || isSubmitting}
                      type="submit"
                    >
                      Register
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
          <div className="rightSection flex-[.3] w-full">
            <div className="h-full">
              <img
                className="object-cover h-full w-full rounded-r-xl"
                src="https://img.freepik.com/free-photo/portrait-handsome-fashion-stylish-hipster-businessman-model-dressed-elegant-blue-suit-sunglasses-posing-gray_158538-4492.jpg?t=st=1719851801~exp=1719855401~hmac=b80b687d828e08803c8c1e992fa89432b20ebd92917f4620ce4e5bb37918586d&w=740"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
