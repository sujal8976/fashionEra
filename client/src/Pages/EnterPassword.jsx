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
import { Input } from "@/components/ui/input";
import { getUser, useLoginMutation } from "@/services/userApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userExist, userNotExist } from "@/features/userSlice";
import toast from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { isUserConfirming } from "@/features/confirmUserSlice";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 character long",
  }),
});

export default function EnterPassword() {
  const { user, loading } = useSelector((state) => state.userReducer);
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await login({
        email: user.email,
        password: values.password,
      });

      if ("data" in res) {
        const data = await getUser(res.data.userId);
        dispatch(userExist(data));
        localStorage.setItem("currentUser", JSON.stringify(data));
        toast.success(res.data.message);
      } else {
        const error = res.error;
        const message = error.data.message;
        dispatch(userNotExist());
        toast.error(message);
      }

      form.reset();
      dispatch(isUserConfirming(false));
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      await signOut(auth);
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <div className="flex justify-center items-center">
      <div className="w-[1440px] flex flex-col">
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
                      className="w-72"
                      type="password"
                      disabled={isSubmitting}
                      placeholder="Enter your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
