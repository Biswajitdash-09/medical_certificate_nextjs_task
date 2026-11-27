import { render, screen, fireEvent } from "@testing-library/react";
import { brands } from "@/brands";
import { ApplyForm } from "./ApplyForm";

// Submitting without the acknowledgement shows the error under that field and no confirmation
test("blocks submit until required fields and acknowledgement are given", () => {
  render(<ApplyForm brand={brands.gmc} />);
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByText(/please confirm/i)).toBeInTheDocument();
  expect(screen.queryByText(/nothing was sent/i)).toBeNull();
});

// A valid submit shows the honest prototype screen, never a fake success
test("valid submit shows the prototype notice", () => {
  render(<ApplyForm brand={brands.dr} initialType="medical-fitness" />);
  fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "Ana" } });
  fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: "Lim" } });
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "ana@example.com" } });
  fireEvent.change(screen.getByLabelText(/age/i), { target: { value: "28" } });
  fireEvent.change(screen.getByLabelText(/reason/i), { target: { value: "Fitness check for a new job" } });
  fireEvent.click(screen.getByRole("checkbox"));
  expect((screen.getByLabelText(/certificate type/i) as HTMLSelectElement).value).toBe("medical-fitness");
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByText(/nothing was sent/i)).toBeInTheDocument();
});

// dr serves people aged 16 and over, so a younger age is rejected at the field
test("dr rejects an age under 16", () => {
  render(<ApplyForm brand={brands.dr} />);
  fireEvent.change(screen.getByLabelText(/age/i), { target: { value: "15" } });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByText(/is for people aged 16 or older/i)).toBeInTheDocument();
});
