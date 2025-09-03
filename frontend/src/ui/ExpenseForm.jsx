import { useState } from "react";
import Input from "../components/Input";
import EmojiPickerPopup from "../components/EmojiPickerPopup";

const ExpenseForm = ({ onAddExpense, onUpdateExpense, data }) => {
  const [expense, setExpense] = useState({ ...data });
  const [errors, setErrors] = useState({});
  const handleChange = (key, value) => setExpense({ ...expense, [key]: value });
  const validate = () => {
    let newErrors = {};
    if (!expense.amount) newErrors.amount = "Amount is required";
    if (!expense.category) newErrors.source = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <form>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries etc"
        type="text"
      />
      {errors.category && (
        <p className="text-red-500 text-xs">{errors.category}</p>
      )}
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        {onAddExpense && (
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={() => onAddExpense(expense)}
          >
            Add Expense
          </button>
        )}
        {onUpdateExpense && (
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={() => {
              if (validate) {
                onUpdateExpense(expense);
              }
            }}
          >
            Update Expense
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
