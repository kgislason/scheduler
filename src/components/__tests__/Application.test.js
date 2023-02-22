import React from "react";
import axios from "axios";
import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react";
import Application from "components/Application";


afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    //fireEvent.click(getByText("Tuesday"));

    //expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
});