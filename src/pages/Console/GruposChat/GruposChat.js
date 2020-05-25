import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import PrimaryHeading from "../../../components/UI/PrimaryHeading/PrimaryHeading";
import Modal from "../../../components/UI/Modal/Modal";
import Input from "../../../components/Form/Group/InputGroup/InputGroup";
import LayoutContext from "../../../pages/Console/Layout/Layout-context";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "../../../axios-instance";

import styles from "./GruposChat.module.css";

const formSchema = yup.object().shape({
  name: yup.string().required("É necessário preencher o nome."),
  phone: yup
    .string()
    .required("É necessário preencher o telefone.")
    .min(14, "Preencha um número válido."),
});

class GruposChat extends Component {
  state = {
    groups: [],
    modalIsOpen: false,
    errorMessage: null,
    isLoading: false,
  };

  static contextType = LayoutContext;

  componentDidMount() {
    axios.get("/chats").then((res) => this.setState({ groups: res.data }));
  }

  closeModalHandler = () => {
    this.setState({ ...this.state, modalIsOpen: false });
  };

  openModalHandler = () => {
    this.setState({ ...this.state, modalIsOpen: true });
  };

  onDeleteGroupHandler = (groupId) => {
    axios
      .delete("/chat/" + groupId)
      .then((res) => {
        const deletedGroupId = res.data.deletedChatId;
        const updatedGroups = [...this.state.groups].filter(
          (group) => group.id !== parseInt(deletedGroupId)
        );

        this.setState({ groups: updatedGroups });
      })
      .catch((err) => {
        if (err.response.data) {
          alert("Erro! " + err.response.data.error);
        }
      });
  };

  addNewGroupHandler = (formData, errors) => {
    this.setState({ isLoading: true, errorMessage: null });

    const firstError = this.getFirstFormikError(errors);
    if (firstError) {
      return this.setState({ errorMessage: firstError, isLoading: false });
    }

    const dataToPost = {
      ...formData,
      institutionId: this.context.institution.id,
    };

    axios
      .post("/chat", dataToPost)
      .then((res) => {
        const updatedGroups = [...this.state.groups];
        updatedGroups.push(res.data);

        this.setState({
          groups: updatedGroups,
          isLoading: false,
          modalIsOpen: false,
        });
      })
      .catch((err) => {
        if (err.response.data) {
          this.setState({ errorMessage: err.response.data.error });
        }
        this.setState({ isLoading: false });
      });
  };

  getFirstFormikError = (errors) => {
    const errorKeys = Object.keys(errors);
    const firstError = errors[errorKeys[0]];
    return firstError;
  };

  render() {
    let linearProgress;
    if (this.state.isLoading) {
      linearProgress = <LinearProgress />;
    }

    let alertError;
    if (this.state.errorMessage) {
      alertError = <Alert severity="error">{this.state.errorMessage}</Alert>;
    }

    return (
      <div>
        <Modal
          open={this.state.modalIsOpen}
          handleClose={this.closeModalHandler}
        >
          <Formik
            validationSchema={formSchema}
            initialValues={{
              name: "",
              phone: "",
            }}
            initialErrors={{
              error: "É necessário preencher os campos.",
            }}
          >
            {(formikProps) => (
              <Box className={styles.modal}>
                <PrimaryHeading>Novo Grupo</PrimaryHeading>
                <Input
                  label="Nome do Grupo*"
                  inputValue={formikProps.values.name}
                  inputOnChange={formikProps.handleChange("name")}
                />
                <Input
                  label="Telefone*"
                  inputValue={formikProps.values.phone}
                  inputOnChange={formikProps.handleChange("phone")}
                  inputMask="(99) 99999-9999"
                />
                <Box className={styles.modalButtonHolder}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={this.state.isLoading}
                    onClick={() =>
                      this.addNewGroupHandler(
                        formikProps.values,
                        formikProps.errors
                      )
                    }
                  >
                    Adicionar
                  </Button>
                </Box>
                {alertError}
                {linearProgress}
              </Box>
            )}
          </Formik>
        </Modal>
        <PrimaryHeading>Grupos Chat</PrimaryHeading>
        <div className={styles.container}>
          <div className={styles.box}>
            <h2 className={styles.heading}>Lista de grupos</h2>
            <div className={styles.groupsContainer}>
              {this.state.groups.map((group) => {
                return (
                  <Box key={group.id} className={styles.groupItem}>
                    <Box className={styles.groupItemData}>
                      <p>
                        <span className={styles.groupName}>{group.name}</span>
                        <span className={styles.groupPhone}>{group.phone}</span>
                      </p>
                    </Box>
                    <Button
                      className={styles.deleteButton}
                      color="secondary"
                      variant="contained"
                      size="small"
                      onClick={() => this.onDeleteGroupHandler(group.id)}
                    >
                      Deletar
                    </Button>
                  </Box>
                );
              })}
            </div>
            <button
              className={styles.btnAddGroup}
              onClick={this.openModalHandler}
            >
              <AddIcon /> Adicionar novo grupo
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GruposChat;
