import React, { useState } from "react";
import styled from "styled-components";

export function SelectRole(): JSX.Element {
    const [userRole, setUserRole] = useState<string>("");
    const ROLES = ["Owner", "Employee", "User"];

    const Select = styled.select`
        margin-left: 5px;
        text-align: center;
        display: inline-block;
        width: 115px;
        padding: 3px 0px;
        font-size: inherit;
        line-height: inherit;
        border: 1px solid;
        border-radius: 10px;
        color: inherit;
        background-color: transparent;
    `;

    function changeRole(key: string) {
        sessionStorage.setItem("user", key);
        setUserRole(key);
    }

    return (
        <div>
            <form>
                <label> Your Role </label>
                <Select
                    onChange={(e) => changeRole(e.target.value)}
                    name={userRole}
                    value={userRole}
                    id={userRole}
                    key={userRole}
                >
                    {ROLES.map((role: string) => (
                        <option value={role} key={role}>
                            {role}
                        </option>
                    ))}
                </Select>
            </form>
            {sessionStorage.getItem("user") === "Owner" && <span>Owner</span>}
        </div>
    );
}
