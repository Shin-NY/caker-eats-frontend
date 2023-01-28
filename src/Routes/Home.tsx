import { gql } from "@apollo/client";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import RestaurantGrid from "../components/RestaurantGrid";
import {
  useSeeCategoriesQuery,
  useSeeCategoryLazyQuery,
  useSeeRestaurantsQuery,
} from "../generated/graphql";

export const SeeCategoryDoc = gql`
  query SeeCategory($input: SeeCategoryInput!) {
    seeCategory(input: $input) {
      ok
      error
      totalPages
      result {
        id
        restaurants {
          id
          name
          imageUrl
        }
      }
    }
  }
`;

export const SeeCategoriesDoc = gql`
  query SeeCategories {
    seeCategories {
      ok
      error
      result {
        id
        name
        slug
        imageUrl
      }
    }
  }
`;

export const SeeRestaurantsDoc = gql`
  query SeeRestaurants($input: SeeRestaurantsInput!) {
    seeRestaurants(input: $input) {
      ok
      error
      result {
        id
        name
        imageUrl
      }
      totalPages
    }
  }
`;

interface IForm {
  key: string;
}

const Home = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const { data: SeeCategoriesData, loading: SeeCategoriesLoading } =
    useSeeCategoriesQuery();
  const { data: seeRestaurantsData, loading: seeRestaurantsLoading } =
    useSeeRestaurantsQuery({
      variables: { input: { page: 1 } },
    });
  const [
    seeCategoryQuery,
    { data: seeCategoryData, loading: seeCategoryLoading },
  ] = useSeeCategoryLazyQuery();

  const onClickCategory = (slug: string) => {
    if (selectedCategory === slug) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(slug);
      seeCategoryQuery({ variables: { input: { page: 1, slug } } });
    }
  };

  const onValid: SubmitHandler<IForm> = ({ key }) => {
    navigate(`/search/${key}`);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center w-full py-32 bg-yellow-400">
        <div className="shared-width">
          <h1 className=" text-4xl font-bold">Order cake to your door</h1>
          <form
            onSubmit={handleSubmit(onValid)}
            className=" flex items-center gap-2 mt-10 text-md"
          >
            <input
              placeholder="Search restaurants..."
              {...register("key", { required: true })}
              className=" outline-none py-3 px-4 w-96 shadow-sm transition duration-300 border-b-2 border-b-white focus:border-b-black"
            />
            <button className="font-semibold rounded py-3 px-4 shadow-sm bg-black text-white">
              Find
            </button>
          </form>
        </div>
      </div>
      <div className="mt-16">
        {SeeCategoriesLoading ? (
          <Loading />
        ) : (
          <div className="shared-width grid grid-cols-6 gap-6">
            {SeeCategoriesData?.seeCategories.result?.map(category => (
              <button
                key={category.id}
                onClick={() => onClickCategory(category.slug)}
                className={`${
                  category.slug === selectedCategory &&
                  "translate duration-200 scale-95 shadow-xl"
                } rounded-full overflow-hidden flex justify-between h-16 bg-red-50`}
              >
                <h3 className="mt-4 ml-6 font-medium">{category.name}</h3>
                <img
                  className="h-full w-20 object-cover"
                  src={category.imageUrl || ""}
                  alt="category cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="py-16 shared-width">
        {seeRestaurantsLoading || seeCategoryLoading ? (
          <Loading />
        ) : selectedCategory ? (
          <RestaurantGrid
            restaurants={seeCategoryData?.seeCategory.result?.restaurants || []}
          />
        ) : (
          <RestaurantGrid
            restaurants={seeRestaurantsData?.seeRestaurants.result || []}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
