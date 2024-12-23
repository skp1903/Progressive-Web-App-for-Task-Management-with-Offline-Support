import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { bottomSidebarItems, topSidebarItems } from "@/shared/data/sidebarItems";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;

const Sidebar = (): JSX.Element => {
    const router = useRouter();
    const location = usePathname();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleMenuClick = (key: string) => {
        if (key === "/login") {
            sessionStorage.removeItem("token");
            router.push("/login");
        } else {
            router.push(key);
            setSelectedKeys([key]);
        }
    };
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    useEffect(() => {
        const path = location
        const link = (topSidebarItems || bottomSidebarItems).find((link) => link.key === path);
        if (link) {
            setSelectedKeys([link.key]);
        }
    }, [location]);
    return (
        <div>
            <Layout
                hasSider
                style={{ padding: "24px 0", background: "#fff" }}
                className="flex flex-col h-screen top-0 sticky"
            >
                <Sider style={{ background: "#ADD8E6" }} width={250}>
                    <Menu
                        onClick={({ key }) => handleMenuClick(key)}
                        mode="inline"
                        className="flex flex-col"
                        selectedKeys={selectedKeys}
                        defaultSelectedKeys={["/activity"]}
                    >
                        {topSidebarItems.map((item) => (
                            <Menu.Item
                                key={item.key}
                                icon={item.icon}
                                disabled={item.disabled}
                            >
                                <span className="sidebar_style" style={{ color: "#0000FF" }}>{item.title}</span>
                            </Menu.Item>
                        ))}
                    </Menu>
                    <Menu
                        onClick={({ key }) => handleMenuClick(key)}
                        mode="inline"
                        className="flex flex-col mt-[2rem]"
                        selectedKeys={selectedKeys}
                        defaultSelectedKeys={["/dashboard"]}
                    >
                        <span className="text-[14px] px-[1.8rem] py-[1.5rem] sidebar_style" style={{ color: "#0000FF" }}>Account</span>
                        {bottomSidebarItems.map((item) => (
                            <Menu.Item
                                key={item.key}
                                icon={item.icon}
                                disabled={item.disabled}
                            >
                                <span className="sidebar_style" style={{ color: "#0000FF" }}>{item.title}</span>
                            </Menu.Item>
                        ))}
                    </Menu>
                </Sider>
            </Layout>
        </div>
    );
};

export default React.memo(Sidebar);
