import { gql } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { useSeeCategoriesQuery } from "../generated/graphql";

gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
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
  const { data: categoriesData, loading: categoriesLoading } =
    useSeeCategoriesQuery();

  const { register, handleSubmit } = useForm<IForm>();

  const onValid: SubmitHandler<IForm> = async ({
    name,
    image,
    categorySlug,
  }) => {
    const formData = new FormData();
    formData.append("image", image[0]);
    const res = await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
      mode: "no-cors",
    });

    console.log(res);
  };

  return categoriesLoading ? (
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
          >
            {categoriesData?.seeCategories.result?.map(category => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>

          <button onClick={handleSubmit(onValid)} className="button">
            Create restaurant
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurant;
