import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"

const Login : NextPage = () => {

const handleLogin = (e: any) => {
  console.log(formik.values)
}

const formik = useFormik({
  initialValues: {
    fullName: "",
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


  return (
    <div className="container-fluid min-vh-90 overflow-hidden">
      <div className="row mt-3 h-100 justify-content-center g-sm-2">
        <div className="col d-flex flex-column min-vh-50 align-items-center justify-content-center col-sm-8 col-md-6 col-lg-5   p-2 ">
          <h4>Login</h4>

          <div>
            <form onSubmit={formik.handleSubmit} className="d-flex flex-column">
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

              <button type="submit" className="btn mt-2 btn-primary">
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
  )
}

export default Login