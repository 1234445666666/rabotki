import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  argTypes: {
    placeholder: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Введите текст...",
  },
};

export const WithError: Story = {
  args: {
    value: "Ошибка",
    error: "Поле обязательно",
  },
};

export const Disabled: Story = {
  args: {
    value: "Заблокировано",
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setError(newValue.length < 3 ? "Минимум 3 символа" : "");
    };

    return (
      <Input
        placeholder="Введите минимум 3 символа"
        value={value}
        error={error}
        onChange={handleChange}
      />
    );
  },
};
