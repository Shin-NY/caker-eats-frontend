import { gql } from "@apollo/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loading from "../components/Loading";
import useMe from "../hooks/useMe";
import { useCreateDishMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../utils";

export const CreateDishDoc = gql`
  mutation CreateDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
      dishId
    }
  }
`;

interface IForm {
  name: string;
  price: number;
  description?: string;
  image: FileList;
  [key: string]: any;
}

const CreateDish = () => {
  const navigate = useNavigate();
  const { data: meData, loading: meLoading } = useMe();
  const [optionKeys, setOptionKeys] = useState<number[]>([]);
  const [createError, setCreateError] = useState("");

  const [createDishMutation, { loading: createLoading }] =
    useCreateDishMutation({
      onCompleted: ({ createDish: { ok, error } }) => {
        if (ok) navigate(`/`);
        if (error) setCreateError(error);
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = async ({
    name,
    price,
    description,
    image,
    ...rest
  }) => {
    if (meData?.seeMe.result?.restaurantId && !createLoading) {
      const options = optionKeys.map(optionKey => {
        const name = rest[`option-name-${optionKey}`];
        const extra = +rest[`option-extra-${optionKey}`];
        return { name, extra };
      });
      if (image[0]) {
        const { ok, url } = await uploadImage(image[0]);
        if (ok) {
          createDishMutation({
            variables: {
              input: {
                name,
                imageUrl: url,
                price: +price,
                description,
                options,
              },
            },
          });
        }
      }
      createDishMutation({
        variables: {
          input: { name, price: +price, description, options },
        },
      });
    }
  };

  return meLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col items-center py-16">
      <h1 className="text-lg font-medium">Create dish</h1>
      <form
        onSubmit={handleSubmit(onValid)}
        className=" mt-4 flex flex-col items-center gap-3"
      >
        <input
          {...register("name", { required: "Name is required" })}
          className="input"
          placeholder="dish name"
        />
        {errors.name && <span className="error">{errors.name.message}</span>}

        <input
          {...register("price", { required: "Price is required" })}
          className="input"
          type={"number"}
          min={0}
          placeholder="$ price"
        />
        {errors.price && <span className="error">{errors.price.message}</span>}

        <textarea
          {...register("description")}
          className="input"
          placeholder="description"
        />
        {errors.description && (
          <span className="error">{errors.description.message}</span>
        )}

        <input {...register("image")} className="input" type="file" />
        {errors.image && <span className="error">{errors.image.message}</span>}

        <div className="py-3 flex flex-col items-center gap-3">
          <div className="flex justify-between w-72 items-center">
            <h3 className="font-medium">Options</h3>
            <button
              onClick={e => {
                e.preventDefault();
                setOptionKeys(prev => [...prev, Date.now()]);
              }}
              className="button w-24"
              data-testid="add-option-button"
            >
              Add option
            </button>
          </div>
          {optionKeys.map(optionKey => (
            <div key={optionKey} className="flex items-center gap-2">
              <input
                {...register(`option-name-${optionKey}`)}
                className="input w-32"
                placeholder="option name"
              />
              <input
                {...register(`option-extra-${optionKey}`)}
                className="input w-32"
                type={"number"}
                min={0}
                placeholder="$ extra"
                defaultValue={0}
              />
              <button
                onClick={e => {
                  e.preventDefault();
                  setOptionKeys(prev =>
                    prev.filter(target => target !== optionKey)
                  );
                }}
                className="text-red-400"
              >
                x
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleSubmit(onValid)}
          className="button"
          data-testid="create-dish-button"
        >
          {createLoading ? <Loading /> : "Create dish"}
        </button>
        {createError && <span className="error">{createError}</span>}
      </form>
    </div>
  );
};

export default CreateDish;
