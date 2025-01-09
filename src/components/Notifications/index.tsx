import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";

import style from "./style.module.scss";

import { Notification } from "./Notification";

import { notificationsSlice } from "@/selectors";
import { dismissNotification } from "@/slices/notifications";

export const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector(notificationsSlice);

  const handleClose = (id: string) => dispatch(dismissNotification(id));

  const variants = {
    visible: { x: 0, opacity: 1 },
    hidden: { x: 10, opacity: 0.5 },
  };

  return (
    <div className={style["notifications"]}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            aria-live="assertive"
          >
            <Notification
              {...notification}
              handleClose={() => handleClose(notification.id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
