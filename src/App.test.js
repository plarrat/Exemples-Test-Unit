import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App, {sum, getUsers} from "./App"
import axios from "axios"

jest.mock("axios");

beforeEach(() => axios.mockClear())

it("should add 10 to 2",()=>{
  let res = sum(2,10);
  expect(res).toBe(12);
})

describe("Test of getUsers()", ()=>{
  it("should return array value", async ()=>{
    const valueMock = {
      data:[]
    };

    axios.get.mockResolvedValue(valueMock);
    
    let res = await getUsers();
    expect(res).toEqual([]);
  })
})

it("should render App",()=>{
  render(<App />)
})

describe("test button cliquez moi", ()=>{
  it("should have button", ()=>{
    render(<App />)
    const bouton = screen.getByTestId("btn-1");
    expect(bouton).toBeInTheDocument();
  })

  it("should display table rows", async ()=>{
    const valueMock = {
      data:[
            {
              id: 1,
              name: "Philippe Larrat",
              username: "plarrat",
              email: "plarrat@react.fr"
            }
          ]
    };
    axios.get.mockResolvedValue(valueMock);

    render(<App />);
    const bouton = screen.getByText("Cliquez moi");
    fireEvent.click(bouton);
    await waitFor(() => screen.getByRole("table"))
    // screen.debug();
    const rows = screen.queryAllByRole("row");
    expect(rows).toHaveLength(1);
  })

  it("should display correct datas", async ()=>{
    const valueMock = {
      data:[
            {
              id: 1,
              name: "Philippe Larrat",
              username: "plarrat",
              email: "plarrat@react.fr"
            }
          ]
    };
    axios.get.mockResolvedValue(valueMock);

    render(<App />);
    const bouton = screen.getByText("Cliquez moi");
    fireEvent.click(bouton);
    await waitFor(() => screen.getByRole("table"))
    
    const nom = screen.getByText("Philippe Larrat");
    const username = screen.getByText("plarrat");
    const email = screen.getByText("plarrat@react.fr");

    expect(nom).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  })
})


