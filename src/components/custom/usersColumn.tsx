import { ReloadCTX } from "@/contexts/reload";
import { method, useApi } from "@/hooks/useApi";
import { usersType } from "@/types";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
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
import { Input } from "../ui/input";
import { useForm, Controller } from "react-hook-form";


function UserColumn() {
    const [users, setUser] = useState<usersType[]>([]); 
    const [reload, setReload] = useContext(ReloadCTX);
    const { fetchData, error, loading } = useApi(import.meta.env.VITE_PUBLIC_API);
    const [activeUserId, setActiveUserId] = useState<string | null>(null);
    const { handleSubmit, reset, control, formState: { errors } } = useForm<usersType>();

    useEffect(() => {
        fetchData("/users", method.get)
            .then((res) => {
                console.log(res?.data);
                setUser(res?.data);
            });
        error;
    }, [reload]);

    const onSubmit = async (data: usersType) => {
        try {
            const response = await fetchData(`/users/${activeUserId}`, method.patch, {
                ...data,
                lastActive: new Date().toISOString().split("T")[0],
            });
            if (!response?.data) {
                throw new Error("Response data is null or undefined");
            }
            console.log("User updated:", response?.data);
            setReload((prev: any) => !prev);
            reset();
            setActiveUserId(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetchData(`/users/${activeUserId}`, method.delete);
            if (!response?.data) {
                throw new Error("Response data is null or undefined");
            }
            console.log("User deleted:", response?.data);
            setReload((prev: any) => !prev);
            setActiveUserId(null);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }


    const toggleActions = (userId: string) => {
        setActiveUserId(activeUserId === userId ? null : userId);
    };

    return (
        <>
            <div>
                {users.map((user: usersType) => (
                    <div key={user.id}>
                        <div className="flex border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                            <div className="flex items-center w-[254px] h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                {user.name}
                            </div>
                            <div className="flex items-center w-[324px] h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                {user.email}
                            </div>
                            <div className="flex items-center w-[195px] h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                <span
                                    className={
                                        user.status === "Active"
                                            ? "text-green-500"
                                            : user.status === "Pending"
                                                ? "text-red-500"
                                                : "text-muted-foreground"
                                    }
                                >
                                    {user.status}
                                </span>
                            </div>
                            <div className="flex items-center w-[149px] h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                {user.role}
                            </div>
                            <div className="flex items-center w-[220px] h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
                                {user.lastActive}
                            </div>
                            <div className="relative flex items-center w-[206px] h-12 align-middle font-medium justify-end">
                                <Button
                                    className="bg-white cursor-pointer text-black hover:bg-muted"
                                    onClick={() => toggleActions(user.id)}
                                >
                                    Actions
                                </Button>
                            </div>
                        </div>

                        {/* Условный рендеринг блока с кнопками Edit и Delete */}
                        {activeUserId === user.id && (
                            <div className="flex-col flex justify-end w-[128px] bg-white shadow-sm rounded-sm p-[4px] absolute right-[100px] z-1">
                                <Dialog>
                                    <DialogTrigger>
                                        <Button className="flex cursor-pointer bg-white hover:bg-muted items-center w-full px-4 py-2 text-black">
                                            Edit
                                        </Button></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Edit User</DialogTitle>
                                            <DialogDescription>
                                                Update user account details.                                            </DialogDescription>
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
                                                    <Button type="submit" className="cursor-pointer">Edit User</Button>
                                                </div>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button className="flex cursor-pointer bg-white hover:bg-muted items-center w-full px-4 py-2 text-sm text-red-500">
                                            Delete
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                                            <DialogDescription>
                                                This action cannot be undone. This will permanently delete your account
                                                and remove your data from our servers.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <Button onClick={handleDelete} className="flex cursor-pointer bg-white hover:bg-muted items-center w-full px-4 py-2 text-sm text-red-500">
                                            Delete
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}

export default UserColumn;
