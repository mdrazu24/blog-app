import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useQuery } from "react-query"
import { ErrorInterface } from "../utils/ErrorInterface"
import { useRouter } from "next/router"
import { useAppDispatch } from "../store/hooks"
import { login } from "../store/userSlice"

const Login: NextPage = () => {
  const dispatch = useAppDispatch()

  const router = useRouter()

  const queryLogin = async () => {
    const { data } = await axios.post("/api/v1/auth/login", {
      ...formik.values,
    })
    dispatch(login({ user: data.user.userData }))

    localStorage.setItem("user", JSON.stringify(data.user.userData))

    return data
  }

  const handleLogin = async () => {
    loginInfo.refetch()
  }

  const loginInfo = useQuery("login", queryLogin, {
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  })

  const errorInfo = loginInfo.error as ErrorInterface

  if (loginInfo.isSuccess) router.push("/")

  // if (loginInfo.error) console.log(loginInfo.error)

    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
      }),
      onSubmit: handleLogin,
    })

  if (loginInfo.isSuccess) console.log("succesfully loggred in")

  return (
    <>
      <div className="container-fluid min-vh-90 overflow-hidden">
        <div className="row mt-3 h-100 justify-content-center g-sm-2">
          <div className="col d-flex flex-column min-vh-50 align-items-center justify-content-center col-sm-8 col-md-6 col-lg-5   p-2 ">
            <h4>Login</h4>

            {loginInfo.isError && (
              <div className="alert alert-danger px-1 py-1 " role="alert">
                {errorInfo.response.data.errors[0].message}
              </div>
            )}

            {loginInfo.isSuccess && (
              <div className="alert alert-success px-1 py-1 " role="alert">
                Redirecting to the main page....
              </div>
            )}

            <div>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column"
              >
                <label htmlFor="email" className="form-label">
                  Email :{" "}
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
                <label htmlFor="password" className="form-label">
                  Password :{" "}
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}

                <button
                  type="submit"
                  disabled={loginInfo.isLoading}
                  className="btn mt-2 btn-primary"
                >
                  <span
                    className={`${
                      loginInfo.isLoading
                        ? "spinner-border spinner-border-sm"
                        : ""
                    }`}
                    role="nothing"
                    aria-hidden="true"
                  ></span>
                  Login
                </button>
              </form>
              <div className="mt-2">
                <Link href="/signup">Don&apos;t have an account?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // console.log(req.cookies.session)
  if (req.cookies.session) {
    return {
      redirect: {
        destination: "/",
      },
      props: { isLogin: true },
    }
  }
  return {
    props: { isLogin: false },
  }
}
