import React from "react";
import { MdArrowDropDown } from "react-icons/md";
import { Avatar, Dropdown, Space } from "antd";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/util/supabase/action";

const TopBar = ({ user }: { user: string }) => {
    const router = useRouter();

    const handleLogout = async () => {
        signOut().then(() => {
            router.push("/");
        });
    };

    return (
        <div className="flex h-[70px] justify-between items-center px-4 shadow-lg bg-gradient-to-r from-blue-600 to-blue-800">
            {/* Logo or Title */}
            <div
                onClick={() => {
                    router.push("/activity");
                }}
                className="text-white text-xl font-bold cursor-pointer hover:opacity-90"
            >
                Dashboard
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <Avatar
                        size={40}
                        src={
                            <Image
                                src="https://www.w3schools.com/howto/img_avatar.png"
                                alt="Avatar"
                                width={30}
                                height={30}
                            />
                        }
                    />

                    <div className="flex items-center gap-2 text-white">
                        <Space size="middle">
                            <Dropdown
                                placement="bottomRight"
                                menu={{
                                    items: [
                                        {
                                            key: "2",
                                            label: (
                                                <span
                                                    className="flex items-center gap-2 text-red-600 hover:text-red-400"
                                                    onClick={handleLogout}
                                                >
                                                    <FiLogOut className="text-[18px]" /> Logout
                                                </span>
                                            ),
                                        },
                                    ],
                                }}
                            >
                                <div className="flex items-center gap-2 cursor-pointer hover:opacity-90">
                                    <h3 className="text-[18px] font-medium">{user}</h3>
                                    <MdArrowDropDown className="text-[20px]" />
                                </div>
                            </Dropdown>
                        </Space>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(TopBar);
