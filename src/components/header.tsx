import { useReactiveVar } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserRole } from "../generated/graphql";
import useMe from "../hooks/useMe";
import { onLogOut, tokenVar } from "../variables";
import Loading from "./loading";

interface IForm {
  key: string;
}

const Header = () => {
  const { data: meData, loading: meLoading } = useMe();
  const token = useReactiveVar(tokenVar);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = ({ key }) => {
    navigate(`/search/${key}`);
  };

  const onClickLogout = () => {
    onLogOut();
    navigate("/");
  };

  return token && meLoading ? (
    <Loading />
  ) : (
    <div>
      <div className="shared-width mx-auto py-4 grid grid-cols-3">
        <div>
          <Link to={"/"} className="text-3xl w-min">
            <>
              <span className="font-medium mr-1">Caker</span>
              <span className="font-bold">Eats</span>
            </>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onValid)}>
          {(!token || meData?.seeMe.result?.role === UserRole.Customer) && (
            <input
              placeholder="Search restaurants..."
              {...register("key", { required: true })}
              className="transition duration-200 focus:shadow-md py-2 px-6 w-full bg-gray-200 rounded-full outline-none"
            />
          )}
        </form>
        <div className="flex items-center justify-end gap-4 text-xs font-medium">
          {token ? (
            <>
              <Link
                to={"/orders"}
                className="py-2 px-4  bg-gray-200 rounded-full"
              >
                My orders
              </Link>
              {meData?.seeMe.result?.role === UserRole.Owner &&
                !meData.seeMe.result.restaurantId && (
                  <Link
                    to={"/create-restaurant"}
                    className="py-2 px-4  bg-gray-200 rounded-full"
                  >
                    Create restaurant
                  </Link>
                )}
              {meData?.seeMe.result?.role === UserRole.Driver && (
                <Link to={"/"} className="py-2 px-4  bg-gray-200 rounded-full">
                  Cooked orders
                </Link>
              )}
              <button
                onClick={onClickLogout}
                className="py-2 px-4  bg-gray-200 rounded-full"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="py-2 px-4  bg-gray-200 rounded-full"
              >
                Log in
              </Link>
              <Link
                to={"/signup"}
                className="py-2 px-4  bg-gray-200 rounded-full"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
