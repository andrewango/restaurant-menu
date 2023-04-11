import React, { useState } from "react";
import { Form } from "react-bootstrap";

// interface SelectRoleProps {
//     setUserRole: (newUserRole: string) => void;
//     userRole: string;
// }

export function SelectRole(): JSX.Element {
    const [userRole, setUserRole] = useState<string>("Owner");
    const ROLES = ["Owner", "Employee", "User"];
    //const [visible, setVisible] = useState<boolean>(false);

    return (
        <div>
            <h3>Select Role</h3>
            <div>
                {ROLES.map((role: string) => (
                    <Form.Check
                        inline
                        type="radio"
                        name={role}
                        onChange={(e) => setUserRole(e.target.value)}
                        id={role}
                        label={role}
                        key={role}
                        value={role}
                        checked={userRole === role}
                    />
                ))}
                <br></br>
                Your role is <span>{userRole}</span>
            </div>
        </div>
    );
}
