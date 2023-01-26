import { gql } from "@apollo/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { UserRole, useCreateUserMutation } from "../generated/graphql";

gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;

interface IForm {
  email: string;
  password: string;
  passwordConfirm: string;
  role: UserRole;
}

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setError,
  } = useForm<IForm>();
  const [createUserError, setCreateUserError] = useState("");
  const navigate = useNavigate();

  const [createUserMutation, { loading, error: graphqlError }] =
    useCreateUserMutation({
      onCompleted: ({ createUser: { ok, error } }) => {
        if (ok) navigate("/login");
        if (error) setCreateUserError(error);
      },
    });

  const onValid: SubmitHandler<IForm> = ({
    email,
    password,
    passwordConfirm,
    role,
  }) => {
    if (password === passwordConfirm) {
      if (!loading)
        createUserMutation({ variables: { input: { email, password, role } } });
    } else {
      setError("passwordConfirm", { message: "Password not matching" });
    }
  };

  return (
    <div>
      <Header />
      <div className="py-16 flex flex-col items-center">
        <h1 className="text-lg font-medium">Sign up</h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="mt-4 flex flex-col items-center gap-3"
        >
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Invalid email format",
              },
            })}
            type="email"
            placeholder="email"
            className=" input"
          />
          {formErrors?.email && (
            <span className=" error">{formErrors.email.message}</span>
          )}
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="password"
            className=" input"
          />
          {formErrors?.password && (
            <span className=" error">{formErrors.password.message}</span>
          )}
          <input
            {...register("passwordConfirm", {
              required: "Password Confirm is required",
            })}
            type="password"
            placeholder="password confirm"
            className=" input"
          />
          {formErrors?.passwordConfirm && (
            <span className=" error">{formErrors.passwordConfirm.message}</span>
          )}
          <select
            {...register("role", { required: "Role is required" })}
            className="input outline-none px-2"
          >
            {formErrors?.role && (
              <span className=" ">{formErrors.role.message}</span>
            )}
            <option value={UserRole.Customer}>{UserRole.Customer}</option>
            <option value={UserRole.Owner}>{UserRole.Owner}</option>
            <option value={UserRole.Driver}>{UserRole.Driver}</option>
          </select>
          <button onClick={handleSubmit(onValid)} className="button">
            {loading ? <Loading /> : "Sign up"}
          </button>
          {createUserError && <span className="error">{createUserError}</span>}
          {graphqlError && <span className="error">server error</span>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
