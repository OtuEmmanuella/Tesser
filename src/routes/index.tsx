import * as React from "react";
import { useRoutes, Outlet } from "react-router-dom";

import { NotFound } from "@/features/misc";
import { Landing } from "@/features/misc";

import { Spinner } from "@/components/Elements";
import { MainLayout } from "@/components/Layout/MainLayout";

import { lazyImport } from "@/utils/lazyImport";

const { Project } = lazyImport(() => import("@/features/project"), "Project");
const { Projects } = lazyImport(() => import("@/features/project"), "Projects");

function Layout() {
  return (
    <MainLayout>
      <React.Suspense
        fallback={
          <div className="fill-center">
            <Spinner size="xl" variant="primary" />
          </div>
        }
      >
        <Outlet />
      </React.Suspense>
    </MainLayout>
  );
}

function ProjectsLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Landing /> },
        {
          path: "/projects",
          element: <ProjectsLayout />,
          children: [
            { index: true, element: <Projects /> },
            { path: "/projects/:id", element: <Project /> },
          ],
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};
