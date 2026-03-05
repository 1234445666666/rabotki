import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { useState } from "react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    disabled: { control: "boolean" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button onClick={() => setCount(count - 1)}> - </Button>
        <span style={{ padding: "8px" }}>{count}</span>
        <Button onClick={() => setCount(count + 1)}> + </Button>
      </div>
    );
  },
};
