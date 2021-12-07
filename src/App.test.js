import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App, {sum, getUsers} from "./App"
import axios from "axios"

jest.mock("axios");

beforeEach(() => axios.mockClear())

it("should add 2 numbers",()=>{
  let res = sum(2,10);
  expect(res).toBe(12);
})

describe("Test of getUsers()", ()=>{
  it("should return array value", async ()=>{
    const valueMock = {
      data:[],
      status:200
    };

    axios.get.mockResolvedValue(valueMock);
    let res = await getUsers();
    expect(res).toEqual([]);
  })
})

it("should render App",()=>{
  render(<App />)
})

it("should have button", ()=>{
  render(<App />)
  const bouton = screen.getByText("Cliquez moi");
  expect(bouton).toBeInTheDocument();
})

it("should display table rows", async ()=>{
  const valueMock = {
      data:[
            {
              id: 1,
              name: "Leanne Graham",
              username: "Bret",
              email: "Sincere@april.biz"
            }
          ]
  };
  axios.get.mockResolvedValue(valueMock);

  render(<App />);
  const bouton = screen.getByText("Cliquez moi");
  fireEvent.click(bouton);
  await waitFor(() => screen.getByRole("table"))
  screen.debug();
  const rows = screen.queryAllByRole("row");
  expect(rows).toHaveLength(1);
})