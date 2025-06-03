import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import CustomTooltip from "../CustomTooltip"; // Adjust path as needed
import { Button, Typography } from "@mui/material";

// Storybook metadata
export default {
    title: "Atoms/CustomTooltip",
    component: CustomTooltip,
    tags: ['autodocs'],
    args: {
        children: <Button variant="contained">Hover Me</Button>,
    },
} as Meta<typeof CustomTooltip>;

// Template for rendering
const Template: StoryFn<typeof CustomTooltip> = (args) => <CustomTooltip {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {
    title: (
        <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <Typography variant="body2">🍎 Apple</Typography>
            <Typography variant="body2">🍌 Banana</Typography>
            <Typography variant="body2">🍊 Orange</Typography>
            <Typography variant="body2">🍊 Orange</Typography>
            <Typography variant="body2">🍎 Apple</Typography>
            <Typography variant="body2">🍌 Banana</Typography>
            <Typography variant="body2">🍊 Orange</Typography>
            <Typography variant="body2">🍊 Orange</Typography>
        </div>
    ),
};

