import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserColumn from "./usersColumn";
import { usersType } from "@/types";
import { method, useApi } from "@/hooks/useApi";

const UserManagement: React.FC = () => {
  const { handleSubmit, reset, control, formState: { errors } } = useForm<usersType>();
  const { fetchData, error, loading } = useApi(import.meta.env.VITE_PUBLIC_API);

  const onSubmit = async (data: usersType) => {
    fetchData("/users", method.post, { ...data, lastActive: new Date().toISOString().split('T')[0] })
      .then((res) => {
        console.log(res?.data);
        reset();
      });
  };



  return (
    <div className="max-w-[1400px] mx-auto py-6">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <header className="space-y-1.5 p-6 flex flex-row items-center justify-between">
          <div>
            <h1 className="font-semibold tracking-tight text-2xl">User Management</h1>
            <p className="text-sm text-muted-foreground">Manage your users, their roles and permissions.</p>
          </div>
          <Dialog>
            <DialogTrigger className="cursor-pointer h-10 bg-black text-white w-[113px] rounded-md">Add User</DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account with the following details.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 items-start gap-4">
                    <Label htmlFor="name" className="text-left">
                      Name
                    </Label>
                    <Controller
                      name="name"
                      control={control}
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="name"
                          className="col-span-3 w-[460px]"
                          placeholder="User Name"
                        />
                      )}
                    />
                    {errors.name && (
                      <span className="text-red-500">{errors.name.message}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="email" className="text-left">
                      Email
                    </Label>

                    <Controller
                      name="email"
                      control={control}
                      rules={{ required: "Email is required" }}
                      render={({ field }) => (
                        <Input
                          id="email"
                          {...field}
                          className="col-span-3 w-[460px]"
                          placeholder="Email"
                        />
                      )}
                    />
                    {errors.email && (
                      <span className="text-red-500">{errors.email.message}</span>
                    )}

                  </div>
                  <div className="flex justify-between">
                    <div>
                      <Label>Status</Label>
                      <Controller
                        name="status"
                        control={control}
                        rules={{ required: "Status is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.status && (
                        <span className="text-red-500">{errors.status.message}</span>
                      )}
                    </div>

                    <div>
                      <Label>Role</Label>
                      <Controller
                        name="role"
                        control={control}
                        rules={{ required: "Role is required" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Admin">Admin</SelectItem>
                              <SelectItem value="Editor">Editor</SelectItem>
                              <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.role && (
                        <span className="text-red-500">{errors.role.message}</span>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex justify-end">
                    <Button type="submit" className="cursor-pointer">Add User</Button>
                  </div>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        <div className="p-6 pt-0">
          <Input className="h-10" placeholder="Search users..." />
          <div className="mt-[1rem] inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-4">
            <Button className="rounded-sm bg-white h-[32px] text-black hover:bg-unset cursor-pointer">All Users</Button>
            <Button className="rounded-sm bg-muted h-[32px] text-black hover:bg-unset cursor-pointer">Active</Button>
            <Button className="rounded-sm bg-muted h-[32px] text-black hover:bg-unset cursor-pointer">Inactive</Button>
            <Button className="rounded-sm bg-muted h-[32px] text-black hover:bg-unset cursor-pointer">Pending</Button>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="rounded-md border">
            <div className="flex border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <div className="flex items-center w-[254px] h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Name</div>
              <div className="flex items-center w-[324px] h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Email</div>
              <div className="flex items-center w-[195px] h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Status</div>
              <div className="flex items-center w-[149px] h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Role</div>
              <div className="flex items-center w-[220px] h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">Last Active</div>
              <div className="flex items-center w-[206px] h-12 px-4 align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 justify-end">Actions</div>
            </div>

            <UserColumn />

          </div>
        </div>

      </div>
    </div >
  );
};

export default UserManagement;
