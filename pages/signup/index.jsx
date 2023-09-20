import {useState, useEffect} from "react";

import {useRouter} from "next/router"; // Importing Next.js router
import {useAuth} from "@/context/auth";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const {error, setError, setUser, handleSignUp} = useAuth();

  useEffect(() => {
    const clearTimeout = setTimeout(() => {
      setError(false);
    }, 7000);
    return () => {
      clearTimeout;
    };
  }, [error]);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
    console.log(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      if (data.password === data.confirmPassword) {
        await handleSignUp(data);
        router.push("/");
      } else {
        setError("Passwords do not match");
        throw new Error("Passwords do not match");
      }
    } catch (err) {
      setError(err.message);
      console.log(err.message);
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
        <form onSubmit={handleSubmit}>
          <div class='bg-white shadow-xl p-10 flex flex-col gap-4 text-sm'>
            {error && (
              <span className='text-red-600 border rounded-md bg-red-100 p-2 r'>
                {error}
              </span>
            )}
            <div>
              <label
                class='text-gray-600 font-bold inline-block pb-2'
                for='firstName'
              >
                Firstname
              </label>
              <input
                class='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                type='text'
                name='firstName'
                value={values.firstName}
                required
                placeholder='******'
                onChange={handleInput}
              />
            </div>

            <div>
              <label
                class='text-gray-600 font-bold inline-block pb-2'
                for='password'
              >
                Lastname
              </label>
              <input
                class='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                type='text'
                name='lastName'
                value={values.lastName}
                required
                onChange={handleInput}
              />
            </div>

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
            <div>
              <label
                class='text-gray-600 font-bold inline-block pb-2'
                for='password'
              >
                Confirm Password
              </label>
              <input
                class='border border-gray-400 focus:outline-slate-400 rounded-md w-full shadow-sm px-5 py-2'
                type='password'
                name='confirmPassword'
                value={values.confirmPassword}
                required
                placeholder='******'
                onChange={handleInput}
              />
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

            <p className='flex items-center justify-center'>
              Already have an account?{" "}
              <span>
                <Link href='/' className='text-blue-600 font-medium'>
                  &nbsp; Sign in
                </Link>
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
