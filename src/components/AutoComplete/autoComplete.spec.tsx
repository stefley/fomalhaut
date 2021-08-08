import React from "react";
import { config } from "react-transition-group";
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  cleanup,
  wait,
} from "@testing-library/react";
import { AutoComplate, AutoCompleteProps } from "./autoComplete";

config.disabled = true;

const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: (query) => {
    return testArray.filter((item) => item.value.includes(query));
  },
  onSelect: jest.fn(),
  placeholder: "auto-complete",
};
const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      console.log(items);
      return items
        .slice(0, 10)
        .map((item: any) => ({ value: item.login, ...item }));
    });
};

const renderOptions = (item) => {
  return (
    <div>
      <div className="item-value">{item.value}</div>
      <div className="item-number">{item.number}</div>
    </div>
  );
};

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplate {...testProps} />);
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
  });

  test("test basic AutoComplete behavio", async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    // should have two suggestion items
    expect(
      wrapper.container.querySelectorAll(".suggestion-item").length
    ).toEqual(2);
    // click the first item
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    // fill  the input
    expect(inputNode.value).toBe("ab");
  });

  test("should provide keyboard support", async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");

    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(firstResult).toHaveClass("is-active");
    // arrow down
    fireEvent.keyDown(inputNode, { keyCode: 40 });
    expect(secondResult).toHaveClass("is-active");

    // arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 });
    expect(firstResult).toHaveClass("is-active");
    // press enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith({
      value: "ab",
      number: 11,
    });
  });

  test("click outsid should hide the dropdown", async () => {
    // input change
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  test("renderOptions should generate the right template", async () => {
    cleanup();
    wrapper = render(
      <AutoComplate {...testProps} renderOptions={renderOptions} />
    );
    inputNode = wrapper.getByPlaceholderText(
      "auto-complete"
    ) as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: "ab" } });

    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toHaveClass("item-value");
      expect(wrapper.queryByText("11")).toHaveClass("item-number");
    });
  });

  test("async fetchSuggestions should works fine", async () => {
    cleanup();
    const data = await handleFetch("a");
    expect(data.length).toBeGreaterThan(0)
  });
});
