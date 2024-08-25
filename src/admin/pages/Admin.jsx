import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ECommerce from './Dashboard/ECommerce';
import UsersList from './accounts/users/usersList';
import AdminsList from './accounts/admins/adminsList';
import PageTitle from './../components/PageTitle';
import CoursesList from './Courses/CoursesList';
import Settings from './Settings';
import Profile from './Profile';
import DefaultLayout from './../layout/DefaultLayout';
import Loader from './../common/Loader/index';
// import '../css/style.css';
import '../css/satoshi.css';
// import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return loading ? (
        <Loader />
    ) : (
        <DefaultLayout>
            <Routes>
                <Route
                    index
                    element={
                        <>
                            <PageTitle title="eCommerce Dashboard page" />
                            <ECommerce />
                        </>
                    }
                />
                <Route
                    path="profile"
                    element={
                        <>
                            <PageTitle title="Profile page" />
                            <Profile />
                        </>
                    }
                />
                <Route
                    path="settings"
                    element={
                        <>
                            <PageTitle title="Settings page" />
                            <Settings />
                        </>
                    }
                />
                <Route
                    path="courses"
                    element={
                        <>
                            <PageTitle title="Courses page" />
                            <CoursesList />
                        </>
                    }
                />
                <Route
                    path="accounts/adminList"
                    element={
                        <>
                            <PageTitle title="Admins List page" />
                            <AdminsList />
                        </>
                    }
                />
                <Route
                    path="accounts/userList"
                    element={
                        <>
                            <PageTitle title="Users list page" />
                            <UsersList />
                        </>
                    }
                />
            </Routes>
        </DefaultLayout>
    );
}

export default Admin;
