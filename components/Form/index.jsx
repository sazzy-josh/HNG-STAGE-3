import {useState, useContext, useEffect} from "react";
import GoogleButton from "react-google-button";
import {useRouter} from "next/router"; // Importing Next.js router
import {AuthContext, useAuth} from "@/context/auth";
import Link from "next/link";

const Login = () => {
  const {handleSignIn, GoogleLogin, error, setError, user, setUser} = useAuth();

  useEffect(() => {
    const clearTimeout = setTimeout(() => {
      setError(false);
    }, 7000);
    return () => {
      clearTimeout;
    };
  }, [error]);

  const router = useRouter();

  const [values, setValues] = useState({
    email: "user@example.com",
    password: "1Password",
  });

  const handleInput = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (values.email == "user@example.com" && values.password == "1Password") {
      const data = {email: values.email, password: values.password};
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      router.replace("/dashboard");
      return;
    }
    try {
      await handleSignIn(values);
      localStorage.setItem("user", JSON.stringify(user));
      console.log(values.email, values.password);
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  const googleAuth = async (e) => {
    try {
      const res = await GoogleLogin();
      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div class='bg-[#F9FAFB] h-screen w-screen flex items-center'>
      <div class='h-max mx-auto flex flex-col items-center'>
        <img
          class='h-[100px] w-[100px] mb-5 rounded-full  object-cover'
          src='/images/art.jpg'
          alt=''
        />
        <h1 class='text-xl font-bold text-center pb-10'>
          Sign in to your account
        </h1>
        <form onSubmit={handleLogin}>
          <div class='bg-white shadow-xl p-10 flex flex-col gap-4 text-sm'>
            {error && (
              <span className='text-red-600 border rounded-md bg-red-100 p-2 r'>
                {error}
              </span>
            )}
            <div>
              <label
                class='text-gray-600 font-bold inline-block pb-2'
                for='email'
              >
                Email
              </label>
              <input
                class='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                type='email'
                name='email'
                value={values.email}
                required
                placeholder='mehedi@jaman.com'
                onChange={handleInput}
              />
            </div>
            <div>
              <label
                class='text-gray-600 font-bold inline-block pb-2'
                for='password'
              >
                Password
              </label>
              <input
                class='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                type='password'
                name='password'
                value={values.password}
                required
                placeholder='******'
                onChange={handleInput}
              />
            </div>
            <div class='flex justify-center items-center'>
              <div class='w-1/2 flex items-center'>
                <input type='checkbox' name='remeberMe' className='mr-2' />
                <label for='remeberMe'>Remember me</label>
              </div>
              <div class='w-1/2'>
                <a class='font-bold text-blue-600' href=''>
                  Forgot password ?
                </a>
              </div>
            </div>
            <div>
              <input
                class='bg-[#4F46E5] w-full py-2 rounded-md text-white font-bold cursor-pointer hover:bg-[#181196]'
                type='submit'
              />
            </div>
            <div>
              <p class='text-center'>Or continue with</p>
            </div>
            <div class='flex justify-center'>
              <GoogleButton
                className='rounded-full'
                onClick={googleAuth}
                type='dark'
              ></GoogleButton>
            </div>
            <p className='flex items-center justify-center'>
              Don't have an account?{" "}
              <span>
                <Link href='/signup' className='text-blue-600 font-medium'>
                  &nbsp; Sign up
                </Link>
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
