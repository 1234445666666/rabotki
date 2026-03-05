import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  argTypes: {
    type: {
      control: "select",
      options: ["info", "success", "error"],
    },
    message: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    type: "info",
    message: "Информация",
  },
};

export const Success: Story = {
  args: {
    type: "success",
    message: "Успешно!",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "Ошибка!",
  },
};
