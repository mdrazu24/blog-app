import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from 'axios'
import { useRouter } from "next/router"
import { useQuery } from "react-query"
import { ErrorInterface } from "../utils/ErrorInterface"
import { useAppDispatch } from "../store/hooks"
import { register } from "../store/userSlice"



const Signup: NextPage = () => {
  const router = useRouter()
const dispatch = useAppDispatch()


  const querySignup = async () => {
    const { data } = await axios.post("/api/v1/auth/create-user", {
      ...formik.values,
    })
        dispatch(register({ user: data.user.userData }))

    localStorage.setItem("user", JSON.stringify(data.user.userData))

    return data
  }

     const handeSignup = (e : any) => {
        signupInfo.refetch()
     }

     const signupInfo = useQuery("login", querySignup, {
       enabled: false,
       refetchOnWindowFocus: false,
       retry: false,
     })

     const errorInfo = signupInfo.error as ErrorInterface

     if (signupInfo.isSuccess) router.push("/")


  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(4, "Name must be at least 4 characters")
        .max(25, "Must be 15 characters or less")
        .required("Full name is required"),

      email: Yup.string().email("Invalid email address").required("Email is required"),
      password : Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
    }),
    onSubmit: handeSignup,
  })

 

  return (
    <div className="container-fluid min-vh-90 overflow-hidden">
      <div className="row mt-3 h-100 justify-content-center g-sm-2">
        <div className="col d-flex flex-column min-vh-50 align-items-center justify-content-center col-sm-8 col-md-6 col-lg-5   p-2 ">
          <h4>Signup</h4>

          {signupInfo.isError && (
            <div className="alert alert-danger px-1 py-1 " role="alert">
              {errorInfo.response.data.errors[0].message}
            </div>
          )}

          {signupInfo.isSuccess && (
            <div className="alert alert-success px-1 py-1 " role="alert">
              Redirecting to the main page....
            </div>
          )}

          <div>
            <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
              <label htmlFor="fullName" className="form-label">
                Full Name :{" "}
              </label>
              <input
                type="text"
                id="fullName"
                className="form-control"
                name="fullName"
                placeholder="Enter your full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="text-danger">{formik.errors.fullName}</div>
              ) : null}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger">{formik.errors.password}</div>
              ) : null}

              <button
                disabled={signupInfo.isLoading}
                type="submit"
                className="btn mt-2 btn-primary"
              >
                <span
                  className={`${
                    signupInfo.isLoading
                      ? "spinner-border spinner-border-sm"
                      : ""
                  }`}
                  role="nothing"
                  aria-hidden="true"
                ></span>
                Signup
              </button>
            </form>

            <div className="mt-2">
              <Link href="/login">Already have an account?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup



export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // console.log(req.cookies.session)
  if (req.cookies.session) {
    return {
      redirect: {
        destination: "/",
      },
      props: {  },
    }
  }
  return {
    props: {  },
  }
}