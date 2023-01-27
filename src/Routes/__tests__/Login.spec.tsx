import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login, { LoginMutationDoc } from "../Login";

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => {
      return mockedNavigate;
    },
  };
});

describe("<Login />", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should show form error", async () => {
    render(
      <MockedProvider>
        <BrowserRouter>
          <Login />
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
    });
  });
  it("should login", async () => {
    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: LoginMutationDoc,
              variables: {
                input: { email: "valid@email.com", password: "password" },
              },
            },
            result: {
              data: {
                login: {
                  ok: true,
                  error: null,
                  token: "token",
                },
              },
            },
          },
        ]}
      >
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </MockedProvider>
    );
    const email = screen.getByPlaceholderText(/email/i);
    userEvent.type(email, "valid@email.com");
    const password = screen.getByPlaceholderText(/password/i);
    userEvent.type(password, "password");
    const button = screen.getByRole("button");
    userEvent.click(button);
    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith("/");
    });
  });
});
