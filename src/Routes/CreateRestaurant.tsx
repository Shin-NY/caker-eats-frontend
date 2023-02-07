import { gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import {
  useCreateRestaurantMutation,
  useSeeCategoriesQuery,
} from "../generated/graphql";
import useMe from "../hooks/useMe";
import { uploadImage } from "../utils";

export const CreateRestaurantDoc = gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      restaurantId
      error
    }
  }
`;

interface IForm {
  name: string;
  image: FileList;
  categorySlug: string;
}

const CreateRestaurant = () => {
  const navigate = useNavigate();
  const { data: meData, loading: meLoading } = useMe();
  const [createError, setCreateError] = useState("");
  const { data: categoriesData, loading: categoriesLoading } =
    useSeeCategoriesQuery();
  const [createRestaurantMutation, { loading: createLoading }] =
    useCreateRestaurantMutation({
      onCompleted: ({ createRestaurant: { ok, error } }) => {
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
    image,
    categorySlug,
  }) => {
    if (image[0]) {
      const { ok, url } = await uploadImage(image[0]);
      if (ok) {
        createRestaurantMutation({
          variables: { input: { imageUrl: url, name, categorySlug } },
        });
      }
    } else {
      createRestaurantMutation({
        variables: { input: { name, categorySlug } },
      });
    }
  };

  useEffect(() => {
    if (meData?.seeMe.result?.restaurantId) {
      navigate("/", { replace: true });
    }
  }, [meData, navigate]);

  return categoriesLoading || meLoading ? (
    <Loading />
  ) : (
    <div>
      <Header />
      <div className="flex flex-col items-center py-16">
        <h1 className="text-lg font-medium">Create restaurant</h1>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col items-center gap-3 mt-4"
        >
          <input
            {...register("name", { required: "Name is required" })}
            className="input"
            placeholder="Restaurant name"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}

          <label className="mt-3">Restaurant image</label>
          <input
            {...register("image")}
            type={"file"}
            accept={"image/*"}
            className="input"
          />

          <label className="mt-3">Category</label>
          <select
            {...register("categorySlug", { required: "Category is required" })}
            className="input"
            role={"listbox"}
          >
            {categoriesData?.seeCategories.result?.map(category => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categorySlug && (
            <span className="error">{errors.categorySlug.message}</span>
          )}

          <button
            onClick={handleSubmit(onValid)}
            className="button"
            data-testid="create-restaurant-btn"
          >
            {createLoading ? <Loading /> : "Create restaurant"}
          </button>
          {createError && <span className="error">{createError}</span>}
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;
