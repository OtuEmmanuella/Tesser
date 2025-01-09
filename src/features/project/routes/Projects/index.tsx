import { useSelector } from "react-redux";

import style from "./style.module.scss";

import { Link, Table, Button } from "@/components/Elements";
import { projectSlice } from "@/selectors";

import { CreateProject } from "../../components/CreateProject";

const columns = [
  { title: "No.", field: "index" },
  { title: "Title", field: "title" },
  { title: "Lead", field: "lead" },
  {
    title: "",
    field: "id",
    Cell: ({ entry }: { entry: any }) => (
      <div style={{ textDecoration: "underline" }}>
        <Link to={`/projects/${entry.id}`}>Manage</Link>
      </div>
    ),
  },
];

export const Projects = () => {
  const { projects } = useSelector(projectSlice);

  const projectList = Object.values(projects);

  const data = projectList.map((project, index) => {
    const { title, id, lead } = project;

    return {
      id,
      title,
      lead,
      index: index + 1,
    };
  });

  return (
    <div className={style["projects"]}>
      <div className={style["projects__header"]}>
        <h2>Projects</h2>
        <CreateProject
          trigger={<Button type="button">Create Project</Button>}
        />
      </div>

      <div className={style["projects__content"]}>
        <Table data={data} columns={columns as any} />
      </div>
    </div>
  );
};
