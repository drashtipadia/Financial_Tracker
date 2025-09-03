import { useState } from "react";
import Input from "../components/Input";
import EmojiPickerPopup from "../components/EmojiPickerPopup";

const IncomeForm = ({ onAddIncome, onUpdateIncome, data }) => {
  const [income, setIncome] = useState({ ...data });
  const handleChange = (key, value) => setIncome({ ...income, [key]: value });
  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, salary, etc"
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div className="flex justify-end mt-6">
        {onAddIncome && (
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={() => onAddIncome(income)}
          >
            Add Income
          </button>
        )}
        {onUpdateIncome && (
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={() => onUpdateIncome(income)}
          >
            Update Income
          </button>
        )}
      </div>
    </div>
  );
};

export default IncomeForm;
