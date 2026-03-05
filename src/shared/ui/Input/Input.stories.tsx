import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

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
    placeholder: "Напиши имя",
  },
};

export const WithError: Story = {
  args: {
    value: "ошибка",
    error: "поле обязательно",
  },
};

export const Disabled: Story = {
  args: {
    value: "заблокировано",
    disabled: true,
  },
};
