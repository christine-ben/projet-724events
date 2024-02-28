import { fireEvent, render, screen } from "@testing-library/react";
import Button, { BUTTON_TYPES } from "./index";


// Utilisation de la fonction describe de Jest pour regrouper les tests liés à la création d'un bouton
describe("When a button is created", () => {
  it("the button must include a title", () => {
    render(<Button title="my-button" type={BUTTON_TYPES.DEFAULT} />);
    const buttonElement = screen.getByTitle("my-button");
    expect(buttonElement).toBeInTheDocument();
  });
  it("the button must display a label", () => {
    render(<Button>label</Button>);
    const buttonElement = screen.getByText(/label/);
    expect(buttonElement).toBeInTheDocument();
  });

  //  groupe de tests pour les actions qui se produisent lorsque le bouton est cliqué.
  describe("and it's clicked", () => {
    it("an event onClick it executed", () => {
      const onClick = jest.fn();
      render(<Button onClick={onClick} />);
      const buttonElement = screen.getByTestId("button-test-id");
      fireEvent(
        buttonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      expect(onClick.mock.calls.length).toBeGreaterThan(0);
    });
  });

  //  groupe de tests pour les actions liées à un bouton de type "submit".
  describe("and selected type is submit", () => {
    it("an input submit is created", () => {
      render(<Button type={BUTTON_TYPES.SUBMIT}>label</Button>);
      const buttonElement = screen.getByTestId("button-test-id");
      expect(buttonElement.type).toEqual("submit");
    });
  });
});

