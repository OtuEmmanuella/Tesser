import SVG from "react-inlinesvg";
import { motion } from "framer-motion";

import archive from "@/assets/archive.svg";

import style from "./style.module.scss";

interface TableColumn<Entry> {
  title: string;
  field: keyof Entry;
  Cell?({ entry }: { entry: Entry }): React.ReactElement;
}

export interface TableProps<Entry> {
  data: Entry[];
  columns: TableColumn<Entry>[];
}

export const Table = <Entry extends { id: string }>({
  data,
  columns,
}: TableProps<Entry>) => {
  if (!data?.length) {
    return (
      <div className={style["table__empty"]}>
        <h4>You do not have any projects</h4>
        <SVG src={archive} width={64} height={64} />
      </div>
    );
  }

  return (
    <div className={style["table"]}>
      <table>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th key={column.title + index} scope="col">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((entry, entryIndex) => (
            <motion.tr
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: entryIndex * 0.1 },
              }}
              key={entry?.id || entryIndex}
            >
              {columns.map(({ Cell, field, title }, columnIndex) => (
                <td key={title + columnIndex}>
                  {Cell ? <Cell entry={entry} /> : entry[field]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
