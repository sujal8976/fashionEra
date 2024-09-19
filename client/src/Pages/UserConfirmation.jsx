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
import { useSelector } from "react-redux";
import { userExist, userNotExist } from "@/features/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { isUserConfirming } from "@/features/confirmUserSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config.js";

const formSchema = z
  .object({
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

export default function UserConfirmation() {
  const { user, loading } = useSelector((state) => state.userReducer);
  const [register] = useRegisterMutation();
  const dispatch = useDispatch();

  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    try {
      if (!gender) return setGenderError("Add Gender");

      const res = await register({
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: gender,
        password: values.password,
        googleId: user.googleId,
        image: user.profileUrl,
      });

      if ("data" in res) {
        const data = await getUser(res.data.userId);

        dispatch(
          userExist({
            ...user,
            isAdmin: data.isAdmin,
            gender: data.gender,
            _id: data._id,
          })
        );
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            ...user,
            isAdmin: data.isAdmin,
            gender: data.gender,
            _id: data._id,
          })
        );
        toast.success(res.data.message);
      } else {
        const error = res.error;
        const message = error.data.message;
        dispatch(userNotExist());
        toast.error(message);
        await signOut(auth);
      }

      dispatch(isUserConfirming(false));
      form.reset();
      setGender("");
      setGenderError("");
    } catch (error) {
      toast.error("Sign In Failed");
      await signOut(auth);
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="flex flex-col">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      placeholder="Enter Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col mt-4">
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
                    Female
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {genderError && (
                <div className="mt-2 self-center text-sm font-medium text-red-500">
                  {genderError}
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="mt-4"
              disabled={!isValid || isSubmitting}
            >
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
