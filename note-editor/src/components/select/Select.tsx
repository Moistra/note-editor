import React, { useEffect, useRef, useState } from "react";
import { Tag } from "@components/";
import { SelectOption } from "@types/";

import style from "@styles/components/selects/select.module.scss";

interface MultipleSelectProps {
  isMultiple: true;
  onChange: (value: SelectOption[]) => void;
  value: SelectOption[];
}

type SingleSelectProps = {
  isMultiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

export const Select = ({
  value,
  onChange,
  options,
  isMultiple,
}: SelectProps) => {



  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen)
      setHighlightedIndex(0);
  }, [isOpen])


  useEffect(() => {
    const accessibilityHandler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current)
        return
      switch (e.code) { 
        case "Enter":
        case "Space":
          setIsOpen(prev => !prev);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case "ArrowUp": 
        case "ArrowDown": {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newHighlightIndex = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newHighlightIndex >= 0 && newHighlightIndex < options.length)
            setHighlightedIndex(newHighlightIndex);
          break;
        }
        case "Escape":
          setIsOpen(false);
      }
    }
    containerRef.current?.addEventListener("keydown", accessibilityHandler)

    return () => {
      containerRef.current?.removeEventListener("keydown", accessibilityHandler)
    }
  }, [isOpen, highlightedIndex, options])


  function clearOptions() {
    isMultiple ? onChange([]) : onChange(undefined);
  }

  function selectOption(option: SelectOption) {
    if (isMultiple) {
      if (value.includes(option)) {
        onChange(value.filter((el) => el !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      onChange(option);
    }
  }

  function isOptionSelected(option: SelectOption) {
    return isMultiple ? value.includes(option) : option === value;
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className={style.wrapper}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <span className={style.value}>
        {isMultiple
          ? value.map((el) => (
              <button className={style["value-element"]}>
                <Tag
                  key={el.value}
                  onClick={(e) => {
                    e.stopPropagation();
                    selectOption(el);
                  }}
                >
                  {el.label}{" "}
                  <span className={style["close-button"]}>&times;</span>
                </Tag>
              </button>
            ))
          : value?.label}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={style["close-button"]}
      >
        &times;
      </button>

      <div className={style.divider}></div>
      <div className={style.caret}></div>
      <ul className={`${style.options} ${isOpen ? style.show : ""}`}>
        {options.map((option, index) => (
          <li
            key={option.value}
            className={`${style.option} 
              ${isOptionSelected(option) ? style.selected : ""} 
              ${index === highlightedIndex ? style.highlighted : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
