import React, {
  ChangeEvent,
  KeyboardEvent,
  FC,
  ReactElement,
  useState,
  useEffect,
  useRef,
} from "react";
import Input, { InputProps } from "../Input/input";
import classNames from "classnames";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import { CSSTransition } from "react-transition-group";
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOptions?: (item: DataSourceType) => ReactElement;
}
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export const AutoComplate: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOptions,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState<boolean>(false);
  // 选中条件
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceValue = useDebounce(inputValue);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
          setShowDropdown(true)
        });
      } else {
        setSuggestions(results);
        setShowDropdown(true)
      }
    } else {
     setShowDropdown(false)
    }
    setHighlightIndex(-1);
  }, [debounceValue, triggerSearch]);
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    switch (e.keyCode) {
      case 13:
        suggestions[highlightIndex] &&
          handleSelect(suggestions[highlightIndex]);
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setShowDropdown(false)
        break;
        defalut: break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOptions ? renderOptions(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <CSSTransition
        in={loading || showDropdown} 
        classNames="zoom-in-top"
        timeout={300}
        onExited={() => setSuggestions([])}
        unmountOnExit
        appear
      >
        <ul className="fomalhaut-suggestion-list" data-testid="list-wrapper">
          {loading && (
            <div className="suggestion-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const classes = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={classes}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </CSSTransition>
    );
  };
  return (
    <div className="fomalhaut-auto-complete" ref={componentRef}>
      <Input
        onKeyDown={handleKeyDown}
        value={inputValue}
        autoComplete="off"
        onChange={handleChange}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplate