import { gql } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateCategoryMutation } from "../generated/graphql";
import Loading from "../components/loading";
import { useState } from "react";

gql`
  mutation createCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      ok
      error
    }
  }
`;

interface CreateCategoryForm {
  name: string;
  imageUrl?: string;
}

const CreateCategory = () => {
  const { register, handleSubmit, reset } = useForm<CreateCategoryForm>();
  const [createCategoryerror, setCreateCategoryError] = useState("");

  const [createCategory, { loading }] = useCreateCategoryMutation({
    onCompleted: ({ createCategory: { ok, error } }) => {
      if (ok) {
        alert("created new category!");
        reset();
      }
      if (error) setCreateCategoryError(error);
    },
  });
  const onvalid: SubmitHandler<CreateCategoryForm> = input => {
    if (!loading) {
      createCategory({ variables: { input } });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-4 font-medium text-xl">New Category</h1>
      <form
        className="flex flex-col items-center space-y-2"
        onSubmit={handleSubmit(onvalid)}
      >
        <input
          className="input"
          {...register("name", { required: "name is required" })}
          placeholder="category name"
        />
        <input
          className="input"
          {...register("imageUrl")}
          placeholder="image url"
        />
        <button className="button" onClick={handleSubmit(onvalid)}>
          {loading ? <Loading /> : "create category"}
        </button>
        {createCategoryerror && (
          <span className="error">{createCategoryerror}</span>
        )}
      </form>
    </div>
  );
};

export default CreateCategory;
