import "@testing-library/jest-dom/extend-expect";
import React from "react";
import axios from "axios";
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  createEvent,
} from "@testing-library/react";

import { Upload, UploadProps } from "./upload";
import { act } from "react-dom/test-utils";

jest.mock("../Icon/icon.tsx", () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["xyz"], "test.png", { type: "image/png" });
describe("test upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector(
      ".fomalhaut-file-input"
    ) as HTMLInputElement;
    uploadArea = wrapper.queryByText("Click to upload") as HTMLElement;
  });

  it("uplad process should works fine", async () => {
    const { queryByText } = wrapper;
    mockedAxios.post.mockResolvedValue({ data: "test" });
    expect(uploadArea).toBeInTheDocument();
    expect(fileInput).not.toBeVisible();
    await act(async () => {
      // mockedAxios.post.mockImplementation(() =>
      //   Promise.resolve({ data: "cool" })
      // );
      fireEvent.change(fileInput, { target: { files: [testFile] } });
    });
    // expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
    });
    expect(queryByText("check-circle")).toBeInTheDocument();
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      "test",
      expect.objectContaining({ raw: testFile })
    );
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({ raw: testFile })
    );
    // remove the upload file
    let times = queryByText("times") as HTMLElement;
    expect(times).toBeInTheDocument();
    fireEvent.click(times);
    expect(queryByText("test.png")).not.toBeInTheDocument();
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });
  it("drag and drop files should works fine", async () => {
    const { queryByText } = wrapper;
    fireEvent.dragOver(uploadArea);
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");
    // const mockDropEvent = createEvent.drop(uploadArea);
    // Object.defineProperty(mockDropEvent, "dataTransfer", {
    //   value: {
    //     files: [testFile],
    //   },
    // });
    // fireEvent(uploadArea, mockDropEvent);
    // await waitFor(() => {
    //   expect(queryByText("test.png")).toBeInTheDocument();
    // });
    // expect(testProps.onSuccess).toHaveBeenCalledWith("test", testFile);
  });
});
