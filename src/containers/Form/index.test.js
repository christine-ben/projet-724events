import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";


describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });
//  tests pour le cas où un clic est déclenché sur le bouton de soumission.
  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);
      fireEvent(
        await screen.findByTestId("button-test-id"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      
      await screen.findByText("En cours");
      // ******correction******
      // console.log("Avant findByText");
      /* En augmentant le délai d'attente avec { timeout: 5000 },je  donne plus de temps
       au test pour trouver l'élément. */
      await screen.findByText("Envoyer", {}, { timeout: 5000 });
      // console.log("Après findByText");
      expect(onSuccess).toHaveBeenCalled();
    });
  });
});

