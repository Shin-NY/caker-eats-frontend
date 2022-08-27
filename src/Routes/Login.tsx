import { gql } from "@apollo/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { useLoginMutation } from "../generated/graphql";
import { onLogIn } from "../variables";

gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

interface IForm {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<IForm>();
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const [loginMutation, { loading, error: graphqlError }] = useLoginMutation({
    onCompleted: ({ login: { ok, token, error } }) => {
      if (ok && token) {
        onLogIn(token);
        navigate("/");
      }
      if (error) setLoginError(error);
    },
  });

  const onValid: SubmitHandler<IForm> = ({ email, password }) => {
    if (!loading) loginMutation({ variables: { input: { email, password } } });
  };

  return (
    <div>
      <Header />
      <div className="py-16 flex flex-col items-center">
        <h1 className="text-lg font-medium">Log in</h1>
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
          <button onClick={handleSubmit(onValid)} className="button">
            {loading ? <Loading /> : "Log in"}
          </button>
          {loginError && <span className="error">{loginError}</span>}
          {graphqlError && <span className="error">server error</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
