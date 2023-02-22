import React from "react";
import { render, getByText, prettyDOM, cleanup, fireEvent, waitForElement } from "@testing-library/react";
import Application from "components/Application";
import Appointment from "components/Appointment";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Archie Cohen"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });


  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    console.log(prettyDOM(container));
  });
});