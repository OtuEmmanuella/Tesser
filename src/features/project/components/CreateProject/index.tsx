import * as React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import SVG from "react-inlinesvg";

import close from "@/assets/close.svg";

import style from "./style.module.scss";

import { Button, Dialog } from "@/components/Elements";

import { useDisclosure } from "@/hooks/useDisclosure";
import { InputField } from "@/components/Form/InputField";
import { delay } from "@/utils/delay";
import { addProject } from "@/slices/projects";
import { nanoid } from "@reduxjs/toolkit";
import { addTicket } from "@/slices/tickets";

interface DetailsModalProp {
  trigger: React.ReactElement;
}

export const CreateProject = ({ trigger }: DetailsModalProp) => {
  const dispatch = useDispatch();
  const { isOpen, handleClose, handleOpen } = useDisclosure();

  const triggerButton = React.cloneElement(trigger, { onClick: handleOpen });

  const initialFormValues = {
    title: "",
    lead: "",
  };

  const handleSubmit = async (values: typeof initialFormValues) => {
    await delay(2000); //simulate an api call

    let id = nanoid();
    dispatch(addProject({ id, title: values.title, lead: values.lead })); //create project

    //Create initial tickets
    dispatch(addTicket({ title: "To do", projectId: id }));
    dispatch(addTicket({ title: "In Progress", projectId: id }));
    dispatch(addTicket({ title: "Done", projectId: id }));

    handleClose();
  };

  return (
    <>
      <div className={style["project-trigger"]}>{triggerButton}</div>
      <Dialog isOpen={isOpen} handleClose={handleClose} fillPage={true}>
        <div className={style["project"]}>
          <div className={style["project-header"]}>
            <div className={style["project-header-content"]}>
              <h2>Create a new project</h2>
              <div className={style["project-header-content-text"]}></div>
            </div>
            <button
              type="button"
              aria-label="close"
              onClick={handleClose}
              className={style["project-close-button"]}
            >
              <SVG src={close} width={24} height={24} />
            </button>
          </div>

          <div className={style["project-body"]}>
            <div>
              <Formik
                initialValues={initialFormValues}
                onSubmit={handleSubmit} //handled by handleTransfer function which is called from the confirm button
                validationSchema={yup.object({
                  title: yup.string().required("Project title is required"),
                  lead: yup.string().required("Project lead is required"),
                })}
              >
                {(props) => (
                  <Form>
                    <InputField
                      id="title"
                      name="title"
                      error={props.errors.title}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      label="Project Title"
                      type="string"
                      placeholder="eg. School report"
                    />

                    <InputField
                      id="lead"
                      name="lead"
                      error={props.errors.lead}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.lead}
                      label="Project Lead"
                      type="string"
                      placeholder="eg. Adeleke"
                    />

                    <div style={{ maxWidth: "200px" }}>
                      <Button type="submit" isLoading={props.isSubmitting}>
                        Create Project
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
