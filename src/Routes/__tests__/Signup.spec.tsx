import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { UserRole } from "../../generated/graphql";
import Signup, { CreateUserMutationDoc } from "../Signup";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
  };
});

describe("<Signup />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should show signup error", async () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </MockedProvider>
    );
    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, "invalid@email");
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
      screen.getByText(/invalid email format/i);
      screen.getByText(/password is required/i);
      screen.getByText(/password confirm is required/i);
    });
  });
  it("should signup", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: CreateUserMutationDoc,
              variables: {
                input: {
                  email: "valid@email.com",
                  password: "password",
                  role: UserRole.Customer,
                },
              },
            },
            result: {
              data: {
                createUser: {
                  ok: true,
                  error: null,
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </MockedProvider>
    );
    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, "valid@email.com");
    const password = screen.getByPlaceholderText("password");
    userEvent.type(password, "password");
    const passwordConfirm = screen.getByPlaceholderText(/password confirm/i);
    userEvent.type(passwordConfirm, "password");
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
      expect(mockNavigate).toBeCalledWith("/login");
    });
  });
});
