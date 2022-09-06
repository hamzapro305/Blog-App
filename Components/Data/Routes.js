const UserNavigation = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Profile",
        path: "/Dashboard/Profile",
    },
    {
        name: "Edit Profile",
        path: "/Dashboard/EditProfile",
    },
    {
        name: "Blogs",
        path: "/Blogs",
    },
    {
        name: "Contact",
        path: "/Contact",
    },
]

const NavigationRoutes = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Blogs",
        path: "/Blogs",
    },
    {
        name: "Login",
        path: "/Login",
    },
    {
        name: "Contact",
        path: "/Contact",
    },
];

const NavigationCheck = (status) => {
    return status === true ? UserNavigation : NavigationRoutes
}

export { NavigationCheck }