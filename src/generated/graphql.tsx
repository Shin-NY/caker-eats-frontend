import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  restaurants: Array<Restaurant>;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateCategoryInput = {
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateCategoryOutput = {
  __typename?: 'CreateCategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateDishInput = {
  description?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  options?: InputMaybe<Array<DishOptionInput>>;
  price: Scalars['Float'];
};

export type CreateDishOutput = {
  __typename?: 'CreateDishOutput';
  dishId?: Maybe<Scalars['Float']>;
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateOrderInput = {
  dishes: Array<OrderDishInput>;
  location: Scalars['String'];
  restaurantId: Scalars['Float'];
};

export type CreateOrderOutput = {
  __typename?: 'CreateOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orderId?: Maybe<Scalars['Float']>;
};

export type CreatePromotionInput = {
  transactionId: Scalars['Float'];
};

export type CreatePromotionOutput = {
  __typename?: 'CreatePromotionOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type CreateRestaurantInput = {
  categorySlug: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CreateRestaurantOutput = {
  __typename?: 'CreateRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  restaurantId?: Maybe<Scalars['Float']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteCategoryInput = {
  slug: Scalars['String'];
};

export type DeleteCategoryOutput = {
  __typename?: 'DeleteCategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteDishInput = {
  dishId: Scalars['Float'];
};

export type DeleteDishOutput = {
  __typename?: 'DeleteDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteRestaurantOutput = {
  __typename?: 'DeleteRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type DeleteUserOutput = {
  __typename?: 'DeleteUserOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Dish = {
  __typename?: 'Dish';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  options?: Maybe<Array<DishOption>>;
  price: Scalars['Float'];
  restaurant: Restaurant;
  updatedAt: Scalars['DateTime'];
};

export type DishOption = {
  __typename?: 'DishOption';
  extra?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type DishOptionInput = {
  extra?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
};

export type EditDishInput = {
  description?: InputMaybe<Scalars['String']>;
  dishId: Scalars['Float'];
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<DishOptionInput>>;
  price?: InputMaybe<Scalars['Float']>;
};

export type EditDishOutput = {
  __typename?: 'EditDishOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditOrderStatusInput = {
  orderId: Scalars['Float'];
  status?: InputMaybe<OrderStatus>;
};

export type EditOrderStatusOutput = {
  __typename?: 'EditOrderStatusOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditRestaurantInput = {
  categorySlug?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type EditRestaurantOutput = {
  __typename?: 'EditRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type EditUserInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type EditUserOutput = {
  __typename?: 'EditUserOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginOutput = {
  __typename?: 'LoginOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CreateCategoryOutput;
  createDish: CreateDishOutput;
  createOrder: CreateOrderOutput;
  createPromotion: CreatePromotionOutput;
  createRestaurant: CreateRestaurantOutput;
  createUser: CreateUserOutput;
  deleteCategory: DeleteCategoryOutput;
  deleteDish: DeleteDishOutput;
  deleteRestaurant: DeleteRestaurantOutput;
  deleteUser: DeleteUserOutput;
  editDish: EditDishOutput;
  editOrderStatus: EditOrderStatusOutput;
  editRestaurant: EditRestaurantOutput;
  editUser: EditUserOutput;
  login: LoginOutput;
  pickupOrder: PickupOrderOutput;
  verifyEmail: VerifyEmailOutput;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryInput;
};


export type MutationCreateDishArgs = {
  input: CreateDishInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreatePromotionArgs = {
  input: CreatePromotionInput;
};


export type MutationCreateRestaurantArgs = {
  input: CreateRestaurantInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeleteCategoryArgs = {
  input: DeleteCategoryInput;
};


export type MutationDeleteDishArgs = {
  input: DeleteDishInput;
};


export type MutationEditDishArgs = {
  input: EditDishInput;
};


export type MutationEditOrderStatusArgs = {
  input: EditOrderStatusInput;
};


export type MutationEditRestaurantArgs = {
  input: EditRestaurantInput;
};


export type MutationEditUserArgs = {
  input: EditUserInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationPickupOrderArgs = {
  input: PickupOrderInput;
};


export type MutationVerifyEmailArgs = {
  input: VerifyEmailInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  customer?: Maybe<User>;
  dishes: Array<OrderDish>;
  driver?: Maybe<User>;
  id: Scalars['Float'];
  location: Scalars['String'];
  restaurant?: Maybe<Restaurant>;
  status: OrderStatus;
  updatedAt: Scalars['DateTime'];
};

export type OrderDish = {
  __typename?: 'OrderDish';
  count: Scalars['Float'];
  dishId: Scalars['Float'];
  options?: Maybe<Array<OrderDishOption>>;
};

export type OrderDishInput = {
  count: Scalars['Float'];
  dishId: Scalars['Float'];
  options?: InputMaybe<Array<OrderDishOptionInput>>;
};

export type OrderDishOption = {
  __typename?: 'OrderDishOption';
  name: Scalars['String'];
};

export type OrderDishOptionInput = {
  name: Scalars['String'];
};

export enum OrderStatus {
  Cooked = 'Cooked',
  Cooking = 'Cooking',
  Delivered = 'Delivered',
  Pending = 'Pending',
  PickedUp = 'PickedUp'
}

export type OrderStatusChangedInput = {
  orderId: Scalars['Float'];
};

export type PickupOrderInput = {
  orderId: Scalars['Float'];
};

export type PickupOrderOutput = {
  __typename?: 'PickupOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  orderId?: Maybe<Scalars['Float']>;
};

export type Promotion = {
  __typename?: 'Promotion';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  owner?: Maybe<User>;
  transactionId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  searchRestaurant: SearchRestaurantOutput;
  seeCategories: SeeCategoriesOutput;
  seeCategory: SeeCategoryOutput;
  seeCookedOrders: SeeCookedOrdersOutput;
  seeMe: SeeMeOutput;
  seeOrder: SeeOrderOutput;
  seeOrders: SeeOrdersOutput;
  seePromotions: SeePromotionsOutput;
  seeRestaurant: SeeRestaurantOutput;
  seeRestaurants: SeeRestaurantsOutput;
};


export type QuerySearchRestaurantArgs = {
  input: SearchRestaurantInput;
};


export type QuerySeeCategoryArgs = {
  input: SeeCategoryInput;
};


export type QuerySeeCookedOrdersArgs = {
  input: SeeCookedOrdersInput;
};


export type QuerySeeOrderArgs = {
  input: SeeOrderInput;
};


export type QuerySeeRestaurantArgs = {
  input: SeeRestaurantInput;
};


export type QuerySeeRestaurantsArgs = {
  input: SeeRestaurantsInput;
};

export type Restaurant = {
  __typename?: 'Restaurant';
  category: Category;
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  imageUrl?: Maybe<Scalars['String']>;
  isPromoted: Scalars['Boolean'];
  menu: Array<Dish>;
  name: Scalars['String'];
  orders: Array<Order>;
  owner: User;
  promotionExpireDate?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type SearchRestaurantInput = {
  key: Scalars['String'];
  page?: InputMaybe<Scalars['Float']>;
};

export type SearchRestaurantOutput = {
  __typename?: 'SearchRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type SeeCategoriesOutput = {
  __typename?: 'SeeCategoriesOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Category>>;
};

export type SeeCategoryInput = {
  page?: InputMaybe<Scalars['Float']>;
  slug: Scalars['String'];
};

export type SeeCategoryOutput = {
  __typename?: 'SeeCategoryOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Category>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type SeeCookedOrdersInput = {
  page?: InputMaybe<Scalars['Float']>;
};

export type SeeCookedOrdersOutput = {
  __typename?: 'SeeCookedOrdersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Order>>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type SeeMeOutput = {
  __typename?: 'SeeMeOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<User>;
};

export type SeeOrderInput = {
  orderId: Scalars['Float'];
};

export type SeeOrderOutput = {
  __typename?: 'SeeOrderOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Order>;
};

export type SeeOrdersOutput = {
  __typename?: 'SeeOrdersOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Order>>;
};

export type SeePromotionsOutput = {
  __typename?: 'SeePromotionsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Promotion>>;
};

export type SeeRestaurantInput = {
  restaurantId: Scalars['Float'];
};

export type SeeRestaurantOutput = {
  __typename?: 'SeeRestaurantOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Restaurant>;
};

export type SeeRestaurantsInput = {
  page?: InputMaybe<Scalars['Float']>;
};

export type SeeRestaurantsOutput = {
  __typename?: 'SeeRestaurantsOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
  result?: Maybe<Array<Restaurant>>;
  totalPages?: Maybe<Scalars['Float']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  orderCooked: Order;
  orderCreated: Order;
  orderStatusChanged: Order;
};


export type SubscriptionOrderStatusChangedArgs = {
  input: OrderStatusChangedInput;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  driverOrders: Array<Order>;
  email: Scalars['String'];
  id: Scalars['Float'];
  orders: Array<Order>;
  password: Scalars['String'];
  promotions: Array<Promotion>;
  restaurant?: Maybe<Restaurant>;
  restaurantId?: Maybe<Scalars['Float']>;
  role: UserRole;
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
};

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
  Driver = 'Driver',
  Owner = 'Owner'
}

export type VerifyEmailInput = {
  code: Scalars['String'];
};

export type VerifyEmailOutput = {
  __typename?: 'VerifyEmailOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type PickupOrderMutationVariables = Exact<{
  input: PickupOrderInput;
}>;


export type PickupOrderMutation = { __typename?: 'Mutation', pickupOrder: { __typename?: 'PickupOrderOutput', ok: boolean, orderId?: number | null, error?: string | null } };

export type SeeMeQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeMeQuery = { __typename?: 'Query', seeMe: { __typename?: 'SeeMeOutput', ok: boolean, error?: string | null, result?: { __typename?: 'User', id: number, role: UserRole, verified: boolean, restaurantId?: number | null } | null } };

export type OrderCookedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OrderCookedSubscription = { __typename?: 'Subscription', orderCooked: { __typename?: 'Order', id: number, createdAt: any, location: string, status: OrderStatus, customer?: { __typename?: 'User', id: number, email: string } | null, restaurant?: { __typename?: 'Restaurant', id: number, name: string } | null } };

export type SeeCookedOrdersQueryVariables = Exact<{
  input: SeeCookedOrdersInput;
}>;


export type SeeCookedOrdersQuery = { __typename?: 'Query', seeCookedOrders: { __typename?: 'SeeCookedOrdersOutput', ok: boolean, error?: string | null, result?: Array<{ __typename?: 'Order', id: number, createdAt: any, location: string, status: OrderStatus, customer?: { __typename?: 'User', id: number, email: string } | null, restaurant?: { __typename?: 'Restaurant', id: number, name: string } | null }> | null } };

export type CreateDishMutationVariables = Exact<{
  input: CreateDishInput;
}>;


export type CreateDishMutation = { __typename?: 'Mutation', createDish: { __typename?: 'CreateDishOutput', ok: boolean, error?: string | null, dishId?: number | null } };

export type CreateRestaurantMutationVariables = Exact<{
  input: CreateRestaurantInput;
}>;


export type CreateRestaurantMutation = { __typename?: 'Mutation', createRestaurant: { __typename?: 'CreateRestaurantOutput', ok: boolean, restaurantId?: number | null, error?: string | null } };

export type SeeCategoryQueryVariables = Exact<{
  input: SeeCategoryInput;
}>;


export type SeeCategoryQuery = { __typename?: 'Query', seeCategory: { __typename?: 'SeeCategoryOutput', ok: boolean, error?: string | null, totalPages?: number | null, result?: { __typename?: 'Category', id: number, restaurants: Array<{ __typename?: 'Restaurant', id: number, name: string, imageUrl?: string | null }> } | null } };

export type SeeCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeCategoriesQuery = { __typename?: 'Query', seeCategories: { __typename?: 'SeeCategoriesOutput', ok: boolean, error?: string | null, result?: Array<{ __typename?: 'Category', id: number, name: string, slug: string, imageUrl?: string | null }> | null } };

export type SeeRestaurantsQueryVariables = Exact<{
  input: SeeRestaurantsInput;
}>;


export type SeeRestaurantsQuery = { __typename?: 'Query', seeRestaurants: { __typename?: 'SeeRestaurantsOutput', ok: boolean, error?: string | null, totalPages?: number | null, result?: Array<{ __typename?: 'Restaurant', id: number, name: string, imageUrl?: string | null }> | null } };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginOutput', ok: boolean, error?: string | null, token?: string | null } };

export type SeeRestaurantQueryVariables = Exact<{
  input: SeeRestaurantInput;
}>;


export type SeeRestaurantQuery = { __typename?: 'Query', seeRestaurant: { __typename?: 'SeeRestaurantOutput', ok: boolean, error?: string | null, result?: { __typename?: 'Restaurant', id: number, name: string, imageUrl?: string | null, menu: Array<{ __typename?: 'Dish', id: number, name: string, description?: string | null, imageUrl?: string | null, price: number, options?: Array<{ __typename?: 'DishOption', name: string, extra?: number | null }> | null }> } | null } };

export type EditOrderStatusMutationVariables = Exact<{
  input: EditOrderStatusInput;
}>;


export type EditOrderStatusMutation = { __typename?: 'Mutation', editOrderStatus: { __typename?: 'EditOrderStatusOutput', ok: boolean, error?: string | null } };

export type SeeOrderQueryVariables = Exact<{
  input: SeeOrderInput;
}>;


export type SeeOrderQuery = { __typename?: 'Query', seeOrder: { __typename?: 'SeeOrderOutput', ok: boolean, error?: string | null, result?: { __typename?: 'Order', id: number, createdAt: any, location: string, status: OrderStatus, dishes: Array<{ __typename?: 'OrderDish', dishId: number, count: number, options?: Array<{ __typename?: 'OrderDishOption', name: string }> | null }>, customer?: { __typename?: 'User', id: number, email: string } | null, restaurant?: { __typename?: 'Restaurant', id: number, name: string, imageUrl?: string | null, menu: Array<{ __typename?: 'Dish', id: number, name: string }> } | null, driver?: { __typename?: 'User', id: number, email: string } | null } | null } };

export type SeeOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type SeeOrdersQuery = { __typename?: 'Query', seeOrders: { __typename?: 'SeeOrdersOutput', ok: boolean, error?: string | null, result?: Array<{ __typename?: 'Order', id: number, createdAt: any, location: string, status: OrderStatus, customer?: { __typename?: 'User', id: number, email: string } | null, restaurant?: { __typename?: 'Restaurant', id: number, name: string } | null }> | null } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'CreateOrderOutput', ok: boolean, orderId?: number | null, error?: string | null } };

export type SearchRestaurantQueryVariables = Exact<{
  input: SearchRestaurantInput;
}>;


export type SearchRestaurantQuery = { __typename?: 'Query', searchRestaurant: { __typename?: 'SearchRestaurantOutput', ok: boolean, error?: string | null, totalPages?: number | null, result?: Array<{ __typename?: 'Restaurant', id: number, name: string, imageUrl?: string | null }> | null } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'CreateUserOutput', ok: boolean, error?: string | null } };


export const PickupOrderDocument = gql`
    mutation PickupOrder($input: PickupOrderInput!) {
  pickupOrder(input: $input) {
    ok
    orderId
    error
  }
}
    `;
export type PickupOrderMutationFn = Apollo.MutationFunction<PickupOrderMutation, PickupOrderMutationVariables>;

/**
 * __usePickupOrderMutation__
 *
 * To run a mutation, you first call `usePickupOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePickupOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pickupOrderMutation, { data, loading, error }] = usePickupOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePickupOrderMutation(baseOptions?: Apollo.MutationHookOptions<PickupOrderMutation, PickupOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PickupOrderMutation, PickupOrderMutationVariables>(PickupOrderDocument, options);
      }
export type PickupOrderMutationHookResult = ReturnType<typeof usePickupOrderMutation>;
export type PickupOrderMutationResult = Apollo.MutationResult<PickupOrderMutation>;
export type PickupOrderMutationOptions = Apollo.BaseMutationOptions<PickupOrderMutation, PickupOrderMutationVariables>;
export const SeeMeDocument = gql`
    query seeMe {
  seeMe {
    ok
    error
    result {
      id
      role
      verified
      restaurantId
    }
  }
}
    `;

/**
 * __useSeeMeQuery__
 *
 * To run a query within a React component, call `useSeeMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeMeQuery(baseOptions?: Apollo.QueryHookOptions<SeeMeQuery, SeeMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeMeQuery, SeeMeQueryVariables>(SeeMeDocument, options);
      }
export function useSeeMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeMeQuery, SeeMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeMeQuery, SeeMeQueryVariables>(SeeMeDocument, options);
        }
export type SeeMeQueryHookResult = ReturnType<typeof useSeeMeQuery>;
export type SeeMeLazyQueryHookResult = ReturnType<typeof useSeeMeLazyQuery>;
export type SeeMeQueryResult = Apollo.QueryResult<SeeMeQuery, SeeMeQueryVariables>;
export const OrderCookedDocument = gql`
    subscription OrderCooked {
  orderCooked {
    id
    createdAt
    location
    customer {
      id
      email
    }
    restaurant {
      id
      name
    }
    status
  }
}
    `;

/**
 * __useOrderCookedSubscription__
 *
 * To run a query within a React component, call `useOrderCookedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOrderCookedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderCookedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOrderCookedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OrderCookedSubscription, OrderCookedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OrderCookedSubscription, OrderCookedSubscriptionVariables>(OrderCookedDocument, options);
      }
export type OrderCookedSubscriptionHookResult = ReturnType<typeof useOrderCookedSubscription>;
export type OrderCookedSubscriptionResult = Apollo.SubscriptionResult<OrderCookedSubscription>;
export const SeeCookedOrdersDocument = gql`
    query SeeCookedOrders($input: SeeCookedOrdersInput!) {
  seeCookedOrders(input: $input) {
    ok
    error
    result {
      id
      createdAt
      location
      customer {
        id
        email
      }
      restaurant {
        id
        name
      }
      status
    }
  }
}
    `;

/**
 * __useSeeCookedOrdersQuery__
 *
 * To run a query within a React component, call `useSeeCookedOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCookedOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCookedOrdersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeCookedOrdersQuery(baseOptions: Apollo.QueryHookOptions<SeeCookedOrdersQuery, SeeCookedOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCookedOrdersQuery, SeeCookedOrdersQueryVariables>(SeeCookedOrdersDocument, options);
      }
export function useSeeCookedOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCookedOrdersQuery, SeeCookedOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCookedOrdersQuery, SeeCookedOrdersQueryVariables>(SeeCookedOrdersDocument, options);
        }
export type SeeCookedOrdersQueryHookResult = ReturnType<typeof useSeeCookedOrdersQuery>;
export type SeeCookedOrdersLazyQueryHookResult = ReturnType<typeof useSeeCookedOrdersLazyQuery>;
export type SeeCookedOrdersQueryResult = Apollo.QueryResult<SeeCookedOrdersQuery, SeeCookedOrdersQueryVariables>;
export const CreateDishDocument = gql`
    mutation CreateDish($input: CreateDishInput!) {
  createDish(input: $input) {
    ok
    error
    dishId
  }
}
    `;
export type CreateDishMutationFn = Apollo.MutationFunction<CreateDishMutation, CreateDishMutationVariables>;

/**
 * __useCreateDishMutation__
 *
 * To run a mutation, you first call `useCreateDishMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDishMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDishMutation, { data, loading, error }] = useCreateDishMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDishMutation(baseOptions?: Apollo.MutationHookOptions<CreateDishMutation, CreateDishMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDishMutation, CreateDishMutationVariables>(CreateDishDocument, options);
      }
export type CreateDishMutationHookResult = ReturnType<typeof useCreateDishMutation>;
export type CreateDishMutationResult = Apollo.MutationResult<CreateDishMutation>;
export type CreateDishMutationOptions = Apollo.BaseMutationOptions<CreateDishMutation, CreateDishMutationVariables>;
export const CreateRestaurantDocument = gql`
    mutation CreateRestaurant($input: CreateRestaurantInput!) {
  createRestaurant(input: $input) {
    ok
    restaurantId
    error
  }
}
    `;
export type CreateRestaurantMutationFn = Apollo.MutationFunction<CreateRestaurantMutation, CreateRestaurantMutationVariables>;

/**
 * __useCreateRestaurantMutation__
 *
 * To run a mutation, you first call `useCreateRestaurantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRestaurantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRestaurantMutation, { data, loading, error }] = useCreateRestaurantMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRestaurantMutation(baseOptions?: Apollo.MutationHookOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRestaurantMutation, CreateRestaurantMutationVariables>(CreateRestaurantDocument, options);
      }
export type CreateRestaurantMutationHookResult = ReturnType<typeof useCreateRestaurantMutation>;
export type CreateRestaurantMutationResult = Apollo.MutationResult<CreateRestaurantMutation>;
export type CreateRestaurantMutationOptions = Apollo.BaseMutationOptions<CreateRestaurantMutation, CreateRestaurantMutationVariables>;
export const SeeCategoryDocument = gql`
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

/**
 * __useSeeCategoryQuery__
 *
 * To run a query within a React component, call `useSeeCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCategoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeCategoryQuery(baseOptions: Apollo.QueryHookOptions<SeeCategoryQuery, SeeCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCategoryQuery, SeeCategoryQueryVariables>(SeeCategoryDocument, options);
      }
export function useSeeCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCategoryQuery, SeeCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCategoryQuery, SeeCategoryQueryVariables>(SeeCategoryDocument, options);
        }
export type SeeCategoryQueryHookResult = ReturnType<typeof useSeeCategoryQuery>;
export type SeeCategoryLazyQueryHookResult = ReturnType<typeof useSeeCategoryLazyQuery>;
export type SeeCategoryQueryResult = Apollo.QueryResult<SeeCategoryQuery, SeeCategoryQueryVariables>;
export const SeeCategoriesDocument = gql`
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

/**
 * __useSeeCategoriesQuery__
 *
 * To run a query within a React component, call `useSeeCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<SeeCategoriesQuery, SeeCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeCategoriesQuery, SeeCategoriesQueryVariables>(SeeCategoriesDocument, options);
      }
export function useSeeCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeCategoriesQuery, SeeCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeCategoriesQuery, SeeCategoriesQueryVariables>(SeeCategoriesDocument, options);
        }
export type SeeCategoriesQueryHookResult = ReturnType<typeof useSeeCategoriesQuery>;
export type SeeCategoriesLazyQueryHookResult = ReturnType<typeof useSeeCategoriesLazyQuery>;
export type SeeCategoriesQueryResult = Apollo.QueryResult<SeeCategoriesQuery, SeeCategoriesQueryVariables>;
export const SeeRestaurantsDocument = gql`
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

/**
 * __useSeeRestaurantsQuery__
 *
 * To run a query within a React component, call `useSeeRestaurantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRestaurantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRestaurantsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeRestaurantsQuery(baseOptions: Apollo.QueryHookOptions<SeeRestaurantsQuery, SeeRestaurantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRestaurantsQuery, SeeRestaurantsQueryVariables>(SeeRestaurantsDocument, options);
      }
export function useSeeRestaurantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRestaurantsQuery, SeeRestaurantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRestaurantsQuery, SeeRestaurantsQueryVariables>(SeeRestaurantsDocument, options);
        }
export type SeeRestaurantsQueryHookResult = ReturnType<typeof useSeeRestaurantsQuery>;
export type SeeRestaurantsLazyQueryHookResult = ReturnType<typeof useSeeRestaurantsLazyQuery>;
export type SeeRestaurantsQueryResult = Apollo.QueryResult<SeeRestaurantsQuery, SeeRestaurantsQueryVariables>;
export const LoginDocument = gql`
    mutation login($input: LoginInput!) {
  login(input: $input) {
    ok
    error
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SeeRestaurantDocument = gql`
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

/**
 * __useSeeRestaurantQuery__
 *
 * To run a query within a React component, call `useSeeRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeRestaurantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeRestaurantQuery(baseOptions: Apollo.QueryHookOptions<SeeRestaurantQuery, SeeRestaurantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeRestaurantQuery, SeeRestaurantQueryVariables>(SeeRestaurantDocument, options);
      }
export function useSeeRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeRestaurantQuery, SeeRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeRestaurantQuery, SeeRestaurantQueryVariables>(SeeRestaurantDocument, options);
        }
export type SeeRestaurantQueryHookResult = ReturnType<typeof useSeeRestaurantQuery>;
export type SeeRestaurantLazyQueryHookResult = ReturnType<typeof useSeeRestaurantLazyQuery>;
export type SeeRestaurantQueryResult = Apollo.QueryResult<SeeRestaurantQuery, SeeRestaurantQueryVariables>;
export const EditOrderStatusDocument = gql`
    mutation EditOrderStatus($input: EditOrderStatusInput!) {
  editOrderStatus(input: $input) {
    ok
    error
  }
}
    `;
export type EditOrderStatusMutationFn = Apollo.MutationFunction<EditOrderStatusMutation, EditOrderStatusMutationVariables>;

/**
 * __useEditOrderStatusMutation__
 *
 * To run a mutation, you first call `useEditOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editOrderStatusMutation, { data, loading, error }] = useEditOrderStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditOrderStatusMutation(baseOptions?: Apollo.MutationHookOptions<EditOrderStatusMutation, EditOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditOrderStatusMutation, EditOrderStatusMutationVariables>(EditOrderStatusDocument, options);
      }
export type EditOrderStatusMutationHookResult = ReturnType<typeof useEditOrderStatusMutation>;
export type EditOrderStatusMutationResult = Apollo.MutationResult<EditOrderStatusMutation>;
export type EditOrderStatusMutationOptions = Apollo.BaseMutationOptions<EditOrderStatusMutation, EditOrderStatusMutationVariables>;
export const SeeOrderDocument = gql`
    query SeeOrder($input: SeeOrderInput!) {
  seeOrder(input: $input) {
    ok
    error
    result {
      id
      createdAt
      dishes {
        dishId
        count
        options {
          name
        }
      }
      location
      customer {
        id
        email
      }
      restaurant {
        id
        name
        menu {
          id
          name
        }
        imageUrl
      }
      driver {
        id
        email
      }
      status
    }
  }
}
    `;

/**
 * __useSeeOrderQuery__
 *
 * To run a query within a React component, call `useSeeOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeOrderQuery(baseOptions: Apollo.QueryHookOptions<SeeOrderQuery, SeeOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeOrderQuery, SeeOrderQueryVariables>(SeeOrderDocument, options);
      }
export function useSeeOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeOrderQuery, SeeOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeOrderQuery, SeeOrderQueryVariables>(SeeOrderDocument, options);
        }
export type SeeOrderQueryHookResult = ReturnType<typeof useSeeOrderQuery>;
export type SeeOrderLazyQueryHookResult = ReturnType<typeof useSeeOrderLazyQuery>;
export type SeeOrderQueryResult = Apollo.QueryResult<SeeOrderQuery, SeeOrderQueryVariables>;
export const SeeOrdersDocument = gql`
    query SeeOrders {
  seeOrders {
    ok
    error
    result {
      id
      createdAt
      location
      customer {
        id
        email
      }
      restaurant {
        id
        name
      }
      status
    }
  }
}
    `;

/**
 * __useSeeOrdersQuery__
 *
 * To run a query within a React component, call `useSeeOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeeOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeeOrdersQuery({
 *   variables: {
 *   },
 * });
 */
export function useSeeOrdersQuery(baseOptions?: Apollo.QueryHookOptions<SeeOrdersQuery, SeeOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SeeOrdersQuery, SeeOrdersQueryVariables>(SeeOrdersDocument, options);
      }
export function useSeeOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeeOrdersQuery, SeeOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SeeOrdersQuery, SeeOrdersQueryVariables>(SeeOrdersDocument, options);
        }
export type SeeOrdersQueryHookResult = ReturnType<typeof useSeeOrdersQuery>;
export type SeeOrdersLazyQueryHookResult = ReturnType<typeof useSeeOrdersLazyQuery>;
export type SeeOrdersQueryResult = Apollo.QueryResult<SeeOrdersQuery, SeeOrdersQueryVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    ok
    orderId
    error
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const SearchRestaurantDocument = gql`
    query SearchRestaurant($input: SearchRestaurantInput!) {
  searchRestaurant(input: $input) {
    ok
    error
    totalPages
    result {
      id
      name
      imageUrl
    }
  }
}
    `;

/**
 * __useSearchRestaurantQuery__
 *
 * To run a query within a React component, call `useSearchRestaurantQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchRestaurantQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchRestaurantQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchRestaurantQuery(baseOptions: Apollo.QueryHookOptions<SearchRestaurantQuery, SearchRestaurantQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchRestaurantQuery, SearchRestaurantQueryVariables>(SearchRestaurantDocument, options);
      }
export function useSearchRestaurantLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchRestaurantQuery, SearchRestaurantQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchRestaurantQuery, SearchRestaurantQueryVariables>(SearchRestaurantDocument, options);
        }
export type SearchRestaurantQueryHookResult = ReturnType<typeof useSearchRestaurantQuery>;
export type SearchRestaurantLazyQueryHookResult = ReturnType<typeof useSearchRestaurantLazyQuery>;
export type SearchRestaurantQueryResult = Apollo.QueryResult<SearchRestaurantQuery, SearchRestaurantQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($input: CreateUserInput!) {
  createUser(input: $input) {
    ok
    error
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;