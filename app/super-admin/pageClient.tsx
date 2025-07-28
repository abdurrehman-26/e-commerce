'use client';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import API from "@/API";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  isSuperAdmin?: boolean;
}

export default function SuperAdminClient({usersData}: {usersData: User[]}) {
  const [users, setUsers] = useState(usersData)

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      if (newRole === "admin") {
        await API.admin.makeAdmin({userID: userId})
    } else {
        await API.admin.downgradeAdmin({userID: userId})
      }

      toast.success("User role updated");
      setUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, isAdmin: newRole === "admin" }
            : user
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">User Management</h1>
      {users.map((user) => (
          <Card key={user._id}>
          <CardContent className="flex items-center justify-between p-4">
              <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {user.isSuperAdmin ? (
              <span className="text-blue-600 font-semibold">Super Admin</span>
              ) : (
              <div className="flex items-center gap-2">
                  {user.isAdmin ? (
                  <button
                      onClick={() => handleRoleChange(user._id, "user")}
                      className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1.5 rounded"
                  >
                      Downgrade To User
                  </button>
                  ) : (
                  <button
                      onClick={() => handleRoleChange(user._id, "admin")}
                      className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1.5 rounded"
                  >
                      Make Admin
                  </button>
                  )}
              </div>
              )}
          </CardContent>
          </Card>
      ))}
      </div>

  );
}
