import React, { ReactNode } from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = (props) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            {props.children}
            { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
        </>
    );
};
