import React from "react";

interface ProfileDataProps {
    graphData: {
        surname: string;
        givenName: string;
    };
}

/**
 * Renders information about the user obtained from MS Graph
 * @param props 
 */

export const ProfileData: React.FC<ProfileDataProps> = (props) => {

    return (
        <div id="profile-div">
            <p><strong>Last Name: </strong> {props.graphData.surname}</p>
            <p><strong>First Name: </strong> {props.graphData.givenName}</p>
        </div>
    );
};
