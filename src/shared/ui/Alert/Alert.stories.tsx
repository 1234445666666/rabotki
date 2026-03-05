import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";
import { useState } from "react";

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

export const Interactive: Story = {
  render: () => {
    type alert = {
      type: "info" | "success" | "error";
    };

    const [type, setType] = useState<alert["type"]>("info");

    return (
      <div>
        <Alert type={type} message={`Это ${type} сообщение`} />

        <div>
          <button onClick={() => setType("info")}>Info</button>
          <button onClick={() => setType("success")}>Success</button>
          <button onClick={() => setType("error")}>Error</button>
        </div>
      </div>
    );
  },
};
