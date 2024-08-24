import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the fetch function
const fetchPosts = async () => {
  const authToken =
    "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyVHlwZUlkIjoidXNlLTQxNmZhZmM3LWJlODAtNDdmOS1iOTJjLWQyN2U3NjQ5MWI2NCIsInN1YiI6InVzZS1hOTYwMzczMy00NTAxLTQwYTUtYjJmYi02MGE5MGUyZmI0ZWMiLCJpYXQiOjE3MjQxNDMxNDksImV4cCI6MTcyNDE0Mzc0OX0.-EYdyYNiVaPSBoYXywDmqs280C5XtR9fm_XnsJtcCaMRcN4W_TkHDLAGo0o6Ea557uDquzGUbHzT_mPqrsZW6A"; // Replace with your actual auth token

  try {
    const response = await axios.get("http://localhost:8080/roles", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be caught by react-query
  }
};

function RoleInfo() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>An error occurred: {error.message}</div>;

  if (!data || !data.results) return <div>No roles available.</div>;

  return (
    <div>
      <h1>Get All Roles</h1>
      <ul>
        {data.results.map((role) => (
          <li key={role.roleId}>
            <div>
              <strong>ID:</strong> {role.roleId}
            </div>
            <div>
              <strong>Name:</strong> {role.roleName}
            </div>
            <div>
              <strong>Description:</strong> {role.description}
            </div>
            <div>
              <strong>Status:</strong> {role.status}
            </div>
            <div>
              <strong>Created By:</strong> {role.createdBy}
            </div>
            <div>
              <strong>Created At:</strong>{" "}
              {new Date(role.createdAt).toLocaleDateString()}
            </div>
            <div>
              <strong>Updated At:</strong>{" "}
              {new Date(role.updatedAt).toLocaleDateString()}
            </div>
            {role.privileges && role.privileges.length > 0 && (
              <div>
                <h3>Privileges</h3>
                <ul>
                  {role.privileges.map((privilege) => (
                    <li key={privilege.id}>
                      <div>
                        <strong>Privilege Name:</strong> {privilege.name}
                      </div>
                      {privilege.subPrivileges &&
                        privilege.subPrivileges.length > 0 && (
                          <ul>
                            {privilege.subPrivileges.map((subPrivilege) => (
                              <li key={subPrivilege.id}>
                                <div>
                                  <strong>Sub-Privilege Name:</strong>{" "}
                                  {subPrivilege.name}
                                </div>
                                {subPrivilege.parentName && (
                                  <div>
                                    <strong>Parent Name:</strong>{" "}
                                    {subPrivilege.parentName}
                                  </div>
                                )}
                                <ul>
                                  {subPrivilege.actions.map((action) => (
                                    <li key={action.id}>
                                      <strong>Action:</strong> {action.name}
                                    </li>
                                  ))}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {role.assets && role.assets.length > 0 && (
              <div>
                <h3>Assets</h3>
                <ul>
                  {role.assets.map((asset) => (
                    <li key={asset.id}>
                      <strong>Asset Name:</strong> {asset.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoleInfo;
