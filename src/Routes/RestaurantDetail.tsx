import { gql } from "@apollo/client";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import {
  useCreateOrderMutation,
  UserRole,
  useSeeRestaurantQuery,
} from "../generated/graphql";
import useMe from "../hooks/useMe";

export const SeeRestaurantDoc = gql`
  query SeeRestaurant($input: SeeRestaurantInput!) {
    seeRestaurant(input: $input) {
      ok
      error
      result {
        id
        name
        imageUrl
        menu {
          id
          name
          description
          imageUrl
          price
          options {
            name
            extra
          }
        }
      }
    }
  }
`;

export const CreateOrderDoc = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      orderId
      error
    }
  }
`;

interface IForm {
  [key: string]: string;
}

const RestaurantDetail = () => {
  const [orderDishes, setOrderDishes] = useState<
    {
      name: string;
      dishId: number;
      count: number;
      options?: { name: string }[];
    }[]
  >([]);
  const navigate = useNavigate();
  const { data: meData, loading: meLoading } = useMe();
  const isCustomer = meData?.seeMe.result?.role === UserRole.Customer;
  const { id } = useParams();
  const { data, loading } = useSeeRestaurantQuery({
    variables: { input: { restaurantId: +(id || "0") } },
  });
  const [createOrderError, setCreateOrderError] = useState("");

  const { register, getValues, handleSubmit } = useForm<IForm>();

  const [createOrderMutation, { loading: createOrderLoading }] =
    useCreateOrderMutation({
      onCompleted: ({ createOrder: { ok, orderId, error } }) => {
        if (ok) navigate(`/orders/${orderId}`);
        if (error) setCreateOrderError(error);
      },
    });

  const onValid: SubmitHandler<IForm> = () => {
    if (!createOrderLoading && id && orderDishes.length) {
      const dishes = orderDishes.map(orderDish => ({
        dishId: orderDish.dishId,
        count: orderDish.count,
        options: orderDish.options,
      }));
      createOrderMutation({
        variables: {
          input: {
            dishes,
            location: "서울시 강남구 청담동 123-123",
            restaurantId: +id,
          },
        },
      });
    }
  };

  return (
    <div>
      <Header />
      {loading || meLoading ? (
        <Loading />
      ) : (
        <div>
          <img
            className=" w-full h-72 object-cover"
            src={data?.seeRestaurant.result?.imageUrl || ""}
            alt="restaurant cover"
          />
          <div className="flex flex-col items-center">
            <div className=" shared-width">
              <h1 className="mt-4 mr-8 text-3xl font-bold">
                {data?.seeRestaurant.result?.name}
              </h1>
              {isCustomer && (
                <div className=" mt-2 flex gap-2 px-3 h-32 border border-gray-400 rounded">
                  <div className="flex flex-col justify-between pb-2 border-r pr-3 border-gray-400">
                    <h2 className="text-xl font-bold ">Cart</h2>
                    {createOrderError && (
                      <span className="error">{createOrderError}</span>
                    )}
                    <button
                      onClick={handleSubmit(onValid)}
                      className="button w-40"
                      data-testid="order-button"
                    >
                      {createOrderLoading ? <Loading /> : "Order"}
                    </button>
                  </div>
                  <div className="w-full flex gap-2 overflow-x-auto">
                    {orderDishes.map((orderDish, index) => (
                      <div className="w-32" key={index}>
                        <div className="flex gap-3">
                          <h4 className="font-medium">{orderDish.name}</h4>
                          <h5>{orderDish.count}</h5>
                        </div>
                        {orderDish.options?.map((orderDishOption, index) => (
                          <div key={index}>
                            <h6>+{orderDishOption.name}</h6>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="py-16 grid grid-cols-4 gap-6">
                {data?.seeRestaurant.result?.menu.map(dish => (
                  <div
                    key={dish.id}
                    className="  p-2 hover:scale-105 hover:shadow-2xl transition duration-500"
                  >
                    <img
                      className=" rounded-sm w-full h-48 object-cover"
                      src={dish.imageUrl || ""}
                      alt="dish cover"
                    />
                    <div className="mt-1 flex justify-between items-center">
                      <h2 className="font-medium">{dish.name}</h2>
                      {isCustomer && (
                        <div className="flex items-center gap-2">
                          <input
                            {...register(`${dish.id}-count`)}
                            className="input w-10 px-0 pl-2 py-0"
                            type={"number"}
                            min={1}
                            max={99}
                            defaultValue={1}
                          />
                          <button
                            data-testid="dish-button"
                            onClick={() => {
                              const values = getValues();
                              const options =
                                dish.options
                                  ?.map((option, index) => {
                                    if (values[`${dish.id}-option-${index}`])
                                      return { name: option.name };
                                    return { name: "" };
                                  })
                                  .filter(option => option.name) || [];
                              setOrderDishes(prev => [
                                ...prev,
                                {
                                  name: dish.name,
                                  dishId: dish.id,
                                  count: +values[`${dish.id}-count`],
                                  options,
                                },
                              ]);
                            }}
                            className="text-gray-500"
                          >
                            <FontAwesomeIcon icon={faShoppingCart} />
                          </button>
                        </div>
                      )}
                    </div>
                    <h3 className=" text-sm">${dish.price}</h3>
                    <div>
                      <h3 className="font-medium mt-2">options</h3>
                      {dish.options?.map((option, index) => (
                        <div key={index} className="flex justify-between">
                          <div className="flex gap-1 text-sm">
                            <h4>+${option.extra || 0}</h4>
                            <h4>{option.name}</h4>
                          </div>
                          {isCustomer && (
                            <input
                              data-testid="dish-option-checkbox"
                              {...register(`${dish.id}-option-${index}`)}
                              type={"checkbox"}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
