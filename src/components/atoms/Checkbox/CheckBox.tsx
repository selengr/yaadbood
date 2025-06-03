import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";
import { useState } from "react";

const CheckIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.4891 1.66797H6.50573C3.4724 1.66797 1.66406 3.4763 1.66406 6.50964V13.4846C1.66406 16.5263 
    3.4724 18.3346 6.50573 18.3346H13.4807C16.5141 18.3346 18.3224 16.5263 18.3224 13.493V6.50964C18.3307 
    3.4763 16.5224 1.66797 13.4891 1.66797ZM13.9807 8.08464L9.25573 12.8096C9.13906 12.9263 8.98073 12.993 
    8.81406 12.993C8.6474 12.993 8.48906 12.9263 8.3724 12.8096L6.01406 10.4513C5.7724 10.2096 5.7724 9.80964 
    6.01406 9.56797C6.25573 9.3263 6.65573 9.3263 6.8974 9.56797L8.81406 11.4846L13.0974 7.2013C13.3391 6.95964 
    13.7391 6.95964 13.9807 7.2013C14.2224 7.44297 14.2224 7.83464 13.9807 8.08464Z" fill="#1DA1F3" />
</svg>

const UncheckedIcons = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.4974 18.3346H12.4974C16.6641 18.3346 18.3307 16.668 18.3307 12.5013V7.5013C18.3307 3.33464 16.6641 1.66797 
    12.4974 1.66797H7.4974C3.33073 1.66797 1.66406 3.33464 1.66406 7.5013V12.5013C1.66406 16.668 3.33073 18.3346 7.4974 18.3346Z"
        stroke="#CBD5E1" strokeLinecap="round" strokeLinejoin="round" />
</svg>

interface CustomCheckBoxProps extends CheckboxProps {
    label?: string;
}

const CustomCheckBox = (WrappedComponent: React.ComponentType<CheckboxProps>) => {
    return function WithCustomCheckBoxComponent(props: CustomCheckBoxProps) {

        const { label, ...otherProps } = props;

        return (
            <FormControlLabel
                sx={(theme) => ({
                    width: "83px",
                    height: "36px",
                    userSelect: "none",
                    marginRight: 0,
                    bgcolor: otherProps.checked ? theme.palette.primary["50"] : theme.palette.gray["100"],
                    borderRadius: "12px",
                    // color: theme.palette.primary["500"],
                    color: otherProps.checked ? theme.palette.primary["500"] : theme.palette.gray["600"],
                })}
                control={
                    <WrappedComponent {...otherProps}
                        // defaultChecked
                        checkedIcon={<CheckIcon />}
                        icon={<UncheckedIcons />}
                    />
                }
                label={label}
            />
        );
    };
}

export default CustomCheckBox(Checkbox);