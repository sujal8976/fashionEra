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
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase/config.js";
import { useLoginMutation, getUser } from "@/services/userApi";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "@/features/userSlice";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export default function Login() {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const res = await login(values);

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
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };

  const { isSubmitting, isValid } = form.formState;

  const googleAuthHandle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      toast.error("Authentication Failed");
    }
  };

  return (
    <>
      <div className="loginPage flex justify-center h-screen items-center">
        <div className="loginPageContainer w-[1400px] h-[90vh] rounded-2xl flex shadow-2xl shadow-black">
          <div className="rightSection h-full flex-[0.6] rounded-l-2xl">
            <img
              className=" object-cover h-full w-full rounded-l-2xl"
              src="/images/login-model.jpg"
              alt=""
            />
          </div>
          <div className="leftSection bg-white h-full flex justify-center flex-[0.4] rounded-r-2xl">
            <div className=" w-[500px] flex flex-col items-center mt-10">
              <h1 className="text-4xl font-bold py-6">FashionEra</h1>
              <div className="loginFormSection mt-20">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 my-4 flex flex-col items-center w-full"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              className="w-72"
                              type="email"
                              disabled={isSubmitting}
                              placeholder="Enter your Email"
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
              <div className="or flex gap-2 items-center my-2 w-full justify-center">
                <hr className="w-[33%] border-slate-400 border-[.3px] border-solid" />
                OR
                <hr className="w-[33%] border-slate-400 border-[.3px] border-solid" />
              </div>
              <Button
                onClick={googleAuthHandle}
                variant="outline"
                className="my-4 h-max-content border cursor-pointer flex items-center gap-2 text-lg p-3 font-normal"
              >
                <img
                  src="/images/google.png"
                  className="size-7"
                  alt="google_icon"
                />
                Continue with Google
              </Button>
              <Link to="/register">
                <p className="font-normal text-lg mt-3">
                  Don't have an account yet? &nbsp;
                  <span className="font-semibold text-xl hover:underline decoration-1">
                    Sign Up
                  </span>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
