import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Calculator from "./Calculator";
import i18n from "@/i18n";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

let container: HTMLDivElement;
let root: Root;

function input(label: string) {
  const element = container.querySelector<HTMLInputElement>(
    `input[aria-label="${label}"]`
  );

  if (!element) {
    throw new Error(`Input not found: ${label}`);
  }

  return element;
}

function changeInput(element: HTMLInputElement, value: string) {
  const valueSetter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )?.set;

  act(() => {
    valueSetter?.call(element, value);
    element.dispatchEvent(new Event("input", { bubbles: true }));
  });
}

function click(element: Element) {
  act(() => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
}

beforeEach(async () => {
  await i18n.changeLanguage("en");
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);

  act(() => {
    root.render(
      <I18nextProvider i18n={i18n}>
        <Calculator />
      </I18nextProvider>
    );
  });
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
});

describe("Calculator volume state", () => {
  it("clears calculated volume when units change", () => {
    changeInput(input("Length in in"), "2");
    changeInput(input("Width in in"), "3");
    changeInput(input("Height in in"), "4");

    expect(input("Volume in in³").value).toBe("24.00");

    const centimeters = container.querySelector("#unitsCm");
    if (!centimeters) throw new Error("Centimeters radio not found");

    click(centimeters);

    expect(input("Volume in cm³").value).toBe("");
    expect(input("Length in cm").value).toBe("");
  });

  it("clears calculated volume when shape changes", () => {
    changeInput(input("Length in in"), "2");
    changeInput(input("Width in in"), "3");
    changeInput(input("Height in in"), "4");

    expect(input("Volume in in³").value).toBe("24.00");

    const shapeButtons = Array.from(
      container.querySelectorAll<HTMLButtonElement>(
        "button:not([role='combobox'])"
      )
    );
    const cubeButton = shapeButtons[0];
    if (!cubeButton) throw new Error("Cube shape button not found");

    click(cubeButton);

    expect(input("Volume in in³").value).toBe("");
    expect(input("Side length in in").value).toBe("");
  });
});
